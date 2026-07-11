/**
 * Admin Site Health & Traffic Page.
 * @module pages/dashboard/SiteHealth
 */
import React, { useState, useCallback } from 'react';
import { getSiteHealth } from '../../api/dashboard';
import SiteHealthPanel from '../../components/dashboard/SiteHealthPanel';
import Input from '../../components/shared/Input';
import Button from '../../components/shared/Button';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import usePolling from '../../hooks/usePolling';

/**
 * Renders the system diagnostics page to monitor web traffic, backend DB uptime, and form error rates.
 * Provides date-range filters to bound the displayed metrics.
 * 
 * @returns {React.ReactElement} The rendered diagnostics page.
 */
const SiteHealth = () => {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Set default range: last 30 days
  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const formatDateString = (date) => {
    return date.toISOString().split('T')[0];
  };

  const [fromFilter, setFromFilter] = useState(formatDateString(thirtyDaysAgo));
  const [toFilter, setToFilter] = useState(formatDateString(today));

  const [lastUpdated, setLastUpdated] = useState(null);

  const loadHealthDiagnostics = useCallback(async () => {
    setLoading(true);
    try {
      const isoFrom = fromFilter ? new Date(fromFilter).toISOString() : null;
      const isoTo = toFilter ? new Date(toFilter).toISOString() : null;
      const data = await getSiteHealth(isoFrom, isoTo);
      setHealthData(data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Failed to retrieve system health metrics:', err);
    } finally {
      setLoading(false);
    }
  }, [fromFilter, toFilter]);

  // Auto-refresh every 30s using the current date range
  usePolling(loadHealthDiagnostics, 30000, [fromFilter, toFilter]);

  const handleApplyRange = (e) => {
    e.preventDefault();
    loadHealthDiagnostics();
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Title */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-academic-navy">Platform Diagnostics & Traffic</h1>
          <p className="text-xs text-slate-400">System health statistics, page view totals, and form error audits.</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
          LIVE{lastUpdated && ` · ${lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`}
        </div>
      </div>

      {/* Date Picker Form */}
      <div className="bg-white border border-slate-100 p-5 rounded-lg shadow-sm">
        <form onSubmit={handleApplyRange} className="flex flex-col sm:flex-row items-end gap-4 w-full">
          <Input
            label="From Date"
            id="from"
            type="date"
            value={fromFilter}
            onChange={(e) => setFromFilter(e.target.value)}
          />

          <Input
            label="To Date"
            id="to"
            type="date"
            value={toFilter}
            onChange={(e) => setToFilter(e.target.value)}
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full sm:w-auto h-[38px] px-6 text-xs whitespace-nowrap font-bold"
            disabled={loading}
          >
            Apply Range
          </Button>
        </form>
      </div>

      {/* Main Panel Content */}
      <SiteHealthPanel healthData={healthData} loading={loading} />
    </div>
  );
};

export default SiteHealth;
