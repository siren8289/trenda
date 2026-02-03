import { useState } from "react";
import { TrendingUp, Palette, Sparkles, Clock, Eye, Heart, Database, Layout } from "lucide-react";
import { cn } from "../ui/utils";

interface TrendResearchPageProps {
  onNavigate: (page: string, params?: any) => void;
}

type Section = 'tech' | 'design' | 'personalized';

interface TrendItem {
  id: number;
  category: string;
  categoryType: 'frontend' | 'backend' | 'design' | 'ai'; // for styling
  title: string;
  description: string;
  time: string;
  views: number;
  likes: number;
}

const MOCK_DATA: TrendItem[] = [
  {
    id: 1,
    category: "Frontend",
    categoryType: "frontend",
    title: "React 19 출시: Server Actions로 폼 처리 혁신",
    description: "Server Actions로 API 라우트 없이 폼 처리 가능",
    time: "10초",
    views: 3421,
    likes: 234
  },
  {
    id: 2,
    category: "Design",
    categoryType: "design",
    title: "Figma Dev Mode: 디자인→코드 자동 변환",
    description: "CSS, React 코드를 Dev Mode에서 바로 복사",
    time: "10초",
    views: 2834,
    likes: 189
  },
  {
    id: 3,
    category: "Backend",
    categoryType: "backend",
    title: "PostgreSQL JSON 성능 50% 향상",
    description: "PostgreSQL 17 업데이트로 MongoDB 대체 가능",
    time: "10초",
    views: 1542,
    likes: 312
  },
  {
    id: 4,
    category: "Frontend",
    categoryType: "frontend",
    title: "Tailwind v4.0: CSS 변수 기반 새로운 설계",
    description: "Oxide 엔진으로 빌드 속도 10배 향상",
    time: "10초",
    views: 4102,
    likes: 561
  },
  {
    id: 5,
    category: "AI",
    categoryType: "ai",
    title: "GPT-4 Turbo: 더 길어진 컨텍스트 윈도우",
    description: "128k 토큰 지원으로 책 한 권 분량 처리 가능",
    time: "1분",
    views: 5231,
    likes: 892
  },
  {
    id: 6,
    category: "Design",
    categoryType: "design",
    title: "Bento Grids: 2024년 웹 디자인 트렌드",
    description: "애플, 리니어 스타일의 그리드 레이아웃 분석",
    time: "5분",
    views: 1823,
    likes: 145
  }
];

export default function TrendResearchPage({ onNavigate }: TrendResearchPageProps) {
  const [activeSection, setActiveSection] = useState<Section>('tech');

  const sections = [
    { id: 'tech', label: 'Tech Trends', icon: TrendingUp },
    { id: 'design', label: 'Design Trends', icon: Palette },
    { id: 'personalized', label: 'Personalized Trends', icon: Sparkles },
  ];

  // In a real app, we would filter MOCK_DATA based on activeSection
  // For this design request, we'll show appropriate subsets or all for demo
  const getDisplayData = () => {
    if (activeSection === 'tech') return MOCK_DATA.filter(d => d.categoryType !== 'design');
    if (activeSection === 'design') return MOCK_DATA.filter(d => d.categoryType === 'design' || d.categoryType === 'frontend');
    return MOCK_DATA; // Personalized shows all mixed
  };

  const displayData = getDisplayData();

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'frontend': return 'bg-[#1CB0F6]'; // Blue
      case 'backend': return 'bg-[#22C55E]'; // Green
      case 'design': return 'bg-[#A855F7]'; // Purple
      case 'ai': return 'bg-[#EC4899]'; // Pink
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50">
      {/* Main Content */}
      <main className="w-full h-full px-8 py-12">
        <div className="max-w-[1400px] mx-auto space-y-12 animate-in fade-in duration-500">
          {/* Header Section */}
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-2xl mb-6">
              <TrendingUp className="w-8 h-8 text-[#1CB0F6]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 tracking-tight">
              Trending Today
            </h1>
            <p className="text-slate-500 text-xl max-w-2xl font-light">
              오늘의 핫한 기술 트렌드를 빠르게 확인하세요.<br/>
              개발, 디자인, AI 등 다양한 분야의 최신 소식을 전해드립니다.
            </p>
          </div>

          {/* Section Tabs */}
          <div className="flex justify-center mb-16 w-full">
            <div className="flex w-full bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id as Section)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-3 py-4 rounded-xl text-lg font-bold transition-all duration-200",
                    activeSection === section.id
                      ? "bg-[#1CB0F6] text-white shadow-md"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <section.icon className="w-5 h-5" />
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayData.map((item) => (
              <div 
                key={item.id}
                onClick={() => onNavigate('trend-detail', { id: item.id, type: 'tech' })}
                className="group bg-white rounded-[2rem] p-8 border border-slate-200 cursor-pointer transition-all duration-300 hover:border-[#1CB0F6] hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className={cn("px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-sm", getBadgeColor(item.categoryType))}>
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-400 text-sm font-medium bg-slate-50 px-3 py-1 rounded-full">
                    <Clock size={14} />
                    {item.time}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-snug group-hover:text-[#1CB0F6] transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-slate-500 text-lg mb-8 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center gap-6 pt-6 border-t border-slate-100 text-slate-400 font-medium">
                  <div className="flex items-center gap-2 hover:text-slate-600 transition-colors">
                    <Eye size={18} />
                    {item.views.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-2 hover:text-pink-500 transition-colors">
                    <Heart size={18} />
                    {item.likes.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
