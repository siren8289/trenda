import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, Grid, List, Plus, 
  FolderOpen, GraduationCap, Gamepad2, FileText, Download,
  CheckCircle2, Calendar, Github, Globe,
  FileCode, Image as ImageIcon, BarChart3, BookOpen, ArrowRight
} from "lucide-react";

interface ProjectArchiveViewProps {
  onNavigate: (page: string) => void;
}

type ProjectType = "all" | "assignment" | "graduation" | "toy";

interface Deliverable {
  name: string;
  type: "code" | "document" | "image" | "report";
  size: string;
  date: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  type: "assignment" | "graduation" | "toy";
  tags: string[];
  image: string;
  date: string;
  status: "completed" | "in-progress" | "planned";
  progress: number;
  deliverables: Deliverable[];
  technologies: string[];
  collaborators?: number;
  githubUrl?: string;
  liveUrl?: string;
  views: number;
  likes: number;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "데이터 시각화 대시보드",
    description: "빅데이터 분석 과제 - React와 D3.js를 활용한 인터랙티브 대시보드",
    type: "assignment",
    tags: ["React", "D3.js", "Data Viz"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    date: "2024.01.15",
    status: "completed",
    progress: 100,
    deliverables: [
      { name: "소스코드.zip", type: "code", size: "12.4MB", date: "2024.01.15" },
      { name: "프로젝트_보고서.pdf", type: "document", size: "2.1MB", date: "2024.01.15" },
      { name: "발표자료.pptx", type: "document", size: "5.6MB", date: "2024.01.14" },
      { name: "결과화면.png", type: "image", size: "1.2MB", date: "2024.01.15" }
    ],
    technologies: ["React", "TypeScript", "D3.js", "Tailwind"],
    views: 234,
    likes: 45
  },
  {
    id: 2,
    title: "AI 기반 학습 플랫폼",
    description: "졸업작품 - GPT-4를 활용한 개인화 학습 추천 시스템",
    type: "graduation",
    tags: ["AI", "Next.js", "GPT-4"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    date: "2024.01.10",
    status: "in-progress",
    progress: 75,
    deliverables: [
      { name: "중간보고서.pdf", type: "document", size: "3.2MB", date: "2024.01.10" },
      { name: "시스템_설계서.pdf", type: "document", size: "4.5MB", date: "2024.01.08" },
      { name: "프로토타입_코드.zip", type: "code", size: "28.3MB", date: "2024.01.10" }
    ],
    technologies: ["Next.js", "Python", "OpenAI API", "Supabase"],
    collaborators: 3,
    githubUrl: "https://github.com/user/ai-learning",
    views: 567,
    likes: 89
  },
  {
    id: 3,
    title: "날씨 앱 클론 코딩",
    description: "토이 프로젝트 - 실시간 날씨 정보 제공 모바일 웹앱",
    type: "toy",
    tags: ["React Native", "API", "Mobile"],
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80",
    date: "2024.01.12",
    status: "completed",
    progress: 100,
    deliverables: [
      { name: "앱_소스코드.zip", type: "code", size: "8.7MB", date: "2024.01.12" },
      { name: "README.md", type: "document", size: "12KB", date: "2024.01.12" },
      { name: "앱_스크린샷.png", type: "image", size: "3.4MB", date: "2024.01.12" }
    ],
    technologies: ["React Native", "Weather API", "Expo"],
    githubUrl: "https://github.com/user/weather-app",
    liveUrl: "https://weather-app.vercel.app",
    views: 156,
    likes: 23
  },
  {
    id: 4,
    title: "웹 접근성 개선 프로젝트",
    description: "웹 프로그래밍 과제 - WCAG 2.1 AA 기준 충족 웹사이트",
    type: "assignment",
    tags: ["Accessibility", "HTML", "CSS"],
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80",
    date: "2024.01.08",
    status: "completed",
    progress: 100,
    deliverables: [
      { name: "과제_제출.zip", type: "code", size: "5.2MB", date: "2024.01.08" },
      { name: "접근성_검증_보고서.pdf", type: "report", size: "1.8MB", date: "2024.01.08" },
      { name: "개선사항_문서.docx", type: "document", size: "890KB", date: "2024.01.07" }
    ],
    technologies: ["HTML5", "CSS3", "ARIA", "Lighthouse"],
    views: 189,
    likes: 34
  },
  {
    id: 5,
    title: "실시간 채팅 앱",
    description: "토이 프로젝트 - WebSocket을 활용한 실시간 메신저",
    type: "toy",
    tags: ["WebSocket", "Node.js", "React"],
    image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&q=80",
    date: "2024.01.05",
    status: "in-progress",
    progress: 60,
    deliverables: [
      { name: "진행중_코드.zip", type: "code", size: "15.6MB", date: "2024.01.05" },
      { name: "기능_명세서.pdf", type: "document", size: "780KB", date: "2024.01.03" }
    ],
    technologies: ["React", "Socket.io", "Express", "MongoDB"],
    githubUrl: "https://github.com/user/chat-app",
    views: 278,
    likes: 56
  },
  {
    id: 6,
    title: "캡스톤 디자인: IoT 스마트홈",
    description: "졸업작품 - IoT 센서 기반 홈 자동화 시스템",
    type: "graduation",
    tags: ["IoT", "Arduino", "React"],
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80",
    date: "2023.12.20",
    status: "completed",
    progress: 100,
    deliverables: [
      { name: "최종보고서.pdf", type: "document", size: "8.9MB", date: "2023.12.20" },
      { name: "시연영상.mp4", type: "image", size: "45.2MB", date: "2023.12.19" },
      { name: "시스템_코드.zip", type: "code", size: "23.1MB", date: "2023.12.20" },
      { name: "회로도.pdf", type: "document", size: "2.3MB", date: "2023.12.18" }
    ],
    technologies: ["Arduino", "React", "MQTT", "Firebase"],
    collaborators: 4,
    views: 892,
    likes: 145
  }
];

export function ProjectArchiveView({ onNavigate }: ProjectArchiveViewProps) {
  const [selectedType, setSelectedType] = useState<ProjectType>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPDFGenerator, setShowPDFGenerator] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState<number[]>([]);

