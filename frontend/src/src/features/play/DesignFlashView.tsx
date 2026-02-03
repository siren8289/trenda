import { useState } from "react";
import { motion } from "motion/react";
import { Palette, Layers, Layout, Paintbrush, ArrowRight } from "lucide-react";
import { QuizComponent } from "../../../components/common/SharedComponents";

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
    id: "ui-fundamentals",
    title: "UI 디자인 기초",
    subtitle: "UI 디자인 핵심 원칙",
    icon: Layout,
    color: "#F59E0B",
    questions: [
      {
        id: 1,
        question: "UI 디자인에서 시각적 위계(Visual Hierarchy)를 만드는 가장 효과적인 방법은?",
        options: [
          "모든 요소를 같은 크기로",
          "크기, 색상, 간격 조절",
          "많은 색상 사용",
          "복잡한 레이아웃"
        ],
        correct: 1,
        explanation: "크기, 색상, 간격을 조절하여 중요도에 따라 시각적 위계를 만드는 것이 효과적입니다."
      },
      {
        id: 2,
        question: "피그마에서 Auto Layout의 주요 목적은?",
        options: [
          "자동 색상 선택",
          "반응형 디자인",
          "이미지 최적화",
          "텍스트 자동 생성"
        ],
        correct: 1,
        explanation: "Auto Layout은 콘텐츠에 따라 자동으로 크기가 조정되는 반응형 프레임을 만듭니다."
      },
      {
        id: 3,
        question: "8pt Grid System의 장점은?",
        options: [
          "화려한 디자인",
          "일관된 간격과 정렬",
          "빠른 로딩",
          "많은 색상"
        ],
        correct: 1,
        explanation: "8pt Grid는 모든 요소를 8의 배수로 배치하여 일관성 있는 디자인을 만듭니다."
      }
    ]
  },
  {
    id: "color-typography",
    title: "색상 & 타이포그래피",
    subtitle: "컬러와 폰트의 조화",
    icon: Paintbrush,
    color: "#EC4899",
    questions: [
      {
        id: 1,
        question: "색상 대비 비율 4.5:1이 중요한 이유는?",
        options: [
          "예쁜 디자인",
          "웹 접근성 (WCAG)",
          "빠른 로딩",
          "SEO 최적화"
        ],
        correct: 1,
        explanation: "WCAG 접근성 기준에서 일반 텍스트는 최소 4.5:1의 대비 비율을 요구합니다."
      },
      {
        id: 2,
        question: "타이포그래피에서 Line Height의 적절한 범위는?",
        options: [
          "0.5 ~ 1.0",
          "1.2 ~ 1.8",
          "2.0 ~ 3.0",
          "3.0 이상"
        ],
        correct: 1,
        explanation: "가독성을 위해 본문 텍스트의 Line Height는 1.4~1.6이 가장 이상적입니다."
      },
      {
        id: 3,
        question: "60-30-10 규칙이란?",
        options: [
          "폰트 크기 비율",
          "색상 배분 비율",
          "여백 비율",
          "이미지 비율"
        ],
        correct: 1,
        explanation: "주 색상 60%, 보조 색상 30%, 강조 색상 10%로 배분하는 색상 조화 원칙입니다."
      }
    ]
  },
  {
    id: "ux-design",
    title: "UX 디자인",
    subtitle: "사용자 경험 설계",
    icon: Layers,
    color: "#8B5CF6",
    questions: [
      {
        id: 1,
        question: "사용자 경험(UX)을 개선하는 마이크로 인터랙션의 목적은?",
        options: [
          "화려한 애니메이션",
          "피드백과 가이드 제공",
          "로딩 시간 증가",
          "복잡성 추가"
        ],
        correct: 1,
        explanation: "마이크로 인터랙션은 사용자에게 즉각적인 피드백과 가이드를 제공하여 UX를 개선합니다."
      },
      {
        id: 2,
        question: "Fitts의 법칙이 UI 디자인에 시사하는 바는?",
        options: [
          "버튼은 작을수록 좋다",
          "중요한 버튼은 크고 가까이",
          "색상이 중요하다",
          "텍스트가 많을수록 좋다"
        ],
        correct: 1,
        explanation: "Fitts의 법칙: 타겟이 클수록, 가까울수록 더 빠르게 클릭할 수 있습니다."
      },
      {
        id: 3,
        question: "사용자 테스트에서 가장 중요한 것은?",
        options: [
          "많은 참가자 수",
          "실제 사용자 관찰",
          "디자이너의 의견",
          "경쟁사 분석"
        ],
        correct: 1,
        explanation: "실제 사용자가 제품을 어떻게 사용하는지 관찰하는 것이 가장 중요합니다."
      }
    ]
  },
  {
    id: "responsive-design",
    title: "반응형 디자인",
    subtitle: "모바일 & 데스크톱",
    icon: Palette,
    color: "#06B6D4",
    questions: [
      {
        id: 1,
        question: "반응형 디자인에서 모바일 디바이스의 기준 너비는?",
        options: ["320px", "375px", "768px", "1024px"],
        correct: 1,
        explanation: "iPhone을 기준으로 375px가 가장 일반적인 모바일 디자인 기준 너비입니다."
      },
      {
        id: 2,
        question: "Mobile First 접근법의 장점은?",
        options: [
          "데스크톱 최적화",
          "점진적 기능 향상",
          "빠른 개발 속도",
          "낮은 비용"
        ],
        correct: 1,
        explanation: "Mobile First는 기본 기능부터 구현하고 점진적으로 향상시켜, 모든 기기에서 최적의 경험을 제공합니다."
      },
      {
        id: 3,
        question: "Breakpoint 설정 시 고려사항은?",
        options: [
          "인기 기기의 정확한 크기",
          "콘텐츠 기반 자연스러운 전환점",
          "최신 기기만 고려",
          "디자이너 임의 결정"
        ],
        correct: 1,
        explanation: "특정 기기보다는 콘텐츠가 깨지는 지점을 기준으로 Breakpoint를 설정하는 것이 좋습니다."
      }
    ]
  }
];

export function DesignFlashView() {
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
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full mb-6">
              <Palette size={24} />
              <span className="font-bold">DesignFlash</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">디자인 플래시</h1>
            <p className="text-xl text-gray-600">
              디자인 감각을 빠르게 테스트하세요
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
            className="mt-12 bg-orange-50 rounded-2xl p-6 border-2 border-orange-200"
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
