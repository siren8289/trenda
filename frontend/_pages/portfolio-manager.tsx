import { PortfolioManagerView } from '../features/portfolio/PortfolioManagerView';

interface PortfolioManagerPageProps {
  onNavigate: (page: string) => void;
}

export default function PortfolioManagerPage({ onNavigate }: PortfolioManagerPageProps) {
  return <PortfolioManagerView onNavigate={onNavigate} />;
}
