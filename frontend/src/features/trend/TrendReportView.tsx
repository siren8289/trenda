import { motion } from "motion/react";
import { FileText, TrendingUp, Download, Share2, ArrowLeft } from "lucide-react";

interface TrendReportViewProps {
  onNavigate: (page: string) => void;
}

export function TrendReportView({ onNavigate }: TrendReportViewProps) {
  const reportData = [
    { category: "AI 디자인", trend: "+45%", color: "#1CB0F6" },
    { category: "3D UI", trend: "+32%", color: "#10B981" },
    { category: "다크모드", trend: "+28%", color: "#8B5CF6" },
    { category: "미니멀리즘", trend: "+15%", color: "#F59E0B" }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFBF7" }}>
      <div style={{ backgroundColor: "#1CB0F6" }} className="text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
             <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('trends')}
              className="flex items-center gap-2 mb-8 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              뒤로 가기
            </motion.button>
            <div className="flex items-center gap-3 mb-4">
              <FileText size={40} />
              <h1 className="text-4xl">트렌드 리포트</h1>
            </div>
            <p className="text-xl opacity-90">2024년 1월 디자인 트렌드 분석 리포트</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl">주요 트렌드 성장률</h2>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="p-3 bg-gray-100 rounded-xl"
              >
                <Download size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="p-3 bg-gray-100 rounded-xl"
              >
                <Share2 size={20} />
              </motion.button>
            </div>
          </div>

          <div className="space-y-6">
            {reportData.map((item, index) => (
              <motion.div
                key={item.category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg">{item.category}</span>
                  <div className="flex items-center gap-2">
                    <TrendingUp size={20} style={{ color: item.color }} />
                    <span className="text-xl" style={{ color: item.color }}>
                      {item.trend}
                    </span>
                  </div>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: item.trend }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h3 className="text-xl mb-4">리포트 요약</h3>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">
              2024년 1월, 디자인 업계에서는 AI 기반 디자인 도구의 활용이 급증하며 
              전체 트렌드 검색량의 45% 이상 증가했습니다.
            </p>
            <p className="mb-4">
              3D UI와 입체적 인터페이스 디자인이 32% 성장하며 차세대 웹 경험의 
              주요 트렌드로 자리잡았습니다.
            </p>
            <p>
              다크모드는 여전히 강세를 보이며, 접근성을 고려한 디자인 시스템 구축에 
              대한 관심도 함께 증가하고 있습니다.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
