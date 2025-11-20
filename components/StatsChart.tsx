import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '09:00', focus: 20 },
  { time: '10:00', focus: 65 },
  { time: '11:00', focus: 85 },
  { time: '12:00', focus: 45 },
  { time: '13:00', focus: 30 },
  { time: '14:00', focus: 75 },
  { time: '15:00', focus: 90 },
  { time: '16:00', focus: 60 },
];

const StatsChart: React.FC = () => {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorFocus" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc' }}
            itemStyle={{ color: '#3b82f6' }}
          />
          <Area type="monotone" dataKey="focus" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorFocus)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsChart;