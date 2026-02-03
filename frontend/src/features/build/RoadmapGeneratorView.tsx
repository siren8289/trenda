import { motion } from "motion/react";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Circle, Target, BookOpen, Gamepad2, Code, Save, Share2 } from "lucide-react";

interface RoadmapGeneratorViewProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const mockRoadmap = [
  {
    stage: 1,
    title: "기초 다지기",
    status: "completed",
    items: [
      { type: "learn", text: "React 기초 문법 학습", completed: true },
      { type: "game", text: "CodeFlash Lv.1 클리어", completed: true }
    ]
  },
  {
    stage: 2,
    title: "심화 학습",
    status: "in-progress",
    items: [
      { type: "learn", text: "React Hooks 마스터하기", completed: false },
      { type: "game", text: "TrendFlash: 2024 Tech Trends", completed: false },
      { type: "project", text: "미니 프로젝트: 투두 리스트", completed: false }
    ]
  },
  {
    stage: 3,
    title: "실전 프로젝트",
    status: "locked",
    items: [
      { type: "learn", text: "상태 관리 (Redux/Zustand)", completed: false },
      { type: "project", text: "커머스 대시보드 만들기", completed: false }
    ]
  }
];

export function RoadmapGeneratorView({ onBack, onNavigate }: RoadmapGeneratorViewProps) {
  const [activeStep, setActiveStep] = useState(2);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "learn": return <BookOpen size={16} className="text-blue-500" />;
      case "game": return <Gamepad2 size={16} className="text-purple-500" />;
      case "project": return <Code size={16} className="text-green-500" />;
      default: return <Circle size={16} />;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFBF7" }}>
      <div className="max-w-[1920px] mx-auto px-8 py-16">
        <div className="max-w-[1000px] mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
            >
              <ArrowLeft size={20} />
              돌아가기
            </button>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-white border border-gray-200 rounded-xl text-gray-600 font-bold hover:bg-gray-50 flex items-center gap-2">
                <Share2 size={18} />
                공유
              </button>
              <button className="px-6 py-3 bg-[#1CB0F6] text-white rounded-xl font-bold hover:bg-[#1CB0F6]/90 flex items-center gap-2 shadow-lg">
                <Save size={18} />
                저장하기
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full font-bold text-sm mb-4">
              <Target size={16} />
              맞춤형 학습 플랜
            </div>
            <h1 className="text-4xl font-bold mb-4">My Career Roadmap</h1>
            <p className="text-xl text-gray-600">
              현재 실력과 목표를 분석하여 최적의 학습 경로를 제안합니다.
            </p>
          </motion.div>

          {/* Roadmap Visualization */}
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute left-[27px] top-8 bottom-8 w-1 bg-gray-200 rounded-full" />

            <div className="space-y-12">
              {mockRoadmap.map((stage, index) => (
                <motion.div
                  key={stage.stage}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative flex gap-8"
                >
                  {/* Status Circle */}
                  <div className={`
                    relative z-10 w-14 h-14 rounded-full border-4 flex items-center justify-center bg-white flex-shrink-0
                    ${stage.status === 'completed' ? 'border-green-500 text-green-500' : 
                      stage.status === 'in-progress' ? 'border-blue-500 text-blue-500' : 'border-gray-200 text-gray-300'}
                  `}>
                    {stage.status === 'completed' ? <CheckCircle2 size={24} /> : 
                     stage.status === 'in-progress' ? <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse" /> : 
                     <span className="font-bold text-lg">{stage.stage}</span>}
                  </div>

                  {/* Content Card */}
                  <div className={`flex-1 rounded-2xl p-8 border-2 transition-all ${
                    stage.status === 'locked' ? 'bg-gray-50 border-gray-100 opacity-70' : 'bg-white border-gray-100 shadow-lg'
                  }`}>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{stage.title}</h3>
                        <p className="text-sm text-gray-500">Step {stage.stage}</p>
                      </div>
                      {stage.status === 'in-progress' && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-xs font-bold">진행중</span>
                      )}
                    </div>

                    <div className="space-y-4">
                      {stage.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            {getIcon(item.type)}
                          </div>
                          <span className={`flex-1 font-medium ${item.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                            {item.text}
                          </span>
                          {item.completed && <CheckCircle2 size={20} className="text-green-500" />}
                          {!item.completed && stage.status !== 'locked' && (
                            <button 
                              onClick={() => {
                                if (item.type === 'game') onNavigate('game-select');
                              }}
                              className="px-4 py-2 bg-white text-sm font-bold border border-gray-200 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-all"
                            >
                              시작
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center">
             <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all flex items-center gap-2 mx-auto"
             >
               {isGenerating ? (
                 <>
                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                   AI가 로드맵을 최적화하는 중...
                 </>
               ) : (
                 <>
                   <Target size={20} />
                   새로운 목표로 로드맵 재생성
                 </>
               )}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
