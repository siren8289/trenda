import { TrendReportView } from '../features/trend/TrendReportView';

interface TrendReportPageProps {
  onNavigate: (page: string) => void;
}

export default function TrendReportPage({ onNavigate }: TrendReportPageProps) {
  return <TrendReportView onNavigate={onNavigate} />;
}
