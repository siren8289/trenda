import { AdminReviewView } from '../features/admin/AdminReviewView';

interface AdminReviewPageProps {
  onNavigate: (page: string) => void;
  onLogout?: () => void;
}

export default function AdminReviewPage({ onNavigate, onLogout }: AdminReviewPageProps) {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Fallback if onLogout is not provided, maybe navigate home or something
      onNavigate('home');
    }
  };

  return <AdminReviewView onNavigate={onNavigate} onLogout={handleLogout} />;
}
