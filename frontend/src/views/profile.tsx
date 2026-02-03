import { ProfileView } from '../features/user/ProfileView';
import type { User } from '@/shared/api/types';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
  user: User;
}

export default function ProfilePage({ onNavigate, user }: ProfilePageProps) {
  return <ProfileView onNavigate={onNavigate} user={user} />;
}
