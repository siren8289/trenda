import { Zap, Code, Palette, GraduationCap } from "lucide-react";
import { QuizComponent } from "../../components/common/QuizComponent";

// Mock Data for Games
const gameData = {
  "trend-flash": {
    title: "TrendFlash",
    icon: Zap,
    color: "#1CB0F6",
    questions: {
      single: [
        {
          id: 1,
          type: "single",
          question: "2024년 가장 주목받는 디자인 트렌드는?",
          options: ["뉴모피즘", "글래스모피즘", "AI 기반 디자인", "플랫 디자인"],
          correct: 2,
          explanation: "AI 기반 디자인은 자동화와 개인화를 통해 디자인 프로세스를 혁신하고 있습니다."
        },
        {
          id: 2,
          type: "single",
          question: "Next.js 14의 주요 특징이 아닌 것은?",
          options: ["Server Actions", "Partial Prerendering", "App Router 안정화", "Angular 지원"],
          correct: 3,
          explanation: "Next.js는 React 기반 프레임워크입니다."
        }
      ],
      multiple: [
        {
          id: 1,
          type: "multiple",
          question: "웹 접근성(A11y)을 향상시키는 방법으로 올바른 것은? (2개 선택)",
          options: ["적절한 alt 텍스트 제공", "모든 outline 제거", "시맨틱 태그 사용", "폰트 크기 고정"],
          correct: [0, 2],
          explanation: "alt 텍스트와 시맨틱 태그는 스크린 리더 사용자를 위해 필수적입니다."
        }
      ],
      ox: [
        {
          id: 1,
          type: "ox",
          question: "React Server Components는 클라이언트 사이드에서 렌더링된다.",
          options: ["O", "X"],
          correct: 1,
          explanation: "Server Components는 서버에서 렌더링되고 결과만 클라이언트로 전송됩니다."
        }
      ]
    }
  },
  "code-flash": {
    title: "CodeFlash",
    icon: Code,
    color: "#10B981",
    questions: {
      single: [
        {
          id: 1,
          type: "single",
          question: "다음 코드의 실행 결과는?",
          codeSnippet: "console.log(1 + '2');",
          options: ["12", "3", "NaN", "Error"],
          correct: 0,
          explanation: "숫자와 문자열을 더하면 문자열 연결이 발생합니다."
        }
      ],
      ox: [
        {
          id: 1,
          type: "ox",
          question: "JavaScript의 null과 undefined는 엄격하게 같다(===).",
          options: ["O", "X"],
          correct: 1,
          explanation: "null === undefined는 false입니다. (null == undefined는 true)"
        }
      ]
    }
  },
  "design-flash": {
    title: "DesignFlash",
    icon: Palette,
    color: "#F59E0B",
    questions: {
      single: [
        {
          id: 1,
          type: "single",
          question: "다음 중 가독성을 높이는 타이포그래피 원칙은?",
          options: ["줄 간격(Leading) 좁게", "충분한 대비(Contrast)", "모든 텍스트 중앙 정렬", "너무 많은 폰트 사용"],
          correct: 1,
          explanation: "배경과 텍스트 사이의 충분한 대비는 가독성의 핵심입니다."
        }
      ]
    }
  },
  "level-test": {
    title: "Level Test",
    icon: GraduationCap,
    color: "#8B5CF6",
    questions: {
      single: [
        {
          id: 1,
          type: "single",
          question: "RESTful API의 멱등성(Idempotency)을 보장하는 메소드는?",
          options: ["POST", "GET", "PATCH (일부)", "모두"],
          correct: 1,
          explanation: "GET, PUT, DELETE는 멱등성을 보장해야 하지만, POST는 보장하지 않습니다."
        }
      ]
    }
  }
};

interface GamePlayViewProps {
  gameId: string;
  type: string;
  onNavigate: (page: string, params?: any) => void;
}

export function GamePlayView({ gameId, type, onNavigate }: GamePlayViewProps) {
  const game = gameData[gameId as keyof typeof gameData];
  
  if (!game) return <div>Game not found</div>;

  const questions = (game.questions as any)[type] || (game.questions as any)["single"];

  if (!questions) return <div>Questions not found for this type</div>;

  return (
    <QuizComponent
      title={game.title}
      icon={game.icon}
      primaryColor={game.color}
      questions={questions}
      onComplete={(score, total) => {
        onNavigate("game-summary", { score, total, gameId });
      }}
      onClose={() => onNavigate("game-select")}
    />
  );
}
