/**
 * Shared Loading Spinner Component.
 * @module components/shared/LoadingSpinner
 */
import React from 'react';

/**
 * A visual animated spinner to indicate asynchronous loading states.
 * 
 * @param {Object} props - React component props.
 * @param {string} [props.size='medium'] - The dimensions of the spinner (small, medium, large).
 * @param {string} [props.className=''] - Additional CSS classes for the container.
 * @returns {React.ReactElement} The rendered spinner element.
 */
const LoadingSpinner = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'h-4 w-4 border-2',
    medium: 'h-8 w-8 border-3',
    large: 'h-12 w-12 border-4',
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-t-academic-maroon border-r-transparent border-b-academic-navy border-l-transparent ${sizeClasses[size]}`}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
