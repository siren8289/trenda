import { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, ArrowLeft } from "lucide-react";

interface AIGenerateViewProps {
  onNavigate: (page: string) => void;
}

export function AIGenerateView({ onNavigate }: AIGenerateViewProps) {
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 2000);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFBF7" }}>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 mb-8 text-gray-600"
        >
          <ArrowLeft size={20} />
          홈으로 돌아가기
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Sparkles size={64} className="mx-auto mb-4" style={{ color: "#1CB0F6" }} />
          <h1 className="text-4xl mb-4">AI 디자인 생성</h1>
          <p className="text-xl text-gray-600">AI가 당신의 아이디어를 디자인으로 만들어드립니다</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="mb-6">
            <label className="block text-gray-700 mb-3 text-lg">원하는 디자인을 설명해주세요</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={6}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-[#1CB0F6] focus:outline-none resize-none"
              placeholder="예: 모던하고 미니멀한 스타일의 로그인 페이지를 만들어주세요."
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerate}
            disabled={!prompt || generating}
            className="w-full py-4 rounded-xl text-white text-lg disabled:opacity-50"
            style={{ backgroundColor: "#1CB0F6" }}
          >
            {generating ? "생성 중..." : "AI로 디자인 생성하기"}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
