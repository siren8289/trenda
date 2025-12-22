import { motion } from "motion/react";
import { Zap, Code, Palette, GraduationCap, ArrowRight } from "lucide-react";

interface GameSelectViewProps {
  onNavigate: (page: string, params?: any) => void;
}

const games = [
  {
    id: "trend-flash",
    title: "TrendFlash",
    description: "최신 테크 & 디자인 트렌드를 빠르게 학습하세요",
    icon: Zap,
    color: "#1CB0F6",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  {
    id: "code-flash",
    title: "CodeFlash",
    description: "코드 스니펫을 보고 버그를 찾거나 결과를 예측하세요",
    icon: Code,
    color: "#10B981",
    bgColor: "bg-green-50",
    borderColor: "border-green-200"
  },
  {
    id: "design-flash",
    title: "DesignFlash",
    description: "올바른 UI/UX 디자인 원칙을 선택하세요",
    icon: Palette,
    color: "#F59E0B",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200"
  },
  {
    id: "level-test",
    title: "Level Test",
    description: "나의 현재 실력을 종합적으로 진단해보세요",
    icon: GraduationCap,
    color: "#8B5CF6",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200"
  }
];

export function GameSelectView({ onNavigate }: GameSelectViewProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFBF7" }}>
      <div className="max-w-[1920px] mx-auto px-8 py-24">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-6">Play & Learn</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              게임을 통해 즐겁게 학습하고 실력을 키워보세요.
              <br />
              트렌드, 코딩, 디자인 감각을 테스트할 수 있습니다.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {games.map((game, index) => {
              const Icon = game.icon;
              return (
                <motion.button
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                      if (game.id === 'trend-flash') {
                          onNavigate('trend-flash');
                      } else if (game.id === 'code-flash') {
                          onNavigate('code-flash');
                      } else if (game.id === 'level-test') {
                          onNavigate('level-test');
                      } else {
                          // Fallback for others or direct navigation
                          onNavigate("question-type-select", { gameId: game.id });
                      }
                  }}
                  className={`relative overflow-hidden p-8 rounded-3xl border-2 text-left transition-all shadow-lg hover:shadow-xl ${game.bgColor} ${game.borderColor}`}
                >
                  <div className="flex items-start justify-between mb-8">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white shadow-sm"
                    >
                      <Icon size={32} style={{ color: game.color }} />
                    </div>
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center bg-white/50 group-hover:bg-white transition-colors"
                    >
                      <ArrowRight size={24} style={{ color: game.color }} />
                    </div>
                  </div>

                  <h3 className="text-3xl font-bold mb-3 text-gray-900">
                    {game.title}
                  </h3>
                  <p className="text-lg text-gray-600 font-medium">
                    {game.description}
                  </p>
                  
                  {/* Decorative Background Icon */}
                  <Icon 
                    className="absolute -bottom-8 -right-8 w-64 h-64 opacity-5 pointer-events-none" 
                    style={{ color: game.color }} 
                  />
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
