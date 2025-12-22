interface CategoryViewProps {
  onNavigate: (page: string) => void;
}
export function CategoryView({ onNavigate }: CategoryViewProps) {
  return <div className="p-8">Category View</div>;
}
