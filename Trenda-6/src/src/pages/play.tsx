import { PlayEntryView } from '../features/play/PlayEntryView';

interface PlayPageProps {
  onNavigate: (page: string) => void;
}

export default function PlayPage({ onNavigate }: PlayPageProps) {
  return <PlayEntryView onNavigate={onNavigate} />;
}
