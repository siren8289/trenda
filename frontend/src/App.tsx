import { useState } from "react";
import { Header } from "./shared/layout/Header";
import { Footer } from "./shared/layout/Footer";

// Pages
import HomePage from "./views/index";
import ExplorePage from "./views/explore";
import CategoryPage from "./views/category";
import PatternPage from "./views/pattern";
import DemoPage from "./views/demo";
import EditorPage from "./views/editor";
import MyDemosPage from "./views/my-demos";
import FavoritesPage from "./views/favorites";
import ProfilePage from "./views/profile";
import LoginPage from "./views/login";
import SignupPage from "./views/signup";
import TrendsPage from "./views/trends";
import TrendDetailPage from "./views/trend-detail";
import CreateTrendPage from "./views/create-trend";
import TrendReportPage from "./views/trend-report";
import TrendFlashPage from "./views/trend-flash";
import CodeFlashPage from "./views/code-flash";
import ProjectArchivePage from "./views/project-archive";
import ProjectDetailPage from "./views/project-detail";
import GameSelectPage from "./views/game-select";
import QuestionTypeSelectPage from "./views/question-type-select";
import GamePlayPage from "./views/game-play";
import GameSummaryPage from "./views/game-summary";
import LevelTestPage from "./views/level-test";
import ResourcesPage from "./views/resources";
import TrendResearchPage from "./views/trend-research";
import CommunityContestPage from "./views/community-contest";
import AdminReviewPage from "./views/admin-review";
import AdminDashboardPage from "./views/admin-dashboard";
import PlayPage from "./views/play";
import BuildPage from "./views/build";
import BuildEntryPage from "./views/build-entry";
import RoadmapGeneratorPage from "./views/roadmap-generator";
import PortfolioManagerPage from "./views/portfolio-manager";
import MyPage from "./views/mypage";
import NotificationsPage from "./views/notifications";
import PremiumPage from "./views/premium";
import AIGeneratePage from "./views/ai-generate";
import ResourceDetailPage from "./views/resource-detail";
import LearningHubPage from "./views/learning-hub";

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
