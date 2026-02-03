import { NotificationsView } from '../features/user/NotificationsView';

interface NotificationsPageProps {
  onNavigate: (page: string) => void;
}

export default function NotificationsPage({ onNavigate }: NotificationsPageProps) {
  return <NotificationsView onNavigate={onNavigate} />;
}
