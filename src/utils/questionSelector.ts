
import { Question } from '../types/quiz';
import questionsData from '../data/questions.json';

export const selectRandomQuestions = (department: string, difficulty: string): Question[] => {
  const departmentQuestions = questionsData[department as keyof typeof questionsData];
  const difficultyQuestions = departmentQuestions[difficulty as keyof typeof departmentQuestions];
  
  console.log(`Selecting questions for ${department} - ${difficulty}:`, difficultyQuestions.length, 'available questions');
  
  // Always ensure no duplicates within a single quiz
  const availableQuestions = [...difficultyQuestions];
  
  // Fisher-Yates shuffle to randomize the order
  for (let i = availableQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [availableQuestions[i], availableQuestions[j]] = [availableQuestions[j], availableQuestions[i]];
  }
  
  // Select up to 50 questions, but never duplicate
  const targetCount = Math.min(50, availableQuestions.length);
  const selectedQuestions = availableQuestions.slice(0, targetCount);
  
  console.log('Returning unique questions:', selectedQuestions.length);
  return selectedQuestions;
};
