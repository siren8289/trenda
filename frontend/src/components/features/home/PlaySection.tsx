import { ArrowRight } from 'lucide-react';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { motion } from 'motion/react';

interface PlayTool {
  icon: any;
  title: string;
  description: string;
  color: string;
  link: string;
  badge: string;
  bg: string;
}

interface PlaySectionProps {
  onNavigate: (page: string) => void;
  playTools: PlayTool[];
}

export function PlaySection({ onNavigate, playTools }: PlaySectionProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-[1920px] mx-auto px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Play
            </h2>
            <p className="text-gray-600 text-lg">
              게임을 통해 즐겁게 성장하세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {playTools.map((tool, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card 
                  className="relative overflow-hidden border-2 border-[#1CB0F6] hover:shadow-xl transition-all cursor-pointer group h-full"
                  onClick={() => onNavigate(tool.link)}
                >
                  <div className={`absolute inset-0 ${tool.bg} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                  <div className="relative p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center shadow-lg`}>
                        <tool.icon className="w-7 h-7 text-white" />
                      </div>
                      <Badge className="bg-[#1CB0F6] text-white border-0">
                        {tool.badge}
                      </Badge>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {tool.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed min-h-[3rem]">
                      {tool.description}
                    </p>

                    <div className="flex items-center text-[#1CB0F6] font-semibold group-hover:gap-2 transition-all">
                      바로 시작하기
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
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
