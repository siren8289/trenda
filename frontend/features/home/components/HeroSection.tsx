import { ArrowRight, Zap, Code } from 'lucide-react';
import { Button } from '../../../ui/button';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-white py-24">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="max-w-[1920px] mx-auto px-8">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* 핵심 문구 */}
            <div className="flex items-center justify-center gap-3 text-sm font-semibold text-[#1CB0F6] mb-6">
              <span>Play</span>
              <ArrowRight className="w-4 h-4" />
              <span>Build</span>
              <ArrowRight className="w-4 h-4" />
              <span>Portfolio</span>
            </div>
            
            <h1 className="text-gray-900 mb-6 leading-tight" style={{ fontSize: '4rem', fontWeight: '700' }}>
              트렌드 읽고, 만들고<br />
              <span className="text-[#1CB0F6]">포트폴리오 완성</span>까지
            </h1>
            
            {/* 서브 메시지 */}
            <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-xl leading-relaxed">
              Trenda는 개발자와 디자이너가 트렌드를 학습하고<br />
              자신만의 프로젝트를 빌드하여 성장하는 올인원 플랫폼입니다.
            </p>

            {/* CTA */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <Button 
                size="lg"
                className="bg-[#1CB0F6] text-white hover:bg-[#0D8FCC] shadow-lg px-8 py-6 text-lg h-14 rounded-full"
                onClick={() => onNavigate('trend-flash')}
              >
                <Zap className="w-5 h-5 mr-2" />
                TrendFlash 시작하기
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-[#1CB0F6] text-[#1CB0F6] hover:bg-[#1CB0F6] hover:text-white px-8 py-6 text-lg h-14 rounded-full"
                onClick={() => onNavigate('code-flash')}
              >
                <Code className="w-5 h-5 mr-2" />
                CodeFlash 도전하기
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
