interface DemoViewProps {
  onNavigate: (page: string) => void;
}
export function DemoView({ onNavigate }: DemoViewProps) {
  return <div className="p-8">Demo View</div>;
}
