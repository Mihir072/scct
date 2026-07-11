/**
 * Public Faculty Directory Page.
 * @module pages/public/Faculty
 */
import React, { useState, useEffect } from 'react';
import { getFaculty } from '../../api/faculty';
import { getCourses } from '../../api/courses';
import FacultyCard from '../../components/public/FacultyCard';
import Select from '../../components/shared/Select';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

/**
 * Renders a directory of academic faculty and staff members.
 * Supports dynamic filtering by department or associated course program.
 * 
 * @returns {React.ReactElement} The rendered faculty directory grid.
 */
const Faculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [loading, setLoading] = useState(true);

  // Departments list compiled from typical academic offerings
  const departments = [
    { value: '', label: 'All Departments' },
    { value: 'Commerce', label: 'Commerce' },
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'Physics', label: 'Physics' },
    { value: 'Economics', label: 'Economics' },
    { value: 'Languages', label: 'Languages & Communications' },
    { value: 'Sports', label: 'Sports & Athletics' },
  ];

  useEffect(() => {
    // Fetch courses list for filtering
    const loadCoursesList = async () => {
      try {
        const list = await getCourses();
        setCourses(list.map((c) => ({ value: c.id, label: c.name })));
      } catch (err) {
        console.error('Failed to load courses for filter:', err);
      }
    };
    loadCoursesList();
  }, []);

  useEffect(() => {
    // Dynamic query load for faculty directory based on filters
    const loadFacultyList = async () => {
      setLoading(true);
      try {
        const data = await getFaculty(selectedCourse || null, selectedDepartment || null);
        setFaculty(data);
      } catch (err) {
        console.error('Failed to retrieve faculty details:', err);
      } finally {
        setLoading(false);
      }
    };
    loadFacultyList();
  }, [selectedCourse, selectedDepartment]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col gap-10">
      {/* Header */}
      <div className="text-center md:text-left border-b border-slate-100 pb-6">
        <h1 className="text-3xl font-black font-serif text-academic-navy mb-2">Faculty & Academicians</h1>
        <p className="text-sm text-slate-500 max-w-xl">
          Meet our distinguished lecturers, professors, and field experts guiding our courses with rigorous practical training and research.
        </p>
      </div>

      {/* Filter Options */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Filter by Academic Department"
          id="deptSelect"
          options={departments}
          placeholder="All Departments"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        />

        <Select
          label="Filter by Course Association"
          id="courseSelect"
          options={courses}
          placeholder="All Associated Courses"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        />
      </div>

      {/* Results list */}
      {loading ? (
        <LoadingSpinner className="py-20" />
      ) : faculty.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg border border-slate-200">
          <p className="text-slate-400 text-sm">No faculty members found matching filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {faculty.map((member) => (
            <FacultyCard key={member.id} faculty={member} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Faculty;
