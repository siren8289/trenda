import { motion } from "motion/react";
import { Hammer, Map, Briefcase, ArrowRight, Wand2 } from "lucide-react";

interface BuildEntryViewProps {
  onNavigate: (page: string) => void;
}

export function BuildEntryView({ onNavigate }: BuildEntryViewProps) {
  const tools = [
    {
      id: "roadmap",
      title: "Roadmap Generator",
      subtitle: "Career Path",
      description: "나의 목표와 현재 실력을 분석하여 맞춤형 학습 로드맵을 생성합니다.",
      icon: Map,
      color: "text-green-500",
      bg: "bg-green-50",
      path: "roadmap-generator"
    },
    {
      id: "portfolio",
      title: "Portfolio Manager",
      subtitle: "Resource & Career AI",
      description: "프로젝트 리소스를 관리하고 Career AI의 도움을 받아 포트폴리오를 완성하세요.",
      icon: Briefcase,
      color: "text-pink-500",
      bg: "bg-pink-50",
      path: "portfolio-manager"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F0F9FF]">
      <div className="max-w-[1920px] mx-auto px-8 py-24">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-bold text-sm mb-6">
              <Hammer size={16} />
              Build Your Career
            </div>
            <h1 className="text-5xl font-bold mb-6 text-gray-900">
              아이디어를 현실로 만드세요
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              로드맵 설계부터 포트폴리오 완성까지.<br/>
              강력한 도구들이 당신의 프로젝트 여정을 지원합니다.
            </p>
          </motion.div>

          {/* Tool Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-[40px] p-12 shadow-xl border border-gray-100 flex flex-col h-[400px] group cursor-pointer relative overflow-hidden"
                onClick={() => onNavigate(tool.path)}
              >
                <div className={`w-20 h-20 rounded-[28px] ${tool.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                  <tool.icon size={40} className={tool.color} />
                </div>
                
                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                  {tool.title}
                </h3>
                <div className="text-sm font-bold text-gray-400 mb-6 uppercase tracking-wider">
                  {tool.subtitle}
                </div>
                <p className="text-lg text-gray-600 leading-relaxed mb-8 flex-1 max-w-sm">
                  {tool.description}
                </p>

                <div className="flex items-center text-gray-900 text-lg font-bold group-hover:gap-3 transition-all">
                  시작하기 <ArrowRight size={24} className="ml-2" />
                </div>

                {/* Decorative Background */}
                <div className={`absolute -right-12 -bottom-12 opacity-5 group-hover:opacity-10 transition-opacity`}>
                  <tool.icon size={240} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* AI Feature Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-20 relative overflow-hidden bg-gradient-to-r from-gray-900 to-slate-800 rounded-[32px] p-12 text-white shadow-2xl"
          >
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
               <div className="max-w-xl">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
                   <Wand2 size={14} className="text-yellow-400" />
                   <span>Powered by AI</span>
                 </div>
                 <h3 className="text-3xl font-bold mb-4">Career AI가 도와드립니다</h3>
                 <p className="text-gray-300 text-lg leading-relaxed">
                   어떤 프로젝트를 해야 할지 막막하신가요? Career AI가 당신의 목표 직무와 
                   현재 스킬을 분석하여 최적의 프로젝트 주제와 포트폴리오 구조를 제안해드립니다.
                 </p>
               </div>
               <button 
                onClick={() => onNavigate("portfolio-manager")}
                className="shrink-0 px-8 py-4 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg"
               >
                 Career AI 체험하기
               </button>
             </div>
             
             {/* Abstract Background Shapes */}
             <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
