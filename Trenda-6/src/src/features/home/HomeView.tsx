import { Zap, Code, Brain } from 'lucide-react';
import { HeroSection } from './components/HeroSection';
import { TrendingSection } from './components/TrendingSection';
import { PlaySection } from './components/PlaySection';
import { PersonalizedFeedSection } from './components/PersonalizedFeedSection';
import { TrendingCardData, KeywordData, PlayTool, RecommendationItem } from './home.types';

interface HomeViewProps {
  onNavigate: (page: string) => void;
}

export function HomeView({ onNavigate }: HomeViewProps) {
  // Trending Today - 10초 트렌드 카드 데이터
  const trendingCards: TrendingCardData[] = [
    {
      id: 1,
      title: 'React 19 출시: Server Actions로 폼 처리 혁신',
      category: 'Frontend',
      categoryColor: 'bg-blue-500',
      readTime: '10초',
      views: 3421,
      likes: 234,
      summary: 'Server Actions로 API 라우트 없이 폼 처리 가능',
      tags: ['React', 'Server Actions', 'Forms']
    },
    {
      id: 2,
      title: 'Figma Dev Mode: 디자인→코드 자동 변환',
      category: 'Design',
      categoryColor: 'bg-purple-500',
      readTime: '10초',
      views: 2834,
      likes: 189,
      summary: 'CSS, React 코드를 Dev Mode에서 바로 복사',
      tags: ['Figma', 'Dev Mode', 'Workflow']
    },
    {
      id: 3,
      title: 'PostgreSQL JSON 성능 50% 향상',
      category: 'Backend',
      categoryColor: 'bg-green-500',
      readTime: '10초',
      views: 2156,
      likes: 167,
      summary: 'PostgreSQL 17 업데이트로 MongoDB 대체 가능',
      tags: ['PostgreSQL', 'Database', 'Performance']
    },
    {
      id: 4,
      title: 'Tailwind v4.0: CSS 변수 기반 새로운 설계',
      category: 'Frontend',
      categoryColor: 'bg-blue-500',
      readTime: '10초',
      views: 1942,
      likes: 145,
      summary: 'Oxide 엔진으로 빌드 속도 10배 향상',
      tags: ['Tailwind', 'CSS', 'Performance']
    }
  ];

  // 인기 키워드 데이터
  const popularKeywords: KeywordData[] = [
    { name: 'React 19', count: 1234, trend: '+45%' },
    { name: 'AI/ML', count: 987, trend: '+32%' },
    { name: 'Figma', count: 856, trend: '+28%' },
    { name: 'Next.js', count: 743, trend: '+18%' },
    { name: 'TypeScript', count: 621, trend: '+15%' },
    { name: 'Tailwind', count: 534, trend: '+12%' }
  ];

  // Play 섹션 데이터
  const playTools: PlayTool[] = [
    {
      icon: Zap,
      title: 'TrendFlash',
      description: '10초 트렌드 카드 게임',
      color: 'from-yellow-500 to-orange-500',
      link: 'trend-flash',
      badge: 'HOT',
      bg: 'bg-amber-50'
    },
    {
      icon: Code,
      title: 'CodeFlash',
      description: '실전 코드 스니펫 챌린지',
      color: 'from-blue-500 to-purple-500',
      link: 'code-flash',
      badge: 'NEW',
      bg: 'bg-indigo-50'
    },
    {
      icon: Brain,
      title: 'Level Test',
      description: '나의 개발/디자인 레벨 측정',
      color: 'from-pink-500 to-rose-500',
      link: 'level-test',
      badge: 'BETA',
      bg: 'bg-rose-50'
    }
  ];

  // 추천 콘텐츠 데이터
  const recommendedContent: RecommendationItem[] = [
    {
      id: 1,
      type: 'project',
      title: 'AI 기반 코드 리뷰 자동화 시스템',
      description: 'GPT-4를 활용한 실시간 코드 리뷰 및 개선 제안 시스템',
      author: '김개발',
      level: 'Senior',
      tags: ['AI', 'Python', 'FastAPI'],
      relevance: '95% 매치',
      reason: '관심 기술: AI, Python'
    },
    {
      id: 2,
      type: 'trend',
      title: 'shadcn/ui가 2025년 가장 핫한 컴포넌트 라이브러리인 이유',
      description: '복사-붙여넣기 방식의 새로운 패러다임',
      author: 'UX 전문가',
      level: 'Intermediate',
      tags: ['React', 'UI', 'Components'],
      relevance: '88% 매치',
      reason: '레벨: Intermediate'
    },
    {
      id: 3,
      type: 'project',
      title: '실시간 협업 디자인 툴 (Figma Clone)',
      description: 'WebSocket과 Canvas API를 활용한 멀티플레이어 디자인 툴',
      author: '이풀스택',
      level: 'Senior',
      tags: ['React', 'WebSocket', 'Canvas'],
      relevance: '82% 매치',
      reason: '관심 분야: Frontend, UX'
    },
    {
      id: 4,
      type: 'trend',
      title: 'Bun 1.0 출시: Node.js를 대체할 수 있을까?',
      description: '3배 빠른 속도와 내장 번들러, TypeScript 지원',
      author: '백엔드 개발자',
      level: 'Advanced',
      tags: ['Runtime', 'JavaScript', 'Performance'],
      relevance: '78% 매치',
      reason: '최근 활동: JavaScript 생태계'
    },
    {
      id: 5,
      type: 'project',
      title: 'SaaS 대시보드 템플릿 - Next.js 14',
      description: 'App Router, Server Components, Supabase를 활용한 풀스택 템플릿',
      author: '박스타트업',
      level: 'Intermediate',
      tags: ['Next.js', 'Tailwind', 'Supabase'],
      relevance: '75% 매치',
      reason: '추천: 최신 스택 학습'
    },
    {
      id: 6,
      type: 'trend',
      title: '뉴모피즘 다시 돌아온다? 2025 UI 트렌드',
      description: '소프트 UI와 미니멀리즘의 결합',
      author: 'UI 디자이너',
      level: 'Beginner',
      tags: ['Design', 'Trends', 'UI/UX'],
      relevance: '70% 매치',
      reason: '관심 분야: 디자인 트렌드'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection onNavigate={onNavigate} />
      <TrendingSection onNavigate={onNavigate} cards={trendingCards} keywords={popularKeywords} />
      <PlaySection onNavigate={onNavigate} playTools={playTools} />
      <PersonalizedFeedSection onNavigate={onNavigate} recommendedContent={recommendedContent} />
    </div>
  );
}
