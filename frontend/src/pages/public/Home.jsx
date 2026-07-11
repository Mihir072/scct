import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Compass, HelpCircle } from 'lucide-react';
import { getCourses } from '../../api/courses';
import { getPlacementsSummary } from '../../api/placements';
import CourseCard from '../../components/public/CourseCard';
import PlacementStat from '../../components/public/PlacementStat';
import Button from '../../components/shared/Button';
import LoadingSpinner from '../../components/shared/LoadingSpinner';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [placementSummary, setPlacementSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseList, placementData] = await Promise.all([
          getCourses(),
          getPlacementsSummary(),
        ]);
        setCourses(courseList.slice(0, 3)); // Display top 3 featured courses
        setPlacementSummary(placementData);
      } catch (err) {
        console.error('Error fetching landing page telemetry:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-16 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-academic-navy via-[#1e3a8a] to-[#0f2c59] text-white rounded-2xl shadow-xl px-8 py-16 md:py-24 flex flex-col items-center text-center">
        {/* Subtle decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none"></div>

        <span className="bg-academic-gold/20 text-academic-gold border border-academic-gold/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
          Admissions Open 2026-2027
        </span>
        <h1 className="font-serif text-white text-3xl md:text-5xl lg:text-6xl font-black max-w-3xl leading-tight mb-6">
          Empowering Minds, Shaping Tomorrow's Leaders
        </h1>
        <p className="text-sm md:text-base text-slate-200 max-w-xl mb-10 leading-relaxed font-sans font-light">
          Unlock your true potential at SCCT Degree College. Study specialized curriculum across Commerce, Science, and Management built for high growth careers.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/admissions">
            <Button variant="accent" size="lg" className="shadow-lg">
              Apply Online Now
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
          <Link to="/courses">
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              Explore Programs
            </Button>
          </Link>
        </div>
      </section>

      {/* Placement Statistics Highlight strip */}
      <section className="flex flex-col gap-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold font-serif text-academic-navy">Outstanding Placement Records</h2>
          <p className="text-xs text-slate-400 mt-1">Our dedicated placement wing connects students to global opportunities.</p>
        </div>
        <PlacementStat summary={placementSummary} loading={loading} />
      </section>

      {/* Featured Courses strip */}
      <section className="flex flex-col gap-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold font-serif text-academic-navy">Featured Degree Programs</h2>
            <p className="text-xs text-slate-400 mt-1">Explore our highly sought-after industry-aligned courses.</p>
          </div>
          <Link to="/courses" className="text-xs text-academic-maroon hover:underline font-bold flex items-center gap-1">
            View All Courses <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner className="py-12" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>

      {/* Mini enquiry CTA Banner */}
      <section className="bg-slate-100/50 rounded-xl p-8 border border-slate-200/50 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        <div className="lg:col-span-2">
          <h3 className="text-lg font-bold text-academic-navy flex items-center gap-2 mb-2">
            <HelpCircle className="text-academic-maroon" />
            Have Questions About Admissions?
          </h3>
          <p className="text-xs text-slate-500 max-w-xl">
            Our admissions staff is ready to help you choose the right path. Fill out the quick multi-step form to start your career evaluation or speak with a counselor.
          </p>
        </div>
        <div className="flex justify-start lg:justify-end">
          <Link to="/admissions" className="w-full sm:w-auto">
            <Button variant="secondary" size="md" className="w-full sm:w-auto">
              Start Lead Enquiry
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
