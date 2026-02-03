import { SignupView } from '../features/auth/SignupView';
import type { User } from '@/shared/api/types';

interface SignupPageProps {
  onNavigate: (page: string) => void;
  onSignup: (user: User, asAdmin?: boolean) => void;
}

export default function SignupPage({ onNavigate, onSignup }: SignupPageProps) {
  return <SignupView onNavigate={onNavigate} onSignup={onSignup} />;
}
