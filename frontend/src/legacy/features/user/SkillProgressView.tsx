import { motion } from "motion/react";
import { Code, Database, Palette, Brain, Layers, Server } from "lucide-react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from "recharts";

export function SkillProgressView() {
  const radarData = [
    { subject: 'Frontend', A: 85, fullMark: 100 },
    { subject: 'Backend', A: 65, fullMark: 100 },
    { subject: 'Design', A: 90, fullMark: 100 },
    { subject: 'DevOps', A: 45, fullMark: 100 },
    { subject: 'CS', A: 70, fullMark: 100 },
    { subject: 'Soft Skill', A: 80, fullMark: 100 },
  ];

  const skillCategories = [
    {
      title: "Frontend",
      icon: Code,
      color: "#3B82F6",
      skills: [
        { name: "React", level: 85 },
        { name: "TypeScript", level: 78 },
        { name: "Tailwind CSS", level: 92 },
      ]
    },
    {
      title: "Backend",
      icon: Server,
      color: "#10B981",
      skills: [
        { name: "Node.js", level: 65 },
        { name: "PostgreSQL", level: 60 },
        { name: "API Design", level: 70 },
      ]
    },
    {
      title: "Design",
      icon: Palette,
      color: "#EC4899",
      skills: [
        { name: "UI Design", level: 90 },
        { name: "UX Research", level: 85 },
        { name: "Figma", level: 88 },
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Overview Chart */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
        <h2 className="text-xl font-bold mb-2 w-full text-left flex items-center gap-2">
          <Brain className="text-purple-500" size={24} />
          Skill Radar
        </h2>
        <div className="w-full h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#E5E7EB" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#4B5563', fontSize: 14 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name="My Skill"
                dataKey="A"
                stroke="#3B82F6"
                strokeWidth={3}
                fill="#3B82F6"
                fillOpacity={0.2}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skillCategories.map((category, idx) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${category.color}20` }}
                >
                  <Icon size={20} style={{ color: category.color }} />
                </div>
                <h3 className="font-bold text-lg">{category.title}</h3>
              </div>
              
              <div className="space-y-6">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="font-medium text-gray-700">{skill.name}</span>
                      <span className="font-bold text-gray-900">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
