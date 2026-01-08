
import React from 'react';
import { Signal } from '../types';

interface SignalIndicatorProps {
  signal: Signal;
}

const signalConfig = {
  [Signal.GREEN]: {
    bgColor: 'bg-green-500',
    textColor: 'text-green-500',
    borderColor: 'border-green-500/30',
    text: 'HOLD',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  [Signal.YELLOW]: {
    bgColor: 'bg-yellow-500',
    textColor: 'text-yellow-500',
    borderColor: 'border-yellow-500/30',
    text: 'ADJUST',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    )
  },
  [Signal.RED]: {
    bgColor: 'bg-red-500',
    textColor: 'text-red-500',
    borderColor: 'border-red-500/30',
    text: 'URGENT',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    )
  },
};

const SignalIndicator: React.FC<SignalIndicatorProps> = ({ signal }) => {
  const config = signalConfig[signal];

  return (
    <div className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 ${config.borderColor} bg-gray-900 w-full sm:w-40 h-40`}>
      {config.icon}
      <p className={`text-2xl font-bold mt-2 ${config.textColor}`}>{config.text}</p>
      <p className="text-sm text-gray-400">Signal</p>
    </div>
  );
};

export default SignalIndicator;
