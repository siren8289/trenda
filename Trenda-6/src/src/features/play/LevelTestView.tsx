import { useState } from "react";
import { motion } from "motion/react";
import { Target, Brain, Zap, Award, ArrowRight } from "lucide-react";
import { QuizComponent } from "../../components/common/QuizComponent";

type Category = "frontend" | "backend" | "design" | null;
type Stage = "select" | "quiz" | "result";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questionData: Record<Exclude<Category, null>, Question[]> = {
  frontend: [
    {
      id: 1,
      question: "React에서 useEffect의 dependency array가 빈 배열일 때 동작은?",
      options: [
        "컴포넌트가 렌더링될 때마다 실행",
        "마운트 시 한 번만 실행",
        "언마운트 시에만 실행",
        "실행되지 않음"
      ],
      correct: 1,
      explanation: "빈 dependency array []는 컴포넌트가 마운트될 때 한 번만 실행됩니다."
    },
    {
      id: 2,
      question: "CSS Flexbox에서 justify-content: space-between의 동작은?",
      options: [
        "아이템 사이에만 동일한 간격",
        "양 끝에도 간격 추가",
        "중앙 정렬",
        "아이템을 균등하게 분배"
      ],
      correct: 0,
      explanation: "space-between은 첫 번째와 마지막 아이템을 양 끝에 배치하고, 나머지는 동일한 간격으로 분배합니다."
    },
    {
      id: 3,
      question: "TypeScript에서 interface와 type의 주요 차이는?",
      options: [
        "interface만 extends 가능",
        "type만 union 타입 지원",
        "기능적으로 동일",
        "interface는 객체만 정의"
      ],
      correct: 1,
      explanation: "type은 union, intersection 등 더 복잡한 타입을 지원하고, interface는 확장과 병합에 유리합니다."
    }
  ],
  backend: [
    {
      id: 1,
      question: "RESTful API에서 POST와 PUT의 차이는?",
      options: [
        "POST는 생성, PUT은 수정",
        "기능적으로 동일",
        "POST만 body 사용",
        "PUT만 idempotent"
      ],
      correct: 0,
      explanation: "POST는 새 리소스 생성, PUT은 기존 리소스 전체 수정에 사용됩니다."
    },
    {
      id: 2,
      question: "데이터베이스 인덱스의 주요 목적은?",
      options: [
        "데이터 보안 강화",
        "조회 속도 향상",
        "저장 공간 절약",
        "자동 백업"
      ],
      correct: 1,
      explanation: "인덱스는 데이터 조회 속도를 크게 향상시키지만, 저장 공간과 쓰기 성능은 일부 희생됩니다."
    },
    {
      id: 3,
      question: "Node.js에서 비동기 처리 방법이 아닌 것은?",
      options: [
        "Callback",
        "Promise",
        "async/await",
        "Thread Pool"
      ],
      correct: 3,
      explanation: "Node.js는 싱글 스레드 이벤트 루프 기반으로, Thread Pool을 직접 사용하지 않습니다."
    }
  ],
  design: [
    {
      id: 1,
      question: "2024년 가장 주목받는 디자인 트렌드는?",
      options: [
        "뉴모피즘",
        "글래스모피즘",
        "AI 기반 디자인",
        "플랫 디자인"
      ],
      correct: 2,
      explanation: "AI 기반 디자인은 2024년 가장 주목받는 트렌드로, 자동화와 개인화를 통해 디자인 프로세스를 혁신하고 있습니다."
    },
    {
      id: 2,
      question: "사용자 경험(UX)에서 가장 중요한 원칙은?",
      options: [
        "미적 완성도",
        "사용성과 접근성",
        "최신 트렌드 반영",
        "복잡한 인터랙션"
      ],
      correct: 1,
      explanation: "UX의 핵심은 사용자가 쉽고 편리하게 목적을 달성할 수 있도록 하는 사용성과 접근성입니다."
    },
    {
      id: 3,
      question: "반응형 디자인의 모바일 우선(Mobile First) 접근법의 장점은?",
      options: [
        "데스크톱 최적화",
        "점진적 기능 향상",
        "빠른 개발 속도",
        "낮은 비용"
      ],
      correct: 1,
      explanation: "Mobile First는 기본 기능부터 구현하고 점진적으로 향상시켜, 모든 기기에서 최적의 경험을 제공합니다."
    }
  ]
};

