import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { 
  User, LayoutDashboard, BarChart2, TrendingUp, Settings as SettingsIcon 
} from "lucide-react";
import { apiClient } from "@/shared/api/client";
import type { ApiResponse, User as UserModel, PlayRecord, Portfolio, Roadmap } from "@/shared/api/types";
import { DashboardView } from "./DashboardView";
import { WeeklyReportView } from "./WeeklyReportView";
import { SkillProgressView } from "./SkillProgressView";
import { SettingsView } from "./SettingsView";

interface ProfileViewProps {
  onNavigate: (page: string) => void;
  user: UserModel;
}

type Tab = "dashboard" | "report" | "skill" | "settings";

export function ProfileView({ onNavigate, user }: ProfileViewProps) {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [profile, setProfile] = useState<{
    user: UserModel;
    playRecords: PlayRecord[];
    portfolios: Portfolio[];
    roadmaps: Roadmap[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchProfile = async () => {
      if (!user?.id) return;
      setIsLoading(true);
      setError(null);
      try {
        const response = await apiClient.get<
          ApiResponse<{
            user: UserModel;
            playRecords: PlayRecord[];
            portfolios: Portfolio[];
            roadmaps: Roadmap[];
          }>
        >(`/api/profile/${user.id}`);

        if (!cancelled) {
          if (!response.success || !response.data) {
            setError("프로필 정보를 불러오지 못했습니다.");
          } else {
            setProfile(response.data);
          }
        }
      } catch (e) {
        if (!cancelled) {
          setError("프로필 정보를 불러오지 못했습니다.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      cancelled = true;
    };
  }, [user]);

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
                <h1 className="text-2xl font-bold text-gray-900">
                  {profile?.user.displayName ?? user.displayName}
                </h1>
                <p className="text-gray-500 mb-1">{profile?.user.email ?? user.email}</p>
                <p className="text-gray-400 text-xs mb-6">
                  Joined {new Date(profile?.user.createdAt ?? user.createdAt).toLocaleDateString()}
                </p>
                <div className="w-full h-px bg-gray-100 mb-6" />
                <div className="grid grid-cols-2 gap-4 w-full text-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {profile?.playRecords.length ?? 0}
                    </p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Games Played
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {(profile?.roadmaps.length ?? 0) + (profile?.portfolios.length ?? 0)}
                    </p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Build Items
                    </p>
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
            {isLoading && (
              <p className="text-sm text-gray-500 mb-4">프로필을 불러오는 중입니다...</p>
            )}
            {error && (
              <p className="text-sm text-red-500 mb-4">{error}</p>
            )}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "dashboard" && (
                <DashboardView
                  onNavigate={onNavigate}
                  playRecords={profile?.playRecords ?? []}
                  portfolios={profile?.portfolios ?? []}
                  roadmaps={profile?.roadmaps ?? []}
                />
              )}
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
