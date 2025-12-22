interface EditorViewProps {
  onNavigate: (page: string) => void;
}
export function EditorView({ onNavigate }: EditorViewProps) {
  return <div className="p-8">Editor View</div>;
}