const categoryInfo = {
  frontend: {
    title: "Frontend",
    icon: Brain,
    color: "#1CB0F6",
    description: "React, TypeScript, CSS 등 프론트엔드 실력을 테스트하세요"
  },
  backend: {
    title: "Backend",
    icon: Zap,
    color: "#10B981",
    description: "API, 데이터베이스, 서버 개발 지식을 확인하세요"
  },
  design: {
    title: "Design",
    icon: Brain,
    color: "#F59E0B",
    description: "UI/UX, 디자인 트렌드, 사용자 경험 감각을 평가하세요"
  }
};

interface LevelTestViewProps {
  onNavigate: (page: string, params?: any) => void;
}

export function LevelTestView({ onNavigate }: LevelTestViewProps) {
  const [stage, setStage] = useState<Stage>("select");
  const [selectedCategory, setSelectedCategory] = useState<Category>(null);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setStage("quiz");
  };

  const handleQuizComplete = (finalScore: number, total: number) => {
    setScore(finalScore);
    setTotalQuestions(total);
    // You might want to navigate to a result page or show result here.
    // The original code didn't explicitly show what happens after complete in the shared snippet,
    // assuming QuizComponent handles or we need to transition.
    // But let's assume we use onNavigate to go to game-summary for consistency.
    onNavigate("game-summary", { score: finalScore, total, gameId: "level-test" });
  };

  const handleQuizClose = () => {
    setStage("select");
    setSelectedCategory(null);
    setScore(0);
    setTotalQuestions(0);
  };

  if (stage === "quiz" && selectedCategory) {
    const category = categoryInfo[selectedCategory];
    return (
      <QuizComponent
        title={category.title}
        icon={category.icon}
        primaryColor={category.color}
        questions={questionData[selectedCategory]}
        onComplete={handleQuizComplete}
        onClose={handleQuizClose}
      />
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FFFBF7" }}>
      <div className="max-w-[1920px] mx-auto px-8 py-24">
        <div className="max-w-[1400px] mx-auto">
          {/* 헤더 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full mb-6">
              <Target size={24} />
              <span className="font-bold">Level Test</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">실력 테스트</h1>
            <p className="text-xl text-gray-600">
              3개의 질문으로 당신의 실력을 빠르게 진단하세요
            </p>
          </motion.div>

          {/* 카테고리 선택 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(Object.keys(categoryInfo) as Array<keyof typeof categoryInfo>).map((key, index) => {
              const category = categoryInfo[key];
              const Icon = category.icon;
              return (
                <motion.button
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCategorySelect(key as Category)}
                  className="bg-white rounded-3xl shadow-lg p-8 text-left hover:shadow-2xl transition-all"
                >
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    <Icon size={32} style={{ color: category.color }} />
                  </div>

                  <h3 className="text-2xl font-bold mb-3">{category.title}</h3>
                  <p className="text-gray-600 mb-6">{category.description}</p>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Brain size={16} />
                      <span>3개 문제</span>
                    </div>
                    <div 
                      className="flex items-center gap-2 font-medium"
                      style={{ color: category.color }}
                    >
                      <span>시작하기</span>
                      <ArrowRight size={20} />
                    </div>
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
            className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-200"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center flex-shrink-0">
                <Award size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">빠른 실력 진단</h3>
                <p className="text-gray-700 leading-relaxed">
                  각 분야별 3개의 핵심 질문으로 당신의 실력을 진단합니다. 
                  테스트 결과를 바탕으로 맞춤형 학습 경로를 추천받을 수 있습니다.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
