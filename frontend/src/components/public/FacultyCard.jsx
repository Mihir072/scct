/**
 * Public Faculty Card Component.
 * @module components/public/FacultyCard
 */
import React from 'react';
import { Award, Mail, GraduationCap } from 'lucide-react';

/**
 * Renders an informational profile card for a faculty or staff member.
 * 
 * @param {Object} props - React component props.
 * @param {Object} props.faculty - The faculty data object.
 * @param {string} props.faculty.name - Faculty member's full name.
 * @param {string} props.faculty.designation - Job title or academic rank.
 * @param {string} props.faculty.department - Associated department.
 * @param {string} props.faculty.qualification - Academic degrees and credentials.
 * @param {string} props.faculty.bio - Short biographical summary.
 * @param {string} [props.faculty.photoUrl] - Optional URL to a headshot image.
 * @param {string} [props.faculty.courseName] - Optional specific course association.
 * @returns {React.ReactElement} The rendered faculty profile card.
 */
const FacultyCard = ({ faculty }) => {
  const { name, designation, department, qualification, bio, photoUrl, courseName } = faculty;

  // Placeholder avatar using academic color
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0F2C59&color=fff&size=128`;

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center">
      {/* Faculty Headshot */}
      <img
        src={photoUrl || fallbackAvatar}
        alt={name}
        className="w-24 h-24 rounded-full object-cover border-4 border-slate-100 shadow-inner mb-4"
        onError={(e) => {
          e.target.src = fallbackAvatar;
        }}
      />

      <h3 className="text-base font-bold text-academic-navy mb-0.5">{name}</h3>
      <span className="text-xs font-semibold text-academic-maroon block mb-2">{designation}</span>

      <div className="flex flex-wrap gap-1.5 justify-center mb-3">
        <span className="px-2 py-0.5 bg-slate-50 border border-slate-100 rounded text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
          Dept: {department}
        </span>
        {courseName && (
          <span className="px-2 py-0.5 bg-academic-navy/5 border border-academic-navy/10 rounded text-[10px] text-academic-navy font-semibold">
            {courseName}
          </span>
        )}
      </div>

      <div className="w-full text-xs text-slate-600 border-t border-slate-50 pt-3">
        <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-slate-400 mb-1.5">
          <Award size={12} className="text-academic-gold" />
          QUALIFICATION
        </div>
        <p className="font-semibold text-slate-700 mb-2">{qualification}</p>
        <p className="text-slate-400 text-xs italic line-clamp-3">"{bio}"</p>
      </div>
    </div>
  );
};

export default FacultyCard;
