import { CommunityContestView } from '../features/community/CommunityContestView';

interface CommunityContestPageProps {
  onNavigate: (page: string) => void;
}

export default function CommunityContestPage({ onNavigate }: CommunityContestPageProps) {
  return <CommunityContestView />;
}
