import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalElements,
  size,
}) => {
  if (totalPages <= 1) return null;

  const startElement = currentPage * size + 1;
  const endElement = Math.min((currentPage + 1) * size, totalElements);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-4 px-6 border-t border-slate-100 bg-white">
      <div className="text-xs text-slate-500">
        Showing <span className="font-semibold text-slate-700">{startElement}</span> to{' '}
        <span className="font-semibold text-slate-700">{endElement}</span> of{' '}
        <span className="font-semibold text-slate-700">{totalElements}</span> results
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="!p-1.5"
        >
          <ChevronLeft size={16} />
        </Button>

        {Array.from({ length: totalPages }).map((_, idx) => {
          // Only show window around currentPage
          if (idx === 0 || idx === totalPages - 1 || Math.abs(idx - currentPage) <= 1) {
            return (
              <Button
                key={idx}
                variant={currentPage === idx ? 'primary' : 'outline'}
                size="sm"
                onClick={() => onPageChange(idx)}
                className="w-8 h-8 !p-0"
              >
                {idx + 1}
              </Button>
            );
          }
          if (idx === 1 || idx === totalPages - 2) {
            return (
              <span key={idx} className="px-1 text-slate-400 select-none">
                ...
              </span>
            );
          }
          return null;
        })}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className="!p-1.5"
        >
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
