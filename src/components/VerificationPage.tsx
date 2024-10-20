import React, { useState } from 'react';
import { ArrowRight, User } from 'lucide-react';

interface VerificationPageProps {
  onNext: () => void;
}

const VerificationPage: React.FC<VerificationPageProps> = ({ onNext }) => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && id) {
      onNext();
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Verify Your Identity</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </form>
      <div className="flex justify-center mb-8">
        <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
          <User className="w-16 h-16 text-gray-400" />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center mx-auto transition duration-300 ease-in-out transform hover:scale-105"
        disabled={!name || !id}
      >
        Start Exam
        <ArrowRight className="ml-2" />
      </button>
    </div>
  );
};

export default VerificationPage;