import { useState } from "react";
import { motion } from "motion/react";
import { 
  User, LayoutDashboard, BarChart2, TrendingUp, Settings as SettingsIcon 
} from "lucide-react";
import { DashboardView } from "./DashboardView";
import { WeeklyReportView } from "./WeeklyReportView";
import { SkillProgressView } from "./SkillProgressView";
import { SettingsView } from "./SettingsView";

interface ProfileViewProps {
  onNavigate: (page: string) => void;
}

type Tab = "dashboard" | "report" | "skill" | "settings";

export function ProfileView({ onNavigate }: ProfileViewProps) {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "report", label: "Weekly Report", icon: BarChart2 },
    { id: "skill", label: "Skill Progress", icon: TrendingUp },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

  return (
    <div className="min-h-screen bg-[#FFFBF7] py-12 px-6">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4 text-blue-500">
                  <User size={40} />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Kim Designer</h1>
                <p className="text-gray-500 mb-6">UI/UX Designer</p>
                <div className="w-full h-px bg-gray-100 mb-6" />
                <div className="grid grid-cols-2 gap-4 w-full text-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">42</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Level</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">12.8k</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">XP</p>
                  </div>
                </div>
              </div>
            </div>

            <nav className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as Tab)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive 
                        ? "bg-blue-50 text-blue-600 font-bold" 
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={20} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "dashboard" && <DashboardView onNavigate={onNavigate} />}
              {activeTab === "report" && <WeeklyReportView />}
              {activeTab === "skill" && <SkillProgressView />}
              {activeTab === "settings" && <SettingsView onNavigate={onNavigate} />}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
