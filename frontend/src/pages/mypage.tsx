import { ProfileView } from '../features/user/ProfileView';

interface MyPageProps {
  onNavigate: (page: string) => void;
}

export default function MyPage({ onNavigate }: MyPageProps) {
  return <ProfileView onNavigate={onNavigate} />;
}
