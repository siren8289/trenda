import { LoginView } from '../features/auth/LoginView';

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLogin: (asAdmin?: boolean) => void;
}

export default function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  return <LoginView onNavigate={onNavigate} onLogin={onLogin} />;
}
