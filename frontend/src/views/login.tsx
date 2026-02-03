import { LoginView } from '../features/auth/LoginView';
import type { User } from '@/shared/api/types';

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLogin: (user: User, asAdmin?: boolean) => void;
}

export default function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  return <LoginView onNavigate={onNavigate} onLogin={onLogin} />;
}
