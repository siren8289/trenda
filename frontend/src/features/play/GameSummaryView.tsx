import { motion } from "motion/react";
import { Trophy, Star, ArrowRight, RotateCcw, Home } from "lucide-react";
import { useState, useEffect } from "react";

interface GameSummaryViewProps {
  score: number;
  total: number;
  gameId: string;
  onNavigate: (page: string, params?: any) => void;
  onRestart: () => void;
}

export function GameSummaryView({ score, total, gameId, onNavigate, onRestart }: GameSummaryViewProps) {
  const [skillPoints, setSkillPoints] = useState(0);

  useEffect(() => {
    // Score-based skill point calculation
    const points = Math.round((score / total) * 100);
    setSkillPoints(points);
  }, [score, total]);

  const getGameTitle = (id: string) => {
    switch (id) {
      case "trend-flash": return "TrendFlash";
      case "code-flash": return "CodeFlash";
      case "design-flash": return "DesignFlash";
      case "level-test": return "Level Test";
      default: return "Game";
    }
  };

  const getSkillTag = (id: string) => {
    switch (id) {
      case "trend-flash": return "Trend Research";
      case "code-flash": return "Coding Logic";
      case "design-flash": return "UI/UX Design";
      case "level-test": return "General Ability";
      default: return "Skill";
    }
  };

  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: "#FFFBF7" }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-32 h-32 mx-auto mb-8 rounded-full flex items-center justify-center bg-yellow-50 border-4 border-yellow-200"
        >
          <Trophy size={64} className="text-yellow-500" />
        </motion.div>

        <h1 className="text-4xl font-bold mb-2">Game Over!</h1>
        <p className="text-xl text-gray-600 mb-8">
          <span className="font-bold text-[#1CB0F6]">{getGameTitle(gameId)}</span> 완료
        </p>

        {/* Score Section */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-8">
          <div className="flex justify-center items-end gap-2 mb-2">
            <span className="text-6xl font-bold text-gray-900">{score}</span>
            <span className="text-2xl text-gray-500 mb-2">/ {total}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ delay: 0.5, duration: 1 }}
              className="bg-[#1CB0F6] h-full rounded-full"
            />
          </div>
          <p className="text-gray-500">정답률 {percentage}%</p>
        </div>

        {/* Skill Tag Update */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-4 mb-12 p-4 bg-purple-50 rounded-xl border border-purple-100"
        >
          <Star className="text-purple-500" fill="currentColor" />
          <div className="text-left">
            <p className="text-sm text-purple-600 font-bold uppercase tracking-wider">Skill Updated</p>
            <p className="font-bold text-purple-900">
              {getSkillTag(gameId)} <span className="text-purple-600">+{skillPoints} XP</span>
            </p>
          </div>
        </motion.div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={onRestart}
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all font-bold text-gray-700"
          >
            <RotateCcw size={20} />
            다시 하기
          </button>
          <button
            onClick={() => onNavigate("game-select")}
            className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-[#1CB0F6] text-white hover:bg-[#1CB0F6]/90 transition-all font-bold shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <Home size={20} />
            게임 목록으로
          </button>
        </div>
        
        {/* Next Recommendation */}
        <div className="mt-8 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-500 mb-4">다음 추천 게임</p>
          <button
             onClick={() => onNavigate("question-type-select", { gameId: "level-test" })}
             className="w-full p-4 bg-white border border-gray-200 rounded-xl flex items-center justify-between hover:border-[#1CB0F6] hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-[#1CB0F6]">
                <Star size={20} />
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-900">Level Test</p>
                <p className="text-xs text-gray-500">실력을 검증해보세요</p>
              </div>
            </div>
            <ArrowRight className="text-gray-300 group-hover:text-[#1CB0F6] transition-colors" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
