export interface TrendingCardData {
  id: number;
  title: string;
  category: string;
  categoryColor: string;
  readTime: string;
  views: number;
  likes: number;
  summary: string;
  tags: string[];
}

export interface KeywordData {
  name: string;
  count: number;
  trend: string;
}

export interface PlayTool {
  icon: any;
  title: string;
  description: string;
  color: string;
  link: string;
  badge: string;
  bg: string;
}

export interface RecommendationItem {
  id: number;
  type: string;
  title: string;
  description: string;
  author: string;
  level: string;
  tags: string[];
  relevance: string;
  reason: string;
}
