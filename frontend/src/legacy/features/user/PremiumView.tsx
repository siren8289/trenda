import { motion } from "motion/react";
import { Crown } from "lucide-react";

interface PremiumViewProps {
  onNavigate: (page: string) => void;
}

export function PremiumView({ onNavigate }: PremiumViewProps) {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#FFFBF7" }}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
        <Crown size={64} className="mx-auto mb-4" style={{ color: "#FFD700" }} />
        <h1 className="text-4xl mb-4">프리미엄</h1>
        <p className="text-xl text-gray-600">프리미엄 기능을 이용하세요</p>
      </motion.div>
    </div>
  );
}
