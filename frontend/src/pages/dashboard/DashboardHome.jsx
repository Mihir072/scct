import React, { useState, useCallback } from 'react';
import { getAdminLeadsSummary } from '../../api/leads';
import { getSiteHealth } from '../../api/dashboard';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import usePolling from '../../hooks/usePolling';
import { Users, ClipboardList, CheckSquare, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/shared/Button';

const POLL_INTERVAL = 30000; // 30 seconds

const DashboardHome = () => {
  const [summary, setSummary] = useState(null);
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchDashboardTelemetry = useCallback(async () => {
    try {
      const [sumData, healthData] = await Promise.all([
        getAdminLeadsSummary(),
        getSiteHealth(),
      ]);
      setSummary(sumData);
      setHealth(healthData);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Failed to load dashboard metrics:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Poll every 30 s — first call is immediate (no manual useEffect needed)
  usePolling(fetchDashboardTelemetry, POLL_INTERVAL);

  if (loading) {
    return <LoadingSpinner className="py-20" />;
  }

  const { totalLeads = 0, statusBreakdown = {}, sourceBreakdown = {} } = summary || {};
  const { formSubmissionSuccessRate = 0, uptimeIndicator = true } = health || {};

  // Compute key stats for dashboard KPIs
  const newLeads = statusBreakdown['NEW'] || 0;
  const contactedLeads = statusBreakdown['CONTACTED'] || 0;
  const admittedLeads = statusBreakdown['ADMITTED'] || 0;

  const kpis = [
    {
      title: 'Total Enquiries',
      value: totalLeads,
      icon: <Users className="text-academic-navy" size={20} />,
      bg: 'bg-blue-50 border-blue-100',
    },
    {
      title: 'New / Unprocessed',
      value: newLeads,
      icon: <ClipboardList className="text-amber-600" size={20} />,
      bg: 'bg-amber-50 border-amber-100',
    },
    {
      title: 'Successfully Admitted',
      value: admittedLeads,
      icon: <CheckSquare className="text-emerald-600" size={20} />,
      bg: 'bg-emerald-50 border-emerald-100',
    },
    {
      title: 'Form Health Rate',
      value: `${Number(formSubmissionSuccessRate).toFixed(1)}%`,
      icon: <Activity className="text-academic-maroon" size={20} />,
      bg: 'bg-rose-50 border-rose-100',
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Title block */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-academic-navy">Workspace Overview</h1>
          <p className="text-xs text-slate-400">General KPI metrics and lead conversion summary.</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
          LIVE{lastUpdated && ` · ${lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`}
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <div key={idx} className={`p-5 rounded-lg border shadow-sm flex justify-between items-center bg-white ${kpi.bg}`}>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{kpi.title}</span>
              <span className="text-2xl font-black text-slate-800">{kpi.value}</span>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">{kpi.icon}</div>
          </div>
        ))}
      </div>

      {/* Breakdowns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Pipeline distribution */}
        <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm flex flex-col gap-4">
          <div>
            <h3 className="text-sm font-bold text-academic-navy uppercase tracking-wider">Leads status breakdown</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Distribution of candidate leads across process stages.</p>
          </div>

          <div className="flex flex-col gap-2">
            {Object.keys(statusBreakdown).length === 0 ? (
              <p className="text-xs text-slate-400 italic py-6 text-center">No status records.</p>
            ) : (
              Object.entries(statusBreakdown).map(([status, count]) => {
                const percentage = totalLeads > 0 ? (count / totalLeads) * 100 : 0;
                return (
                  <div key={status} className="flex flex-col gap-1 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-slate-700 uppercase tracking-wider text-[10px]">
                        {status.replace(/_/g, ' ')}
                      </span>
                      <span className="font-mono font-bold text-slate-800">{count} ({percentage.toFixed(0)}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-academic-navy h-full rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Source Channels distribution */}
        <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm flex flex-col gap-4">
          <div>
            <h3 className="text-sm font-bold text-academic-navy uppercase tracking-wider">Lead Acquisition Channels</h3>
            <p className="text-[10px] text-slate-400 mt-0.5 font-sans">Performance distribution across marketing channels.</p>
          </div>

          <div className="flex flex-col gap-2">
            {Object.keys(sourceBreakdown).length === 0 ? (
              <p className="text-xs text-slate-400 italic py-6 text-center">No source records.</p>
            ) : (
              Object.entries(sourceBreakdown).map(([source, count]) => {
                const percentage = totalLeads > 0 ? (count / totalLeads) * 100 : 0;
                return (
                  <div key={source} className="flex flex-col gap-1 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-slate-700 uppercase tracking-wider text-[10px]">
                        {source.replace(/_/g, ' ')}
                      </span>
                      <span className="font-mono font-bold text-slate-800">{count} ({percentage.toFixed(0)}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-academic-maroon h-full rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="bg-slate-100/50 rounded-xl p-6 border border-slate-200/50 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="flex flex-col items-center p-4 bg-white rounded border border-slate-100 gap-2">
          <span className="text-xs font-bold text-academic-navy uppercase tracking-wider">Manage Leads</span>
          <p className="text-[10px] text-slate-400 leading-normal">Review registrations, follow up and execute status state changes.</p>
          <Link to="/dashboard/leads" className="mt-2 w-full">
            <Button variant="outline" size="sm" className="w-full text-xs">View Leads Table</Button>
          </Link>
        </div>

        <div className="flex flex-col items-center p-4 bg-white rounded border border-slate-100 gap-2">
          <span className="text-xs font-bold text-academic-navy uppercase tracking-wider">Conversion Analytics</span>
          <p className="text-[10px] text-slate-400 leading-normal">Visualize lead dropoff funnel graphs and recruiter data.</p>
          <Link to="/dashboard/funnel" className="mt-2 w-full">
            <Button variant="outline" size="sm" className="w-full text-xs">View Funnel Charts</Button>
          </Link>
        </div>

        <div className="flex flex-col items-center p-4 bg-white rounded border border-slate-100 gap-2">
          <span className="text-xs font-bold text-academic-navy uppercase tracking-wider">Site Health Status</span>
          <p className="text-[10px] text-slate-400 leading-normal">Check silent web page traffic records and form errors list.</p>
          <Link to="/dashboard/health" className="mt-2 w-full">
            <Button variant="outline" size="sm" className="w-full text-xs">View Health Stats</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
