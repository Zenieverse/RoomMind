import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import RoomMap from './components/RoomMap';
import AINotes from './components/AINotes';
import StatsChart from './components/StatsChart';
import { ProductivityMode } from './types';
import { MODE_CONFIG } from './constants';
import { Play, Clock, Target } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentMode, setCurrentMode] = useState<ProductivityMode>(ProductivityMode.DEEP_WORK);

  // Dashboard View Component
  const DashboardView = () => (
    <div className="grid grid-cols-3 gap-6 h-full overflow-y-auto pr-2 pb-20">
      {/* Stats Overview */}
      <div className="col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">Focus Intensity</h3>
          <select className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-1 focus:outline-none">
            <option>Today</option>
            <option>This Week</option>
          </select>
        </div>
        <StatsChart />
      </div>

      {/* Mode Selector */}
      <div className="col-span-1 flex flex-col gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex-1">
            <h3 className="text-lg font-semibold text-white mb-4">Environment Mode</h3>
            <div className="space-y-3">
                {Object.values(ProductivityMode).map((mode) => {
                    const config = MODE_CONFIG[mode];
                    const isActive = currentMode === mode;
                    return (
                        <button
                            key={mode}
                            onClick={() => setCurrentMode(mode)}
                            className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all border ${
                                isActive 
                                ? `${config.bg} ${config.border}` 
                                : 'bg-slate-950 border-transparent hover:bg-slate-800'
                            }`}
                        >
                            <div className={`p-2 rounded-lg ${isActive ? 'bg-white/10' : 'bg-slate-800'} ${config.color}`}>
                                <config.icon size={18} />
                            </div>
                            <div className="text-left">
                                <div className={`font-medium ${isActive ? 'text-white' : 'text-slate-400'}`}>{mode}</div>
                                {isActive && <div className="text-xs opacity-70 text-white">Active Environment</div>}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="col-span-3 grid grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-500/10 text-blue-500"><Clock size={24} /></div>
            <div>
                <div className="text-2xl font-bold text-white">4h 12m</div>
                <div className="text-sm text-slate-500">Focus Time Today</div>
            </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-500/10 text-green-500"><Target size={24} /></div>
            <div>
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-sm text-slate-500">Tasks Completed</div>
            </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center gap-4 relative overflow-hidden group cursor-pointer hover:border-slate-600 transition-colors">
            <div className="p-3 rounded-full bg-purple-500/10 text-purple-500"><Play size={24} className="fill-purple-500/20" /></div>
            <div>
                <div className="text-lg font-bold text-white">Resume Session</div>
                <div className="text-sm text-slate-500">Quest 3 - RoomMind</div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden text-slate-200 font-sans selection:bg-blue-500/30">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header currentMode={currentMode} />
        
        <main className="flex-1 p-6 overflow-hidden">
            {activeTab === 'dashboard' && <DashboardView />}
            {activeTab === 'spatial' && <RoomMap />}
            {activeTab === 'notes' && <AINotes />}
            
            {/* Placeholder for 'stats' tab */}
            {activeTab === 'stats' && (
                <div className="flex flex-col items-center justify-center h-full text-slate-500">
                    <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4 border border-slate-800">
                        <Target size={32} />
                    </div>
                    <h2 className="text-xl font-semibold text-slate-300">Advanced Analytics</h2>
                    <p className="mt-2">Detailed productivity breakdown coming in v1.2</p>
                </div>
            )}
        </main>
      </div>
    </div>
  );
};

export default App;