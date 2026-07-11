/**
 * Shared Modal Dialog Component.
 * @module components/shared/Modal
 */
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import Button from './Button';

/**
 * A reusable, accessible modal overlay component.
 * Handles scrolling lock and escape-key dismissal automatically.
 * 
 * @param {Object} props - React component props.
 * @param {boolean} props.isOpen - Controls the visibility of the modal.
 * @param {Function} props.onClose - Callback invoked when the modal requests to close.
 * @param {string} props.title - The text displayed in the modal header.
 * @param {React.ReactNode} props.children - The main content body of the modal.
 * @param {React.ReactNode} [props.footer] - Optional footer content (usually action buttons).
 * @param {string} [props.size='md'] - The maximum width variant (sm, md, lg, xl).
 * @returns {React.ReactElement|null} The rendered modal or null if closed.
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div
        className={`w-full bg-white rounded-lg shadow-xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200 ${sizeClasses[size]}`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <h3 className="text-lg font-bold text-academic-navy">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto text-sm text-slate-600">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex justify-end gap-2 p-4 border-t border-slate-100 bg-slate-50 rounded-b-lg">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
