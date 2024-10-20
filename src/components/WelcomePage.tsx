import React from 'react';
import { ArrowRight } from 'lucide-react';

interface WelcomePageProps {
  onNext: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onNext }) => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">Welcome to the Proctored Exam</h1>
      <p className="mb-8 text-gray-600">
        This exam is designed to test your knowledge and skills. Please ensure you're in a quiet environment and have a stable internet connection before proceeding.
      </p>
      <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Student studying" className="w-full h-64 object-cover rounded-lg mb-8" />
      <button
        onClick={onNext}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center mx-auto transition duration-300 ease-in-out transform hover:scale-105"
      >
        Continue to Instructions
        <ArrowRight className="ml-2" />
      </button>
    </div>
  );
};

export default WelcomePage;