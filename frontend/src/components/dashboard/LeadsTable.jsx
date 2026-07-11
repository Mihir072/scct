import React, { useState } from 'react';
import { Mail, Phone, Calendar, AlertTriangle, Eye, ArrowUpDown } from 'lucide-react';
import StatusBadge from './StatusBadge';
import Button from '../shared/Button';
import { formatDate } from '../../utils/formatters';

const LeadsTable = ({
  leads = [],
  loading = false,
  onStatusChange,
  onViewDetails,
  sortBy,
  sortDir,
  onSort,
}) => {
  const [updatingId, setUpdatingId] = useState(null);

  // Computes valid transitions based on state machine rules
  const getAllowedTransitions = (currentStatus) => {
    if (['ADMITTED', 'REJECTED', 'LOST'].includes(currentStatus)) {
      return []; // Terminal states, no transitions allowed
    }

    const transitions = [];

    // General transitions to terminal states (except ADMITTED)
    transitions.push('REJECTED');
    transitions.push('LOST');

    // Sequential transitions
    if (currentStatus === 'NEW') {
      transitions.unshift('CONTACTED');
    } else if (currentStatus === 'CONTACTED') {
      transitions.unshift('APPLICATION_STARTED');
    } else if (currentStatus === 'APPLICATION_STARTED') {
      transitions.unshift('APPLICATION_SUBMITTED');
    } else if (currentStatus === 'APPLICATION_SUBMITTED') {
      transitions.unshift('ADMITTED');
    }

    return transitions;
  };

  const handleStatusSelect = async (leadId, nextStatus) => {
    setUpdatingId(leadId);
    try {
      await onStatusChange(leadId, nextStatus);
    } finally {
      setUpdatingId(null);
    }
  };

  const SortHeader = ({ field, label }) => {
    const isCurrent = sortBy === field;
    return (
      <th
        onClick={() => onSort(field)}
        className="px-6 py-3 text-left text-xs font-semibold text-academic-navy tracking-wider cursor-pointer hover:bg-slate-100/50 transition-colors select-none"
      >
        <div className="flex items-center gap-1">
          <span>{label}</span>
          <ArrowUpDown size={12} className={`text-slate-400 ${isCurrent ? 'text-academic-maroon' : ''}`} />
        </div>
      </th>
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg border border-slate-100">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-academic-maroon"></div>
        <p className="mt-4 text-sm text-slate-500">Loading leads...</p>
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-lg border border-slate-100">
        <p className="text-slate-400 text-sm">No leads found matching current filter query.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg border border-slate-100 shadow-sm">
      <table className="min-w-full divide-y divide-slate-100 table-auto">
        <thead className="bg-slate-50">
          <tr>
            <SortHeader field="fullName" label="Lead Details" />
            <th className="px-6 py-3 text-left text-xs font-semibold text-academic-navy tracking-wider">Contact Info</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-academic-navy tracking-wider">Program / Source</th>
            <SortHeader field="createdAt" label="Created At" />
            <th className="px-6 py-3 text-left text-xs font-semibold text-academic-navy tracking-wider">Status</th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-academic-navy tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-100 text-sm">
          {leads.map((lead) => {
            const allowed = getAllowedTransitions(lead.status);
            const isTerminal = allowed.length === 0;

            return (
              <tr 
                key={lead.id} 
                className={`hover:bg-slate-50/50 transition-colors ${lead.isDuplicate ? 'bg-amber-50/20' : ''}`}
              >
                {/* Full name and duplicate flag */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold text-slate-800">{lead.fullName}</div>
                    {lead.isDuplicate && (
                      <span 
                        className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800"
                        title={`Duplicate of lead: ${lead.duplicateOfLeadId}`}
                      >
                        <AlertTriangle size={10} />
                        DUPLICATE
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">{lead.id.substring(0, 8)}...</div>
                </td>

                {/* Contact information */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col gap-0.5">
                    <a href={`mailto:${lead.email}`} className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-academic-maroon">
                      <Mail size={12} className="text-slate-400" />
                      {lead.email}
                    </a>
                    <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-academic-maroon">
                      <Phone size={12} className="text-slate-400" />
                      {lead.phone}
                    </a>
                  </div>
                </td>

                {/* Program / source */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-xs font-medium text-slate-700">{lead.courseName || 'Unspecified'}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-wider font-semibold">
                    Source: {lead.source}
                  </div>
                </td>

                {/* Creation date */}
                <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-slate-400" />
                    {formatDate(lead.createdAt)}
                  </div>
                </td>

                {/* Status Badge */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={lead.status} />
                </td>

                {/* Quick Status transition & Action triggers */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-xs">
                  <div className="flex items-center justify-end gap-2">
                    {/* Status updater dropdown */}
                    {!isTerminal ? (
                      <select
                        disabled={updatingId === lead.id}
                        value={lead.status}
                        onChange={(e) => handleStatusSelect(lead.id, e.target.value)}
                        className="px-2 py-1 bg-white border border-slate-200 rounded text-xs text-slate-600 focus:outline-none focus:ring-1 focus:ring-academic-navy cursor-pointer disabled:opacity-50"
                      >
                        <option value={lead.status}>Update Status...</option>
                        {allowed.map((statusVal) => (
                          <option key={statusVal} value={statusVal}>
                            Transition: {statusVal.replace(/_/g, ' ')}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-xs text-slate-400 italic">Terminal Status</span>
                    )}

                    {/* View full details modal trigger */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetails(lead)}
                      className="!p-1.5 hover:bg-slate-100 rounded-md"
                      title="View Details"
                    >
                      <Eye size={15} className="text-slate-500" />
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsTable;