  const projectTypes = [
    { id: "all" as ProjectType, label: "전체", icon: FolderOpen, count: projectsData.length },
    { id: "assignment" as ProjectType, label: "과제", icon: BookOpen, count: projectsData.filter(p => p.type === "assignment").length },
    { id: "graduation" as ProjectType, label: "졸업작품", icon: GraduationCap, count: projectsData.filter(p => p.type === "graduation").length },
    { id: "toy" as ProjectType, label: "토이 프로젝트", icon: Gamepad2, count: projectsData.filter(p => p.type === "toy").length }
  ];

  const filteredProjects = projectsData.filter(project => {
    const typeMatch = selectedType === "all" || project.type === selectedType;
    const searchMatch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return typeMatch && searchMatch;
  });

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "completed": return { bg: "bg-green-50", text: "text-green-600", label: "완료" };
      case "in-progress": return { bg: "bg-blue-50", text: "text-blue-600", label: "진행중" };
      case "planned": return { bg: "bg-gray-50", text: "text-gray-600", label: "계획" };
    }
  };

  const getDeliverableIcon = (type: Deliverable["type"]) => {
    switch (type) {
      case "code": return FileCode;
      case "document": return FileText;
      case "image": return ImageIcon;
      case "report": return BarChart3;
    }
  };

  const handleGeneratePDF = () => {
    alert("PDF 생성 기능이 실행됩니다.\n선택된 프로젝트들의 산출물을 포함한 제출용 PDF를 생성합니다.");
  };

  const toggleProjectSelection = (projectId: number) => {
    if (selectedProjects.includes(projectId)) {
      setSelectedProjects(selectedProjects.filter(id => id !== projectId));
    } else {
      setSelectedProjects([...selectedProjects, projectId]);
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
                <h1 className="text-5xl mb-4">Project Archive</h1>
                <p className="text-xl opacity-90">
                  과제, 졸업작품, 토이 프로젝트를 체계적으로 관리하세요
                </p>
              </div>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowPDFGenerator(!showPDFGenerator)}
                  className="px-8 py-4 bg-white text-[#1CB0F6] rounded-xl flex items-center gap-2 shadow-lg"
                >
                  <Download size={20} />
                  제출용 PDF 생성
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate("create-project")}
                  className="px-8 py-4 bg-white text-[#1CB0F6] rounded-xl flex items-center gap-2 shadow-lg"
                >
                  <Plus size={20} />
                  새 프로젝트
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-8 py-12">
        <div className="max-w-[1400px] mx-auto">
          {/* PDF 생성 패널 */}
          <AnimatePresence>
            {showPDFGenerator && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-[#1CB0F6]"
              >
                <h3 className="text-2xl mb-4 flex items-center gap-3">
                  <Download size={28} style={{ color: "#1CB0F6" }} />
                  제출용 PDF 생성기
                </h3>
                <p className="text-gray-700 mb-6">
                  선택한 프로젝트들의 산출물(소스코드, 보고서, 이미지 등)을 자동으로 정리하여 제출용 PDF를 생성합니다.
                </p>
                
                <div className="bg-white rounded-xl p-6 mb-6">
                  <h4 className="font-bold mb-4">선택된 프로젝트: {selectedProjects.length}개</h4>
                  {selectedProjects.length === 0 ? (
                    <p className="text-gray-500 text-sm">아래 프로젝트 목록에서 체크박스를 선택하세요</p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {selectedProjects.map(id => {
                        const project = projectsData.find(p => p.id === id);
                        return (
                          <div key={id} className="px-3 py-1 bg-[#1CB0F6] text-white rounded-full text-sm flex items-center gap-2">
                            {project?.title}
                            <button onClick={() => toggleProjectSelection(id)}>✕</button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGeneratePDF}
                    disabled={selectedProjects.length === 0}
                    className="px-8 py-4 bg-[#1CB0F6] text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    PDF 생성하기
                  </motion.button>
                  <button
                    onClick={() => setShowPDFGenerator(false)}
                    className="px-8 py-4 border-2 border-gray-300 rounded-xl hover:bg-gray-50"
                  >
                    닫기
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 프로젝트 타입 탭 */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {projectTypes.map((type) => (
              <motion.button
                key={type.id}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedType(type.id)}
                className={`p-6 rounded-2xl border-2 transition-all flex items-center justify-between group ${
                  selectedType === type.id
                    ? "border-[#1CB0F6] bg-blue-50/50 shadow-md"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl transition-colors ${
                    selectedType === type.id 
                      ? "bg-[#1CB0F6] text-white" 
                      : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                  }`}>
                    <type.icon size={24} />
                  </div>
                  <span className={`text-lg font-bold ${
                    selectedType === type.id ? "text-gray-900" : "text-gray-600"
                  }`}>
                    {type.label}
                  </span>
                </div>
                <span className={`text-2xl font-bold transition-colors ${
                  selectedType === type.id ? "text-[#1CB0F6]" : "text-gray-300 group-hover:text-gray-400"
                }`}>
                  {type.count}
                </span>
              </motion.button>
            ))}
          </div>

          {/* 검색 & 뷰 모드 */}
          <div className="flex gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="프로젝트 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#1CB0F6] focus:outline-none bg-white"
              />
            </div>
            
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode("grid")}
                className={`p-4 rounded-xl border-2 ${
                  viewMode === "grid" ? "border-[#1CB0F6] bg-blue-50" : "border-gray-200 bg-white"
                }`}
              >
                <Grid size={20} style={{ color: viewMode === "grid" ? "#1CB0F6" : "#666" }} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setViewMode("list")}
                className={`p-4 rounded-xl border-2 ${
                  viewMode === "list" ? "border-[#1CB0F6] bg-blue-50" : "border-gray-200 bg-white"
                }`}
              >
                <List size={20} style={{ color: viewMode === "list" ? "#1CB0F6" : "#666" }} />
              </motion.button>
            </div>
          </div>

          {/* 프로젝트 그리드 */}
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "flex flex-col gap-6"}>
            {filteredProjects.map((project, index) => {
              const statusColor = getStatusColor(project.status);
              const isSelected = selectedProjects.includes(project.id);

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all flex flex-col h-full ${
                    isSelected ? "border-[#1CB0F6] shadow-2xl bg-blue-50/10" : "border-gray-100 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleProjectSelection(project.id)}
                        className={`w-6 h-6 rounded flex items-center justify-center transition-all ${
                          isSelected ? "bg-[#1CB0F6]" : "bg-white border-2 border-gray-300 hover:border-[#1CB0F6]"
                        }`}
                      >
                        {isSelected && <CheckCircle2 size={16} className="text-white" />}
                      </motion.button>
                      <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-bold uppercase tracking-wide">
                        {projectTypes.find(t => t.id === project.type)?.label}
                      </span>
                    </div>
                    <div className={`px-3 py-1 ${statusColor.bg} ${statusColor.text} rounded-full text-xs font-bold`}>
                      {statusColor.label}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-6 line-clamp-2 h-10">
                    {project.description}
                  </p>

                  {/* 진행률 바 (진행중인 경우) */}
                  {project.status === "in-progress" && (
                    <div className="mb-6">
                      <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                        <span className="font-medium">진행률</span>
                        <span className="font-bold text-[#1CB0F6]">{project.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#1CB0F6] rounded-full transition-all duration-1000 ease-out" 
                          style={{ width: `${project.progress}%` }} 
                        />
                      </div>
                    </div>
                  )}

                  {/* 기술 스택 */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-gray-100 rounded-md text-xs text-gray-600 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2.5 py-1 bg-gray-100 rounded-md text-xs text-gray-600 font-medium">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* 하단 정보 */}
                  <div className="mt-auto">
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} />
                          <span className="text-xs">{project.date}</span>
                        </div>
                        {(project.githubUrl || project.liveUrl) && (
                          <div className="flex items-center gap-2">
                            {project.githubUrl && <Github size={14} className="hover:text-black cursor-pointer" />}
                            {project.liveUrl && <Globe size={14} className="hover:text-[#1CB0F6] cursor-pointer" />}
                          </div>
                        )}
                      </div>
                      <motion.button
                        whileHover={{ x: 4 }}
                        onClick={() => onNavigate("project-detail")}
                        className="flex items-center gap-1 text-[#1CB0F6] font-bold text-xs"
                      >
                        상세보기 <ArrowRight size={12} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <FolderOpen size={64} className="mx-auto mb-4 text-gray-300" />
              <h3 className="text-2xl text-gray-600 mb-2">프로젝트가 없습니다</h3>
              <p className="text-gray-500 mb-6">새로운 프로젝트를 추가해보세요</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate("create-project")}
                className="px-8 py-4 bg-[#1CB0F6] text-white rounded-xl flex items-center gap-2 mx-auto"
              >
                <Plus size={20} />
                새 프로젝트 추가
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
