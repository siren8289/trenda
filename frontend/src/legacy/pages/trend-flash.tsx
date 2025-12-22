import { TrendFlashView } from '../features/play/TrendFlashView';

interface TrendFlashPageProps {
  onNavigate: (page: string) => void;
}

export default function TrendFlashPage({ onNavigate }: TrendFlashPageProps) {
  return <TrendFlashView onNavigate={onNavigate} />;
}
