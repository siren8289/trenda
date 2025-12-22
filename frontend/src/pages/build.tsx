import { BuildEntryView } from '../features/build/BuildEntryView';

interface BuildPageProps {
  onNavigate: (page: string) => void;
}

export default function BuildPage({ onNavigate }: BuildPageProps) {
  return <BuildEntryView onNavigate={onNavigate} />;
}
