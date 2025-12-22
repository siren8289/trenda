interface ExploreViewProps {
  onNavigate: (page: string) => void;
}
export function ExploreView({ onNavigate }: ExploreViewProps) {
  return <div className="p-8">Explore View</div>;
}
