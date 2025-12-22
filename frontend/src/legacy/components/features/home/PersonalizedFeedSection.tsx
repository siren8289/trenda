import { Target, Bookmark } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Card } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { motion } from 'motion/react';

interface RecommendationItem {
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

interface PersonalizedFeedSectionProps {
  onNavigate: (page: string) => void;
  recommendedContent: RecommendationItem[];
}

export function PersonalizedFeedSection({ onNavigate, recommendedContent }: PersonalizedFeedSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1920px] mx-auto px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-8 h-8 text-[#1CB0F6]" />
                <h2 className="text-gray-900 text-3xl font-bold">
                  Personalized Feed
                </h2>
              </div>
              <p className="text-gray-600 text-lg">
                나의 관심사와 스킬셋에 딱 맞는 추천
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="rounded-full">
                관심 기반
              </Button>
              <Button variant="outline" className="rounded-full">
                스킬 기반
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedContent.map((content, idx) => (
              <motion.div
                key={content.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => onNavigate(content.type === 'project' ? 'project-detail' : 'trend-detail')}
              >
                <Card className="h-full bg-white border-2 border-transparent hover:border-[#1CB0F6] rounded-[24px] shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col p-8 group">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-8">
                    <Badge className={`
                      px-4 py-1.5 text-sm font-semibold rounded-lg border-0
                      ${content.type === 'project' ? 'bg-[#6366F1] hover:bg-[#5558DD]' : 'bg-[#F43F5E] hover:bg-[#E11D48]'} 
                      text-white
                    `}>
                      {content.type === 'project' ? 'Project' : 'Trend'}
                    </Badge>
                    <Button size="icon" variant="ghost" className="h-8 w-8 -mr-2 text-gray-400 hover:text-[#1CB0F6] hover:bg-transparent">
                      <Bookmark className="w-6 h-6" />
                    </Button>
                  </div>

                  {/* Content */}
                  <div className="flex-1 mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-snug break-keep">
                      {content.title}
                    </h3>
                    
                    <p className="text-gray-500 text-lg font-medium leading-relaxed break-keep">
                      {content.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2.5 mb-8">
                    {content.tags.map(tag => (
                      <span key={tag} className="px-4 py-2 bg-[#F3F4F6] text-gray-600 text-sm font-semibold rounded-xl">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer - Relevance */}
                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full bg-[#1CB0F6]"></div>
                      <span className="text-lg font-bold text-[#1CB0F6]">{content.relevance}</span>
                    </div>
                    <span className="text-sm text-gray-500 font-medium">{content.reason}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
