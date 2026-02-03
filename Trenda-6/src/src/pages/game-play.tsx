import { GamePlayView } from '../features/play/GamePlayView';

interface GamePlayPageProps {
  onNavigate: (page: string, params?: any) => void;
  gameId: string;
  type: string;
}

export default function GamePlayPage({ onNavigate, gameId, type }: GamePlayPageProps) {
  return <GamePlayView onNavigate={onNavigate} gameId={gameId} type={type} />;
}
