/**
 * Public Placement Statistics Component.
 * @module components/public/PlacementStat
 */
import React from 'react';
import { Award, TrendingUp, Briefcase } from 'lucide-react';
import { formatCurrency, formatPackage } from '../../utils/formatters';

/**
 * Renders a row of high-level placement achievement metrics (Total Placed, Avg Package, Top Recruiters).
 * 
 * @param {Object} props - React component props.
 * @param {Object} [props.summary] - The aggregated placement metrics object.
 * @param {number} [props.summary.totalPlaced] - The total number of students placed.
 * @param {number} [props.summary.avgPackage] - The average salary package in LPA.
 * @param {Array<string>} [props.summary.topRecruiters] - List of top hiring companies.
 * @param {boolean} [props.loading=false] - Whether the data is currently being fetched (shows skeleton loader).
 * @returns {React.ReactElement|null} The rendered statistics panels, skeleton loaders, or null if empty.
 */
const PlacementStat = ({ summary, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3].map((n) => (
          <div key={n} className="bg-white p-6 rounded-lg border border-slate-200 h-28"></div>
        ))}
      </div>
    );
  }

  if (!summary) {
    return null;
  }

  const { totalPlaced = 0, avgPackage = 0, topRecruiters = [] } = summary;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Placed Card */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="bg-academic-navy/5 p-3 rounded-lg text-academic-navy">
          <Briefcase size={24} />
        </div>
        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Students Placed</span>
          <span className="text-2xl font-black text-slate-800">{totalPlaced} +</span>
        </div>
      </div>

      {/* Average Salary Card */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="bg-academic-maroon/5 p-3 rounded-lg text-academic-maroon">
          <TrendingUp size={24} />
        </div>
        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Average CTC Package</span>
          <span className="text-2xl font-black text-slate-800">{formatPackage(avgPackage)}</span>
        </div>
      </div>

      {/* Top Recruiter List */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="bg-academic-gold/10 p-3 rounded-lg text-[#b08b26]">
          <Award size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Key Recruiting Partners</span>
          <div className="text-xs text-slate-700 font-bold truncate">
            {topRecruiters.length > 0 ? topRecruiters.join(', ') : 'Infosys, TCS, Wipro, Google'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementStat;
