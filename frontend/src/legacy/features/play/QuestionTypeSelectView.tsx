import { motion } from "motion/react";
import { CheckSquare, ListChecks, ArrowLeft, ToggleLeft } from "lucide-react";

interface QuestionTypeSelectViewProps {
  gameId: string;
  onNavigate: (page: string, params?: any) => void;
}

const questionTypes = [
  {
    id: "single",
    title: "객관식 (Single Choice)",
    description: "4개의 보기 중 정답 하나를 선택하세요",
    icon: CheckSquare,
    color: "#3B82F6",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  {
    id: "multiple",
    title: "객관식 (Multiple Choice)",
    description: "여러 개의 정답을 모두 찾아보세요",
    icon: ListChecks,
    color: "#8B5CF6",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200"
  },
  {
    id: "ox",
    title: "OX 퀴즈",
    description: "맞으면 O, 틀리면 X를 선택하세요",
    icon: ToggleLeft,
    color: "#10B981",
    bgColor: "bg-green-50",
    borderColor: "border-green-200"
  }
];

export function QuestionTypeSelectView({ gameId, onNavigate }: QuestionTypeSelectViewProps) {
  const getGameTitle = (id: string) => {
    switch(id) {
      case "trend-flash": return "TrendFlash";
      case "code-flash": return "CodeFlash";
      case "design-flash": return "DesignFlash";
      case "level-test": return "Level Test";
      default: return "Game";
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFBF7" }}>
      <div className="max-w-[1920px] mx-auto px-8 py-16">
        <div className="max-w-[1000px] mx-auto">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => onNavigate('game-select')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-12"
          >
            <ArrowLeft size={20} />
            <span>게임 선택으로 돌아가기</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-gray-100 text-gray-600 font-bold mb-4">
              {getGameTitle(gameId)}
            </span>
            <h1 className="text-4xl font-bold mb-4">문제 유형을 선택하세요</h1>
            <p className="text-xl text-gray-600">
              원하는 방식으로 문제를 풀어보세요
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {questionTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <motion.button
                  key={type.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate("game-play", { gameId, type: type.id })}
                  className={`p-8 rounded-2xl border-2 text-left transition-all shadow-lg hover:shadow-xl h-full flex flex-col ${type.bgColor} ${type.borderColor}`}
                >
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center bg-white shadow-sm mb-6"
                  >
                    <Icon size={28} style={{ color: type.color }} />
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {type.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {type.description}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
