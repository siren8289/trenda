import { useState } from "react";
import { motion } from "motion/react";
import { Zap, TrendingUp, Sparkles, Rocket, ArrowRight, ArrowLeft } from "lucide-react";
import { QuizComponent } from "../../components/common/QuizComponent";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface QuizTopic {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  questions: Question[];
}

const quizTopics: QuizTopic[] = [
  {
    id: "design-trends",
    title: "2024 디자인 트렌드",
    subtitle: "최신 UI/UX 트렌드",
    icon: Sparkles,
    color: "#1CB0F6",
    questions: [
      {
        id: 1,
        question: "2024년 가장 주목받는 디자인 트렌드는?",
        options: ["뉴모피즘", "글래스모피즘", "AI 기반 디자인", "플랫 디자인"],
        correct: 2,
        explanation: "AI 기반 디자인은 자동화와 개인화를 통해 디자인 프로세스를 혁신하고 있습니다."
      },
      {
        id: 2,
        question: "모던 웹 디자인에서 선호되는 타이포그래피는?",
        options: ["세리프체", "산세리프체", "스크립트체", "모노스페이스"],
        correct: 1,
        explanation: "산세리프체는 깔끔하고 모던한 느낌으로 웹에서 가장 많이 사용됩니다."
      },
      {
        id: 3,
        question: "접근성을 고려한 최소 색상 대비 비율은?",
        options: ["2:1", "3:1", "4.5:1", "7:1"],
        correct: 2,
        explanation: "WCAG 2.0 기준에서 일반 텍스트는 최소 4.5:1의 대비 비율을 권장합니다."
      }
    ]
  },
  {
    id: "tech-trends",
    title: "기술 트렌드 2024",
    subtitle: "개발자가 알아야 할 트렌드",
    icon: TrendingUp,
    color: "#10B981",
    questions: [
      {
        id: 1,
        question: "2024년 프론트엔드에서 가장 주목받는 기술은?",
        options: ["Server Components", "Web Components", "Angular", "jQuery"],
        correct: 0,
        explanation: "React Server Components는 성능과 SEO를 크게 개선하는 혁신적인 기술입니다."
      },
      {
        id: 2,
        question: "Edge Computing의 주요 장점은?",
        options: ["저렴한 비용", "낮은 지연시간", "큰 저장공간", "복잡한 연산"],
        correct: 1,
        explanation: "Edge Computing은 사용자와 가까운 곳에서 처리하여 지연시간을 크게 줄입니다."
      },
      {
        id: 3,
        question: "마이크로프론트엔드의 핵심 개념은?",
        options: ["작은 화면", "독립적인 배포", "빠른 속도", "적은 코드"],
        correct: 1,
        explanation: "마이크로프론트엔드는 각 팀이 독립적으로 개발하고 배포할 수 있게 합니다."
      }
    ]
  },
  {
    id: "platform-trends",
    title: "플랫폼 트렌드",
    subtitle: "새로운 플랫폼과 도구",
    icon: Rocket,
    color: "#F59E0B",
    questions: [
      {
        id: 1,
        question: "Vercel, Netlify 같은 플랫폼의 특징은?",
        options: ["FTP 배포", "자동 배포 & CI/CD", "수동 빌드", "서버 관리 필요"],
        correct: 1,
        explanation: "Jamstack 플랫폼은 Git 연동을 통한 자동 배포와 CI/CD를 제공합니다."
      },
      {
        id: 2,
        question: "Supabase의 주요 기능이 아닌 것은?",
        options: ["실시간 데이터베이스", "인증", "스토리지", "비디오 스트리밍"],
        correct: 3,
        explanation: "Supabase는 데이터베이스, 인증, 스토리지를 제공하지만 비디오 스트리밍은 지원하지 않습니다."
      },
      {
        id: 3,
        question: "Figma의 가장 혁신적인 기능은?",
        options: ["로컬 파일", "실시간 협업", "설치 필요", "오프라인 모드"],
        correct: 1,
        explanation: "Figma는 웹 기반 실시간 협업을 통해 디자인 작업을 혁신했습니다."
      }
    ]
  }
];

interface TrendFlashViewProps {
  onNavigate: (page: string) => void;
}

export function TrendFlashView({ onNavigate }: TrendFlashViewProps) {
  const [selectedTopic, setSelectedTopic] = useState<QuizTopic | null>(null);

  const handleTopicSelect = (topic: QuizTopic) => {
    setSelectedTopic(topic);
  };

  const handleQuizComplete = (score: number, total: number) => {
    console.log(`${selectedTopic?.title} 완료: ${score}/${total}`);
  };

  const handleQuizClose = () => {
    setSelectedTopic(null);
  };

  // 퀴즈 진행 중
  if (selectedTopic) {
    return (
      <QuizComponent
        title={selectedTopic.title}
        icon={selectedTopic.icon}
        primaryColor={selectedTopic.color}
        questions={selectedTopic.questions}
        onComplete={handleQuizComplete}
        onClose={handleQuizClose}
      />
    );
  }

  // 주제 선택 화면
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFBF7" }}>
      <div className="max-w-[1920px] mx-auto px-8 py-24">
        <div className="max-w-[900px] mx-auto">
          {/* 헤더 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
             <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('home')}
              className="absolute top-24 left-8 flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              메인으로
            </motion.button>

            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full mb-6">
              <Zap size={24} />
              <span className="font-bold">TrendFlash</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">트렌드 플래시</h1>
            <p className="text-xl text-gray-600">
              최신 트렌드를 빠르게 학습하세요
            </p>
          </motion.div>

          {/* 주제 리스트 */}
          <div className="space-y-4">
            {quizTopics.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <motion.button
                  key={topic.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTopicSelect(topic)}
                  className="w-full bg-white rounded-2xl shadow-lg p-6 flex items-center gap-6 hover:shadow-xl transition-all"
                >
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${topic.color}20` }}
                  >
                    <Icon size={32} style={{ color: topic.color }} />
                  </div>

                  <div className="flex-1 text-left">
                    <h3 className="text-2xl font-bold mb-1">{topic.title}</h3>
                    <p className="text-gray-500">{topic.subtitle}</p>
                  </div>

                  <div className="flex items-center gap-2 text-gray-400">
                    <span className="text-sm">{topic.questions.length}문제</span>
                    <ArrowRight size={20} />
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* 안내 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 bg-blue-50 rounded-2xl p-6 border-2 border-blue-200"
          >
            <p className="text-gray-700 text-center">
              💡 각 주제별 3개의 질문으로 구성되어 있습니다
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
