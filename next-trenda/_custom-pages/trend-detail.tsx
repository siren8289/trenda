import { TrendDetailView } from '../features/trend/TrendDetailView';

interface TrendDetailPageProps {
  onNavigate: (page: string) => void;
  id?: string;
  type?: string;
}

export default function TrendDetailPage({ onNavigate, id, type }: TrendDetailPageProps) {
  return <TrendDetailView onNavigate={onNavigate} id={id} type={type} />;
}
