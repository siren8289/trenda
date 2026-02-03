import { GameSelectView } from '../features/play/GameSelectView';

interface GameSelectPageProps {
  onNavigate: (page: string, params?: any) => void;
}

export default function GameSelectPage({ onNavigate }: GameSelectPageProps) {
  return <GameSelectView onNavigate={onNavigate} />;
}
