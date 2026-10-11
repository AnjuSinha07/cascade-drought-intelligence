'use client';

import { useState } from 'react';

type Priority = 'High' | 'Medium' | 'Low';
type Category = 'All' | 'Water' | 'Agriculture' | 'Monitoring';

interface Recommendation {
  id: string;
  category: Category;
  priority: Priority;
  title: string;
  desc: string;
  why: string;
  icon: string;
  detailedSteps: string[];
}

const RECOMMENDATIONS: Recommendation[] = [
  { 
    id: 'r1', 
    category: 'Water', 
    priority: 'High', 
    title: 'Prioritize water conservation', 
    desc: 'Review water use and identify opportunities to reduce avoidable losses across the watershed.', 
    why: 'Useful when water availability is under pressure.', 
    icon: '💧',
    detailedSteps: [
      'Audit main distribution channels for structural leakage or unmetered extraction points.',
      'Enforce tier-1 restrictions on non-essential commercial runoff.',
      'Deploy automated shutoff valves at high-stress diversion junctions.'
    ]
  },
  { 
    id: 'r2', 
    category: 'Agriculture', 
    priority: 'High', 
    title: 'Review irrigation schedules', 
    desc: 'Use local soil moisture and weather information to guide irrigation decisions.', 
    why: 'Helps inform water-efficient farm planning.', 
    icon: '🌱',
    detailedSteps: [
      'Calibrate soil moisture telemetry probes across upper agricultural plots.',
      'Shift scheduled flood irrigation to evening or nocturnal time slots to minimize evaporation.',
      'Provide district farmers with updated soil-water retention advisory alerts.'
    ]
  },
  { 
    id: 'r3', 
    category: 'Monitoring', 
    priority: 'Medium', 
    title: 'Monitor soil moisture', 
    desc: 'Track soil moisture readings over time to help identify changing conditions.', 
    why: 'Helps detect changes in soil water availability.', 
    icon: '📡',
    detailedSteps: [
      'Inspect subsurface sensor nodes for battery integrity and signal continuity.',
      'Compare current volumetric water content against 5-year historical drought benchmarks.',
      'Generate automated weekly subsurface depletion trend logs for field teams.'
    ]
  },
  { 
    id: 'r4', 
    category: 'Agriculture', 
    priority: 'Medium', 
    title: 'Review crop water requirements', 
    desc: 'Review crop stage, local conditions, and available agricultural guidance before making planting decisions.', 
    why: 'Supports informed agricultural planning.', 
    icon: '🌾',
    detailedSteps: [
      'Assess current crop growth cycles against predicted seasonal precipitation deficits.',
      'Recommend drought-tolerant crop rotation variants for secondary plots.',
      'Consult regional agronomy boards regarding optimized fertilizer-to-water ratios.'
    ]
  },
  { 
    id: 'r5', 
    category: 'Water', 
    priority: 'Medium', 
    title: 'Review water storage readiness', 
    desc: 'Review storage capacity, infrastructure condition, and local water management plans.', 
    why: 'Supports preparation for periods of low water availability.', 
    icon: '🌊',
    detailedSteps: [
      'Measure current silt accumulation levels in primary holding basins.',
      'Test emergency backup generator systems at main reservoir pumping stations.',
      'Verify auxiliary valve seal integrity to prevent seepage during low-flow periods.'
    ]
  },
  { 
    id: 'r6', 
    category: 'Monitoring', 
    priority: 'Low', 
    title: 'Strengthen drought monitoring', 
    desc: 'Maintain a consistent record of rainfall, reservoir levels, and watershed indicators.', 
    why: 'Improves visibility into changing watershed conditions.', 
    icon: '📊',
    detailedSteps: [
      'Standardize rain gauge data logging intervals across all monitoring stations.',
      'Archive monthly telemetry snapshots into cold storage for long-term analytics.',
      'Conduct cross-validation checks between satellite imagery feeds and ground sensor grids.'
    ]
  },
];

