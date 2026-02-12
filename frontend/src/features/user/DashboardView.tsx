import { motion } from "motion/react";
import {
  Trophy, Zap, Target, Layout, CheckCircle2,
  ArrowRight, BookOpen,
} from "lucide-react";
import type { PlayRecord, Portfolio, Roadmap } from "@/shared/api/types";

const GAME_COLORS: Record<string, string> = {
  "trend-flash": "#F59E0B",
  "code-flash": "#10B981",
  "level-test": "#3B82F6",
};

function gameDisplayName(gameId: number | string): string {
  const s = String(gameId).toLowerCase();
  if (s.includes("trend") || s === "1") return "TrendFlash";
  if (s.includes("code") || s === "2") return "CodeFlash";
  if (s.includes("level") || s === "3") return "Level Test";
  return `퀴즈 #${gameId}`;
}

interface DashboardViewProps {
  onNavigate: (page: string) => void;
  playRecords?: PlayRecord[];
  portfolios?: Portfolio[];
  roadmaps?: Roadmap[];
}

export function DashboardView({
  onNavigate,
  playRecords = [],
  portfolios = [],
  roadmaps = [],
}: DashboardViewProps) {
  const hasPlay = playRecords.length > 0;
  const hasBuild = portfolios.length > 0 || roadmaps.length > 0;
  const totalBuild = portfolios.length + roadmaps.length;
  const recentPortfolio = portfolios.length > 0
    ? portfolios.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
    : null;
  const recentRoadmap = roadmaps.length > 0
    ? roadmaps.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]
    : null;
  const recentBuild = recentPortfolio ?? recentRoadmap;
  const recentBuildDate = recentBuild
    ? new Date(recentBuild.createdAt).toLocaleDateString("ko-KR", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    : "";

  return (
    <div className="space-y-8">
      {/* Play Summary — 퀴즈를 풀었을 때만 표시 */}
      <section>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Zap className="text-yellow-500" size={24} />
          Play Summary
        </h2>
        {!hasPlay ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-500">
            <Trophy className="mx-auto mb-3 text-gray-300" size={40} />
            <p className="font-medium">아직 퀴즈 기록이 없어요</p>
            <p className="text-sm mt-1">플레이 메뉴에서 퀴즈를 풀면 여기에 기록이 쌓여요.</p>
            <button
              type="button"
              onClick={() => onNavigate("play")}
              className="mt-4 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
            >
              퀴즈 풀러 가기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {playRecords.slice(0, 6).map((record, idx) => {
              const name = gameDisplayName(record.gameId);
              const color = GAME_COLORS[String(record.gameId).toLowerCase()] ?? "#6B7280";
              const total = 1000;
              return (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-gray-700">{name}</h3>
                    <Trophy size={20} style={{ color }} />
                  </div>
                  <div className="text-3xl font-bold mb-2">
                    {record.score}
                    <span className="text-sm text-gray-400 font-normal ml-1">
                      / {total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min(100, (record.score / total) * 100)}%`,
                        backgroundColor: color,
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Build Summary — 포트폴리오/로드맵 넣었을 때만 표시 */}
      <section>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Layout className="text-blue-500" size={24} />
          Build Summary
        </h2>
        {!hasBuild ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-500">
            <Layout className="mx-auto mb-3 text-gray-300" size={40} />
            <p className="font-medium">아직 포트폴리오·로드맵이 없어요</p>
            <p className="text-sm mt-1">포트폴리오를 추가하거나 로드맵을 만들면 여기에 표시돼요.</p>
            <button
              type="button"
              onClick={() => onNavigate("portfolio-manager")}
              className="mt-4 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
            >
              포트폴리오 관리
            </button>
            <button
              type="button"
              onClick={() => onNavigate("roadmap-generator")}
              className="mt-2 ml-2 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
            >
              로드맵 만들기
            </button>
          </div>
        ) : (
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
                  <p className="opacity-90">Total</p>
                  <h3 className="text-4xl font-bold">{totalBuild}</h3>
                  <p className="text-sm opacity-80">포트폴리오 + 로드맵</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm opacity-80">포트폴리오</p>
                  <p className="text-xl font-bold">{portfolios.length}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm opacity-80">로드맵</p>
                  <p className="text-xl font-bold">{roadmaps.length}</p>
                </div>
              </div>
            </motion.div>

            {recentBuild && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
              >
                <h3 className="text-gray-500 mb-6">최근 활동</h3>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">
                      {"title" in recentBuild ? recentBuild.title : ""}
                    </h4>
                    <p className="text-gray-500 text-sm mb-4">{recentBuildDate}</p>
                    <button
                      type="button"
                      onClick={() => onNavigate("portfolio-manager")}
                      className="text-blue-500 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      자세히 보기 <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </section>

      {/* Recommendation — 데이터 있을 때만 간단 안내 */}
      <section>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Target className="text-red-500" size={24} />
          Recommended for You
        </h2>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          {!hasPlay && !hasBuild ? (
            <p className="text-gray-500 text-center py-4">
              퀴즈를 풀거나 포트폴리오를 추가하면 맞춤 추천이 여기에 표시돼요.
            </p>
          ) : (
            <div className="space-y-4">
              {!hasPlay && (
                <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-amber-100 text-amber-600">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">퀴즈로 실력 쌓기</h4>
                      <span className="text-xs text-gray-500">Play</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate("play")}
                    className="px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                  >
                    시작하기
                  </button>
                </div>
              )}
              {!hasBuild && (
                <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-100 text-blue-600">
                      <Layout size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">포트폴리오·로드맵 작성</h4>
                      <span className="text-xs text-gray-500">Build</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate("portfolio-manager")}
                    className="px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                  >
                    시작하기
                  </button>
                </div>
              )}
              {hasPlay && hasBuild && (
                <p className="text-gray-500 text-center py-2 text-sm">
                  잘하고 있어요! 계속 퀴즈와 포트폴리오를 쌓아보세요.
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
