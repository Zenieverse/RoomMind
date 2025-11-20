import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { SpatialAnchor } from '../types';
import { MOCK_ANCHORS } from '../constants';
import { RefreshCw, Maximize } from 'lucide-react';
import { analyzeRoomLayout } from '../services/geminiService';

const RoomMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [analysis, setAnalysis] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous

    const width = 600;
    const height = 400;
    
    // Grid background
    const gridSize = 40;
    for (let i = 0; i <= width; i += gridSize) {
      svg.append("line").attr("x1", i).attr("y1", 0).attr("x2", i).attr("y2", height).attr("stroke", "#1e293b").attr("stroke-width", 1);
    }
    for (let i = 0; i <= height; i += gridSize) {
      svg.append("line").attr("x1", 0).attr("y1", i).attr("x2", width).attr("y2", i).attr("stroke", "#1e293b").attr("stroke-width", 1);
    }

    // Draw Anchors
    MOCK_ANCHORS.forEach(anchor => {
      const g = svg.append("g")
        .attr("transform", `translate(${anchor.position.x}, ${anchor.position.y})`);

      // Shape based on type
      if (anchor.type === 'Table') {
        g.append("rect")
          .attr("width", anchor.dimensions.width)
          .attr("height", anchor.dimensions.height)
          .attr("fill", "rgba(20, 184, 166, 0.2)")
          .attr("stroke", "#14b8a6")
          .attr("stroke-width", 2)
          .attr("rx", 4);
      } else if (anchor.type === 'Wall') {
        g.append("line")
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", anchor.dimensions.width)
          .attr("y2", 0)
          .attr("stroke", "#64748b")
          .attr("stroke-width", 4)
          .attr("stroke-linecap", "round");
      } else if (anchor.type === 'OpenSpace') {
         g.append("circle")
          .attr("cx", anchor.dimensions.width / 2)
          .attr("cy", anchor.dimensions.height / 2)
          .attr("r", anchor.dimensions.width / 2)
          .attr("fill", "rgba(59, 130, 246, 0.1)")
          .attr("stroke", "#3b82f6")
          .attr("stroke-dasharray", "4")
          .attr("stroke-width", 1);
      }

      // Label
      g.append("text")
        .attr("x", anchor.type === 'Wall' ? anchor.dimensions.width / 2 : anchor.dimensions.width / 2)
        .attr("y", anchor.type === 'Wall' ? -10 : anchor.dimensions.height / 2 + 5)
        .attr("text-anchor", "middle")
        .attr("fill", "#94a3b8")
        .attr("font-size", "10px")
        .attr("font-family", "sans-serif")
        .text(anchor.label);
    });

  }, []);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    const layoutDesc = MOCK_ANCHORS.map(a => `${a.label} (${a.type}) at ${a.position.x},${a.position.y}`).join('; ');
    const result = await analyzeRoomLayout(layoutDesc);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
            <h3 className="text-lg font-semibold text-white">Spatial Map</h3>
            <p className="text-sm text-slate-400">Real-time Passthrough Semantics</p>
        </div>
        <button onClick={handleAnalyze} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-blue-400 px-4 py-2 rounded-lg text-sm transition-all">
            {isAnalyzing ? <RefreshCw className="animate-spin" size={16} /> : <Maximize size={16} />}
            AI Space Optimization
        </button>
      </div>

      <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden relative flex items-center justify-center">
        <svg ref={svgRef} width="600" height="400" className="w-full h-full"></svg>
        
        <div className="absolute bottom-4 left-4 flex flex-col gap-2 bg-slate-900/90 p-3 rounded-lg border border-slate-800 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs text-slate-400"><span className="w-3 h-1 bg-slate-500 rounded-full"></span> Wall</div>
            <div className="flex items-center gap-2 text-xs text-slate-400"><span className="w-3 h-3 bg-teal-500/20 border border-teal-500 rounded"></span> Table</div>
            <div className="flex items-center gap-2 text-xs text-slate-400"><span className="w-3 h-3 bg-blue-500/10 border border-blue-500 border-dashed rounded-full"></span> Zone</div>
        </div>
      </div>

      {analysis && (
        <div className="mt-4 p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
            <h4 className="text-sm font-semibold text-purple-400 mb-1">Gemini Recommendation</h4>
            <p className="text-sm text-slate-300 leading-relaxed">{analysis}</p>
        </div>
      )}
    </div>
  );
};

export default RoomMap;