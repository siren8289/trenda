import { QuestionTypeSelectView } from '../features/play/QuestionTypeSelectView';

interface QuestionTypeSelectPageProps {
  onNavigate: (page: string, params?: any) => void;
  gameId: string;
}

export default function QuestionTypeSelectPage({ onNavigate, gameId }: QuestionTypeSelectPageProps) {
  // In a real router, gameId would come from params or context.
  // Here we assume it might be passed as a prop or retrieved from a store/state passed down.
  // But based on App.tsx structure, we use viewParams.
  return <QuestionTypeSelectView onNavigate={onNavigate} gameId={gameId} />;
}
