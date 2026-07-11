/**
 * Public Course Card Component.
 * @module components/public/CourseCard
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, IndianRupee, ArrowRight } from 'lucide-react';
import Button from '../shared/Button';
import { formatCurrency } from '../../utils/formatters';

/**
 * Displays an individual academic course summary in a stylish card format.
 * 
 * @param {Object} props - React component props.
 * @param {Object} props.course - The course data object.
 * @param {string} props.course.name - The full name of the course.
 * @param {string} props.course.slug - URL-friendly identifier.
 * @param {string} props.course.stream - The academic department stream.
 * @param {number} props.course.durationYears - Course duration in years.
 * @param {number} props.course.feesPerYear - Annual tuition fees.
 * @param {string} props.course.eligibilityCriteria - Brief eligibility requirements.
 * @returns {React.ReactElement} The rendered course card component.
 */
const CourseCard = ({ course }) => {
  const { name, slug, stream, durationYears, feesPerYear, eligibilityCriteria } = course;

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full">
      {/* Stream badge header */}
      <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex justify-between items-center">
        <span className="text-[10px] font-bold uppercase tracking-wider text-academic-maroon">
          {stream}
        </span>
        <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
          <Calendar size={10} />
          {durationYears} Years
        </span>
      </div>

      {/* Main details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-academic-navy mb-2 hover:text-academic-maroon transition-colors line-clamp-1">
            {name}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 mb-4">
            {eligibilityCriteria}
          </p>
        </div>

        <div className="border-t border-slate-100 pt-4 flex justify-between items-center mt-auto">
          <div>
            <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Fees / Year</span>
            <span className="text-sm font-bold text-slate-800 flex items-center">
              {formatCurrency(feesPerYear)}
            </span>
          </div>

          <Link to={`/courses/${slug}`}>
            <Button variant="ghost" size="sm" className="group !px-2 flex items-center gap-1 text-academic-maroon hover:text-[#600010]">
              Details
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
