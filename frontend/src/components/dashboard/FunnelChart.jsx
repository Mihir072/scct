import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';

const FunnelChart = ({ data = [], loading = false }) => {
  if (loading) {
    return (
      <div className="h-80 flex items-center justify-center bg-white rounded-lg border border-slate-100">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-academic-maroon"></div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center bg-white rounded-lg border border-slate-100 text-slate-400 italic">
        No funnel stages data available.
      </div>
    );
  }

  // Pre-arrange colors for stages
  const colors = [
    '#3b82f6', // NEW: Blue
    '#6366f1', // CONTACTED: Indigo
    '#f59e0b', // APPLICATION_STARTED: Amber
    '#14b8a6', // APPLICATION_SUBMITTED: Teal
    '#10b981', // ADMITTED: Emerald
  ];

  // Map the stage names to readable names
  const chartData = data.map((item) => ({
    ...item,
    displayName: item.stage.replace(/_/g, ' '),
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-slate-800 text-white p-3 rounded shadow-lg text-xs flex flex-col gap-1 border border-slate-700">
          <p className="font-bold">{dataPoint.displayName}</p>
          <p>Leads Count: <span className="font-mono font-semibold">{dataPoint.count}</span></p>
          {dataPoint.dropOffPercentage > 0 && (
            <p className="text-red-300 font-semibold">
              Drop-off: {dataPoint.dropOffPercentage.toFixed(1)}%
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
      <div className="mb-4">
        <h4 className="text-base font-bold text-academic-navy">Recruitment Conversion Funnel</h4>
        <p className="text-xs text-slate-400">Total volume of leads processing through stages and percentage loss between them.</p>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 20, right: 40, left: 40, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
            <XAxis type="number" stroke="#94a3b8" fontSize={12} tickLine={false} />
            <YAxis
              dataKey="displayName"
              type="category"
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              width={140}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={30}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
              <LabelList
                dataKey="count"
                position="right"
                style={{ fill: '#334155', fontSize: 11, fontWeight: 'bold' }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Funnel Dropoff Indicators */}
      <div className="mt-4 grid grid-cols-5 text-center text-[10px] text-slate-400 border-t border-slate-50 pt-3">
        {chartData.map((entry, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <span className="font-semibold text-slate-600 block leading-tight">{entry.displayName}</span>
            {idx > 0 && entry.dropOffPercentage !== undefined ? (
              <span className="text-red-500 font-bold mt-1">
                ↓ {entry.dropOffPercentage.toFixed(0)}% drop
              </span>
            ) : (
              <span className="text-emerald-500 font-bold mt-1">Start</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FunnelChart;
