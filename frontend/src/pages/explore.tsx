import { ExploreEntryView } from '../features/explore/ExploreEntryView';

interface ExplorePageProps {
  onNavigate: (page: string) => void;
}

export default function ExplorePage({ onNavigate }: ExplorePageProps) {
  return <ExploreEntryView onNavigate={onNavigate} />;
}
