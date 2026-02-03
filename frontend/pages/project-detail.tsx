import { ProjectDetailView } from '../features/project/ProjectDetailView';

interface ProjectDetailPageProps {
  onNavigate: (page: string) => void;
  id?: string;
  type?: string;
}

export default function ProjectDetailPage({ onNavigate, id, type }: ProjectDetailPageProps) {
  return <ProjectDetailView onNavigate={onNavigate} id={id} type={type} />;
}
