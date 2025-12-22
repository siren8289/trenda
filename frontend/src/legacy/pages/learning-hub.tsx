import { LearningHubView } from '../features/learning/LearningHubView';

interface LearningHubPageProps {
  onNavigate: (page: string) => void;
}

export default function LearningHubPage({ onNavigate }: LearningHubPageProps) {
  return <LearningHubView onNavigate={onNavigate} />;
}
