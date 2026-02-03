import { motion } from "motion/react";
import { 
  BarChart3, Calendar, TrendingUp, Clock, Target, CheckCircle2, 
  Flame, Award, Sparkles, Trophy, Star 
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line
} from "recharts";

export function WeeklyReportView() {
  const selectedWeek = "2024.01.08 - 01.14";
  
  // Activity Data
  const activityData = [
    { day: "Mon", projects: 2, learning: 45, completion: 80 },
    { day: "Tue", projects: 3, learning: 60, completion: 85 },
    { day: "Wed", projects: 2, learning: 30, completion: 90 },
    { day: "Thu", projects: 4, learning: 75, completion: 95 },
    { day: "Fri", projects: 3, learning: 50, completion: 88 },
    { day: "Sat", projects: 1, learning: 20, completion: 70 },
    { day: "Sun", projects: 1, learning: 15, completion: 65 }
  ];

  // Report Cards
  const reportCards = [
    { id: 1, title: "Projects", value: "16", icon: Trophy, color: "#FFD700", bg: "#FFF9E6", change: "+35%" },
    { id: 2, title: "Learning", value: "295m", icon: Clock, color: "#9333EA", bg: "#F3E8FF", change: "+28%" },
    { id: 3, title: "Streak", value: "7 Days", icon: Flame, color: "#F97316", bg: "#FFF7ED", change: "Perfect!" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="text-blue-500" />
            Weekly Report
          </h2>
          <p className="text-gray-500">{selectedWeek}</p>
        </div>
        <button className="text-blue-500 font-medium hover:underline">Download PDF</button>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reportCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-2xl border border-gray-100 shadow-sm"
              style={{ backgroundColor: card.bg }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/50 rounded-xl backdrop-blur-sm">
                  <Icon size={24} style={{ color: card.color }} />
                </div>
                <span className="text-sm font-bold bg-white/50 px-2 py-1 rounded-full text-gray-700">
                  {card.change}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{card.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Activity Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
        >
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <Target size={20} className="text-blue-500" />
            Project Activity
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip 
                cursor={{ fill: '#F3F4F6' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar dataKey="projects" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
        >
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-purple-500" />
            Learning Progress
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip 
                 contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Line 
                type="monotone" 
                dataKey="learning" 
                stroke="#9333EA" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#9333EA', strokeWidth: 2, stroke: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
