/**
 * Admin Dashboard Conversion Chart Component.
 * @module components/dashboard/ConversionChart
 */
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

/**
 * Renders twin bar charts showing lead conversion rates broken down by course and by source.
 * Utilizes the 'recharts' library for rendering SVGs.
 * 
 * @param {Object} props - React component props.
 * @param {Object} [props.conversionData] - Aggregate conversion statistics.
 * @param {Array} [props.conversionData.courseConversion] - Array of course conversion objects.
 * @param {Array} [props.conversionData.sourceConversion] - Array of source conversion objects.
 * @param {boolean} [props.loading=false] - Whether the data is currently fetching.
 * @returns {React.ReactElement} The rendered dual bar charts or loading/empty states.
 */
const ConversionChart = ({ conversionData, loading = false }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-80 flex items-center justify-center bg-white rounded-lg border border-slate-100 p-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-academic-maroon"></div>
        </div>
        <div className="h-80 flex items-center justify-center bg-white rounded-lg border border-slate-100 p-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-academic-maroon"></div>
        </div>
      </div>
    );
  }

  if (!conversionData) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-slate-100 p-6 text-center text-slate-400 italic">
          No course conversion analytics.
        </div>
        <div className="bg-white rounded-lg border border-slate-100 p-6 text-center text-slate-400 italic">
          No source conversion analytics.
        </div>
      </div>
    );
  }

  const { courseConversion = [], sourceConversion = [] } = conversionData;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const rate = payload[0].value;
      return (
        <div className="bg-slate-800 text-white p-2 rounded shadow text-xs border border-slate-700">
          <p className="font-semibold">{payload[0].payload.name || payload[0].payload.courseName || payload[0].payload.source}</p>
          <p className="text-academic-gold font-bold">Rate: {Number(rate).toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Course Conversion Chart */}
      <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
        <div className="mb-4">
          <h4 className="text-base font-bold text-academic-navy">Conversion Rate by Course</h4>
          <p className="text-xs text-slate-400">Percentage of leads that transitioned to ADMITTED status per course.</p>
        </div>
        <div className="h-64 w-full">
          {courseConversion.length === 0 ? (
            <div className="h-full flex items-center justify-center text-slate-400 italic text-xs">
              No data.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={courseConversion}
                margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="courseName"
                  stroke="#94a3b8"
                  fontSize={10}
                  tickLine={false}
                  tickFormatter={(val) => (val && val.length > 15 ? `${val.substring(0, 15)}...` : val)}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={10}
                  tickLine={false}
                  tickFormatter={(val) => `${val}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="conversionRate" fill="#780016" radius={[4, 4, 0, 0]} barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Source Conversion Chart */}
      <div className="bg-white p-6 rounded-lg border border-slate-100 shadow-sm">
        <div className="mb-4">
          <h4 className="text-base font-bold text-academic-navy">Conversion Rate by Source</h4>
          <p className="text-xs text-slate-400">Percentage of leads that transitioned to ADMITTED status per lead source.</p>
        </div>
        <div className="h-64 w-full">
          {sourceConversion.length === 0 ? (
            <div className="h-full flex items-center justify-center text-slate-400 italic text-xs">
              No data.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sourceConversion}
                margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="source"
                  stroke="#94a3b8"
                  fontSize={10}
                  tickLine={false}
                  tickFormatter={(val) => val ? val.replace(/_/g, ' ') : ''}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={10}
                  tickLine={false}
                  tickFormatter={(val) => `${val}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="conversionRate" fill="#0f2c59" radius={[4, 4, 0, 0]} barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversionChart;
