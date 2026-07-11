import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Calendar, ShieldCheck, IndianRupee, ArrowLeft, ArrowRight, UserCheck } from 'lucide-react';
import { getCourseBySlug } from '../../api/courses';
import { getFaculty } from '../../api/faculty';
import FacultyCard from '../../components/public/FacultyCard';
import Button from '../../components/shared/Button';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import { formatCurrency } from '../../utils/formatters';

const CourseDetail = () => {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const courseData = await getCourseBySlug(slug);
        setCourse(courseData);

        // Fetch faculty mapped to this specific course
        if (courseData && courseData.id) {
          const facultyData = await getFaculty(courseData.id);
          setFaculty(facultyData);
        }
      } catch (err) {
        console.error('Failed to load course details:', err);
        setError('Course not found or failed to load data.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourseDetails();
  }, [slug]);

  if (loading) {
    return <LoadingSpinner className="py-20" />;
  }

  if (error || !course) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center flex flex-col items-center gap-4">
        <p className="text-red-600 font-bold text-base">{error || 'Something went wrong.'}</p>
        <Link to="/courses">
          <Button variant="outline" size="sm">
            <ArrowLeft size={14} className="mr-2" /> Back to Courses
          </Button>
        </Link>
      </div>
    );
  }

  const { id, name, stream, durationYears, feesPerYear, eligibilityCriteria, description } = course;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col gap-10">
      {/* Back button */}
      <div>
        <Link to="/courses" className="text-xs text-slate-500 hover:text-academic-maroon flex items-center gap-1 font-semibold">
          <ArrowLeft size={12} /> Back to All Programs
        </Link>
      </div>

      {/* Hero Header Section */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 md:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-4 justify-center">
          <span className="text-[10px] font-extrabold bg-academic-navy/5 text-academic-navy px-3 py-1 rounded border border-academic-navy/10 w-max uppercase tracking-wider">
            {stream} Stream
          </span>
          <h1 className="text-2xl md:text-3xl font-black font-serif text-academic-navy leading-tight">
            {name}
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed font-light">
            {description}
          </p>
        </div>

        {/* Action card */}
        <div className="bg-slate-50 p-6 rounded-lg border border-slate-200/60 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-bold uppercase">Duration:</span>
              <span className="font-bold text-slate-700">{durationYears} Years</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-bold uppercase">Fees/Year:</span>
              <span className="font-bold text-slate-800 text-sm">{formatCurrency(feesPerYear)}</span>
            </div>
            <div className="border-t border-slate-200 pt-3">
              <span className="text-[10px] text-slate-400 font-bold block uppercase mb-1">Eligibility Criteria:</span>
              <p className="text-xs text-slate-600 font-medium leading-normal">{eligibilityCriteria}</p>
            </div>
          </div>

          <Link to={`/admissions?courseId=${id}`}>
            <Button variant="primary" size="md" className="w-full">
              Apply For This Program
              <ArrowRight size={14} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Faculty Instructors list */}
      <section className="flex flex-col gap-6">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-xl font-bold font-serif text-academic-navy">Course Faculty & Instructors</h2>
          <p className="text-xs text-slate-400 mt-1">Learn from leading researchers and professionals specialized in {name}.</p>
        </div>

        {faculty.length === 0 ? (
          <div className="bg-white rounded-lg border border-slate-200 p-8 text-center text-xs text-slate-400 italic">
            No specific faculty assigned to this course yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {faculty.map((member) => (
              <FacultyCard key={member.id} faculty={member} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CourseDetail;
