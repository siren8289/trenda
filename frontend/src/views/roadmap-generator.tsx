import { RoadmapGeneratorView } from "@/features/build/RoadmapGeneratorView";
import type { User } from "@/shared/api/types";

interface RoadmapGeneratorPageProps {
  onNavigate: (page: string) => void;
  user: User;
}

export default function RoadmapGeneratorPage({ onNavigate, user }: RoadmapGeneratorPageProps) {
  return (
    <RoadmapGeneratorView
      onNavigate={onNavigate}
      onBack={() => onNavigate("build-entry")}
      userId={user.id}
    />
  );
}
