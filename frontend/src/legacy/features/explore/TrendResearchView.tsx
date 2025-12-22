import { useState } from "react";
import { motion } from "motion/react";
import { 
  Search, TrendingUp, Filter, Plus, Code, Palette, User, 
  Clock, Star, Zap, Eye, Heart, Bookmark
} from "lucide-react";

interface TrendResearchViewProps {
  onNavigate: (page: string) => void;
}

type TabType = "tech" | "design" | "personalized";

// Tech Trends 데이터
const techTrendsData = [
  {
    id: 1,
    title: "React 19 출시: Server Actions로 폼 처리 혁신",
    category: "Frontend",
    date: "2024.01.15",
    views: 3421,
    likes: 234,
    author: "김리액트",
    tags: ["React", "Server Actions", "Forms"],
    readTime: "5분"
  },
  {
    id: 2,
    title: "Bun 1.0: Node.js를 대체할 차세대 런타임",
    category: "Backend",
    date: "2024.01.14",
    views: 2834,
    likes: 189,
    author: "박백엔드",
    tags: ["Bun", "Runtime", "Performance"],
    readTime: "7분"
  },
  {
    id: 3,
    title: "AI 코드 리뷰 자동화: GitHub Copilot의 진화",
    category: "AI/ML",
    date: "2024.01.13",
    views: 2156,
    likes: 167,
    author: "이에이아이",
    tags: ["AI", "Copilot", "Code Review"],
    readTime: "6분"
  },
  {
    id: 4,
    title: "TypeScript 5.4: 성능 최적화와 새로운 타입 추론",
    category: "Language",
    date: "2024.01.12",
    views: 1942,
    likes: 145,
    author: "최타입",
    tags: ["TypeScript", "Performance", "Types"],
    readTime: "8분"
  },
  {
    id: 5,
    title: "Edge Computing: Vercel과 Cloudflare의 미래",
    category: "Infrastructure",
    date: "2024.01.11",
    views: 1876,
    likes: 132,
    author: "정엣지",
    tags: ["Edge", "Serverless", "CDN"],
    readTime: "10분"
  },
  {
    id: 6,
    title: "웹어셈블리(WASM)로 브라우저 성능 극대화",
    category: "Performance",
    date: "2024.01.10",
    views: 1654,
    likes: 112,
    author: "강성능",
    tags: ["WASM", "Performance", "Browser"],
    readTime: "9분"
  }
];

// Design Trends 데이터
const designTrendsData = [
  {
    id: 1,
    title: "Figma Dev Mode: 디자인→코드 자동 변환의 현실",
    category: "Tools",
    date: "2024.01.15",
    views: 2987,
    likes: 198,
    author: "김피그마",
    tags: ["Figma", "Dev Mode", "Workflow"],
    readTime: "6분"
  },
  {
    id: 2,
    title: "뉴모피즘 다시 돌아온다? 2025 UI 트렌드",
    category: "UI Trend",
    date: "2024.01.14",
    views: 3421,
    likes: 267,
    author: "박트렌드",
    tags: ["Neumorphism", "UI", "Trends"],
    readTime: "5분"
  },
  {
    id: 3,
    title: "AI 기반 디자인 시스템 자동 생성",
    category: "Design System",
    date: "2024.01.13",
    views: 2654,
    likes: 178,
    author: "이시스템",
    tags: ["AI", "Design System", "Automation"],
    readTime: "8분"
  },
  {
    id: 4,
    title: "모션 디자인 2024: 마이크로 인터랙션의 부활",
    category: "Motion",
    date: "2024.01.12",
    views: 2156,
    likes: 145,
    author: "최모션",
    tags: ["Motion", "Interaction", "Animation"],
    readTime: "7분"
  },
  {
    id: 5,
    title: "3D 인터페이스의 실용화: Spline과 Three.js",
    category: "3D UI",
    date: "2024.01.11",
    views: 1876,
    likes: 132,
    author: "정쓰리디",
    tags: ["3D", "Spline", "Three.js"],
    readTime: "9분"
  },
  {
    id: 6,
    title: "다크모드 디자인: 접근성과 사용성의 균형",
    category: "Accessibility",
    date: "2024.01.10",
    views: 2341,
    likes: 189,
    author: "강다크",
    tags: ["Dark Mode", "Accessibility", "UX"],
    readTime: "6분"
  }
];

