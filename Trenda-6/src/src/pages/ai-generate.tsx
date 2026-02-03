import { AIGenerateView } from '../features/ai/AIGenerateView';

interface AIGeneratePageProps {
  onNavigate: (page: string) => void;
}

export default function AIGeneratePage({ onNavigate }: AIGeneratePageProps) {
  return <AIGenerateView onNavigate={onNavigate} />;
}
