import React, { useState, useEffect } from 'react';
import { MOCK_NAMES } from '../config';

interface NotificationToastProps {
  type: 'REGISTER' | 'ACTIVATE';
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ type }) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({ name: '', time: '' });

  useEffect(() => {
    // Timing configuration (ms)
    const INITIAL_DELAY = 2000;
    const SHOW_DURATION = 4000; // Time the notification stays on screen
    const GAP_DURATION = 3000;  // Time to wait between notifications

    let timeoutId: ReturnType<typeof setTimeout>;

    const showNext = () => {
      // Pick random data
      const randomName = MOCK_NAMES[Math.floor(Math.random() * MOCK_NAMES.length)];
      // Generate realistic time variation
      const times = ['Just now', '1m ago', 'Just now', '2m ago', 'Just now'];
      const randomTime = times[Math.floor(Math.random() * times.length)];

      setData({
        name: randomName,
        time: randomTime
      });

      // Show
      setVisible(true);

      // Schedule Hide
      timeoutId = setTimeout(() => {
        setVisible(false);
        
        // Schedule Next Show after gap
        timeoutId = setTimeout(showNext, GAP_DURATION);
      }, SHOW_DURATION);
    };

    // Start the cycle
    timeoutId = setTimeout(showNext, INITIAL_DELAY);

    return () => clearTimeout(timeoutId);
  }, []);

  // Animation classes
  // We use keyframes defined in tailwind.config (index.html) or fallback to simple transitions
  const animationClass = visible 
    ? 'animate-slideDown opacity-100 translate-y-0' 
    : 'animate-slideUp opacity-0 -translate-y-[150%]';

  // Avatar Letter
  const avatarLetter = data.name.charAt(0).toUpperCase();
  const avatarBg = type === 'ACTIVATE' ? 'bg-emerald-500' : 'bg-blue-600';

  return (
    <div className={`fixed top-4 left-1/2 z-[60] w-[90%] max-w-[360px] transform -translate-x-1/2 ${animationClass}`}>
      <div className="bg-[#1c1c1e]/90 backdrop-blur-xl border border-white/10 shadow-2xl rounded-[2rem] p-3 pr-5 flex items-center gap-3">
        
        {/* Avatar Icon */}
        <div className={`w-10 h-10 min-w-[2.5rem] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${avatarBg}`}>
          {avatarLetter}
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="flex justify-between items-baseline w-full">
            <p className="text-white text-sm font-semibold truncate pr-2">
              {data.name}
            </p>
            <span className="text-gray-500 text-[10px] font-medium whitespace-nowrap">
              {data.time}
            </span>
          </div>
          <p className="text-gray-400 text-xs truncate leading-tight">
            {type === 'ACTIVATE' ? 'Activated Lifetime Access 💎' : 'Registered on Stream Africa 🚀'}
          </p>
        </div>
      </div>
    </div>
  );
};