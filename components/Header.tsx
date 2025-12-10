import React, { useState } from 'react';
import { Wifi, BatteryMedium, Bell, ChevronDown } from 'lucide-react';
import { ProductivityMode } from '../types';
import { MODE_CONFIG } from '../constants';

interface HeaderProps {
  currentMode: ProductivityMode;
  setCurrentMode: (mode: ProductivityMode) => void;
}

const Header: React.FC<HeaderProps> = ({ currentMode, setCurrentMode }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const modeStyle = MODE_CONFIG[currentMode];

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-20 transition-colors duration-500">
      <div className="flex items-center gap-4 relative">
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 hover:scale-105 active:scale-95 ${modeStyle.border} ${modeStyle.bg}`}
        >
          <span className={`w-2 h-2 rounded-full ${modeStyle.color.replace('text', 'bg')} animate-pulse`}></span>
          <span className={`text-sm font-medium ${modeStyle.color}`}>{currentMode} Active</span>
          <ChevronDown size={14} className={`${modeStyle.color} opacity-70`} />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-12 left-0 w-48 bg-slate-900 border border-slate-700 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
            {Object.values(ProductivityMode).map((mode) => {
               const config = MODE_CONFIG[mode];
               return (
                <button
                  key={mode}
                  onClick={() => { setCurrentMode(mode); setIsDropdownOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-800 transition-colors ${currentMode === mode ? 'bg-slate-800/50' : ''}`}
                >
                  <config.icon size={16} className={config.color} />
                  <span className={`text-sm ${currentMode === mode ? 'text-white font-medium' : 'text-slate-400'}`}>
                    {mode}
                  </span>
                </button>
               );
            })}
          </div>
        )}
      </div>

      <div className="flex items-center gap-6 text-slate-400">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-green-400">●</span> Quest 3 Connected
        </div>
        
        <div className="h-4 w-[1px] bg-slate-700"></div>

        <div className="flex items-center gap-4">
            <button className="hover:text-white transition-colors relative p-2 hover:bg-slate-800 rounded-full">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 hover:text-white transition-colors cursor-help p-2 hover:bg-slate-800 rounded-full" title="Headset Battery: 74%">
                <BatteryMedium size={20} />
                <span className="text-sm">74%</span>
            </div>
            <div className="flex items-center gap-2 hover:text-white transition-colors cursor-help p-2 hover:bg-slate-800 rounded-full" title="Signal Strength: Good">
                <Wifi size={20} />
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;