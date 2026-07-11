/**
 * Public Courses Directory Page.
 * @module pages/public/Courses
 */
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCourses } from '../../api/courses';
import CourseCard from '../../components/public/CourseCard';
import Button from '../../components/shared/Button';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

/**
 * Renders the primary directory of all available academic programs.
 * Allows filtering of courses by academic stream using URL search parameters.
 * 
 * @returns {React.ReactElement} The rendered courses directory grid.
 */
const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const streamFilter = searchParams.get('stream') || '';

  const streams = [
    { value: '', label: 'All Streams' },
    { value: 'Commerce', label: 'Commerce & Management' },
    { value: 'Science', label: 'Science & Information Technology' },
    { value: 'Arts', label: 'Arts & Humanities' },
  ];

  useEffect(() => {
    const fetchCoursesData = async () => {
      setLoading(true);
      try {
        const data = await getCourses(streamFilter);
        setCourses(data);
      } catch (err) {
        console.error('Failed to load courses:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCoursesData();
  }, [streamFilter]);

  const handleStreamChange = (stream) => {
    if (stream) {
      setSearchParams({ stream });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col gap-8">
      {/* Page Header */}
      <div className="text-center md:text-left border-b border-slate-100 pb-6">
        <h1 className="text-3xl font-black font-serif text-academic-navy mb-2">Our Academic Programs</h1>
        <p className="text-sm text-slate-500 max-w-xl">
          SCCT offers a range of career-oriented undergraduate and postgraduate programs. Filter by academic stream to find the curriculum that matches your professional goals.
        </p>
      </div>

      {/* Stream Selection Tabs */}
      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
        {streams.map((stream) => {
          const isActive = streamFilter === stream.value;
          return (
            <Button
              key={stream.value}
              variant={isActive ? 'primary' : 'outline'}
              size="sm"
              onClick={() => handleStreamChange(stream.value)}
              className="rounded-full shadow-sm text-xs"
            >
              {stream.label}
            </Button>
          );
        })}
      </div>

      {/* Courses Grid */}
      {loading ? (
        <LoadingSpinner className="py-20" />
      ) : courses.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg border border-slate-200">
          <p className="text-slate-400 text-sm">No courses currently available in this stream.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
