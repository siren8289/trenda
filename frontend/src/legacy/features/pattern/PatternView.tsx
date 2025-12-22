interface PatternViewProps {
  onNavigate: (page: string) => void;
}
export function PatternView({ onNavigate }: PatternViewProps) {
  return <div className="p-8">Pattern View</div>;
}
