import { TrendView } from '../features/trend/TrendView';

interface TrendsPageProps {
  onNavigate: (page: string) => void;
}

export default function TrendsPage({ onNavigate }: TrendsPageProps) {
  return <TrendView onNavigate={onNavigate} />;
}
