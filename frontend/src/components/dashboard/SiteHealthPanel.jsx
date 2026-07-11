/**
 * Admin Dashboard Site Health Panel Component.
 * @module components/dashboard/SiteHealthPanel
 */
import React from 'react';
import { Activity, ShieldCheck, AlertCircle, FileText, Percent } from 'lucide-react';

/**
 * Renders a row of system diagnostic cards including database uptime, form submission success rates, and top page traffic.
 * 
 * @param {Object} props - React component props.
 * @param {Object} [props.healthData] - Aggregate system health statistics.
 * @param {number} [props.healthData.formSubmissionSuccessRate] - Percentage of successful forms.
 * @param {Array} [props.healthData.pageTraffic] - Array of page view count objects.
 * @param {boolean} [props.healthData.uptimeIndicator] - Boolean indicating backend DB health status.
 * @param {boolean} [props.loading=false] - Whether the data is currently fetching.
 * @returns {React.ReactElement} The rendered health diagnostics panels.
 */
const SiteHealthPanel = ({ healthData, loading = false }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-slate-100 p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-academic-maroon"></div>
      </div>
    );
  }

  if (!healthData) {
    return (
      <div className="bg-white rounded-lg border border-slate-100 p-6 text-center text-slate-400">
        Health diagnostics unavailable.
      </div>
    );
  }

  const { formSubmissionSuccessRate = 0, pageTraffic = [], uptimeIndicator = true } = healthData;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Uptime Indicator Card */}
      <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">System Status</span>
            <Activity className={uptimeIndicator ? 'text-emerald-500' : 'text-rose-500'} size={20} />
          </div>
          <h4 className="text-lg font-bold text-academic-navy">Platform Health</h4>
          <p className="text-xs text-slate-400 mt-1">Real-time status check on backend server components.</p>
        </div>
        <div className="mt-6 flex items-center gap-3">
          {uptimeIndicator ? (
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-bold text-emerald-600 flex items-center gap-1">
                <ShieldCheck size={16} />
                ONLINE / HEALTHY
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </span>
              <span className="text-sm font-bold text-rose-600 flex items-center gap-1">
                <AlertCircle size={16} />
                DEGRADED
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Form Submission Success Rate Card */}
      <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Forms Health</span>
            <Percent className="text-academic-maroon" size={20} />
          </div>
          <h4 className="text-lg font-bold text-academic-navy">Form Success Rate</h4>
          <p className="text-xs text-slate-400 mt-1">Percentage of form submission events recorded without error.</p>
        </div>
        <div className="mt-6">
          <div className="flex items-end justify-between mb-1.5">
            <span className="text-2xl font-black text-slate-800">
              {Number(formSubmissionSuccessRate).toFixed(1)}%
            </span>
            <span className="text-xs text-slate-500">Target: &gt;95%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                formSubmissionSuccessRate >= 95
                  ? 'bg-emerald-500'
                  : formSubmissionSuccessRate >= 80
                  ? 'bg-amber-500'
                  : 'bg-rose-500'
              }`}
              style={{ width: `${formSubmissionSuccessRate}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Page view traffic card */}
      <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm flex flex-col h-[280px]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Top Page Traffic</span>
          <FileText className="text-academic-gold" size={20} />
        </div>
        <div className="overflow-y-auto flex-1 text-xs">
          {pageTraffic.length === 0 ? (
            <div className="flex h-full items-center justify-center text-slate-400 italic">
              No traffic views recorded.
            </div>
          ) : (
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-50 sticky top-0">
                <tr>
                  <th className="px-3 py-2 text-left text-[10px] font-semibold text-slate-500 uppercase">Path</th>
                  <th className="px-3 py-2 text-right text-[10px] font-semibold text-slate-500 uppercase">Views</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {pageTraffic.map((traffic, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-3 py-2 text-slate-600 truncate max-w-[150px]" title={traffic.pagePath}>
                      {traffic.pagePath}
                    </td>
                    <td className="px-3 py-2 text-right font-semibold text-slate-800">
                      {traffic.viewCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default SiteHealthPanel;
