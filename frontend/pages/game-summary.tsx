import { GameSummaryView } from '../features/play/GameSummaryView';

interface GameSummaryPageProps {
  onNavigate: (page: string, params?: any) => void;
  score: number;
  total: number;
  gameId: string;
}

export default function GameSummaryPage({ onNavigate, score, total, gameId }: GameSummaryPageProps) {
  const handleRestart = () => {
    onNavigate("game-play", { gameId, type: "single" }); // Defaulting to 'single' for restart or pass original type
  };

  return (
    <GameSummaryView 
      onNavigate={onNavigate} 
      score={score} 
      total={total} 
      gameId={gameId} 
      onRestart={handleRestart} 
    />
  );
}
