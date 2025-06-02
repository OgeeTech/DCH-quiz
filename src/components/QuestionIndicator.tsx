
import React from 'react';

interface QuestionIndicatorProps {
  totalQuestions: number;
  currentQuestion: number;
  answeredQuestions: Set<number>;
  onQuestionSelect: (questionIndex: number) => void;
}

const QuestionIndicator: React.FC<QuestionIndicatorProps> = ({
  totalQuestions,
  currentQuestion,
  answeredQuestions,
  onQuestionSelect
}) => {
  return (
    <div className="bg-gray-800/30 rounded-lg p-4 mb-6">
      <h3 className="text-white text-sm font-medium mb-3">Question Progress</h3>
      <div className="grid grid-cols-10 gap-2">
        {Array.from({ length: totalQuestions }, (_, index) => {
          const questionNumber = index + 1;
          const isAnswered = answeredQuestions.has(index);
          const isCurrent = index === currentQuestion;
          
          return (
            <button
              key={index}
              onClick={() => onQuestionSelect(index)}
              className={`
                w-8 h-8 rounded flex items-center justify-center text-xs font-medium border-2 transition-all cursor-pointer hover:scale-105
                ${isCurrent 
                  ? 'border-cyan-500 bg-cyan-500/20 text-cyan-300' 
                  : isAnswered 
                    ? 'border-green-500 bg-green-500/20 text-green-300 hover:bg-green-500/30'
                    : 'border-gray-600 bg-gray-700/50 text-gray-400 hover:bg-gray-600/50'
                }
              `}
            >
              {questionNumber}
            </button>
          );
        })}
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-2">
        <span>Answered: {answeredQuestions.size}/{totalQuestions}</span>
        <span>Current: {currentQuestion + 1}</span>
      </div>
    </div>
  );
};

export default QuestionIndicator;
