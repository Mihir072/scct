import React, { forwardRef } from 'react';

const Select = forwardRef(({
  label,
  id,
  error,
  options = [],
  placeholder = 'Select an option',
  className = '',
  ...props
}, ref) => {
  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-academic-slate block">
          {label}
        </label>
      )}
      <select
        id={id}
        ref={ref}
        className={`
          w-full px-3 py-2 border rounded-md text-sm transition-all focus:outline-none focus:ring-2
          ${error
            ? 'border-red-500 focus:ring-red-200'
            : 'border-slate-300 focus:border-academic-navy focus:ring-academic-navy/20'
          }
          bg-white text-academic-slate
        `}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span className="text-xs text-red-600 mt-0.5">
          {error.message || error}
        </span>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;
