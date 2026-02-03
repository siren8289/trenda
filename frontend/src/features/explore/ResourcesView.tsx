import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { 
  Search, BookOpen, Layers, ExternalLink, FileText, 
  Code, Globe, Bookmark, Sparkles, ArrowRight
} from "lucide-react";
import { apiClient } from "@/shared/api/client";

interface ResourcesViewProps {
  onNavigate?: (page: string) => void;
}

type TabType = "articles" | "components" | "links";

interface Resource {
  id: number;
  title: string;
  url: string;
  category: string;
  description: string;
}

// Mock Data
const articles = [
  {
    id: 1,
    title: "React 19 출시: Server Actions로 폼 처리 혁신",
    type: "Frontend",
    tags: ["React", "Server Actions", "Form"],
    matchRate: 98,
    level: "Advanced",
    readTime: "10초",
    description: "Server Actions로 API 라우트 없이 폼 처리 가능하며, 기존의 복잡한 상태 관리를 획기적으로 줄여줍니다.",
    views: 3421,
    likes: 234
  },
  {
    id: 2,
    title: "Figma Dev Mode: 디자인→코드 자동 변환",
    type: "Design",
    tags: ["Figma", "Dev Mode", "Workflow"],
    matchRate: 92,
    level: "Beginner",
    readTime: "10초",
    description: "CSS, React 코드를 Dev Mode에서 바로 복사하여 개발 생산성을 극대화하는 방법을 소개합니다.",
    views: 2834,
    likes: 189
  },
  {
    id: 3,
    title: "PostgreSQL JSON 성능 50% 향상",
    type: "Backend",
    tags: ["PostgreSQL", "Database", "Performance"],
    matchRate: 85,
    level: "Intermediate",
    readTime: "10초",
    description: "PostgreSQL 17 업데이트로 MongoDB 대체 가능성을 확인하고, JSON 처리 성능 최적화 비법을 알아봅니다.",
    views: 2156,
    likes: 167
  },
  {
    id: 4,
    title: "Tailwind v4.0: CSS 변수 기반 새로운 설계",
    type: "Frontend",
    tags: ["CSS", "Tailwind", "Styling"],
    matchRate: 88,
    level: "Intermediate",
    readTime: "10초",
    description: "Oxide 엔진으로 빌드 속도 10배 향상된 Tailwind v4.0의 핵심 변경 사항과 마이그레이션 가이드를 제공합니다.",
    views: 1942,
    likes: 145
  }
];

const components = [
  {
    id: 1,
    title: "Authentication Forms",
    count: 12,
    preview: "Login/Signup templates",
    icon: Code
  },
  {
    id: 2,
    title: "Dashboard Layouts",
    count: 8,
    preview: "Admin panel layouts",
    icon: Layers
  },
  {
    id: 3,
    title: "E-commerce Cards",
    count: 15,
    preview: "Product display cards",
    icon: Layers
  }
];

const externalLinks = [
  {
    id: 1,
    title: "React Official Docs",
    url: "https://react.dev",
    description: "The library for web and native user interfaces",
    icon: Code
  },
  {
    id: 2,
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
    description: "Rapidly build modern websites without ever leaving your HTML",
    icon: FileText
  },
  {
    id: 3,
    title: "Figma Community",
    url: "https://www.figma.com/community",
    description: "Explore thousands of free templates and plugins",
    icon: Globe
  }
];

const popularKeywords = [
  { id: 1, keyword: "React 19", growth: "+45%" },
  { id: 2, keyword: "AI/ML", growth: "+32%" },
  { id: 3, keyword: "Figma", growth: "+28%" },
  { id: 4, keyword: "Next.js", growth: "+18%" },
  { id: 5, keyword: "TypeScript", growth: "+15%" },
  { id: 6, keyword: "Tailwind", growth: "+12%" },
];

