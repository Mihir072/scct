import React, { useState, useEffect, useCallback } from 'react';
import { getAdminLeads, updateLeadStatus, exportLeadsCsv } from '../../api/leads';
import { getCourses } from '../../api/courses';
import LeadsTable from '../../components/dashboard/LeadsTable';
import Select from '../../components/shared/Select';
import Input from '../../components/shared/Input';
import Button from '../../components/shared/Button';
import Pagination from '../../components/shared/Pagination';
import Modal from '../../components/shared/Modal';
import usePolling from '../../hooks/usePolling';
import { Search, Download, Filter, Eye, User, Calendar, Mail, Phone, RefreshCw, AlertTriangle, FileSpreadsheet } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';
import { usePagination } from '../../hooks/usePagination';
import { formatDate } from '../../utils/formatters';

const Leads = () => {
  const [leadsData, setLeadsData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [courseId, setCourseId] = useState('');
  const [source, setSource] = useState('');
  const [isDuplicate, setIsDuplicate] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDir, setSortDir] = useState('desc');

  // Modal / Detail States
  const [selectedLead, setSelectedLead] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Debounced search query (500ms delay)
  const debouncedSearch = useDebounce(search, 500);

  // Pagination hook
  const { page, size, setPage, nextPage, prevPage } = usePagination(0, 10);

  // Status lists
  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'NEW', label: 'NEW' },
    { value: 'CONTACTED', label: 'CONTACTED' },
    { value: 'APPLICATION_STARTED', label: 'APPLICATION STARTED' },
    { value: 'APPLICATION_SUBMITTED', label: 'APPLICATION SUBMITTED' },
    { value: 'ADMITTED', label: 'ADMITTED' },
    { value: 'REJECTED', label: 'REJECTED' },
    { value: 'LOST', label: 'LOST' },
  ];

  // Source options
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

  // Duplicate options
  const duplicateOptions = [
    { value: '', label: 'All Entries' },
    { value: 'true', label: 'Duplicates Only' },
    { value: 'false', label: 'Unique Entries Only' },
  ];

  // Fetch initial parameters
  useEffect(() => {
    const fetchCoursesData = async () => {
      try {
        const list = await getCourses();
        setCourses(list.map((c) => ({ value: c.id, label: c.name })));
      } catch (err) {
        console.error('Failed to load courses for leads view:', err);
      }
    };
    fetchCoursesData();
  }, []);

  // Fetch leads when page, search, or filters change
  const loadLeadsList = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAdminLeads({
        page,
        size,
        status,
        courseId,
        source,
        isDuplicate,
        search: debouncedSearch,
        sortBy,
        sortDir,
      });
      setLeadsData(data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Failed to load leads list:', err);
    } finally {
      setLoading(false);
    }
  }, [page, size, status, courseId, source, isDuplicate, debouncedSearch, sortBy, sortDir]);

  // Poll every 30s; restarts automatically when filters or page change
  usePolling(loadLeadsList, 30000, [page, status, courseId, source, isDuplicate, debouncedSearch, sortBy, sortDir]);

  // Reset page index on filter change
  useEffect(() => {
    setPage(0);
  }, [status, courseId, source, isDuplicate, debouncedSearch]);

  const handleStatusChange = async (leadId, nextStatus) => {
    try {
      await updateLeadStatus(leadId, nextStatus);
      // Reload details after transition
      loadLeadsList();
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead((prev) => ({ ...prev, status: nextStatus }));
      }
    } catch (err) {
      alert(err.response?.data?.message || 'State transition rejected.');
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortDir('desc');
    }
    setPage(0);
  };

  const handleViewDetails = (lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLead(null);
  };

  const handleExportCsv = async () => {
    try {
      const blob = await exportLeadsCsv({
        status,
        courseId,
        source,
        isDuplicate,
        search: debouncedSearch,
      });

      // Construct browser anchor download link
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'leads_export.csv');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      alert('Failed to download CSV: ' + err.message);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Title block */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-academic-navy">Leads Directory</h1>
          <p className="text-xs text-slate-400">Review details, status filters, and export results.</p>
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
            disabled={loading || !leadsData || leadsData.totalElements === 0}
          >
            <Download size={16} />
            Export CSV (Filtered)
          </Button>
        </div>
      </div>

      {/* Filter Options Console */}
      <div className="bg-white border border-slate-100 p-5 rounded-lg shadow-sm flex flex-col gap-4">
        <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2.5">
          <Filter size={15} className="text-academic-maroon" />
          <span className="text-xs font-bold text-academic-navy uppercase tracking-wider">Search & Filters</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-[32px] text-slate-400" size={14} />
            <Input
              label="Search keyword"
              id="searchBox"
              placeholder="Name, email, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-7"
            />
          </div>

          <Select
            label="Filter status"
            id="statusSelect"
            options={statusOptions}
            placeholder="All Statuses"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />

          <Select
            label="Filter Course"
            id="courseSelect"
            options={courses}
            placeholder="All Course Programs"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
          />

          <Select
            label="Filter Source"
            id="sourceSelect"
            options={sourceOptions}
            placeholder="All Sources"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />

          <Select
            label="Duplicates entry"
            id="duplicateSelect"
            options={duplicateOptions}
            placeholder="All Entries"
            value={isDuplicate}
            onChange={(e) => setIsDuplicate(e.target.value)}
          />
        </div>
      </div>

      {/* Main Leads List Table */}
      <LeadsTable
        leads={leadsData?.content || []}
        loading={loading}
        onStatusChange={handleStatusChange}
        onViewDetails={handleViewDetails}
        sortBy={sortBy}
        sortDir={sortDir}
        onSort={handleSort}
      />

      {/* Pagination component */}
      {leadsData && (
        <Pagination
          currentPage={page}
          totalPages={leadsData.totalPages}
          onPageChange={setPage}
          totalElements={leadsData.totalElements}
          size={size}
        />
      )}

      {/* Lead Details Modal Dialog */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Full Lead Specification Details"
        footer={
          <Button variant="outline" size="sm" onClick={handleCloseModal}>
            Dismiss
          </Button>
        }
      >
        {selectedLead && (
          <div className="flex flex-col gap-6 text-slate-700">
            {/* Header info */}
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div className="flex flex-col gap-0.5">
                <h4 className="text-base font-bold text-academic-navy flex items-center gap-1.5">
                  <User size={18} />
                  {selectedLead.fullName}
                </h4>
                <span className="text-[10px] text-slate-400 font-mono">UUID: {selectedLead.id}</span>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Acquisition Status</span>
                <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded font-semibold text-xs text-academic-navy">
                  {selectedLead.status.replace(/_/g, ' ')}
                </span>
              </div>
            </div>

            {/* Profile Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="flex flex-col gap-0.5 bg-slate-50 p-3 rounded">
                <span className="text-[9px] text-slate-400 font-bold uppercase">Email Address</span>
                <a href={`mailto:${selectedLead.email}`} className="font-semibold text-slate-700 hover:text-academic-maroon">
                  {selectedLead.email}
                </a>
              </div>
              <div className="flex flex-col gap-0.5 bg-slate-50 p-3 rounded">
                <span className="text-[9px] text-slate-400 font-bold uppercase">Mobile Number</span>
                <a href={`tel:${selectedLead.phone}`} className="font-semibold text-slate-700 font-mono hover:text-academic-maroon">
                  {selectedLead.phone}
                </a>
              </div>
              <div className="flex flex-col gap-0.5 bg-slate-50 p-3 rounded">
                <span className="text-[9px] text-slate-400 font-bold uppercase">Desired Degree Program</span>
                <span className="font-semibold text-slate-700">{selectedLead.courseName}</span>
              </div>
              <div className="flex flex-col gap-0.5 bg-slate-50 p-3 rounded">
                <span className="text-[9px] text-slate-400 font-bold uppercase">Enquiry Source</span>
                <span className="font-semibold text-slate-700">{selectedLead.source}</span>
              </div>
              <div className="flex flex-col gap-0.5 bg-slate-50 p-3 rounded">
                <span className="text-[9px] text-slate-400 font-bold uppercase">Created On</span>
                <span className="font-semibold text-slate-700">{formatDate(selectedLead.createdAt)}</span>
              </div>
              <div className="flex flex-col gap-0.5 bg-slate-50 p-3 rounded">
                <span className="text-[9px] text-slate-400 font-bold uppercase">Last Updated On</span>
                <span className="font-semibold text-slate-700">{formatDate(selectedLead.updatedAt)}</span>
              </div>
            </div>

            {/* Duplicate details */}
            {selectedLead.isDuplicate && (
              <div className="p-3 bg-amber-50 border-l-4 border-amber-500 rounded text-amber-900 text-xs flex items-start gap-2">
                <AlertTriangle className="shrink-0 mt-0.5" size={16} />
                <div>
                  <span className="font-bold block">Duplicate entry flag detected!</span>
                  <p className="text-[10px] leading-normal text-amber-700 mt-0.5">
                    This lead matches parameters of another submission in the database.<br />
                    Original Lead Ref ID: <span className="font-mono font-bold text-slate-800">{selectedLead.duplicateOfLeadId}</span>
                  </p>
                </div>
              </div>
            )}

            {/* Custom description / message */}
            <div className="flex flex-col gap-1.5 border-t border-slate-100 pt-4">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Candidate Message / Statement</span>
              <p className="text-xs text-slate-600 bg-white p-3 rounded border border-slate-100 whitespace-pre-line leading-relaxed italic">
                {selectedLead.message || 'No statements provided by applicant.'}
              </p>
            </div>

            {/* Marketing UTM metrics */}
            <div className="flex flex-col gap-2 border-t border-slate-100 pt-4">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Marketing UTM Parameters</span>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-[10px] font-mono">
                <div className="bg-slate-50 p-2 rounded">
                  <span className="text-slate-400 font-bold block uppercase text-[8px]">Source</span>
                  <span className="text-slate-700 truncate block" title={selectedLead.utmSource}>{selectedLead.utmSource || 'N/A'}</span>
                </div>
                <div className="bg-slate-50 p-2 rounded">
                  <span className="text-slate-400 font-bold block uppercase text-[8px]">Medium</span>
                  <span className="text-slate-700 truncate block" title={selectedLead.utmMedium}>{selectedLead.utmMedium || 'N/A'}</span>
                </div>
                <div className="bg-slate-50 p-2 rounded">
                  <span className="text-slate-400 font-bold block uppercase text-[8px]">Campaign</span>
                  <span className="text-slate-700 truncate block" title={selectedLead.utmCampaign}>{selectedLead.utmCampaign || 'N/A'}</span>
                </div>
                <div className="bg-slate-50 p-2 rounded">
                  <span className="text-slate-400 font-bold block uppercase text-[8px]">Term</span>
                  <span className="text-slate-700 truncate block" title={selectedLead.utmTerm}>{selectedLead.utmTerm || 'N/A'}</span>
                </div>
                <div className="bg-slate-50 p-2 rounded">
                  <span className="text-slate-400 font-bold block uppercase text-[8px]">Content</span>
                  <span className="text-slate-700 truncate block" title={selectedLead.utmContent}>{selectedLead.utmContent || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Leads;
