import { BuildEntryView } from "@/features/build/BuildEntryView";

interface BuildEntryPageProps {
  onNavigate: (page: string) => void;
}

export default function BuildEntryPage({ onNavigate }: BuildEntryPageProps) {
  return <BuildEntryView onNavigate={onNavigate} />;
}
