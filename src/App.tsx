import React, { useState, useEffect, useCallback } from 'react';
import { Maximize2, AlertTriangle, Clock, CheckCircle, User, BookOpen, PenTool } from 'lucide-react';
import ExamContent from './components/ExamContent';
import WelcomePage from './components/WelcomePage';
import InstructionsPage from './components/InstructionsPage';
import VerificationPage from './components/VerificationPage';

function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [warningCount, setWarningCount] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 1 hour in seconds
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { name: 'Welcome', icon: User },
    { name: 'Instructions', icon: BookOpen },
    { name: 'Verification', icon: CheckCircle },
    { name: 'Exam', icon: PenTool },
  ];

  const enterFullscreen = useCallback(() => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
    setIsFullscreen(true);
    setExamStarted(true);
  }, []);

  const exitFullscreen = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    setIsFullscreen(false);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    const handleVisibilityChange = () => {
      if (examStarted && document.hidden) {
        setWarningCount((prev) => prev + 1);
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [examStarted]);

  useEffect(() => {
    let timer: number;
    if (examStarted && !examSubmitted && timeRemaining > 0) {
      timer = window.setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            handleExamSubmit();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examStarted, examSubmitted, timeRemaining]);

  const handleExamSubmit = () => {
    setExamSubmitted(true);
    exitFullscreen();
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const startExam = () => {
    enterFullscreen();
    setCurrentStep(3); // Move to the exam step
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center justify-center p-4">
      {currentStep < 3 ? (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 transition-all duration-500 ease-in-out transform hover:scale-105">
          <div className="flex justify-between items-center mb-8">
            {steps.map((step, index) => (
              <div key={step.name} className={`flex flex-col items-center ${index <= currentStep ? 'text-blue-600' : 'text-gray-400'}`}>
                <step.icon className="w-8 h-8 mb-2" />
                <span className="text-sm">{step.name}</span>
              </div>
            ))}
          </div>
          {currentStep === 0 && <WelcomePage onNext={nextStep} />}
          {currentStep === 1 && <InstructionsPage onNext={nextStep} />}
          {currentStep === 2 && <VerificationPage onNext={startExam} />}
        </div>
      ) : (
        <>
          {!isFullscreen && !examSubmitted && (
            <div className="fixed top-0 left-0 w-full bg-red-500 text-white p-3 text-center">
              <AlertTriangle className="inline-block mr-2" />
              Please return to fullscreen mode to continue the exam.
              <button
                onClick={enterFullscreen}
                className="ml-2 bg-white text-red-500 px-3 py-1 rounded-full hover:bg-red-100 transition duration-300"
              >
                Return to Fullscreen
              </button>
            </div>
          )}
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-600">
                Warning count: <span className="font-bold text-red-500">{warningCount}</span>
              </p>
              <div className="flex items-center text-blue-600">
                <Clock className="mr-2" />
                <span className="font-bold">{formatTime(timeRemaining)}</span>
              </div>
            </div>
            <ExamContent onSubmit={handleExamSubmit} examSubmitted={examSubmitted} timeRemaining={timeRemaining} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;