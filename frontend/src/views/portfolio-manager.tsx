import { PortfolioManagerView } from '../features/portfolio/PortfolioManagerView';
import type { User } from '@/shared/api/types';

interface PortfolioManagerPageProps {
  onNavigate: (page: string) => void;
  user: User;
}

export default function PortfolioManagerPage({ onNavigate, user }: PortfolioManagerPageProps) {
  return <PortfolioManagerView onNavigate={onNavigate} userId={user.id} />;
}
