import { useState } from "react";
import { Newspaper, Wrench, Link as LinkIcon, ExternalLink, ArrowRight, Eye, Heart, Clock } from "lucide-react";
import { cn } from "../ui/utils";

interface ResourcesPageProps {
  onNavigate: (page: string, params?: any) => void;
}

type Section = 'articles' | 'tools' | 'links';

// Mock Data
const ARTICLES_DATA = [
  { id: 1, title: "Mastering React Hooks", description: "A deep dive into useEffect, useMemo, and useCallback for performance optimization.", category: "Tutorial", time: "10 min", views: 1240, likes: 350 },
  { id: 2, title: "CSS Grid Complete Guide", description: "Everything you need to know about CSS Grid Layout with practical examples.", category: "Guide", time: "15 min", views: 980, likes: 210 },
  { id: 3, title: "Web Accessibility 101", description: "Core principles of WCAG and how to implement them in modern web apps.", category: "Best Practice", time: "8 min", views: 760, likes: 180 },
  { id: 4, title: "TypeScript Generics", description: "Understanding advanced types and generics in TypeScript.", category: "Advanced", time: "12 min", views: 650, likes: 145 },
];

const TOOLS_DATA = [
  { id: 1, title: "JSON Validator & Formatter", description: "Validate, format, and visualize JSON data with error highlighting.", category: "Utility", time: "Free", views: 2100, likes: 540 },
  { id: 2, title: "Contrast Checker", description: "Check color contrast ratios against WCAG 2.1 accessibility standards.", category: "Design", time: "Free", views: 1500, likes: 420 },
  { id: 3, title: "Regex Tester", description: "Test and debug regular expressions with real-time matching.", category: "Dev", time: "Free", views: 1800, likes: 390 },
];

const LINKS_DATA = [
  { id: 1, title: "React Documentation", description: "The official React documentation. The best place to learn modern React.", category: "Docs", time: "Official", views: 5000, likes: 1200 },
  { id: 2, title: "Tailwind CSS", description: "Rapidly build modern websites without ever leaving your HTML.", category: "Library", time: "Official", views: 4200, likes: 980 },
  { id: 3, title: "MDN Web Docs", description: "Resources for developers, by developers. The web standards reference.", category: "Reference", time: "Official", views: 8900, likes: 2500 },
];

export default function ResourcesPage({ onNavigate }: ResourcesPageProps) {
  const [activeSection, setActiveSection] = useState<Section>('articles');

  const sections = [
    { id: 'articles', label: 'Articles', icon: Newspaper },
    { id: 'tools', label: 'Tools', icon: Wrench },
    { id: 'links', label: 'External Links', icon: LinkIcon },
  ];

  const renderContent = () => {
    switch(activeSection) {
      case 'articles':
        return <ResourceGrid data={ARTICLES_DATA} type="articles" onNavigate={onNavigate} badgeColor="bg-[#1CB0F6]" icon={Newspaper} />;
      case 'tools':
        return <ResourceGrid data={TOOLS_DATA} type="tools" onNavigate={onNavigate} badgeColor="bg-[#1CB0F6]" icon={Wrench} />;
      case 'links':
        return <ResourceGrid data={LINKS_DATA} type="links" onNavigate={onNavigate} badgeColor="bg-[#1CB0F6]" icon={LinkIcon} isExternal />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50">
      <main className="w-full h-full px-8 py-12">
        <div className="max-w-[1400px] mx-auto space-y-12 animate-in fade-in duration-500">
          
          {/* Header Section */}
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-2xl mb-6">
              <Newspaper className="w-8 h-8 text-[#1CB0F6]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 tracking-tight">
              Resources
            </h1>
            <p className="text-slate-500 text-xl max-w-2xl font-light">
              개발에 유용한 아티클, 도구, 그리고 참고 자료들을<br/>
              엄선하여 큐레이션 했습니다.
            </p>
          </div>

          {/* Section Tabs */}
          <div className="flex justify-center mb-16 w-full">
            <div className="flex w-full bg-white p-2 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id as Section)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-3 py-4 rounded-xl text-lg font-bold transition-all duration-200 min-w-[150px]",
                    activeSection === section.id
                      ? "bg-[#1CB0F6] text-white shadow-md"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <section.icon className="w-5 h-5" />
                  <span className="whitespace-nowrap">{section.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          {renderContent()}

        </div>
      </main>
    </div>
  );
}

// Reusable Grid Component
const ResourceGrid = ({ 
  data, 
  type, 
  onNavigate, 
  badgeColor, 
  icon: Icon,
  isExternal = false
}: { 
  data: any[], 
  type: string, 
  onNavigate: any, 
  badgeColor: string,
  icon: any,
  isExternal?: boolean
}) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {data.map((item) => (
        <div 
          key={item.id}
          onClick={() => !isExternal && onNavigate('resource-detail', { id: item.id, type })}
          className="group bg-white rounded-[2rem] p-8 border border-slate-200 cursor-pointer transition-all duration-300 hover:border-[#1CB0F6] hover:shadow-lg hover:-translate-y-1"
        >
          <div className="flex justify-between items-start mb-6">
            <span className={cn("px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-sm", badgeColor)}>
              {item.category}
            </span>
            <div className="flex items-center gap-1.5 text-slate-400 text-sm font-medium bg-slate-50 px-3 py-1 rounded-full">
              {isExternal ? <ExternalLink size={14} /> : <Clock size={14} />}
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
            <div className="ml-auto">
                <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 text-[#1CB0F6]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
