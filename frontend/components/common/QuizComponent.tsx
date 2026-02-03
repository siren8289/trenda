import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trophy, ArrowRight, ArrowLeft, RotateCcw, X, CheckCircle, XCircle } from "lucide-react";
import { Button } from "../../ui/button";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface QuizComponentProps {
  title: string;
  icon: React.ElementType;
  primaryColor: string;
  questions: Question[];
  onComplete: (score: number, total: number) => void;
  onClose: () => void;
}

export function QuizComponent({ 
  title, 
  icon: Icon, 
  primaryColor, 
  questions, 
  onComplete, 
  onClose 
}: QuizComponentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    if (selectedAnswer === currentQuestion.correct) {
      setScore(prev => prev + 1);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setIsCompleted(true);
      onComplete(score + (selectedAnswer === currentQuestion.correct ? 0 : 0), questions.length); // Score is already updated or will be updated? 
      // Wait, if I update score in handleSubmit, it's fine.
      // But if I updated score in handleSubmit, and clicked next, it's preserved.
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };
  
  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setIsCompleted(false);
  };

  if (isCompleted) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center relative"
        >
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mb-4 relative">
              <motion.div 
                className="absolute inset-0 rounded-full opacity-20"
                style={{ backgroundColor: primaryColor }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <Trophy size={48} style={{ color: primaryColor }} />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-2">Quiz Completed!</h2>
          <p className="text-gray-600 mb-8">{title}</p>
          
          <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-100">
            <div className="text-sm text-gray-500 mb-1">Total Score</div>
            <div className="text-4xl font-bold" style={{ color: primaryColor }}>
              {score} / {questions.length}
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <Button 
              onClick={handleRetry}
              className="w-full py-6 text-lg font-bold gap-2"
              style={{ backgroundColor: primaryColor }}
            >
              <RotateCcw size={20} />
              Try Again
            </Button>
            <Button 
              onClick={onClose}
              variant="ghost"
              className="w-full py-6 text-lg text-gray-500 hover:text-gray-900"
            >
              Close
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col h-full w-full"
      >
        {/* Header */}
        <div className="px-4 md:px-8 py-4 border-b flex items-center justify-between bg-white shrink-0 z-10">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="hover:bg-gray-100 -ml-2"
            >
              <ArrowLeft size={24} className="text-gray-600" />
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-100 hidden md:block">
                <Icon size={20} style={{ color: primaryColor }} />
              </div>
              <div>
                <h3 className="font-bold text-base md:text-lg">{title}</h3>
                <div className="text-xs md:text-sm text-gray-500">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </div>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={24} className="text-gray-400" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-100 w-full shrink-0">
          <motion.div 
            className="h-full"
            style={{ backgroundColor: primaryColor }}
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-white flex justify-center">
          <div className="w-full max-w-3xl p-6 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 leading-relaxed text-gray-900">
              {currentQuestion.question}
            </h2>

            <div className="space-y-4 mb-8">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = showExplanation && index === currentQuestion.correct;
                const isWrong = showExplanation && isSelected && index !== currentQuestion.correct;
                
                let bgColor = "bg-white";
                let textColor = "text-gray-700";
                
                if (showExplanation) {
                  if (isCorrect) {
                    bgColor = "bg-green-50";
                    textColor = "text-green-700";
                  } else if (isWrong) {
                    bgColor = "bg-red-50";
                    textColor = "text-red-700";
                  } else {
                    textColor = "text-gray-400";
                  }
                } else if (isSelected) {
                  bgColor = "bg-blue-50";
                }

                return (
                  <motion.button
                    key={index}
                    whileHover={!showExplanation ? { scale: 1.01, x: 4 } : {}}
                    whileTap={!showExplanation ? { scale: 0.99 } : {}}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showExplanation}
                    className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center justify-between group ${bgColor} ${textColor}`}
                    style={{ 
                      borderColor: isSelected && !showExplanation ? primaryColor : 
                                   isCorrect ? "#10B981" : 
                                   isWrong ? "#EF4444" : 
                                   "transparent",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                    }}
                  >
                    <span className="font-medium text-lg">{option}</span>
                    {isCorrect && <CheckCircle className="text-green-500" size={24} />}
                    {isWrong && <XCircle className="text-red-500" size={24} />}
                    {!showExplanation && !isSelected && (
                      <div className="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-gray-400 transition-colors" />
                    )}
                    {!showExplanation && isSelected && (
                      <div className="w-6 h-6 rounded-full border-[6px]" style={{ borderColor: primaryColor }} />
                    )}
                  </motion.button>
                );
              })}
            </div>

            <AnimatePresence>
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-gray-50 rounded-2xl p-6 mb-6 border border-gray-100"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-blue-100 mt-1">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-gray-900 mb-2">Explanation</h4>
                      <p className="text-base text-gray-600 leading-relaxed">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-white shrink-0 flex justify-center z-10">
          <div className="w-full max-w-3xl">
            {!showExplanation ? (
              <Button 
                onClick={handleSubmit} 
                disabled={selectedAnswer === null}
                className="w-full py-6 text-lg font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all"
                style={{ backgroundColor: selectedAnswer !== null ? primaryColor : undefined }}
              >
                Check Answer
              </Button>
            ) : (
              <Button 
                onClick={handleNext} 
                className="w-full py-6 text-lg font-bold gap-2 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl transition-all"
                style={{ backgroundColor: primaryColor }}
              >
                {isLastQuestion ? "View Results" : "Next Question"}
                <ArrowRight size={20} />
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
