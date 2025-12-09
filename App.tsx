import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { XR, ARButton } from '@react-three/xr';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import RoomMap from './components/RoomMap';
import AINotes from './components/AINotes';
import StatsChart from './components/StatsChart';
import Analytics from './components/Analytics';
import Timeline from './components/Timeline';
import ImmersiveSpace from './components/ImmersiveSpace';
import { ProductivityMode } from './types';
import { Target, Zap, Glasses } from 'lucide-react';

interface DashboardProps {
    currentMode: ProductivityMode;
    setCurrentMode: (mode: ProductivityMode) => void;
}

const DashboardView: React.FC<DashboardProps> = ({ currentMode, setCurrentMode }) => {
    return (
        <div className="grid grid-cols-12 gap-6 h-full overflow-y-auto pr-2 pb-20">
          {/* Immersive Launch Banner */}
          <div className="col-span-12 bg-gradient-to-r from-indigo-900/80 to-purple-900/80 border border-indigo-500/50 rounded-2xl p-8 flex items-center justify-between relative overflow-hidden group">
            <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-2">Mixed Reality Workspace</h2>
                <p className="text-indigo-200 max-w-xl">
                    Transform your physical room into a spatial productivity engine. 
                    Wear your Meta Quest 3 to visualize tasks, timelines, and notes on your walls.
                </p>
            </div>
            <div className="relative z-10 flex gap-4">
                  <div className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white font-bold rounded-xl shadow-lg backdrop-blur-sm">
                    <Glasses size={24} />
                    <span>Click 'Start AR Space' (Bottom Right)</span>
                  </div>
            </div>
            
            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          </div>

          {/* Top Row: Timeline (Full Width) */}
          <div className="col-span-12">
            <Timeline />
          </div>

          {/* Middle Row: Stats Chart & Mode Selector */}
          <div className="col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">Focus Intensity</h3>
              <select className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg px-3 py-1 focus:outline-none">
                <option>Today</option>
                <option>This Week</option>
              </select>
            </div>
            <div className="flex-1 min-h-[250px]">
                <StatsChart />
            </div>
          </div>
          
           {/* Side Stats */}
           <div className="col-span-4 flex flex-col gap-4">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between flex-1">
                    <div className="flex justify-between items-start">
                        <div className="p-2 bg-green-500/10 rounded-lg text-green-500"><Target size={20} /></div>
                        <span className="text-xs font-mono text-green-400">+12%</span>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">92%</div>
                        <div className="text-sm text-slate-500">Goal Completion</div>
                    </div>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between flex-1">
                    <div className="flex justify-between items-start">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Zap size={20} /></div>
                        <span className="text-xs font-mono text-blue-400">Streak: 4d</span>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-white">4.5h</div>
                        <div className="text-sm text-slate-500">Avg. Deep Work</div>
                    </div>
                </div>
           </div>
        </div>
    );
};

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [currentMode, setCurrentMode] = useState<ProductivityMode>(ProductivityMode.DEEP_WORK);
    const [isInAR, setIsInAR] = useState(false);

    return (
        <div className="flex h-screen bg-slate-950 text-slate-50 overflow-hidden font-inter relative">
             {/* 3D Immersive Layer (Background/XR) */}
            <div className="absolute inset-0 z-0">
                <Canvas>
                    <XR>
                         <Suspense fallback={null}>
                            <ImmersiveSpace currentMode={currentMode} />
                         </Suspense>
                    </XR>
                </Canvas>
            </div>

            {/* 2D UI Layer - Hidden when in AR to allow passthrough visibility */}
            {!isInAR && (
                <div className="relative z-10 flex w-full h-full pointer-events-auto bg-slate-950/95 transition-opacity duration-500">
                    <div style={{ pointerEvents: 'auto', display: 'flex', width: '100%', height: '100%' }}>
                    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                    
                    <main className="flex-1 flex flex-col min-w-0 h-full relative">
                        <Header currentMode={currentMode} />
                        
                        <div className="flex-1 p-6 overflow-hidden">
                            {activeTab === 'dashboard' && (
                                <DashboardView currentMode={currentMode} setCurrentMode={setCurrentMode} />
                            )}
                            {activeTab === 'spatial' && <RoomMap />}
                            {activeTab === 'notes' && <AINotes />}
                            {activeTab === 'stats' && <Analytics />}
                        </div>
                    </main>
                    </div>
                </div>
            )}
            
            {/* AR Start Button */}
            <ARButton 
                className="absolute bottom-6 right-6 z-50 pointer-events-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all flex items-center gap-2 border-none cursor-pointer"
                sessionInit={{ 
                    requiredFeatures: ['hit-test'],
                    optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking', 'layers', 'dom-overlay'],
                    domOverlay: { root: document.body } 
                }}
                onSessionStart={() => setIsInAR(true)}
                onSessionEnd={() => setIsInAR(false)}
            >
                {isInAR ? 'Exit Immersive Mode' : 'Start AR Space'}
            </ARButton>
        </div>
    );
};

export default App;