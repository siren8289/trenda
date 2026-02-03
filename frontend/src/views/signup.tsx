import { SignupView } from '../features/auth/SignupView';

interface SignupPageProps {
  onNavigate: (page: string) => void;
  onSignupSuccess?: () => void;
}

export default function SignupPage({ onNavigate, onSignupSuccess }: SignupPageProps) {
  return <SignupView onNavigate={onNavigate} onSignupSuccess={onSignupSuccess} />;
}
