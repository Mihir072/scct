/**
 * Shared Select Component.
 * @module components/shared/Select
 */
import React, { forwardRef } from 'react';

/**
 * A styled wrapper around the native HTML select dropdown element.
 * Uses `forwardRef` to integrate smoothly with form libraries like react-hook-form.
 * 
 * @param {Object} props - React component props.
 * @param {string} [props.label] - Optional text label displayed above the dropdown.
 * @param {string} props.id - The unique HTML ID linking the label to the select.
 * @param {Object|string} [props.error] - Validation error object or message to display.
 * @param {Array<{value: string, label: string}>} [props.options=[]] - The list of dropdown options.
 * @param {string} [props.placeholder='Select an option'] - The default unselected prompt option.
 * @param {string} [props.className=''] - Additional CSS classes for the container.
 * @param {React.Ref} ref - The forwarded React ref object.
 * @returns {React.ReactElement} The rendered select component.
 */
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
