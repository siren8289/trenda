import { motion } from "motion/react";
import { Gamepad2, Code2, Zap, Trophy, BrainCircuit, ArrowRight, Dna } from "lucide-react";

interface PlayEntryViewProps {
  onNavigate: (page: string) => void;
}

export function PlayEntryView({ onNavigate }: PlayEntryViewProps) {
  const games = [
    {
      id: "trend-flash",
      title: "TrendFlash",
      subtitle: "Trend Card Game",
      description: "최신 기술 트렌드를 카드로 빠르게 학습하고 기억하세요.",
      icon: Zap,
      color: "text-yellow-500",
      bg: "bg-yellow-50",
      path: "trend-flash"
    },
    {
      id: "code-flash",
      title: "CodeFlash",
      subtitle: "Code Snippet Game",
      description: "코드 스니펫을 보고 버그를 찾거나 결과를 예측해보세요.",
      icon: Code2,
      color: "text-blue-500",
      bg: "bg-blue-50",
      path: "code-flash"
    },
    {
      id: "level-test",
      title: "Level Test",
      subtitle: "Skill Diagnosis",
      description: "현재 나의 개발 실력을 진단하고 맞춤형 로드맵을 받아보세요.",
      icon: BrainCircuit,
      color: "text-purple-500",
      bg: "bg-purple-50",
      path: "level-test"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFFBF7]">
      <div className="max-w-[1920px] mx-auto px-8 py-24">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-full font-bold text-sm mb-6">
              <Gamepad2 size={16} />
              Play & Learn
            </div>
            <h1 className="text-5xl font-bold mb-6 text-gray-900">
              게임을 통해 즐겁게 성장하세요
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              지루한 학습은 그만! 다양한 미니게임을 통해<br/>
              자연스럽게 지식을 습득하고 실력을 검증할 수 있습니다.
            </p>
          </motion.div>

          {/* Game Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-[32px] p-8 shadow-xl border border-gray-100 flex flex-col h-full group cursor-pointer relative overflow-hidden"
                onClick={() => onNavigate(game.path)}
              >
                <div className={`w-16 h-16 rounded-2xl ${game.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <game.icon size={32} className={game.color} />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {game.title}
                </h3>
                <div className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">
                  {game.subtitle}
                </div>
                <p className="text-gray-600 leading-relaxed mb-8 flex-1">
                  {game.description}
                </p>

                <div className="flex items-center text-gray-900 font-bold group-hover:gap-2 transition-all">
                  플레이하기 <ArrowRight size={20} className="ml-2" />
                </div>

                {/* Decorative Background */}
                <div className={`absolute -right-8 -bottom-8 opacity-5 group-hover:opacity-10 transition-opacity`}>
                  <game.icon size={180} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats / Achievement Teaser (Optional) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-20 bg-white rounded-[32px] p-10 shadow-lg border border-gray-100 flex items-center justify-between"
          >
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white shadow-lg">
                <Trophy size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">나의 게임 기록</h3>
                <p className="text-gray-500">
                  지금까지 획득한 점수와 뱃지를 확인해보세요.
                </p>
              </div>
            </div>
            <button 
              onClick={() => onNavigate("game-summary")} // Assuming summary or profile
              className="px-8 py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
            >
              기록 보기
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
