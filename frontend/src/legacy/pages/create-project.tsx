import { CreateProjectView } from '../features/project/CreateProjectView';

interface CreateProjectPageProps {
  onNavigate: (page: string) => void;
}

export default function CreateProjectPage({ onNavigate }: CreateProjectPageProps) {
  return <CreateProjectView onNavigate={onNavigate} />;
}
