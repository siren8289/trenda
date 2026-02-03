import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Briefcase, Plus, Download, FileImage, FileCode, FileText, Link as LinkIcon,
  Upload, CheckCircle2, Clock, History, FolderGit2, Save, Share2,
  Image as ImageIcon, Code, Globe, Github, Figma, Eye, Settings,
  ChevronRight, Trash2, Edit, Copy, ExternalLink, Sparkles, Calendar
} from "lucide-react";
import { apiClient } from "@/shared/api/client";
import type { Portfolio } from "@/shared/api/types";

type ResourceType = "image" | "code" | "link" | "document";

interface Resource {
  id: number;
  type: ResourceType;
  name: string;
  url: string;
  thumbnail?: string;
  size?: string;
  addedDate: string;
  source: string; // 어디서 수집되었는지
}

interface PortfolioVersion {
  id: number;
  name: string;
  date: string;
  resources: number;
  thumbnail: string;
  status: "draft" | "published";
  description: string;
}

interface PortfolioManagerViewProps {
  onNavigate: (page: string) => void;
  userId: number;
}

export function PortfolioManagerView({ onNavigate, userId }: PortfolioManagerViewProps) {
  const [activeTab, setActiveTab] = useState<"resources" | "versions" | "export">("resources");
  const [selectedResources, setSelectedResources] = useState<number[]>([]);
  const [showAutoCollect, setShowAutoCollect] = useState(false);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 자동 수집된 리소스
  const resources: Resource[] = [
    {
      id: 1,
      type: "image",
      name: "프로젝트_메인화면.png",
      url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200&q=80",
      size: "2.4MB",
      addedDate: "2024.01.15",
      source: "AI 학습 플랫폼 프로젝트"
    },
    {
      id: 2,
      type: "code",
      name: "React_Component.tsx",
      url: "#",
      size: "12KB",
      addedDate: "2024.01.15",
      source: "데이터 시각화 프로젝트"
    },
    {
      id: 3,
      type: "image",
      name: "대시보드_디자인.png",
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&q=80",
      size: "3.1MB",
      addedDate: "2024.01.14",
      source: "데이터 시각화 프로젝트"
    },
    {
      id: 4,
      type: "link",
      name: "Live Demo",
      url: "https://example.com/demo",
      addedDate: "2024.01.14",
      source: "날씨 앱 프로젝트"
    },
    {
      id: 5,
      type: "document",
      name: "프로젝트_설명서.pdf",
      url: "#",
      size: "1.8MB",
      addedDate: "2024.01.13",
      source: "IoT 스마트홈 프로젝트"
    },
    {
      id: 6,
      type: "image",
      name: "UI_컴포넌트.png",
      url: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80",
      thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=200&q=80",
      size: "1.9MB",
      addedDate: "2024.01.13",
      source: "웹 접근성 프로젝트"
    },
    {
      id: 7,
      type: "code",
      name: "API_Integration.js",
      url: "#",
      size: "8KB",
      addedDate: "2024.01.12",
      source: "실시간 채팅 앱"
    },
    {
      id: 8,
      type: "link",
      name: "GitHub Repository",
      url: "https://github.com/user/project",
      addedDate: "2024.01.12",
      source: "AI 학습 플랫폼 프로젝트"
    }
  ];

  // 포트폴리오 버전들 (백엔드 포트폴리오 1개를 메인 버전으로 사용)
  const versions: PortfolioVersion[] = portfolio
    ? [
        {
          id: portfolio.id,
          name: portfolio.title || "My Portfolio",
          date: new Date(portfolio.createdAt).toLocaleDateString(),
          resources: resources.length,
          thumbnail:
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80",
          status: "published",
          description: portfolio.summary || "나의 프로젝트와 경력을 정리한 포트폴리오",
        },
      ]
    : [];

  const getResourceIcon = (type: ResourceType) => {
    switch (type) {
      case "image": return FileImage;
      case "code": return FileCode;
      case "link": return LinkIcon;
      case "document": return FileText;
    }
  };

  const getResourceColor = (type: ResourceType) => {
    switch (type) {
      case "image": return { bg: "bg-blue-50", text: "text-blue-600" };
      case "code": return { bg: "bg-green-50", text: "text-green-600" };
      case "link": return { bg: "bg-purple-50", text: "text-purple-600" };
      case "document": return { bg: "bg-orange-50", text: "text-orange-600" };
    }
  };

  const toggleResourceSelection = (id: number) => {
    if (selectedResources.includes(id)) {
      setSelectedResources(selectedResources.filter(rid => rid !== id));
    } else {
      setSelectedResources([...selectedResources, id]);
    }
  };

  const handleExport = (format: "png" | "zip" | "notion") => {
    alert(`${format.toUpperCase()} 형식으로 내보내기를 시작합니다.\n선택된 리소스: ${selectedResources.length}개`);
  };

  const handleAutoCollect = () => {
    alert("프로젝트에서 자동으로 리소스를 수집합니다.\n- 이미지 파일\n- 코드 스니펫\n- 링크\n- 문서");
  };

  useEffect(() => {
    let cancelled = false;
    const loadPortfolio = async () => {
      if (!userId) return;
      setError(null);
      try {
        const data = await apiClient.get<Portfolio>(`/api/portfolio/${userId}`);
        if (!cancelled) {
          setPortfolio(data);
        }
      } catch {
        // 포트폴리오가 없으면 404일 수 있으니 에러는 조용히 무시
      }
    };
    loadPortfolio();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const handleSaveMainPortfolio = async () => {
    if (!userId) return;
    setIsSaving(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        userId: String(userId),
        title: portfolio?.title || "My Portfolio",
        summary:
          portfolio?.summary ||
          "Trenda에서 생성된 포트폴리오입니다. 프로젝트 리소스와 버전이 여기에 정리됩니다.",
      });
      const saved = await apiClient.post<Portfolio>(`/api/portfolio?${params.toString()}`);
      setPortfolio(saved);
    } catch {
      setError("포트폴리오 저장에 실패했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFBF7" }}>
      {/* 헤더 */}
      <div style={{ backgroundColor: "#1CB0F6" }} className="text-white py-16">
        <div className="max-w-[1920px] mx-auto px-8">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between"
            >
              <div>
                <h1 className="text-5xl mb-4">Portfolio Manager</h1>
                <p className="text-xl opacity-90">
                  프로젝트 리소스를 자동 수집하고 버전별로 관리하세요
                </p>
              </div>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAutoCollect(!showAutoCollect)}
                  className="px-8 py-4 bg-white text-[#1CB0F6] rounded-xl flex items-center gap-2 shadow-lg"
                >
                  <Sparkles size={20} />
                  자동 수집
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-[#1CB0F6] rounded-xl flex items-center gap-2 shadow-lg"
                >
                  <Plus size={20} />
                  새 버전 만들기
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-8 py-12">
        <div className="max-w-[1400px] mx-auto">
          {/* 자동 수집 패널 */}
          <AnimatePresence>
            {showAutoCollect && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-[#1CB0F6]"
              >
                <h3 className="text-2xl mb-4 flex items-center gap-3">
                  <Sparkles size={28} style={{ color: "#1CB0F6" }} />
                  자동 리소스 수집
                </h3>
                <p className="text-gray-700 mb-6">
                  프로젝트에서 포트폴리오에 사용할 리소스를 AI가 자동으로 찾아 수집합니다.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white rounded-xl p-6 text-center">
                    <FileImage size={32} className="mx-auto mb-3 text-blue-500" />
                    <h4 className="font-bold mb-2">이미지</h4>
                    <p className="text-sm text-gray-600">스크린샷, 디자인</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 text-center">
                    <FileCode size={32} className="mx-auto mb-3 text-green-500" />
                    <h4 className="font-bold mb-2">코드</h4>
                    <p className="text-sm text-gray-600">주요 코드 스니펫</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 text-center">
                    <LinkIcon size={32} className="mx-auto mb-3 text-purple-500" />
                    <h4 className="font-bold mb-2">링크</h4>
                    <p className="text-sm text-gray-600">GitHub, Live Demo</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 text-center">
                    <FileText size={32} className="mx-auto mb-3 text-orange-500" />
                    <h4 className="font-bold mb-2">문서</h4>
                    <p className="text-sm text-gray-600">설명서, 보고서</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAutoCollect}
                    className="px-8 py-4 bg-[#1CB0F6] text-white rounded-xl"
                  >
                    수집 시작하기
                  </motion.button>
                  <button
                    onClick={() => setShowAutoCollect(false)}
                    className="px-8 py-4 border-2 border-gray-300 rounded-xl hover:bg-gray-50"
                  >
                    닫기
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 탭 네비게이션 */}
          <div className="flex gap-4 mb-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("resources")}
              className={`px-6 py-4 font-medium transition-all ${
                activeTab === "resources"
                  ? "text-[#1CB0F6] border-b-2 border-[#1CB0F6]"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-2">
                <FolderGit2 size={20} />
                자동 수집 리소스 ({resources.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab("versions")}
              className={`px-6 py-4 font-medium transition-all ${
                activeTab === "versions"
                  ? "text-[#1CB0F6] border-b-2 border-[#1CB0F6]"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-2">
                <History size={20} />
                버전 관리 ({versions.length})
              </div>
            </button>
            <button
              onClick={() => setActiveTab("export")}
              className={`px-6 py-4 font-medium transition-all ${
                activeTab === "export"
                  ? "text-[#1CB0F6] border-b-2 border-[#1CB0F6]"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-2">
                <Download size={20} />
                Export
              </div>
            </button>
          </div>

          {/* 자동 수집 리소스 탭 */}
          {activeTab === "resources" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl mb-2">수집된 리소스</h2>
                  <p className="text-gray-600">프로젝트에서 자동으로 수집된 리소스입니다</p>
                </div>
                {selectedResources.length > 0 && (
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600">{selectedResources.length}개 선택됨</span>
                    <button
                      onClick={() => setSelectedResources([])}
                      className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      선택 해제
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {resources.map((resource) => {
                  const Icon = getResourceIcon(resource.type);
                  const color = getResourceColor(resource.type);
                  const isSelected = selectedResources.includes(resource.id);

                  return (
                    <motion.div
                      key={resource.id}
                      whileHover={{ y: -4 }}
                      className={`bg-white rounded-2xl overflow-hidden shadow-lg border-2 transition-all cursor-pointer ${
                        isSelected ? "border-[#1CB0F6] shadow-2xl" : "border-transparent"
                      }`}
                      onClick={() => toggleResourceSelection(resource.id)}
                    >
                      {/* 미리보기 */}
                      <div className={`relative h-40 ${color.bg} flex items-center justify-center`}>
                        <Icon size={48} className={color.text} />
                        
                        {/* 선택 체크 */}
                        <div className="absolute top-3 left-3">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                              isSelected ? "bg-[#1CB0F6]" : "bg-white/50 backdrop-blur"
                            }`}
                          >
                            {isSelected && <CheckCircle2 size={16} className="text-white" />}
                          </div>
                        </div>

                        {/* 타입 뱃지 */}
                        <div className="absolute top-3 right-3">
                          <div className={`px-2 py-1 bg-white/50 backdrop-blur rounded-lg text-xs font-medium ${color.text}`}>
                            {resource.type}
                          </div>
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="font-bold mb-1 text-sm truncate">{resource.name}</h3>
                        <p className="text-xs text-gray-500 mb-3 truncate">{resource.source}</p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock size={12} />
                            {resource.addedDate}
                          </div>
                          {resource.size && <span>{resource.size}</span>}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* 버전 관리 탭 */}
          {activeTab === "versions" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl mb-2">포트폴리오 버전</h2>
                <p className="text-gray-600">
                  현재 계정의 포트폴리오를 백엔드에 저장하고 불러옵니다.
                </p>
              </div>

              {error && (
                <p className="text-sm text-red-500 mb-4">{error}</p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {versions.map((version, index) => (
                  <motion.div
                    key={version.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-transparent hover:border-[#1CB0F6] transition-all"
                  >
                    {/* 썸네일 영역 -> 아이콘 영역 */}
                    <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                      <Briefcase size={64} className="text-gray-300" />
                      
                      {/* 상태 뱃지 */}
                      <div className="absolute top-4 right-4">
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            version.status === "published"
                              ? "bg-green-500 text-white"
                              : "bg-gray-500 text-white"
                          }`}
                        >
                          {version.status === "published" ? "배포됨" : "초안"}
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold">{version.name}</h3>
                        <History size={20} className="text-gray-400" />
                      </div>

                      <p className="text-sm text-gray-600 mb-4">{version.description}</p>

                      <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {version.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <FileImage size={14} />
                          {version.resources}개 리소스
                        </div>
                      </div>

                      {/* 액션 버튼 */}
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 border-2 border-[#1CB0F6] text-[#1CB0F6] rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                          <Eye size={16} />
                          미리보기
                        </button>
                        <button className="flex-1 py-2 bg-[#1CB0F6] text-white rounded-lg hover:bg-[#0D8FCC] transition-colors flex items-center justify-center gap-2">
                          <Edit size={16} />
                          편집
                        </button>
                      </div>

                      <div className="flex gap-2 mt-2">
                        <button className="flex-1 py-2 border-2 border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                          <Copy size={16} />
                          복제
                        </button>
                        <button className="flex-1 py-2 border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
                          <Trash2 size={16} />
                          삭제
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* 새 버전 만들기 카드 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: versions.length * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border-2 border-dashed border-[#1CB0F6] flex items-center justify-center cursor-pointer hover:shadow-lg transition-all"
                  onClick={handleSaveMainPortfolio}
                >
                  <div className="text-center p-8">
                    <Plus size={48} className="mx-auto mb-4 text-[#1CB0F6]" />
                    <h3 className="text-xl font-bold mb-2">
                      {isSaving ? "저장 중..." : "포트폴리오 저장"}
                    </h3>
                    <p className="text-gray-600">
                      현재 계정의 포트폴리오를 서버에 생성/업데이트합니다
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Export 탭 */}
          {activeTab === "export" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl mb-2">포트폴리오 내보내기</h2>
                <p className="text-gray-600">다양한 형식으로 포트폴리오를 내보낼 수 있습니다</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {/* PNG Export */}
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border-2 border-transparent hover:border-[#1CB0F6] transition-all cursor-pointer"
                  onClick={() => handleExport("png")}
                >
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mb-6">
                    <FileImage size={32} className="text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">PNG 이미지</h3>
                  <p className="text-gray-600 mb-6">
                    고해상도 이미지로 내보내기<br />
                    SNS, 블로그 게시용
                  </p>
                  <div className="flex items-center text-[#1CB0F6] font-medium">
                    PNG로 내보내기
                    <ChevronRight size={20} className="ml-2" />
                  </div>
                </motion.div>

                {/* ZIP Export */}
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border-2 border-transparent hover:border-[#1CB0F6] transition-all cursor-pointer"
                  onClick={() => handleExport("zip")}
                >
                  <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mb-6">
                    <Download size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">ZIP 압축 파일</h3>
                  <p className="text-gray-600 mb-6">
                    모든 리소스를 포함한 압축 파일<br />
                    백업, 이메일 첨부용
                  </p>
                  <div className="flex items-center text-[#1CB0F6] font-medium">
                    ZIP으로 내보내기
                    <ChevronRight size={20} className="ml-2" />
                  </div>
                </motion.div>

                {/* Notion Export */}
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border-2 border-transparent hover:border-[#1CB0F6] transition-all cursor-pointer"
                  onClick={() => handleExport("notion")}
                >
                  <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center mb-6">
                    <Share2 size={32} className="text-purple-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Notion 페이지</h3>
                  <p className="text-gray-600 mb-6">
                    Notion에 자동으로 페이지 생성<br />
                    온라인 공유, 협업용
                  </p>
                  <div className="flex items-center text-[#1CB0F6] font-medium">
                    Notion으로 내보내기
                    <ChevronRight size={20} className="ml-2" />
                  </div>
                </motion.div>
              </div>

              {/* Export 옵션 */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold mb-6">내보내기 옵션</h3>
                
                <div className="space-y-4">
                  <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-[#1CB0F6] cursor-pointer">
                    <input type="checkbox" className="w-5 h-5" defaultChecked />
                    <div>
                      <div className="font-medium">프로젝트 설명 포함</div>
                      <div className="text-sm text-gray-600">각 프로젝트의 상세 설명을 포함합니다</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-[#1CB0F6] cursor-pointer">
                    <input type="checkbox" className="w-5 h-5" defaultChecked />
                    <div>
                      <div className="font-medium">기술 스택 표시</div>
                      <div className="text-sm text-gray-600">사용된 기술과 도구를 표시합니다</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-[#1CB0F6] cursor-pointer">
                    <input type="checkbox" className="w-5 h-5" />
                    <div>
                      <div className="font-medium">코드 스니펫 포함</div>
                      <div className="text-sm text-gray-600">주요 코드 예제를 포함합니다</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-[#1CB0F6] cursor-pointer">
                    <input type="checkbox" className="w-5 h-5" defaultChecked />
                    <div>
                      <div className="font-medium">연락처 정보</div>
                      <div className="text-sm text-gray-600">GitHub, 이메일 등 연락처를 표시합니다</div>
                    </div>
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
