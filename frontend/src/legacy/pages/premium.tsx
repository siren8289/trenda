import { PremiumView } from '../features/user/PremiumView';

interface PremiumPageProps {
  onNavigate: (page: string) => void;
}

export default function PremiumPage({ onNavigate }: PremiumPageProps) {
  return <PremiumView onNavigate={onNavigate} />;
}
