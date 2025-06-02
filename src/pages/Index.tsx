
import React, { useState } from 'react';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/LoginForm';
import QuizSetup from '../components/QuizSetup';
import QuizInterface from '../components/QuizInterface';
import QuizResults from '../components/QuizResults';
import Footer from '../components/Footer';
import { Question, QuizSettings } from '../types/quiz';
import { selectRandomQuestions } from '../utils/questionSelector';
import questionsData from '../data/questions.json';

type AppState = 'login' | 'setup' | 'quiz' | 'results';

const QuizApp: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [appState, setAppState] = useState<AppState>('login');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [currentQuiz, setCurrentQuiz] = useState<{
    questions: Question[];
    settings: QuizSettings;
  } | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const handleStartQuiz = (settings: QuizSettings) => {
    console.log('Starting quiz with settings:', settings);
    const selectedQuestions = selectRandomQuestions(settings.department, settings.difficulty);
    console.log('Selected questions count:', selectedQuestions.length);
    
    setCurrentQuiz({
      questions: selectedQuestions,
      settings
    });
    setAppState('quiz');
  };

  const handleQuizComplete = (score: number, answers: number[], correctCount: number) => {
    setQuizScore(score);
    setCorrectAnswers(correctCount);
    setUserAnswers(answers);
    setAppState('results');
    
    // Store quiz result
    const result = {
      score,
      correctAnswers: correctCount,
      totalQuestions: currentQuiz?.questions.length || 0,
      date: new Date().toISOString(),
      department: currentQuiz?.settings.department,
      difficulty: currentQuiz?.settings.difficulty
    };
    
    const results = JSON.parse(localStorage.getItem('quiz-results') || '[]');
    results.push(result);
    localStorage.setItem('quiz-results', JSON.stringify(results));
  };

  const handleRetakeQuiz = () => {
    if (currentQuiz) {
      setAppState('quiz');
    }
  };

  const handleBackToSetup = () => {
    setCurrentQuiz(null);
    setAppState('setup');
  };

  React.useEffect(() => {
    if (isAuthenticated && appState === 'login') {
      setAppState('setup');
    }
  }, [isAuthenticated, appState]);

  if (!isAuthenticated) {
    return (
      <LoginForm 
        onToggleMode={() => setIsLoginMode(!isLoginMode)} 
        isLogin={isLoginMode}
      />
    );
  }

  switch (appState) {
    case 'setup':
      return <QuizSetup onStartQuiz={handleStartQuiz} />;
    
    case 'quiz':
      return currentQuiz ? (
        <QuizInterface
          questions={currentQuiz.questions}
          settings={currentQuiz.settings}
          onQuizComplete={handleQuizComplete}
        />
      ) : null;
    
    case 'results':
      return (
        <QuizResults
          score={quizScore}
          totalQuestions={currentQuiz?.questions.length || 0}
          correctAnswers={correctAnswers}
          questions={currentQuiz?.questions || []}
          userAnswers={userAnswers}
          onRetakeQuiz={handleRetakeQuiz}
          onBackToSetup={handleBackToSetup}
        />
      );
    
    default:
      return <QuizSetup onStartQuiz={handleStartQuiz} />;
  }
};

const Index: React.FC = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <div className="flex-1">
          <QuizApp />
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default Index;
