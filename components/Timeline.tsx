import React from 'react';
import { Clock, CheckCircle2, Circle } from 'lucide-react';

const TIMELINE_DATA = [
    { id: 1, type: 'work', title: 'Deep Work', time: '09:00 - 11:00', duration: '2h', status: 'completed' },
    { id: 2, type: 'break', title: 'Coffee Break', time: '11:00 - 11:15', duration: '15m', status: 'completed' },
    { id: 3, type: 'meeting', title: 'Sync w/ Design', time: '11:15 - 12:00', duration: '45m', status: 'active' },
    { id: 4, type: 'work', title: 'Project Alpha', time: '12:00 - 13:30', duration: '1.5h', status: 'upcoming' },
    { id: 5, type: 'break', title: 'Lunch', time: '13:30 - 14:30', duration: '1h', status: 'upcoming' },
];

const Timeline: React.FC = () => {
    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Clock size={20} className="text-blue-500"/>
                    Productivity Timeline
                </h3>
                <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[65%]"></div>
                    </div>
                    <span className="text-xs text-blue-400 font-bold">65% Focus Goal</span>
                </div>
            </div>
            
            <div className="relative pt-2">
                 {/* Connector Line */}
                <div className="absolute top-[26px] left-0 w-full h-0.5 bg-slate-800 z-0"></div>

                <div className="flex justify-between relative z-10 gap-2 overflow-x-auto pb-4 scrollbar-hide">
                    {TIMELINE_DATA.map((item) => (
                        <div key={item.id} className="flex flex-col items-center min-w-[140px] group cursor-pointer relative">
                            {/* Node */}
                            <div className={`
                                w-14 h-14 rounded-full border-4 mb-3 transition-all flex items-center justify-center bg-slate-900 z-10
                                ${item.status === 'completed' ? 'border-blue-500 text-blue-500' : 
                                  item.status === 'active' ? 'border-white text-white shadow-[0_0_15px_rgba(59,130,246,0.6)] scale-110' : 
                                  'border-slate-800 text-slate-700'}
                            `}>
                                {item.status === 'completed' ? <CheckCircle2 size={24} /> : 
                                 item.status === 'active' ? <Clock size={24} className="animate-pulse"/> : 
                                 <Circle size={24} />}
                            </div>
                            
                            {/* Card */}
                            <div className={`p-4 rounded-xl border w-full text-center transition-all ${
                                item.status === 'active' 
                                ? 'bg-slate-800 border-slate-600 shadow-xl transform -translate-y-2' 
                                : 'bg-slate-950/50 border-slate-800 group-hover:bg-slate-900 group-hover:border-slate-700 opacity-80'
                            }`}>
                                <div className="text-xs font-mono font-bold text-slate-400 mb-1">{item.time}</div>
                                <div className={`text-sm font-bold mb-1 truncate ${
                                    item.type === 'work' ? 'text-blue-400' :
                                    item.type === 'meeting' ? 'text-purple-400' :
                                    'text-green-400'
                                }`}>{item.title}</div>
                                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{item.duration}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Timeline;
