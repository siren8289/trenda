import { useState } from "react";
import { motion } from "motion/react";
import { Code, Braces, Terminal, Cpu, ArrowRight, ArrowLeft } from "lucide-react";
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
    id: "javascript",
    title: "JavaScript 핵심",
    subtitle: "필수 JavaScript 개념",
    icon: Braces,
    color: "#10B981",
    questions: [
      {
        id: 1,
        question: "다음 중 JavaScript에서 배열의 마지막 요소를 제거하는 메서드는?",
        options: ["shift()", "pop()", "slice()", "splice()"],
        correct: 1,
        explanation: "pop() 메서드는 배열의 마지막 요소를 제거하고 그 요소를 반환합니다."
      },
      {
        id: 2,
        question: "async/await을 사용할 때 에러 처리 방법은?",
        options: [
          "then/catch 체이닝",
          "try/catch 블록",
          "error 콜백",
          "finally 블록만"
        ],
        correct: 1,
        explanation: "async/await에서는 try/catch 블록을 사용하여 에러를 처리하는 것이 권장됩니다."
      },
      {
        id: 3,
        question: "let과 const의 주요 차이점은?",
        options: [
          "스코프가 다름",
          "재할당 가능 여부",
          "호이스팅 여부",
          "타입이 다름"
        ],
        correct: 1,
        explanation: "let은 재할당이 가능하지만, const는 재할당이 불가능합니다."
      }
    ]
  },
  {
    id: "react",
    title: "React 마스터",
    subtitle: "React 핵심 개념",
    icon: Code,
    color: "#3B82F6",
    questions: [
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
        question: "useState의 setState는 어떻게 동작하나요?",
        options: [
          "동기적으로 즉시 업데이트",
          "비동기적으로 배치 업데이트",
          "다음 렌더링에서만 업데이트",
          "수동으로 렌더링 필요"
        ],
        correct: 1,
        explanation: "React는 성능 최적화를 위해 여러 setState를 배치로 처리합니다."
      },
      {
        id: 3,
        question: "React의 key prop이 필요한 이유는?",
        options: [
          "스타일링을 위해",
          "효율적인 리렌더링",
          "접근성 향상",
          "SEO 최적화"
        ],
        correct: 1,
        explanation: "key는 React가 어떤 항목이 변경/추가/제거되었는지 식별하는 데 도움을 줍니다."
      }
    ]
  },
  {
    id: "css",
    title: "CSS 스타일링",
    subtitle: "모던 CSS 기법",
    icon: Terminal,
    color: "#8B5CF6",
    questions: [
      {
        id: 1,
        question: "CSS에서 요소를 수평/수직 중앙 정렬하는 가장 모던한 방법은?",
        options: [
          "margin: auto",
          "position: absolute + transform",
          "display: flex + justify/align center",
          "text-align: center"
        ],
        correct: 2,
        explanation: "Flexbox를 사용한 중앙 정렬이 가장 간단하고 모던한 방법입니다."
      },
      {
        id: 2,
        question: "CSS Grid와 Flexbox의 주요 차이는?",
        options: [
          "Grid는 2차원, Flex는 1차원",
          "기능적으로 동일",
          "Grid가 더 느림",
          "Flex가 더 복잡"
        ],
        correct: 0,
        explanation: "Grid는 행과 열을 동시에 제어하는 2차원 레이아웃, Flexbox는 1차원 레이아웃입니다."
      },
      {
        id: 3,
        question: "CSS 변수(Custom Properties)의 사용법은?",
        options: [
          "$variable-name",
          "@variable-name",
          "--variable-name",
          "var-name"
        ],
        correct: 2,
        explanation: "CSS 변수는 --로 선언하고 var(--variable-name)으로 사용합니다."
      }
    ]
  },
  {
    id: "algorithms",
    title: "알고리즘 기초",
    subtitle: "자료구조와 알고리즘",
    icon: Cpu,
    color: "#F59E0B",
    questions: [
      {
        id: 1,
        question: "Big O 표기법에서 O(1)의 의미는?",
        options: [
          "선형 시간",
          "상수 시간",
          "로그 시간",
          "이차 시간"
        ],
        correct: 1,
        explanation: "O(1)은 입력 크기와 관계없이 일정한 시간이 걸리는 상수 시간 복잡도입니다."
      },
      {
        id: 2,
        question: "Stack 자료구조의 특징은?",
        options: [
          "FIFO (First In First Out)",
          "LIFO (Last In First Out)",
          "Random Access",
          "Priority Based"
        ],
        correct: 1,
        explanation: "Stack은 마지막에 들어간 데이터가 먼저 나오는 LIFO 구조입니다."
      },
      {
        id: 3,
        question: "이진 탐색의 시간 복잡도는?",
        options: [
          "O(n)",
          "O(log n)",
          "O(n²)",
          "O(1)"
        ],
        correct: 1,
        explanation: "이진 탐색은 매번 탐색 범위를 절반으로 줄이므로 O(log n)의 시간 복잡도를 가집니다."
      }
    ]
  }
];

interface CodeFlashViewProps {
  onNavigate: (page: string) => void;
}

export function CodeFlashView({ onNavigate }: CodeFlashViewProps) {
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
            className="text-center mb-16 relative"
          >
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('home')}
              className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              메인으로
            </motion.button>

            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full mb-6">
              <Code size={24} />
              <span className="font-bold">CodeFlash</span>
            </div>
            <h1 className="text-5xl font-bold mb-4">코드 플래시</h1>
            <p className="text-xl text-gray-600">
              코딩 실력을 빠르게 점검하세요
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
            className="mt-12 bg-green-50 rounded-2xl p-6 border-2 border-green-200"
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
