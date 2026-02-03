import { ProfileView } from '../features/user/ProfileView';
import type { User } from '@/shared/api/types';

interface MyPageProps {
  onNavigate: (page: string) => void;
  user: User;
}

export default function MyPage({ onNavigate, user }: MyPageProps) {
  return <ProfileView onNavigate={onNavigate} user={user} />;
}
