
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QuizSettings } from '../types/quiz';
import { useAuth } from '../contexts/AuthContext';

interface QuizSetupProps {
  onStartQuiz: (settings: QuizSettings) => void;
}

const QuizSetup: React.FC<QuizSetupProps> = ({ onStartQuiz }) => {
  const [department, setDepartment] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [customTime, setCustomTime] = useState(10); // Default 10 minutes
  const { user, logout } = useAuth();

  const handleStartQuiz = () => {
    if (!department || !difficulty) return;

    const timeLimit = customTime * 60; // Convert minutes to seconds
    
    onStartQuiz({
      department,
      difficulty,
      timeLimit
    });
  };

  const departments = [
    { value: 'web', label: 'Web Development' },
    { value: 'dispatch', label: 'Dispatch & Logistics' },
    { value: 'cybersecurity', label: 'Cybersecurity' }
  ];

  const difficulties = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' }
  ];

  return (
    <div className="min-h-screen futuristic-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-md quiz-card border-cyan-500/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">
            Welcome, {user?.username}!
          </CardTitle>
          <CardDescription className="text-cyan-300">
            Choose your quiz department, difficulty, and time limit
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Department
            </label>
            <Select onValueChange={setDepartment}>
              <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {departments.map((dept) => (
                  <SelectItem key={dept.value} value={dept.value} className="text-white">
                    {dept.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-white text-sm font-medium mb-2 block">
              Difficulty
            </label>
            <Select onValueChange={setDifficulty}>
              <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {difficulties.map((diff) => (
                  <SelectItem key={diff.value} value={diff.value} className="text-white">
                    {diff.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="time-limit" className="text-white text-sm font-medium mb-2 block">
              Time Limit (minutes)
            </Label>
            <Input
              id="time-limit"
              type="number"
              min="1"
              max="60"
              value={customTime}
              onChange={(e) => setCustomTime(Number(e.target.value))}
              className="bg-gray-800/50 border-gray-600 text-white"
              placeholder="Enter time in minutes"
            />
            <p className="text-xs text-gray-400 mt-1">
              Set between 1-60 minutes
            </p>
          </div>

          <Button
            onClick={handleStartQuiz}
            disabled={!department || !difficulty || customTime < 1}
            className="w-full bg-green-600 hover:bg-green-700 glow-effect disabled:opacity-50"
          >
            Start Quiz ({customTime} minutes)
          </Button>

          <Button
            onClick={logout}
            variant="outline"
            className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizSetup;
