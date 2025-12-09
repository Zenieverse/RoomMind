import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { SpatialAnchor } from '../types';
import { MOCK_ANCHORS } from '../constants';
import { RefreshCw, Maximize, ScanLine, CheckCircle2 } from 'lucide-react';
import { analyzeRoomLayout } from '../services/geminiService';

interface PlacedItem {
    name: string;
    type: string;
    parentAnchorId: string;
    reason: string;
}

const RoomMap: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [placements, setPlacements] = useState<PlacedItem[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Initial Draw
  useEffect(() => {
    drawMap();
  }, [placements]); // Redraw when placements change

  const drawMap = () => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // 1. Grid Background
    const defs = svg.append("defs");
    const gridPattern = defs.append("pattern")
        .attr("id", "grid")
        .attr("width", 40)
        .attr("height", 40)
        .attr("patternUnits", "userSpaceOnUse");
    
    gridPattern.append("path")
        .attr("d", "M 40 0 L 0 0 0 40")
        .attr("fill", "none")
        .attr("stroke", "#1e293b")
        .attr("stroke-width", 1);

    svg.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "url(#grid)");

    // 2. Draw Anchors
    MOCK_ANCHORS.forEach((anchor) => {
      const g = svg.append("g")
        .attr("transform", `translate(${anchor.position.x}, ${anchor.position.y})`);

      // Anchor Shape
      if (anchor.type === 'Table') {
        g.append("rect")
          .attr("width", anchor.dimensions.width)
          .attr("height", anchor.dimensions.height)
          .attr("fill", "rgba(20, 184, 166, 0.1)")
          .attr("stroke", "#14b8a6")
          .attr("stroke-width", 2)
          .attr("rx", 4);
      } else if (anchor.type === 'Wall') {
        g.append("line")
          .attr("x1", 0).attr("y1", 0).attr("x2", anchor.dimensions.width).attr("y2", 0)
          .attr("stroke", "#94a3b8").attr("stroke-width", 6).attr("stroke-linecap", "round");
        
        // Wall projection hint
        g.append("path")
            .attr("d", `M 0 0 L 20 40 L ${anchor.dimensions.width - 20} 40 L ${anchor.dimensions.width} 0`)
            .attr("fill", "rgba(148, 163, 184, 0.05)");
      } else if (anchor.type === 'OpenSpace') {
         g.append("circle")
          .attr("cx", anchor.dimensions.width / 2)
          .attr("cy", anchor.dimensions.height / 2)
          .attr("r", anchor.dimensions.width / 2)
          .attr("fill", "rgba(59, 130, 246, 0.05)")
          .attr("stroke", "#3b82f6")
          .attr("stroke-dasharray", "4");
      }

      // Anchor Label
      g.append("text")
        .attr("x", anchor.dimensions.width / 2)
        .attr("y", anchor.type === 'Wall' ? -10 : anchor.dimensions.height / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", "#64748b")
        .attr("font-size", "10px")
        .attr("font-family", "monospace")
        .text(anchor.label);
    });

    // 3. Draw AI Suggested Placements
    placements.forEach((item, i) => {
        const parent = MOCK_ANCHORS.find(a => a.id === item.parentAnchorId);
        if (!parent) return;

        const g = svg.append("g")
            .attr("transform", `translate(${parent.position.x}, ${parent.position.y})`)
            .attr("class", "hologram-item");

        // Animate in
        g.style("opacity", 0).transition().duration(800).delay(i * 200).style("opacity", 1);

        if (item.type === 'Board') {
            // Draw a board on the wall
            const boardWidth = Math.min(120, parent.dimensions.width - 20);
            g.append("rect")
                .attr("x", (parent.dimensions.width - boardWidth) / 2)
                .attr("y", 10) // Offset from wall
                .attr("width", boardWidth)
                .attr("height", 60)
                .attr("fill", "rgba(59, 130, 246, 0.2)")
                .attr("stroke", "#3b82f6")
                .attr("stroke-width", 2)
                .attr("rx", 2)
                .attr("filter", "drop-shadow(0 0 4px #3b82f6)");
                
            g.append("text").attr("x", parent.dimensions.width/2).attr("y", 40).attr("text-anchor", "middle").attr("fill", "#fff").attr("font-size", "10px").text("Task Board");

        } else if (item.type === 'Timeline') {
            // Draw timeline strip on table
            g.append("rect")
                .attr("x", 10)
                .attr("y", parent.dimensions.height / 2 - 10)
                .attr("width", parent.dimensions.width - 20)
                .attr("height", 20)
                .attr("rx", 10)
                .attr("fill", "rgba(168, 85, 247, 0.2)")
                .attr("stroke", "#a855f7");
            
            g.append("text").attr("x", parent.dimensions.width/2).attr("y", parent.dimensions.height/2 + 3).attr("text-anchor", "middle").attr("fill", "#fff").attr("font-size", "9px").text("Timeline");

        } else if (item.type === 'Sphere') {
            // Focus sphere in open space
            g.append("circle")
                .attr("cx", parent.dimensions.width / 2)
                .attr("cy", parent.dimensions.height / 2)
                .attr("r", 20)
                .attr("fill", "url(#sphereGradient)")
                .attr("filter", "blur(4px)");

            // Define radial gradient for sphere if not exists
            const grad = defs.append("radialGradient").attr("id", "sphereGradient");
            grad.append("stop").attr("offset", "0%").attr("stop-color", "#fff");
            grad.append("stop").attr("offset", "100%").attr("stop-color", "#3b82f6");

            g.append("circle")
                .attr("cx", parent.dimensions.width / 2)
                .attr("cy", parent.dimensions.height / 2)
                .attr("r", 20)
                .attr("fill", "none")
                .attr("stroke", "#fff")
                .attr("stroke-width", 1);
        }
    });
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    const layoutDesc = MOCK_ANCHORS.map(a => `ID:${a.id} Label:${a.label} Type:${a.type} Size:${a.dimensions.width}x${a.dimensions.height}`).join('; ');
    
    // Simulate API or use real one
    const result = await analyzeRoomLayout(layoutDesc);
    if (result && result.placements) {
        setPlacements(result.placements);
    }
    setIsAnalyzing(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-full flex flex-col shadow-xl shadow-black/20">
      <div className="flex justify-between items-center mb-6">
        <div>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <ScanLine className="text-blue-400" size={20}/>
                Environment Scanner
            </h3>
            <p className="text-sm text-slate-400">Passthrough Semantic Map • {MOCK_ANCHORS.length} Anchors</p>
        </div>
        <button 
            onClick={handleAnalyze} 
            disabled={isAnalyzing}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                placements.length > 0 
                ? "bg-green-500/10 text-green-400 border border-green-500/30" 
                : "bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
            }`}
        >
            {isAnalyzing ? <RefreshCw className="animate-spin" size={16} /> : placements.length > 0 ? <CheckCircle2 size={16}/> : <Maximize size={16} />}
            {isAnalyzing ? "Scanning..." : placements.length > 0 ? "Optimized" : "Auto-Place Holograms"}
        </button>
      </div>

      <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden relative flex items-center justify-center shadow-inner group">
        <svg ref={svgRef} width="600" height="400" className="w-full h-full opacity-90 transition-opacity duration-700"></svg>
        
        <div className="absolute top-4 left-4 font-mono text-[10px] text-blue-500/50 pointer-events-none">
            FRAME: 20492<br/>
            LIDAR: ACTIVE
        </div>
      </div>

      {placements.length > 0 && (
        <div className="mt-4 p-4 bg-slate-800/50 border border-slate-700 rounded-xl animate-in fade-in slide-in-from-bottom-4 duration-500 max-h-32 overflow-y-auto">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Configuration Strategy</h4>
            <div className="grid grid-cols-1 gap-2">
                {placements.map((p, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-blue-400 mt-0.5">›</span>
                        <span>Placed <b>{p.name}</b> on {MOCK_ANCHORS.find(a=>a.id === p.parentAnchorId)?.label}: <span className="text-slate-500 italic">{p.reason}</span></span>
                    </div>
                ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default RoomMap;