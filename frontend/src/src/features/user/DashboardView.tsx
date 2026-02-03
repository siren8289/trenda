import { motion } from "motion/react";
import { 
  Trophy, Star, Zap, Target, TrendingUp, Layout, CheckCircle2, 
  ArrowRight, BookOpen, Activity 
} from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

interface DashboardViewProps {
  onNavigate: (page: string) => void;
}

export function DashboardView({ onNavigate }: DashboardViewProps) {
  const playStats = [
    { name: "TrendFlash", score: 850, total: 1000, color: "#F59E0B" },
    { name: "CodeFlash", score: 620, total: 1000, color: "#10B981" },
    { name: "Level Test", score: 92, total: 100, color: "#3B82F6" },
  ];

  const buildStats = {
    totalProjects: 12,
    completed: 8,
    inProgress: 4,
    recentBuild: "E-Commerce Dashboard"
  };

  const recommendations = [
    {
      id: 1,
      type: "course",
      title: "Advanced React Patterns",
      category: "Frontend",
      color: "#3B82F6"
    },
    {
      id: 2,
      type: "challenge",
      title: "Redesign Instagram UI",
      category: "Design",
      color: "#EC4899"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Play Summary */}
      <section>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Zap className="text-yellow-500" size={24} />
          Play Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {playStats.map((stat, idx) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-gray-700">{stat.name}</h3>
                <Trophy size={20} style={{ color: stat.color }} />
              </div>
              <div className="text-3xl font-bold mb-2">
                {stat.score}
                <span className="text-sm text-gray-400 font-normal ml-1">
                  / {stat.total}
                </span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full"
                  style={{ 
                    width: `${(stat.score / stat.total) * 100}%`,
                    backgroundColor: stat.color 
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Build Summary */}
      <section>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Layout className="text-blue-500" size={24} />
          Build Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 text-white"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white/20 rounded-xl">
                <Layout size={32} />
              </div>
              <div>
                <p className="opacity-90">Total Projects</p>
                <h3 className="text-4xl font-bold">{buildStats.totalProjects}</h3>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-sm opacity-80">Completed</p>
                <p className="text-xl font-bold">{buildStats.completed}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-sm opacity-80">In Progress</p>
                <p className="text-xl font-bold">{buildStats.inProgress}</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
          >
            <h3 className="text-gray-500 mb-6">Recent Activity</h3>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">{buildStats.recentBuild}</h4>
                <p className="text-gray-500 text-sm mb-4">Updated 2 hours ago</p>
                <button 
                  onClick={() => onNavigate('project-archive')}
                  className="text-blue-500 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all"
                >
                  View Details <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recommendation Snapshot */}
      <section>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Target className="text-red-500" size={24} />
          Recommended for You
        </h2>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="space-y-4">
            {recommendations.map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${item.color}20`, color: item.color }}
                  >
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{item.title}</h4>
                    <span className="text-xs text-gray-500 uppercase tracking-wider">{item.category}</span>
                  </div>
                </div>
                <button className="px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                  Start
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
