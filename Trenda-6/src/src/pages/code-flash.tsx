import { CodeFlashView } from '../features/play/CodeFlashView';

interface CodeFlashPageProps {
  onNavigate: (page: string) => void;
}

export default function CodeFlashPage({ onNavigate }: CodeFlashPageProps) {
  return <CodeFlashView onNavigate={onNavigate} />;
}