// Personalized Trends 데이터
const personalizedTrendsData = [
  {
    id: 1,
    title: "당신을 위한 추천: shadcn/ui 컴포넌트 라이브러리",
    category: "For You",
    date: "2024.01.15",
    views: 2834,
    likes: 189,
    author: "AI 큐레이터",
    tags: ["React", "Components", "UI"],
    readTime: "5분",
    matchRate: "95%",
    reason: "관심 기술: React, UI"
  },
  {
    id: 2,
    title: "Intermediate 레벨을 위한 Next.js 14 App Router",
    category: "Recommended",
    date: "2024.01.14",
    views: 1942,
    likes: 145,
    author: "AI 큐레이터",
    tags: ["Next.js", "App Router", "SSR"],
    readTime: "10분",
    matchRate: "88%",
    reason: "레벨: Intermediate"
  },
  {
    id: 3,
    title: "최근 활동 기반: Tailwind CSS 디자인 패턴",
    category: "Based on Activity",
    date: "2024.01.13",
    views: 2156,
    likes: 167,
    author: "AI 큐레이터",
    tags: ["Tailwind", "CSS", "Patterns"],
    readTime: "7분",
    matchRate: "82%",
    reason: "최근 활동: CSS 프레임워크"
  },
  {
    id: 4,
    title: "관심 분야: Framer Motion 애니메이션 가이드",
    category: "Interest Match",
    date: "2024.01.12",
    views: 1876,
    likes: 132,
    author: "AI 큐레이터",
    tags: ["Animation", "Framer", "Motion"],
    readTime: "8분",
    matchRate: "78%",
    reason: "관심 분야: 애니메이션"
  },
  {
    id: 5,
    title: "비슷한 사용자가 좋아함: Supabase 풀스�� 개발",
    category: "Similar Users",
    date: "2024.01.11",
    views: 2341,
    likes: 178,
    author: "AI 큐레이터",
    tags: ["Supabase", "Backend", "Fullstack"],
    readTime: "12분",
    matchRate: "75%",
    reason: "유사 사용자 선호"
  },
  {
    id: 6,
    title: "스킬 향상: TypeScript Advanced 패턴",
    category: "Skill Growth",
    date: "2024.01.10",
    views: 1654,
    likes: 112,
    author: "AI 큐레이터",
    tags: ["TypeScript", "Advanced", "Patterns"],
    readTime: "15분",
    matchRate: "70%",
    reason: "다음 단계 학습"
  }
];

