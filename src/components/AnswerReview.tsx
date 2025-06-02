
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Question } from '../types/quiz';
import { CheckCircle, XCircle, Info } from 'lucide-react';

interface AnswerReviewProps {
  questions: Question[];
  userAnswers: number[];
}

const AnswerReview: React.FC<AnswerReviewProps> = ({ questions, userAnswers }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full border-cyan-500 text-cyan-300 hover:bg-cyan-500/10 btn-click-effect"
        >
          <Info className="w-4 h-4 mr-2" />
          View Correct Answers
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto futuristic-bg border-cyan-500/20">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">Answer Review</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {questions.map((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correct;
            
            return (
              <Card key={question.id} className="quiz-card border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-white text-lg flex items-center gap-2">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                    Question {index + 1}
                  </CardTitle>
                  <p className="text-gray-300">{question.question}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {question.options.map((option, optionIndex) => {
                      const isCorrectAnswer = optionIndex === question.correct;
                      const isUserAnswer = optionIndex === userAnswer;
                      
                      let className = "p-3 rounded-lg border-2 ";
                      if (isCorrectAnswer) {
                        className += "border-green-500 bg-green-500/20 text-green-300";
                      } else if (isUserAnswer && !isCorrect) {
                        className += "border-red-500 bg-red-500/20 text-red-300";
                      } else {
                        className += "border-gray-600 bg-gray-800/30 text-gray-400";
                      }
                      
                      return (
                        <div key={optionIndex} className={className}>
                          <span className="font-semibold mr-3">
                            {String.fromCharCode(65 + optionIndex)}.
                          </span>
                          {option}
                          {isCorrectAnswer && (
                            <span className="ml-2 text-green-400 font-semibold">✓ Correct</span>
                          )}
                          {isUserAnswer && !isCorrect && (
                            <span className="ml-2 text-red-400 font-semibold">✗ Your Answer</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <h4 className="text-blue-300 font-semibold mb-2">Explanation:</h4>
                    <p className="text-gray-300">{question.explanation}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnswerReview;
