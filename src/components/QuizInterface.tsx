import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Question, QuizSettings } from '../types/quiz';
import { useQuizSecurity } from '../hooks/useQuizSecurity';
import { toast } from 'sonner';
import { Timer, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import QuestionIndicator from './QuestionIndicator';

interface QuizInterfaceProps {
  questions: Question[];
  settings: QuizSettings;
  onQuizComplete: (score: number, answers: number[], correctCount: number) => void;
}

const QuizInterface: React.FC<QuizInterfaceProps> = ({ questions, settings, onQuizComplete }) => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(settings.timeLimit);
  const [isQuizActive, setIsQuizActive] = useState(true);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());

  const handleSecurityViolation = () => {
    setIsQuizActive(false);
    const { score, correctCount } = calculateScore();
    onQuizComplete(score, answers, correctCount);
  };

  useQuizSecurity(isQuizActive, handleSecurityViolation);

  const calculateScore = () => {
    let correctCount = 0;
    answers.forEach((answer, index) => {
      if (questions[index] && answer === questions[index].correct) {
        correctCount++;
      }
    });
    const score = Math.round((correctCount / questions.length) * 100);
    return { score, correctCount };
  };

  const handleQuizComplete = useCallback(() => {
    setIsQuizActive(false);
    const finalAnswers = [...answers];
    if (selectedAnswer !== null) {
      finalAnswers[currentQuestion] = selectedAnswer;
    }

    let correctCount = 0;
    finalAnswers.forEach((answer, index) => {
      if (questions[index] && answer === questions[index].correct) {
        correctCount++;
      }
    });
    const score = Math.round((correctCount / questions.length) * 100);

    onQuizComplete(score, finalAnswers, correctCount);
  }, [answers, selectedAnswer, currentQuestion, questions, onQuizComplete]);

  useEffect(() => {
    if (timeRemaining <= 0) {
      handleQuizComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, handleQuizComplete]);

  useEffect(() => {
    if (answers[currentQuestion] !== undefined) {
      setSelectedAnswer(answers[currentQuestion]);
    } else {
      setSelectedAnswer(null);
    }
  }, [currentQuestion, answers]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleQuestionSelect = (questionIndex: number) => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);

      const newAnsweredQuestions = new Set(answeredQuestions);
      newAnsweredQuestions.add(currentQuestion);
      setAnsweredQuestions(newAnsweredQuestions);
    }

    setCurrentQuestion(questionIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      toast.warning('Please select an answer');
      return;
    }

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    const newAnsweredQuestions = new Set(answeredQuestions);
    newAnsweredQuestions.add(currentQuestion);
    setAnsweredQuestions(newAnsweredQuestions);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      handleQuizComplete();
    }
  };

  const handleDepartmentView = () => {
    navigate(`/department?dept=${settings.department}`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  if (!currentQ) return null;

  return (
    <div className="min-h-screen futuristic-bg p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div className="text-white">
            <h1 className="text-2xl font-bold">DCH Academy Quiz</h1>
            <p className="text-cyan-300">
              {settings.department.charAt(0).toUpperCase() + settings.department.slice(1)} - {settings.difficulty.charAt(0).toUpperCase() + settings.difficulty.slice(1)}
            </p>
          </div>
          <div className="flex items-center space-x-4 text-white">
            <Button
              onClick={handleDepartmentView}
              variant="outline"
              className="border-cyan-500 text-cyan-300 hover:bg-cyan-500/20 btn-click-effect"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              View Department
            </Button>
            <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-lg">
              <Timer className="w-5 h-5" />
              <span className={`font-bold ${timeRemaining < 60 ? 'text-red-400' : 'text-green-400'}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-white mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="quiz-card border-cyan-500/20 mb-6">
          <CardHeader>
            <CardTitle className="text-white text-xl">
              {currentQ.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${selectedAnswer === index
                      ? 'border-cyan-500 bg-cyan-500/20 text-white'
                      : 'border-gray-600 bg-gray-800/30 text-gray-300 hover:border-gray-500'
                    }`}
                >
                  <span className="font-semibold mr-3">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            disabled={currentQuestion === 0}
            className="border-gray-600 text-gray-300"
          >
            Previous
          </Button>

          <Button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className="bg-cyan-600 hover:bg-cyan-700 glow-effect"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'Submit Quiz'}
          </Button>
        </div>

        {/* Question Indicator */}
        <QuestionIndicator
          totalQuestions={questions.length}
          currentQuestion={currentQuestion}
          answeredQuestions={answeredQuestions}
          onQuestionSelect={handleQuestionSelect}
        />
      </div>
    </div>
  );
};

export default QuizInterface;
