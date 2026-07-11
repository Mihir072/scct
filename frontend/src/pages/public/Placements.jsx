import React, { useState, useEffect } from 'react';
import { getPlacements, getPlacementsSummary } from '../../api/placements';
import { getCourses } from '../../api/courses';
import PlacementStat from '../../components/public/PlacementStat';
import Select from '../../components/shared/Select';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import { formatCurrency, formatPackage } from '../../utils/formatters';
import { Award, Briefcase, Calendar } from 'lucide-react';

const Placements = () => {
  const [placements, setPlacements] = useState([]);
  const [summary, setSummary] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingTable, setLoadingTable] = useState(false);

  const academicYears = [
    { value: '', label: 'All Years' },
    { value: '2024-2025', label: '2024-2025' },
    { value: '2023-2024', label: '2023-2024' },
    { value: '2022-2023', label: '2022-2023' },
  ];

  useEffect(() => {
    // Initial data load (Summary and Course list)
    const loadInitialData = async () => {
      try {
        const [sumData, courseList] = await Promise.all([
          getPlacementsSummary(),
          getCourses(),
        ]);
        setSummary(sumData);
        setCourses(courseList.map((c) => ({ value: c.id, label: c.name })));
      } catch (err) {
        console.error('Failed to load placement initial parameters:', err);
      } finally {
        setLoading(false);
      }
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    // Dynamic query load for placements list based on filters
    const loadPlacementsList = async () => {
      setLoadingTable(true);
      try {
        const data = await getPlacements(selectedYear, selectedCourse || null);
        setPlacements(data);
      } catch (err) {
        console.error('Failed to fetch placements:', err);
      } finally {
        setLoadingTable(false);
      }
    };
    loadPlacementsList();
  }, [selectedCourse, selectedYear]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col gap-10">
      {/* Header */}
      <div className="text-center md:text-left border-b border-slate-100 pb-6">
        <h1 className="text-3xl font-black font-serif text-academic-navy mb-2">Corporate Placements & Trends</h1>
        <p className="text-sm text-slate-500 max-w-2xl">
          SCCT takes pride in securing top-tier positions for our graduates. Our metrics display performance and salary benchmarks across companies, streams, and academic years.
        </p>
      </div>

      {/* Analytics Summary */}
      <PlacementStat summary={summary} loading={loading} />

      {/* Filters & Details Table */}
      <section className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
        {/* Table Filters */}
        <div className="p-4 md:p-6 bg-slate-50 border-b border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Filter by Academic Year"
            id="yearFilter"
            options={academicYears}
            placeholder="All Academic Years"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          />

          <Select
            label="Filter by Course / Program"
            id="courseFilter"
            options={courses}
            placeholder="All Course Programs"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          />
        </div>

        {/* Results list */}
        {loadingTable ? (
          <LoadingSpinner className="py-20" />
        ) : placements.length === 0 ? (
          <div className="text-center py-20 text-slate-400 italic text-sm">
            No placement records match selected criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-academic-navy uppercase tracking-wider">Company Partner</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-academic-navy uppercase tracking-wider">Academic Year</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-academic-navy uppercase tracking-wider">Course Program</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-academic-navy uppercase tracking-wider">CTC Package</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-academic-navy uppercase tracking-wider">Students Hired</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-600 bg-white">
                {placements.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-800 flex items-center gap-2">
                      <Briefcase size={12} className="text-slate-400" />
                      {p.companyName}
                    </td>
                    <td className="px-6 py-4">{p.academicYear}</td>
                    <td className="px-6 py-4 font-medium text-slate-700">{p.courseName}</td>
                    <td className="px-6 py-4 text-right font-semibold text-academic-maroon">
                      {formatPackage(p.packageLpa)}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-slate-700">{p.studentsPlaced}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Placements;
