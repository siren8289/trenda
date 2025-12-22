import { motion } from "motion/react";
import { useState } from "react";
import { 
  Search, Code, Palette, User, Bookmark, 
  TrendingUp, Eye, Heart, ArrowUpRight 
} from "lucide-react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";

interface ExploreEntryViewProps {
  onNavigate: (page: string) => void;
}

// Mock Data Types
interface TrendArticle {
  id: string;
  category: string; // Frontend, Backend, AI/ML etc.
  title: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  views: number;
  likes: number;
}

export function ExploreEntryView({ onNavigate }: ExploreEntryViewProps) {
  const [activeTab, setActiveTab] = useState<"tech" | "design" | "personalized">("tech");
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Tabs Configuration
  const tabs = [
    { 
      id: "tech", 
      label: "Tech Trends", 
      subLabel: "최신 기술 트렌드", 
      icon: Code,
      color: "text-blue-600",
      activeBorder: "border-blue-500",
      activeBg: "bg-blue-50"
    },
    { 
      id: "design", 
      label: "Design Trends", 
      subLabel: "디자인 & UI 트렌드", 
      icon: Palette,
      color: "text-pink-500",
      activeBorder: "border-pink-500",
      activeBg: "bg-pink-50"
    },
    { 
      id: "personalized", 
      label: "Personalized Trends", 
      subLabel: "나를 위한 추천", 
      icon: User,
      color: "text-purple-500",
      activeBorder: "border-purple-500",
      activeBg: "bg-purple-50"
    }
  ] as const;

  // Filters
  const filters = ["All", "Frontend", "Backend", "AI/ML", "Language", "Infrastructure", "Performance"];

  // Mock Data
  const articles: TrendArticle[] = [
    {
      id: "1",
      category: "Frontend",
      title: "React 19 출시: Server Actions로 폼 처리 혁신",
      author: "김리액트",
      date: "2024.01.15",
      readTime: "5분",
      tags: ["React", "Server Actions", "Forms"],
      views: 3421,
      likes: 234
    },
    {
      id: "2",
      category: "Backend",
      title: "Bun 1.0: Node.js를 대체할 차세대 런타임",
      author: "박백엔드",
      date: "2024.01.14",
      readTime: "7분",
      tags: ["Bun", "Runtime", "Performance"],
      views: 2834,
      likes: 189
    },
    {
      id: "3",
      category: "AI/ML",
      title: "AI 코드 리뷰 자동화: GitHub Copilot의 진화",
      author: "이에이아이",
      date: "2024.01.13",
      readTime: "6분",
      tags: ["AI", "Copilot", "Code Review"],
      views: 2156,
      likes: 167
    },
    {
      id: "4",
      category: "Language",
      title: "TypeScript 5.4: 성능 최적화와 새로운 타입 추론",
      author: "타입마스터",
      date: "2024.01.12",
      readTime: "8분",
      tags: ["TypeScript", "Type Inference"],
      views: 1980,
      likes: 142
    },
    {
      id: "5",
      category: "Infrastructure",
      title: "Edge Computing: Vercel과 Cloudflare의 미래",
      author: "클라우드",
      date: "2024.01.10",
      readTime: "6분",
      tags: ["Edge", "Serverless", "Cloud"],
      views: 1540,
      likes: 110
    },
    {
      id: "6",
      category: "Performance",
      title: "웹어셈블리(WASM)로 브라우저 성능 극대화",
      author: "성능장인",
      date: "2024.01.09",
      readTime: "10분",
      tags: ["WASM", "WebAssembly", "Performance"],
      views: 1230,
      likes: 85
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      <div className="max-w-[1400px] mx-auto px-6 py-10">
        
        {/* Top Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative flex items-center gap-4 p-6 rounded-2xl border-2 text-left transition-all duration-200
                ${activeTab === tab.id 
                  ? `${tab.activeBorder} ${tab.activeBg} bg-white shadow-sm` 
                  : "border-transparent bg-white hover:border-gray-200 shadow-sm"
                }
              `}
            >
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center
                ${activeTab === tab.id ? "bg-white" : "bg-gray-100"}
              `}>
                <tab.icon 
                  size={24} 
                  className={activeTab === tab.id ? tab.color : "text-gray-400"} 
                />
              </div>
              <div>
                <div className={`font-bold text-lg ${activeTab === tab.id ? "text-gray-900" : "text-gray-900"}`}>
                  {tab.label}
                </div>
                <div className="text-sm text-gray-500 mt-0.5">
                  {tab.subLabel}
                </div>
              </div>
              
              {activeTab === tab.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-blue-500 rounded-r-full opacity-0" /> 
                /* Left accent line optional, removed for now to match image */
              )}
            </button>
          ))}
        </div>

        {/* Search & Filter Section */}
        <div className="mb-10 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input 
              placeholder={`${tabs.find(t => t.id === activeTab)?.label} 검색...`}
              className="w-full pl-12 py-6 text-lg bg-white border-gray-200 rounded-xl shadow-sm focus-visible:ring-blue-500"
            />
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-bold text-gray-500 mr-2">필터:</span>
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`
                  px-5 py-2 rounded-full text-sm font-medium transition-all
                  ${selectedFilter === filter
                    ? "bg-[#1CB0F6] text-white shadow-md shadow-blue-200"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
                  }
                `}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white p-7 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-lg transition-all group cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <Badge variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-none px-3 py-1">
                  {article.category}
                </Badge>
                <button className="text-gray-300 hover:text-blue-500 transition-colors">
                  <Bookmark size={20} />
                </button>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                {article.title}
              </h3>

              <div className="flex items-center text-sm text-gray-500 mb-6 gap-2">
                <span className="font-medium text-gray-700">{article.author}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span>{article.readTime}</span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span>{article.date}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {article.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-gray-50 text-gray-500 text-xs font-medium rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-4 text-gray-400 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Eye size={16} />
                    <span>{article.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Heart size={16} />
                    <span>{article.likes}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 text-blue-500 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-200">
                  자세히 보기 <ArrowUpRight size={16} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
