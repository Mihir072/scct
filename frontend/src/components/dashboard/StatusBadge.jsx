import React from 'react';

const StatusBadge = ({ status }) => {
  const styles = {
    NEW: 'bg-blue-50 text-blue-700 border-blue-200',
    CONTACTED: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    APPLICATION_STARTED: 'bg-amber-50 text-amber-700 border-amber-200',
    APPLICATION_SUBMITTED: 'bg-teal-50 text-teal-700 border-teal-200',
    ADMITTED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    REJECTED: 'bg-rose-50 text-rose-700 border-rose-200',
    LOST: 'bg-slate-100 text-slate-700 border-slate-300',
  };

  const formattedStatus = status ? status.replace(/_/g, ' ') : 'UNKNOWN';

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${styles[status] || 'bg-slate-50 text-slate-600 border-slate-200'}`}>
      {formattedStatus}
    </span>
  );
};

export default StatusBadge;
