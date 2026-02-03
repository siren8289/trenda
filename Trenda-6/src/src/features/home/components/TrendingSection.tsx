import { useState } from 'react';
import { TrendingUp, Share2, Clock, Eye, Heart, Sparkles } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Card } from '../../../ui/card';
import { motion } from 'motion/react';
import { TrendingCardData, KeywordData } from '../home.types';

interface TrendingSectionProps {
  onNavigate: (page: string) => void;
  cards: TrendingCardData[];
  keywords: KeywordData[];
}

export function TrendingSection({ onNavigate, cards, keywords }: TrendingSectionProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1920px] mx-auto px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-8 h-8 text-[#1CB0F6]" />
                <h2 className="text-gray-900 text-3xl font-bold">
                  Trending Today
                </h2>
              </div>
              <p className="text-gray-600 text-lg">
                오늘의 핫한 기술 트렌드를 빠르게 확인하세요
              </p>
            </div>
            <Button 
              variant="ghost"
              className="text-[#1CB0F6] hover:bg-[#1CB0F6]/10"
              onClick={() => onNavigate('create-trend')}
            >
              <Share2 className="w-5 h-5 mr-2" />
              트렌드 공유하기
            </Button>
          </div>

          {/* 트렌드 카드 + 키워드 레이아웃 */}
          <div className="grid grid-cols-12 gap-8">
            {/* Left: Cards (8 cols) */}
            <div className="col-span-8 grid grid-cols-2 gap-6">
              {cards.map((card, idx) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => onNavigate('trend-detail')}
                >
                  <Card className={`h-full bg-white rounded-3xl border-2 transition-all duration-300 cursor-pointer flex flex-col hover:shadow-lg ${
                    idx === 0 ? 'border-[#1CB0F6] shadow-md' : 'border-[#E5F6FD] hover:border-[#1CB0F6]'
                  }`}>
                    <div className="p-6 flex flex-col h-full">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-5">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold text-white tracking-wider ${
                          card.category === 'Frontend' ? 'bg-[#1CB0F6]' :
                          card.category === 'Backend' ? 'bg-[#22C55E]' :
                          'bg-[#A855F7]'
                        }`}>
                          {card.category}
                        </span>
                        <span className="text-gray-400 text-xs flex items-center gap-1.5 font-medium tracking-wide">
                          <Clock size={14} /> {card.readTime}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="mb-6 flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-8 tracking-normal break-keep">
                          {card.title}
                        </h3>
                        <p className="text-gray-500 text-sm font-normal leading-6 tracking-wide break-keep line-clamp-2">
                          {card.summary}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-gray-100 w-full mb-4"></div>

                      {/* Footer */}
                      <div className="flex items-center gap-4 text-gray-400 text-xs font-medium tracking-wide mt-auto">
                        <div className="flex items-center gap-1.5 hover:text-[#1CB0F6] transition-colors">
                          <Eye size={16} />
                          <span className="pt-0.5">{card.views}</span>
                        </div>
                        <div className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
                          <Heart size={16} />
                          <span className="pt-0.5">{card.likes}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Right: Popular Keywords (4 cols) */}
            <div className="col-span-4">
              <div className="bg-white rounded-3xl p-6 h-full border border-gray-100 sticky top-8">
                <div className="flex items-center gap-2 mb-6 pl-1">
                  <Sparkles className="text-[#1CB0F6]" size={20} />
                  <h3 className="text-lg font-bold text-gray-900 tracking-wide">
                    인기 키워드
                  </h3>
                </div>
                <div className="flex flex-col gap-3">
                  {keywords.map((keyword, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 hover:border-[#1CB0F6] hover:shadow-sm transition-all cursor-pointer group"
                      onClick={() => onNavigate('trends')}
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-base text-gray-400 w-5 text-center group-hover:text-[#1CB0F6] transition-colors pt-0.5">{idx + 1}</span>
                        <span className="font-medium text-base text-gray-700 tracking-wide group-hover:text-gray-900 pt-0.5">{keyword.name}</span>
                      </div>
                      <span className="text-xs font-bold text-[#1CB0F6] bg-[#E5F6FD] px-3 py-1.5 rounded-full tracking-wide">
                        {keyword.trend}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
