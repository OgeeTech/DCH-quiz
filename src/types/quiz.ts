export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface QuizState {
  questions: Question[];
  currentQuestion: number;
  answers: number[];
  timeRemaining: number;
  isActive: boolean;
  score: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface QuizSettings {
  department: string;
  difficulty: string;
  timeLimit: number;
}

export type Department = 'web' | 'dispatch' | 'cybersecurity';
export type Difficulty = 'easy' | 'medium' | 'hard';
