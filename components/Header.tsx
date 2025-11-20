import React from 'react';
import { Wifi, BatteryMedium, Bell } from 'lucide-react';
import { ProductivityMode } from '../types';
import { MODE_CONFIG } from '../constants';

interface HeaderProps {
  currentMode: ProductivityMode;
}

const Header: React.FC<HeaderProps> = ({ currentMode }) => {
  const modeStyle = MODE_CONFIG[currentMode];

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${modeStyle.border} ${modeStyle.bg}`}>
          <span className={`w-2 h-2 rounded-full ${modeStyle.color.replace('text', 'bg')} animate-pulse`}></span>
          <span className={`text-sm font-medium ${modeStyle.color}`}>{currentMode} Active</span>
        </div>
      </div>

      <div className="flex items-center gap-6 text-slate-400">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-green-400">●</span> Quest 3 Connected
        </div>
        
        <div className="h-4 w-[1px] bg-slate-700"></div>

        <div className="flex items-center gap-4">
            <button className="hover:text-white transition-colors relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 hover:text-white transition-colors cursor-help" title="Headset Battery: 74%">
                <BatteryMedium size={20} />
                <span className="text-sm">74%</span>
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors cursor-help" title="Signal Strength: Good">
                <Wifi size={20} />
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;