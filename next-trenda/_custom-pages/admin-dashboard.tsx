import { AdminDashboardView } from '../features/admin/AdminDashboardView';

interface AdminDashboardPageProps {
  onNavigate: (page: string) => void;
  onLogout?: () => void;
}

export default function AdminDashboardPage({ onNavigate, onLogout }: AdminDashboardPageProps) {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      onNavigate('home');
    }
  };

  return <AdminDashboardView onNavigate={onNavigate} onLogout={handleLogout} />;
}