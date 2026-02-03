import { useState } from "react";
import { BookOpen, GraduationCap, Gamepad2, FileDown, FileText, ArrowRight, Eye, Heart, Calendar } from "lucide-react";
import { cn } from "../ui/utils";
import { Button } from "../ui/button";

interface ProjectArchivePageProps {
  onNavigate: (page: string, params?: any) => void;
}

type Section = 'assignments' | 'graduation' | 'toys' | 'pdf';

// Mock Data for consistent "Trend Research" style cards
const ASSIGNMENTS_DATA = [
  { id: 1, title: "Algorithm Analysis", description: "Sorting algorithms implementation & complexity analysis (Quick, Merge, Heap).", category: "CS-101", time: "Fall 2023", views: 120, likes: 45 },
  { id: 2, title: "Database Systems", description: "Design and implementation of a relational database engine from scratch in C++.", category: "CS-202", time: "Spring 2023", views: 98, likes: 32 },
  { id: 3, title: "Operating Systems", description: "Building a simple kernel with process scheduling and memory management.", category: "CS-301", time: "Fall 2022", views: 156, likes: 67 },
  { id: 4, title: "Computer Graphics", description: "Ray tracing engine implementation using OpenGL and C++.", category: "CS-401", time: "Spring 2022", views: 210, likes: 89 },
];

const GRADUATION_DATA = [
  { id: 1, title: "Smart City Infrastructure", description: "IoT platform for monitoring urban traffic and energy consumption using AWS.", category: "Capstone", time: "2023", views: 450, likes: 120 },
  { id: 2, title: "AI-Powered Healthcare", description: "Diagnostic assistant using deep learning for early detection of diseases.", category: "Thesis", time: "2023", views: 380, likes: 95 },
  { id: 3, title: "Blockchain Voting", description: "Secure decentralized voting system on Ethereum network.", category: "Project", time: "2023", views: 310, likes: 78 },
];

const TOYS_DATA = [
  { id: 1, title: "React 3D Visualizer", description: "Interactive 3D physics demo using React Three Fiber.", category: "Experimental", time: "Weekend", views: 890, likes: 230 },
  { id: 2, title: "Retro Game Emulator", description: "Chip-8 emulator written in Rust and compiled to WebAssembly.", category: "Hobby", time: "1 week", views: 560, likes: 140 },
  { id: 3, title: "Generative Art", description: "Algorithmic art generator using p5.js and canvas API.", category: "Art", time: "2 days", views: 420, likes: 110 },
];

export default function ProjectArchivePage({ onNavigate }: ProjectArchivePageProps) {
  const [activeSection, setActiveSection] = useState<Section>('assignments');

  const sections = [
    { id: 'assignments', label: 'Assignments', icon: BookOpen },
    { id: 'graduation', label: 'Graduation Projects', icon: GraduationCap },
    { id: 'toys', label: 'Toy Projects', icon: Gamepad2 },
    { id: 'pdf', label: 'PDF Export', icon: FileDown },
  ];

  const renderContent = () => {
    switch(activeSection) {
      case 'assignments':
        return <ProjectGrid data={ASSIGNMENTS_DATA} type="assignments" onNavigate={onNavigate} badgeColor="bg-[#1CB0F6]" />;
      case 'graduation':
        return <ProjectGrid data={GRADUATION_DATA} type="graduation" onNavigate={onNavigate} badgeColor="bg-[#1CB0F6]" />;
      case 'toys':
        return <ProjectGrid data={TOYS_DATA} type="toys" onNavigate={onNavigate} badgeColor="bg-[#1CB0F6]" />;
      case 'pdf':
        return <PDFExportContent />;
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
              <BookOpen className="w-8 h-8 text-[#1CB0F6]" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 tracking-tight">
              Project Archive
            </h1>
            <p className="text-slate-500 text-xl max-w-2xl font-light">
              학업 과제부터 개인 프로젝트까지,<br/>
              저의 개발 여정을 기록한 아카이브입니다.
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

// Reusable Grid Component matching TrendResearch style
const ProjectGrid = ({ data, type, onNavigate, badgeColor }: { data: any[], type: string, onNavigate: any, badgeColor: string }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {data.map((item) => (
        <div 
          key={item.id}
          onClick={() => onNavigate('project-detail', { id: item.id, type })}
          className="group bg-white rounded-[2rem] p-8 border border-slate-200 cursor-pointer transition-all duration-300 hover:border-[#1CB0F6] hover:shadow-lg hover:-translate-y-1"
        >
          <div className="flex justify-between items-start mb-6">
            <span className={cn("px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-sm", badgeColor)}>
              {item.category}
            </span>
            <div className="flex items-center gap-1.5 text-slate-400 text-sm font-medium bg-slate-50 px-3 py-1 rounded-full">
              <Calendar size={14} />
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
              {item.views}
            </div>
            <div className="flex items-center gap-2 hover:text-pink-500 transition-colors">
              <Heart size={18} />
              {item.likes}
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

// Custom PDF Export Section to fit the new design language
const PDFExportContent = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Full Portfolio */}
        <div className="group bg-white rounded-[2rem] p-8 border border-slate-200 cursor-pointer transition-all duration-300 hover:border-red-500 hover:shadow-lg">
            <div className="flex justify-between items-start mb-6">
                <span className="px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-sm bg-red-500">
                    PDF
                </span>
                <div className="flex items-center gap-1.5 text-slate-400 text-sm font-medium bg-slate-50 px-3 py-1 rounded-full">
                    Latest
                </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2 leading-snug group-hover:text-red-500 transition-colors">
                Full Portfolio
            </h3>
            <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                Includes all projects, assignments, and detailed case studies. Perfect for job applications.
            </p>
            <Button className="w-full bg-slate-900 hover:bg-red-500 text-white rounded-xl py-6 text-lg font-bold transition-colors">
                Download PDF
            </Button>
        </div>

        {/* Resume */}
        <div className="group bg-white rounded-[2rem] p-8 border border-slate-200 cursor-pointer transition-all duration-300 hover:border-blue-500 hover:shadow-lg">
            <div className="flex justify-between items-start mb-6">
                <span className="px-4 py-1.5 rounded-full text-sm font-bold text-white shadow-sm bg-blue-500">
                    One-Page
                </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2 leading-snug group-hover:text-blue-500 transition-colors">
                Resume / CV
            </h3>
            <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                 A concise version of your profile focusing on skills, experience, and education.
            </p>
             <Button variant="outline" className="w-full border-2 border-slate-200 hover:border-blue-500 hover:text-blue-500 rounded-xl py-6 text-lg font-bold transition-colors">
                Download Resume
            </Button>
        </div>

        {/* Custom */}
        <div className="group bg-slate-50 rounded-[2rem] p-8 border-2 border-dashed border-slate-300 cursor-pointer transition-all duration-300 hover:border-indigo-500 hover:bg-indigo-50/30 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <FileDown className="w-8 h-8 text-slate-400 group-hover:text-indigo-500 transition-colors" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Custom Export</h3>
            <p className="text-slate-500 text-lg mb-6">
                Select specific projects to create a tailored PDF.
            </p>
            <span className="text-indigo-500 font-bold text-lg group-hover:underline">Create New Export &rarr;</span>
        </div>
    </div>
  );
};
