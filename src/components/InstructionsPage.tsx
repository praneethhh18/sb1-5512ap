import React from 'react';
import { ArrowRight, Clock, AlertTriangle, Maximize2 } from 'lucide-react';

interface InstructionsPageProps {
  onNext: () => void;
}

const InstructionsPage: React.FC<InstructionsPageProps> = ({ onNext }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Exam Instructions</h2>
      <div className="space-y-4 mb-8">
        <div className="flex items-start">
          <Clock className="w-6 h-6 mr-2 text-blue-500 flex-shrink-0" />
          <p>You will have 1 hour to complete the exam once it starts.</p>
        </div>
        <div className="flex items-start">
          <Maximize2 className="w-6 h-6 mr-2 text-blue-500 flex-shrink-0" />
          <p>The exam must be taken in fullscreen mode. Exiting fullscreen will result in a warning.</p>
        </div>
        <div className="flex items-start">
          <AlertTriangle className="w-6 h-6 mr-2 text-blue-500 flex-shrink-0" />
          <p>Switching tabs or applications during the exam is not allowed and will be recorded.</p>
        </div>
      </div>
      <img src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Person writing" className="w-full h-64 object-cover rounded-lg mb-8" />
      <button
        onClick={onNext}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center mx-auto transition duration-300 ease-in-out transform hover:scale-105"
      >
        Proceed to Verification
        <ArrowRight className="ml-2" />
      </button>
    </div>
  );
};

export default InstructionsPage;