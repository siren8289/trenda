import { CreateTrendView } from '../features/trend/CreateTrendView';

interface CreateTrendPageProps {
  onNavigate: (page: string) => void;
}

export default function CreateTrendPage({ onNavigate }: CreateTrendPageProps) {
  return <CreateTrendView onNavigate={onNavigate} />;
}