export function ResourcesView({ onNavigate }: ResourcesViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>("articles");
  const [searchQuery, setSearchQuery] = useState("");
  const [resources, setResources] = useState<Resource[] | null>(null);
  const [isLoadingResources, setIsLoadingResources] = useState(false);
  const [resourceError, setResourceError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchResources = async () => {
      setIsLoadingResources(true);
      setResourceError(null);

      try {
        const data = await apiClient.get<Resource[]>("/api/resources");
        if (!cancelled) {
          setResources(data);
        }
      } catch (error) {
        console.error("Failed to load resources", error);
        if (!cancelled) {
          setResourceError("리소스를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
        }
      } finally {
        if (!cancelled) {
          setIsLoadingResources(false);
        }
      }
    };

    fetchResources();

    return () => {
      cancelled = true;
    };
  }, []);

  const tabs = [
    { id: "articles" as TabType, label: "Articles", icon: BookOpen },
    { id: "components" as TabType, label: "Components", icon: Layers },
    { id: "links" as TabType, label: "External Links", icon: ExternalLink },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFBF7" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#1CB0F6" }} className="text-white py-16">
        <div className="max-w-[1920px] mx-auto px-8">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-5xl font-bold mb-4">Resources</h1>
              <p className="text-xl opacity-90">
                개발과 디자인에 필요한 모든 리소스를 한 곳에서
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-8 py-12">
        <div className="max-w-[1400px] mx-auto">
          {/* Navigation & Search */}
          <div className="flex flex-col md:flex-row gap-6 justify-between mb-12">
            <div className="flex bg-white p-1.5 rounded-xl shadow-sm border border-gray-100 w-fit">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-[#1CB0F6] text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="리소스 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-[#1CB0F6] focus:outline-none bg-white"
              />
            </div>
          </div>

          {/* Content Area */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "articles" && (
              <div className="flex flex-col gap-8">
                {/* Trending Today Header */}
                <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-[#1CB0F6]">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 7L13.5 15.5L8.5 10.5L2 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M16 7H22V13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <h2 className="text-[32px] font-extrabold text-gray-900 tracking-tight">Trending Today</h2>
                    </div>
                    <p className="text-gray-500 text-lg font-medium">오늘의 핫한 기술 트렌드를 빠르게 확인하세요</p>
                  </div>
                  <button className="flex items-center gap-2 text-[#1CB0F6] font-bold hover:bg-[#E5F6FD] px-4 py-2 rounded-lg transition-colors">
                    <div className="p-1">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="18" cy="5" r="3"></circle>
                        <circle cx="6" cy="12" r="3"></circle>
                        <circle cx="18" cy="19" r="3"></circle>
                        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                      </svg>
                    </div>
                    트렌드 공유하기
                  </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                  {articles.map((article) => (
                    <motion.div
                      key={article.id}
                      whileHover={{ y: -4 }}
                      className="bg-white rounded-[32px] p-8 shadow-sm border-2 border-[#1CB0F6] cursor-pointer transition-all h-full flex flex-col justify-between"
                    >
                      <div>
                        {/* Top Header: Tag & Bookmark */}
                        <div className="flex items-center justify-between mb-6">
                          <span className={`px-4 py-1.5 rounded-full text-sm font-bold text-white tracking-wide ${
                            article.type === 'Frontend' ? 'bg-[#1CB0F6]' :
                            article.type === 'Backend' ? 'bg-[#22C55E]' :
                            'bg-[#FF4D4D]'
                          }`}>
                            {article.type}
                          </span>
                          <Bookmark className="text-gray-300 hover:text-[#1CB0F6] transition-colors" size={24} />
                        </div>
                        
                        {/* Title & Description */}
                        <div className="mb-8">
                          <h3 className="text-[26px] font-extrabold mb-3 text-gray-900 leading-tight tracking-tight">
                            {article.title}
                          </h3>
                          <p className="text-gray-500 text-lg leading-relaxed font-medium line-clamp-2">
                            {article.description}
                          </p>
                        </div>

                        {/* Keyword Tags */}
                        <div className="flex flex-wrap gap-2 mb-8">
                          {article.tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm font-bold text-gray-600">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        {/* Divider */}
                        <div className="h-px bg-gray-100 w-full mb-5"></div>

                        {/* Bottom Footer: Match & Level */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#1CB0F6]"></div>
                            <span className="text-[#1CB0F6] font-extrabold text-lg">{article.matchRate}% 매치</span>
                          </div>
                          <span className="text-gray-500 font-medium text-sm">
                            레벨: {article.level}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                  {/* Popular Keywords Sidebar */}
                  <div className="w-full lg:w-[360px] flex-shrink-0">
                    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 sticky top-8">
                      <div className="flex items-center gap-3 mb-8">
                        <Sparkles className="text-[#1CB0F6]" size={28} />
                        <h2 className="text-xl font-bold text-gray-900">인기 키워드</h2>
                      </div>
                      <div className="space-y-3">
                        {popularKeywords.map((item, index) => (
                          <div key={item.id} className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-[#1CB0F6] cursor-pointer transition-colors bg-white hover:shadow-sm group h-16">
                            <div className="flex items-center gap-5">
                              <span className="text-gray-400 font-bold text-lg w-5 text-center group-hover:text-[#1CB0F6] transition-colors">{index + 1}</span>
                              <span className="font-bold text-lg text-gray-700 group-hover:text-gray-900">{item.keyword}</span>
                            </div>
                            <span className="text-xs font-bold text-[#1CB0F6] bg-[#E5F6FD] px-3 py-1.5 rounded-full">
                              {item.growth}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "components" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {components.map((component) => (
                  <motion.div
                    key={component.id}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex items-center gap-4 cursor-pointer"
                  >
                    <div className="w-16 h-16 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                      <component.icon size={32} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">{component.title}</h3>
                      <p className="text-gray-500 text-sm mb-2">{component.preview}</p>
                      <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded-md text-gray-600">
                        {component.count} components
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === "links" && (
              <div className="space-y-4">
                {isLoadingResources && (
                  <p className="text-sm text-gray-500 px-1">
                    리소스를 불러오는 중입니다...
                  </p>
                )}
                {resourceError && (
                  <p className="text-sm text-red-500 px-1">
                    {resourceError}
                  </p>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(resources && resources.length > 0 ? resources : externalLinks).map((item) => {
                    const hasIcon = "icon" in item;
                    const title = item.title;
                    const description =
                      "description" in item && item.description
                        ? item.description
                        : "";
                    const url = "url" in item ? item.url : "#";
                    const IconComponent = hasIcon ? item.icon : Globe;

                    const matchesSearch =
                      !searchQuery ||
                      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      description
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase());

                    if (!matchesSearch) {
                      return null;
                    }

                    return (
                      <motion.div
                        key={item.id}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex items-start justify-between group cursor-pointer"
                        onClick={() => url !== "#" && window.open(url, "_blank")}
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600 group-hover:bg-[#1CB0F6] group-hover:text-white transition-colors">
                            <IconComponent size={24} />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                              {title}
                              <ExternalLink
                                size={14}
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400"
                              />
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {description ||
                                (!hasIcon
                                  ? "백엔드에서 연동된 리소스입니다."
                                  : "")}
                            </p>
                          </div>
                        </div>
                        <div className="p-2 bg-gray-50 rounded-full group-hover:bg-gray-100">
                          <ArrowRight
                            size={20}
                            className="text-gray-400 group-hover:text-[#1CB0F6]"
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
