import React, { useState, useEffect, useCallback } from 'react';
import { getFunnelMetrics, getConversionMetrics, exportFunnelCsv } from '../../api/dashboard';
import { getCourses } from '../../api/courses';
import FunnelChart from '../../components/dashboard/FunnelChart';
import ConversionChart from '../../components/dashboard/ConversionChart';
import Select from '../../components/shared/Select';
import Button from '../../components/shared/Button';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import usePolling from '../../hooks/usePolling';
import { Download, Filter } from 'lucide-react';

const Funnel = () => {
  const [funnelData, setFunnelData] = useState(null);
  const [conversionData, setConversionData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSource, setSelectedSource] = useState('');

  // Source options matching lead source enums
  const sourceOptions = [
    { value: '', label: 'All Sources' },
    { value: 'WEBSITE_FORM', label: 'Website Form' },
    { value: 'REFERRAL', label: 'Referral' },
    { value: 'WALK_IN', label: 'Walk-In' },
    { value: 'PHONE', label: 'Phone' },
    { value: 'EMAIL_CAMPAIGN', label: 'Email Campaign' },
    { value: 'SOCIAL_MEDIA', label: 'Social Media' },
    { value: 'OTHER', label: 'Other' },
  ];

  // Fetch course list for filtering
  useEffect(() => {
    const fetchCoursesData = async () => {
      try {
        const list = await getCourses();
        setCourses(list.map((c) => ({ value: c.id, label: c.name })));
      } catch (err) {
        console.error('Failed to load courses for funnel filters:', err);
      }
    };
    fetchCoursesData();
  }, []);

  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch funnel metrics dynamically on filter changes, and conversion rates
  const loadFunnelData = useCallback(async () => {
    setLoading(true);
    try {
      const [funnel, conversion] = await Promise.all([
        getFunnelMetrics(selectedCourse || null, selectedSource || null),
        getConversionMetrics(),
      ]);
      setFunnelData(funnel);
      setConversionData(conversion);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Failed to load funnel/conversion statistics:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedCourse, selectedSource]);

  // Poll every 30s; restarts when filters change
  usePolling(loadFunnelData, 30000, [selectedCourse, selectedSource]);

  const handleExportCsv = async () => {
    try {
      const blob = await exportFunnelCsv(selectedCourse || null, selectedSource || null);

      // Create browser link to trigger CSV file download
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'funnel_analytics.csv');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      alert('Failed to download Funnel CSV: ' + err.message);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Title block */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-academic-navy">Conversion & Funnel Analytics</h1>
          <p className="text-xs text-slate-400">Track dropoff rates, conversion percentages, and marketing source performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
            LIVE{lastUpdated && ` · ${lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`}
          </div>
          <Button
            onClick={handleExportCsv}
            variant="secondary"
            size="md"
            className="flex items-center gap-2 font-bold shadow-sm"
            disabled={loading || !funnelData || !funnelData.funnelStages}
          >
            <Download size={16} />
            Export Funnel CSV
          </Button>
        </div>
      </div>

      {/* Filter panel */}
      <div className="bg-white border border-slate-100 p-5 rounded-lg shadow-sm flex flex-col gap-4">
        <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2.5">
          <Filter size={15} className="text-academic-maroon" />
          <span className="text-xs font-bold text-academic-navy uppercase tracking-wider">Funnel Filters</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-2/3">
          <Select
            label="Filter Funnel by Course"
            id="courseFilter"
            options={courses}
            placeholder="All Associated Courses"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          />

          <Select
            label="Filter Funnel by Source"
            id="sourceFilter"
            options={sourceOptions}
            placeholder="All Sources"
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
          />
        </div>
      </div>

      {/* Funnel chart */}
      <FunnelChart data={funnelData?.funnelStages || []} loading={loading} />

      {/* Conversion rates */}
      <ConversionChart conversionData={conversionData} loading={loading} />
    </div>
  );
};

export default Funnel;
