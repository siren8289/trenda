import { SignupView } from '../features/auth/SignupView';

interface SignupPageProps {
  onNavigate: (page: string) => void;
  onSignup: (asAdmin?: boolean) => void;
}

export default function SignupPage({ onNavigate, onSignup }: SignupPageProps) {
  return <SignupView onNavigate={onNavigate} onSignup={onSignup} />;
}
