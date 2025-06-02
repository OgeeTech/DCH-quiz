
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '../contexts/AuthContext';
import { Question } from '../types/quiz';
import AnswerReview from './AnswerReview';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  questions: Question[];
  userAnswers: number[];
  onRetakeQuiz: () => void;
  onBackToSetup: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({ 
  score, 
  totalQuestions,
  correctAnswers,
  questions,
  userAnswers,
  onRetakeQuiz, 
  onBackToSetup 
}) => {
  const { user } = useAuth();

  const getScoreColor = () => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreMessage = () => {
    if (score >= 90) return 'Excellent work! 🏆';
    if (score >= 80) return 'Great job! 🎉';
    if (score >= 70) return 'Good effort! 👍';
    if (score >= 60) return 'Not bad, keep practicing! 📚';
    return 'Keep studying and try again! 💪';
  };

  return (
    <div className="min-h-screen futuristic-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-md quiz-card border-cyan-500/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">
            Quiz Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div>
            <div className={`text-6xl font-bold ${getScoreColor()} pulse-glow`}>
              {score}%
            </div>
            <p className="text-gray-300 mt-2">
              You scored {correctAnswers} out of {totalQuestions} questions
            </p>
          </div>

          <div className="text-white">
            <p className="text-lg">{getScoreMessage()}</p>
          </div>

          <div className="space-y-3">
            <AnswerReview questions={questions} userAnswers={userAnswers} />
            
            <Button
              onClick={onRetakeQuiz}
              className="w-full bg-cyan-600 hover:bg-cyan-700 glow-effect btn-click-effect"
            >
              Retake Quiz
            </Button>
            
            <Button
              onClick={onBackToSetup}
              variant="outline"
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 btn-click-effect"
            >
              Choose Different Quiz
            </Button>
          </div>

          <div className="text-sm text-gray-400 mt-6">
            Well done, {user?.username}! 🎓
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizResults;
