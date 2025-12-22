"use client";

import { useState } from "react";
import { Header } from "./src/shared/layout/Header";
import { Footer } from "./src/shared/layout/Footer";

// Pages
import HomePage from "./src/pages/index";
import ExplorePage from "./src/pages/explore";
import CategoryPage from "./src/pages/category";
import PatternPage from "./src/pages/pattern";
import DemoPage from "./src/pages/demo";
import EditorPage from "./src/pages/editor";
import MyDemosPage from "./src/pages/my-demos";
import FavoritesPage from "./src/pages/favorites";
import ProfilePage from "./src/pages/profile";
import LoginPage from "./src/pages/login";
import SignupPage from "./src/pages/signup";
import TrendsPage from "./src/pages/trends";
import TrendDetailPage from "./src/pages/trend-detail";
import CreateTrendPage from "./src/pages/create-trend";
import TrendReportPage from "./src/pages/trend-report";
import TrendFlashPage from "./src/pages/trend-flash";
import CodeFlashPage from "./src/pages/code-flash";
import ProjectArchivePage from "./src/pages/project-archive";
import ProjectDetailPage from "./src/pages/project-detail";
import GameSelectPage from "./src/pages/game-select";
import QuestionTypeSelectPage from "./src/pages/question-type-select";
import GamePlayPage from "./src/pages/game-play";
import GameSummaryPage from "./src/pages/game-summary";
import LevelTestPage from "./src/pages/level-test";
import ResourcesPage from "./src/pages/resources";
import TrendResearchPage from "./src/pages/trend-research";
import CommunityContestPage from "./src/pages/community-contest";
import AdminReviewPage from "./src/pages/admin-review";
import AdminDashboardPage from "./src/pages/admin-dashboard";
import PlayPage from "./src/pages/play";
import BuildPage from "./src/pages/build";
import BuildEntryPage from "./src/pages/build-entry";
import RoadmapGeneratorPage from "./src/pages/roadmap-generator";
import PortfolioManagerPage from "./src/pages/portfolio-manager";
import MyPage from "./src/pages/mypage";
import NotificationsPage from "./src/pages/notifications";
import PremiumPage from "./src/pages/premium";
import AIGeneratePage from "./src/pages/ai-generate";
import ResourceDetailPage from "./src/pages/resource-detail";
import LearningHubPage from "./src/pages/learning-hub";

export default function App() {
  const [currentView, setCurrentView] = useState<string>("login");
  const [viewParams, setViewParams] = useState<any>({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleNavigate = (page: string, params?: any) => {
    setCurrentView(page);
    if (params) {
      setViewParams(params);
    }
  };

  const handleLogin = (asAdmin?: boolean) => {
    setIsLoggedIn(true);
    if (asAdmin) {
      setIsAdmin(true);
      setCurrentView("admin-dashboard");
    } else {
      setCurrentView("home");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCurrentView("login");
  };

  if (!isLoggedIn && (currentView === "login" || currentView === "signup")) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
         {currentView === "login" ? (
           <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />
         ) : (
           <SignupPage onNavigate={handleNavigate} onSignup={() => handleLogin(false)} />
         )}
      </div>
    );
  }

  // Admin Dashboard takes over the full screen (no global header/footer)
  if (isLoggedIn && isAdmin && currentView === "admin-dashboard") {
    return <AdminDashboardPage onNavigate={handleNavigate} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header 
        onNavigate={handleNavigate} 
        isLoggedIn={isLoggedIn} 
        onLogout={handleLogout}
        isAdmin={isAdmin}
      />

      <main className="flex-1">
        {currentView === "home" && <HomePage onNavigate={handleNavigate} />}
        {currentView === "play" && <PlayPage onNavigate={handleNavigate} />}
        {currentView === "build" && <BuildPage onNavigate={handleNavigate} />}
        {currentView === "explore" && <ExplorePage onNavigate={handleNavigate} />}
        {currentView === "category" && <CategoryPage onNavigate={handleNavigate} />}
        {currentView === "pattern" && <PatternPage onNavigate={handleNavigate} />}
        {currentView === "demo" && <DemoPage onNavigate={handleNavigate} />}
        {currentView === "editor" && <EditorPage onNavigate={handleNavigate} />}
        {currentView === "my-demos" && <MyDemosPage onNavigate={handleNavigate} />}
        {currentView === "favorites" && <FavoritesPage onNavigate={handleNavigate} />}
        {currentView === "mypage" && <ProfilePage onNavigate={handleNavigate} />}
        
        {/* Fallback for routes not explicitly in the new list but linked in UI */}
        {currentView === "trends" && <TrendsPage onNavigate={handleNavigate} />}
        {currentView === "project-archive" && <ProjectArchivePage onNavigate={handleNavigate} />}
        {currentView === "project-detail" && <ProjectDetailPage onNavigate={handleNavigate} id={viewParams.id} type={viewParams.type} />}
        {currentView === "game-select" && <GameSelectPage onNavigate={handleNavigate} />}
        {currentView === "question-type-select" && <QuestionTypeSelectPage onNavigate={handleNavigate} gameId={viewParams.gameId} />}
        {currentView === "game-play" && <GamePlayPage onNavigate={handleNavigate} gameId={viewParams.gameId} type={viewParams.type} />}
        {currentView === "game-summary" && <GameSummaryPage onNavigate={handleNavigate} score={viewParams.score} total={viewParams.total} gameId={viewParams.gameId} />}
        {currentView === "level-test" && <LevelTestPage onNavigate={handleNavigate} />}
        {currentView === "resources" && <ResourcesPage onNavigate={handleNavigate} />}
        {currentView === "resource-detail" && <ResourceDetailPage onNavigate={handleNavigate} id={viewParams.id} type={viewParams.type} />}
        {currentView === "trend-research" && <TrendResearchPage onNavigate={handleNavigate} />}
        {currentView === "community-contest" && <CommunityContestPage onNavigate={handleNavigate} />}
        {currentView === "admin-review" && <AdminReviewPage onNavigate={handleNavigate} onLogout={handleLogout} />}
        {currentView === "build-entry" && <BuildEntryPage onNavigate={handleNavigate} />}
        {currentView === "roadmap-generator" && <RoadmapGeneratorPage onNavigate={handleNavigate} />}
        {currentView === "portfolio-manager" && <PortfolioManagerPage onNavigate={handleNavigate} />}
        {currentView === "mypage" && <ProfilePage onNavigate={handleNavigate} />}
        {currentView === "notifications" && <NotificationsPage onNavigate={handleNavigate} />}
        {currentView === "premium" && <PremiumPage onNavigate={handleNavigate} />}
        {currentView === "ai-generate" && <AIGeneratePage onNavigate={handleNavigate} />}
        {currentView === "learning-hub" && <LearningHubPage onNavigate={handleNavigate} />}
        {currentView === "trend-detail" && <TrendDetailPage onNavigate={handleNavigate} id={viewParams.id} type={viewParams.type} />}
        {currentView === "create-trend" && <CreateTrendPage onNavigate={handleNavigate} />}
        {currentView === "trend-report" && <TrendReportPage onNavigate={handleNavigate} />}
        {currentView === "trend-flash" && <TrendFlashPage onNavigate={handleNavigate} />}
        {currentView === "code-flash" && <CodeFlashPage onNavigate={handleNavigate} />}
      </main>

      <Footer />
    </div>
  );
}
