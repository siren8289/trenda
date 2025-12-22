import { HomeView } from '../features/home/HomeView';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return <HomeView onNavigate={onNavigate} />;
}
