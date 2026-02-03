import { motion } from "motion/react";
import { BookOpen } from "lucide-react";

interface LearningHubViewProps {
  onNavigate: (page: string) => void;
}

export function LearningHubView({ onNavigate }: LearningHubViewProps) {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FFFBF7" }}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
        <BookOpen size={64} className="mx-auto mb-4" style={{ color: "#1CB0F6" }} />
        <h1 className="text-4xl mb-4">러닝 허브</h1>
        <p className="text-xl text-gray-600">디자인 학습 콘텐츠</p>
      </motion.div>
    </div>
  );
}