export default function RecommendationsPage() {
  const [filterCat, setFilterCat] = useState<Category>('All');
  const [reviewedIds, setReviewedIds] = useState<string[]>([]);
  const [activeModalId, setActiveModalId] = useState<string | null>(null);

  const handleReview = (id: string) => {
    setReviewedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredRecs = filterCat === 'All' ? RECOMMENDATIONS : RECOMMENDATIONS.filter(r => r.category === filterCat);
  const highPriorityCount = RECOMMENDATIONS.filter(r => r.priority === 'High').length;

  const getPriorityStyle = (priority: Priority) => {
    switch (priority) {
      case 'High': return 'bg-red-950/40 text-red-400 border-red-900/60 shadow-[0_0_12px_rgba(239,68,68,0.2)]';
      case 'Medium': return 'bg-amber-950/40 text-amber-400 border-amber-900/60 shadow-[0_0_10px_rgba(245,158,11,0.2)]';
      case 'Low': return 'bg-emerald-950/40 text-emerald-400 border-emerald-900/60 shadow-[0_0_10px_rgba(16,185,129,0.2)]';
    }
  };

  return (
    <main className="min-h-screen bg-[#06110D] p-5 text-emerald-50 md:p-8 font-sans overflow-x-hidden">
      
      {/* Header */}
      <header className="flex justify-between items-end mb-6 border-b border-emerald-900/40 pb-5">
        <div>
          <p className="text-[10px] text-emerald-500 uppercase tracking-widest font-semibold mb-1">CASCADE / Decision Support</p>
          <h1 className="text-2xl font-bold tracking-wide text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
            Recommendations
          </h1>
          <p className="text-xs text-emerald-400/80 mt-1">
            Explore practical actions for water conservation, agricultural planning, and drought preparedness.
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-lg border border-emerald-800/50 bg-[#0A1713] text-[10px] text-emerald-400 uppercase flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Demo recommendations
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="glass-panel bg-[#091510] p-5 rounded-2xl border border-emerald-900/50">
          <div className="text-[10px] uppercase tracking-wider text-emerald-500 mb-2">Available suggestions</div>
          <div className="text-3xl font-mono font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]">{RECOMMENDATIONS.length}</div>
          <div className="text-xs text-emerald-600/80 mt-1">Across three categories</div>
        </div>
        <div className="glass-panel bg-red-950/10 p-5 rounded-2xl border border-red-900/40 shadow-[inset_0_0_20px_rgba(239,68,68,0.05)]">
          <div className="text-[10px] uppercase tracking-wider text-red-400/80 mb-2">High-priority suggestions</div>
          <div className="text-3xl font-mono font-bold text-red-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">{highPriorityCount}</div>
          <div className="text-xs text-red-500/70 mt-1">Illustrative priorities</div>
        </div>
        <div className="glass-panel bg-[#091510] p-5 rounded-2xl border border-emerald-900/50">
          <div className="text-[10px] uppercase tracking-wider text-emerald-500 mb-2">Marked reviewed</div>
          <div className="text-3xl font-mono font-bold text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]">{reviewedIds.length}</div>
          <div className="text-xs text-emerald-600/80 mt-1">{RECOMMENDATIONS.length - reviewedIds.length} still to review</div>
        </div>
      </div>

      {/* Filters Area */}
      <div className="glass-panel bg-[#091510] p-5 rounded-2xl border border-emerald-900/50 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-sm font-semibold tracking-wide uppercase text-emerald-100">Suggested actions</h2>
          <p className="text-[10px] text-emerald-500 mt-1">Filter suggestions to find relevant actions.</p>
        </div>
        <div className="flex gap-2 bg-[#06110D] p-1.5 rounded-lg border border-emerald-800/40 shadow-inner">
          {(['All', 'Water', 'Agriculture', 'Monitoring'] as Category[]).map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${filterCat === cat ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_10px_rgba(56,189,248,0.3)]' : 'text-emerald-500 hover:text-emerald-300 border border-transparent'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Action Cards Grid with Relative Card-Scoped Popup Modal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 items-stretch">
        {filteredRecs.map((rec) => {
          const isReviewed = reviewedIds.includes(rec.id);
          const isModalOpen = activeModalId === rec.id;
          
          return (
            <div key={rec.id} className={`relative flex flex-col justify-between glass-panel p-6 rounded-2xl border transition-all duration-300 ${isReviewed ? 'border-emerald-800/50 bg-[#07130F] opacity-60' : 'border-emerald-700/40 bg-emerald-950/20 hover:bg-emerald-900/30 hover:border-emerald-500/50 shadow-[0_4px_20px_rgba(0,0,0,0.2)]'}`}>
              
              <div>
                <div className="flex justify-between items-start mb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-900/40 border border-emerald-700/50 flex items-center justify-center text-2xl shadow-[inset_0_0_12px_rgba(16,185,129,0.2)]">
                      {rec.icon}
                    </div>
                    <div>
                      <div className="text-[10px] text-emerald-400 uppercase tracking-widest font-semibold mb-0.5">{rec.category}</div>
                      <h3 className={`text-lg font-bold ${isReviewed ? 'text-emerald-400/60 line-through' : 'text-white drop-shadow-sm'}`}>{rec.title}</h3>
                    </div>
                  </div>
                  <span className={`shrink-0 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold border ${getPriorityStyle(rec.priority)}`}>
                    {rec.priority}
                  </span>
                </div>
                
                <p className="text-sm text-emerald-100/80 mb-6 leading-relaxed">
                  {rec.desc}
                </p>

                <div className="bg-emerald-900/20 border border-emerald-800/50 rounded-xl p-4 mb-6 shadow-inner">
                  <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1.5 flex items-center gap-2">
                    <span className="text-cyan-400">💡</span> Why it may help
                  </h4>
                  <p className="text-xs text-emerald-200/90 leading-relaxed">{rec.why}</p>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-5 border-t border-emerald-800/30 flex gap-3 mt-auto">
                <button 
                  onClick={() => setActiveModalId(isModalOpen ? null : rec.id)}
                  className="flex-1 px-5 py-2.5 rounded-lg border border-cyan-700/50 text-xs font-semibold text-cyan-400 bg-cyan-950/20 hover:bg-cyan-900/40 hover:text-cyan-300 hover:shadow-[0_0_12px_rgba(34,211,238,0.2)] transition-all cursor-pointer"
                >
                  {isModalOpen ? 'Hide steps' : 'View next steps'}
                </button>
                <button 
                  onClick={() => handleReview(rec.id)}
                  className={`flex-1 px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isReviewed 
                      ? 'bg-[#06110D] text-emerald-600 border border-emerald-900/50' 
                      : 'bg-gradient-to-r from-cyan-600 to-blue-600 border border-cyan-400/50 text-white shadow-[0_0_10px_rgba(34,211,238,0.2)] hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:brightness-110'
                  }`}
                >
                  {isReviewed ? '✓ Reviewed' : 'Mark reviewed'}
                </button>
              </div>

              {/* Card-Scoped Floating Popup Modal (Opens right over the respective card) */}
              {isModalOpen && (
                <div className="absolute inset-0 z-20 bg-[#06110D]/95 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-between border border-cyan-500/50 shadow-2xl animate-fadeIn">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">Execution Protocol</span>
                      <button 
                        onClick={() => setActiveModalId(null)}
                        className="text-emerald-400 hover:text-white text-xs font-bold px-2 py-1 rounded bg-emerald-900/40 border border-emerald-700/50 cursor-pointer"
                      >
                        ✕ Close
                      </button>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-3">{rec.title}</h4>
                    <div className="space-y-2 text-xs text-emerald-200/90 bg-[#040D09] p-3 rounded-xl border border-emerald-900/40">
                      <p className="font-semibold text-cyan-300">Specific Roadmap Steps:</p>
                      <ul className="list-disc pl-4 space-y-1.5 text-emerald-400/80">
                        {rec.detailedSteps.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-emerald-900/40 flex justify-end">
                    <button 
                      onClick={() => setActiveModalId(null)}
                      className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold cursor-pointer shadow-md"
                    >
                      Done Viewing
                    </button>
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Warning Banner */}
      <div className="mt-8 border border-emerald-800/50 bg-[#081812] rounded-xl p-4 flex gap-3 shadow-inner">
        <span className="text-emerald-500">ℹ️</span>
        <p className="text-xs text-emerald-400/80 leading-relaxed">
          <strong className="text-emerald-300">Prototype note:</strong> These suggestions are illustrative.
        </p>
      </div>

    </main>
  );
}