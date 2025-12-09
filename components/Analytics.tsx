import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Target, Zap, Brain, Sparkles, TrendingUp } from 'lucide-react';
import StatsChart from './StatsChart';
import { getCoachInsights } from '../services/geminiService';
import { ProductivityMode } from '../types';

const MODE_DATA = [
  { name: 'Deep Work', value: 45, color: '#3b82f6' },
  { name: 'Study', value: 25, color: '#14b8a6' },
  { name: 'Creative', value: 15, color: '#f97316' },
  { name: 'Prep', value: 10, color: '#a855f7' },
  { name: 'Relax', value: 5, color: '#4ade80' },
];

const Analytics: React.FC = () => {
  const [insight, setInsight] = useState<string>("Analyzing your flow state...");
  
  useEffect(() => {
    const fetchInsight = async () => {
        const text = await getCoachInsights({ focusScore: 85, deepWorkMinutes: 245, tasks: 12 });
        setInsight(text);
    };
    fetchInsight();
  }, []);

  return (
    <div className="h-full grid grid-cols-12 gap-6 overflow-y-auto pr-2 pb-20">
      {/* Header */}
      <div className="col-span-12 flex justify-between items-end">
        <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <TrendingUp className="text-blue-500" />
                Productivity Analytics
            </h2>
            <p className="text-slate-400 mt-1">Weekly performance and habit tracking</p>
        </div>
        <div className="flex gap-2">
            <span className="px-3 py-1 bg-slate-800 rounded-lg text-xs font-mono text-slate-400 border border-slate-700">Oct 20 - Oct 27</span>
        </div>
      </div>

      {/* Main Focus Chart */}
      <div className="col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col shadow-lg">
        <h3 className="text-lg font-semibold text-white mb-4">Focus Intensity Trend</h3>
        <div className="flex-1 min-h-[250px]">
            <StatsChart />
        </div>
      </div>

      {/* Mode Breakdown */}
      <div className="col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col shadow-lg">
        <h3 className="text-lg font-semibold text-white mb-4">Mode Distribution</h3>
        <div className="flex-1 min-h-[200px] relative">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={MODE_DATA}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {MODE_DATA.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                    </Pie>
                    <RechartsTooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc' }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }}/>
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                    <span className="text-2xl font-bold text-white block">42h</span>
                    <span className="text-xs text-slate-500 uppercase tracking-wide">Total</span>
                </div>
            </div>
        </div>
      </div>

      {/* AI Insight */}
      <div className="col-span-12 md:col-span-6 bg-gradient-to-br from-indigo-900/50 to-slate-900 border border-indigo-500/30 rounded-2xl p-6 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-4 opacity-10">
             <Sparkles size={100} />
         </div>
         <div className="relative z-10">
             <div className="flex items-center gap-2 mb-3">
                 <Brain className="text-indigo-400" size={20} />
                 <h3 className="font-semibold text-indigo-100">AI Neural Coach</h3>
             </div>
             <p className="text-indigo-200 text-lg leading-relaxed italic">
                 "{insight}"
             </p>
         </div>
      </div>

      {/* Habit Ring / Stats Grid */}
      <div className="col-span-12 md:col-span-6 grid grid-cols-2 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                  <div className="p-2 bg-green-500/10 rounded-lg text-green-500"><Target size={20} /></div>
                  <span className="text-xs font-mono text-green-400">+12%</span>
              </div>
              <div>
                  <div className="text-2xl font-bold text-white">92%</div>
                  <div className="text-sm text-slate-500">Goal Completion</div>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-green-500 h-full w-[92%]"></div>
              </div>
          </div>
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
               <div className="flex justify-between items-start">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Zap size={20} /></div>
                  <span className="text-xs font-mono text-blue-400">Streak: 4d</span>
              </div>
              <div>
                  <div className="text-2xl font-bold text-white">4.5h</div>
                  <div className="text-sm text-slate-500">Avg. Deep Work</div>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-blue-500 h-full w-[75%]"></div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Analytics;