export function TrendResearchView({ onNavigate }: TrendResearchViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>("tech");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("전체");

  const getCurrentData = () => {
    switch (activeTab) {
      case "tech": return techTrendsData;
      case "design": return designTrendsData;
      case "personalized": return personalizedTrendsData;
      default: return techTrendsData;
    }
  };

  const getFilters = () => {
    switch (activeTab) {
      case "tech": return ["전체", "Frontend", "Backend", "AI/ML", "Language", "Infrastructure", "Performance"];
      case "design": return ["전체", "Tools", "UI Trend", "Design System", "Motion", "3D UI", "Accessibility"];
      case "personalized": return ["전체", "For You", "Recommended", "Based on Activity", "Interest Match", "Similar Users", "Skill Growth"];
      default: return ["전체"];
    }
  };

  const tabs = [
    {
      id: "tech" as TabType,
      label: "Tech Trends",
      icon: Code,
      description: "최신 기술 트렌드",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-500"
    },
    {
      id: "design" as TabType,
      label: "Design Trends",
      icon: Palette,
      description: "디자인 & UI 트렌드",
      color: "text-pink-500",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-500"
    },
    {
      id: "personalized" as TabType,
      label: "Personalized Trends",
      icon: User,
      description: "나를 위한 추천",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-500"
    }
  ];

  const currentData = getCurrentData();
  const filters = getFilters();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFBF7" }}>
      {/* 헤더 섹션 */}
      <div style={{ backgroundColor: "#1CB0F6" }} className="text-white py-16">
        <div className="max-w-[1920px] mx-auto px-8">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between"
            >
              <div>
                <h1 className="text-5xl mb-4">Trend Research</h1>
                <p className="text-xl opacity-90">
                  Tech, Design, 그리고 당신만을 위한 트렌드 인사이트
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate("create-trend")}
                className="px-8 py-4 bg-white text-[#1CB0F6] rounded-xl flex items-center gap-2 shadow-lg"
              >
                <Plus size={20} />
                새 트렌드 등록
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-8 py-12">
        <div className="max-w-[1400px] mx-auto">
          {/* 탭 네비게이션 */}
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSelectedFilter("전체");
                  }}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    activeTab === tab.id
                      ? `${tab.borderColor} ${tab.bgColor} shadow-lg`
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-4 mb-2">
                    <div className={`w-12 h-12 rounded-xl ${tab.bgColor} flex items-center justify-center`}>
                      <tab.icon className={`w-6 h-6 ${tab.color}`} />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-gray-900">{tab.label}</h3>
                      <p className="text-sm text-gray-600">{tab.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* 검색 & 필터 */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder={`${tabs.find(t => t.id === activeTab)?.label} 검색...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#1CB0F6] focus:outline-none bg-white"
                />
              </div>
            </div>

            {/* 카테고리 필터 */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              <div className="flex items-center gap-2 text-gray-600 flex-shrink-0">
                <Filter size={20} />
                <span className="font-medium">필터:</span>
              </div>
              {filters.map((filter) => (
                <motion.button
                  key={filter}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedFilter(filter)}
                  className="px-5 py-2 rounded-full whitespace-nowrap transition-all"
                  style={{
                    backgroundColor: selectedFilter === filter ? "#1CB0F6" : "white",
                    color: selectedFilter === filter ? "white" : "#333",
                    border: `2px solid ${selectedFilter === filter ? "#1CB0F6" : "#E5E7EB"}`
                  }}
                >
                  {filter}
                </motion.button>
              ))}
            </div>
          </div>

          {/* 트렌드 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentData.map((trend, index) => (
              <motion.div
                key={trend.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer border-2 border-transparent hover:border-[#1CB0F6] transition-all flex flex-col h-full"
                onClick={() => onNavigate("trend-detail")}
              >
                <div className="p-8 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <span
                        className="px-3 py-1 rounded-full text-sm font-bold"
                        style={{ backgroundColor: "#E0F2FE", color: "#1CB0F6" }}
                      >
                        {trend.category}
                      </span>
                      {activeTab === "personalized" && "matchRate" in trend && (
                         <div className="px-3 py-1 bg-[#1CB0F6] text-white rounded-full text-sm font-bold flex items-center gap-1">
                           <Star size={12} fill="white" />
                           {(trend as any).matchRate}
                         </div>
                       )}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Bookmark size={20} className="text-gray-400 hover:text-[#1CB0F6]" />
                    </motion.button>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2 leading-tight">
                    {trend.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <span className="font-medium text-gray-900">{trend.author}</span>
                    <span>·</span>
                    <Clock size={14} />
                    <span>{trend.readTime}</span>
                    <span>·</span>
                    <span>{trend.date}</span>
                  </div>

                  {/* Personalized 탭에만 추천 이유 표시 */}
                  {activeTab === "personalized" && "reason" in trend && (
                    <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-100">
                      <div className="flex items-center gap-2 text-purple-700 text-sm font-medium">
                        <Zap size={16} className="fill-purple-700" />
                        <span>{(trend as any).reason}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 mb-8 flex-wrap">
                    {trend.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-600 font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between text-gray-500">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Eye size={18} />
                        <span className="font-medium">{trend.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2 hover:text-red-500 transition-colors">
                        <Heart size={18} />
                        <span className="font-medium">{trend.likes}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[#1CB0F6] font-bold text-sm group">
                      <span>자세히 보기</span>
                      <TrendingUp size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {currentData.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Search size={64} className="mx-auto mb-4 text-gray-300" />
              <h3 className="text-2xl text-gray-600 mb-2">검색 결과가 없습니다</h3>
              <p className="text-gray-500">다른 키워드로 검색해보세요</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
