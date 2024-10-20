import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface ExamContentProps {
  onSubmit: () => void;
  examSubmitted: boolean;
  timeRemaining: number;
}

const ExamContent: React.FC<ExamContentProps> = ({ onSubmit, examSubmitted, timeRemaining }) => {
  const [answers, setAnswers] = useState({
    q1: '',
    q2: '',
    q3: ''
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const savedAnswers = localStorage.getItem('examAnswers');
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('examAnswers', JSON.stringify(answers));
    const answeredQuestions = Object.values(answers).filter(answer => answer !== '').length;
    setProgress((answeredQuestions / 3) * 100);
  }, [answers]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAnswers(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  if (examSubmitted) {
    return (
      <div className="text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4 text-green-600">Exam Submitted Successfully!</h2>
        <p className="text-lg text-gray-600">Thank you for completing the exam.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Exam Questions</h2>
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">Progress: {Math.round(progress)}%</p>
      </div>
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-lg">
          <p className="font-semibold text-lg mb-2">Question 1:</p>
          <p className="mb-3">What is the capital of France?</p>
          <input
            type="text"
            name="q1"
            value={answers.q1}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your answer"
            required
          />
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-lg">
          <p className="font-semibold text-lg mb-2">Question 2:</p>
          <p className="mb-3">Which planet is known as the Red Planet?</p>
          <input
            type="text"
            name="q2"
            value={answers.q2}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your answer"
            required
          />
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-lg">
          <p className="font-semibold text-lg mb-2">Question 3:</p>
          <p className="mb-3">What is the largest mammal on Earth?</p>
          <input
            type="text"
            name="q3"
            value={answers.q3}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Your answer"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-8 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center mx-auto"
      >
        Submit Exam
        <CheckCircle className="ml-2" />
      </button>
      {timeRemaining <= 300 && (
        <p className="mt-4 text-red-500 font-bold text-center animate-pulse">Warning: Less than 5 minutes remaining!</p>
      )}
    </form>
  );
};

export default ExamContent;