import { LevelTestView } from '../features/play/LevelTestView';

interface LevelTestPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export default function LevelTestPage({ onNavigate }: LevelTestPageProps) {
  return <LevelTestView onNavigate={onNavigate} />;
}
