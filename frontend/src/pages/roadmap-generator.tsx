import { RoadmapGeneratorView } from '../features/build/RoadmapGeneratorView';

interface RoadmapGeneratorPageProps {
  onNavigate: (page: string) => void;
}

export default function RoadmapGeneratorPage({ onNavigate }: RoadmapGeneratorPageProps) {
  return <RoadmapGeneratorView onNavigate={onNavigate} onBack={() => onNavigate('build-entry')} />;
}
