/**
 * Shared Input Component.
 * @module components/shared/Input
 */
import React, { forwardRef } from 'react';

/**
 * A styled wrapper around the native HTML input element, supporting labels and error states.
 * Uses `forwardRef` to allow parent components (like react-hook-form) to manage focus and references.
 * 
 * @param {Object} props - React component props.
 * @param {string} [props.label] - Optional text label displayed above the input.
 * @param {string} props.id - The unique HTML ID linking the label to the input.
 * @param {string} [props.type='text'] - The HTML input type (text, email, password, etc.).
 * @param {Object|string} [props.error] - Validation error object or message to display.
 * @param {string} [props.placeholder] - Placeholder text for empty state.
 * @param {string} [props.className=''] - Additional CSS classes for the container.
 * @param {React.Ref} ref - The forwarded React ref object.
 * @returns {React.ReactElement} The rendered input component.
 */
const Input = forwardRef(({
  label,
  id,
  type = 'text',
  error,
  placeholder,
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
      <input
        id={id}
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`
          w-full px-3 py-2 border rounded-md text-sm transition-all focus:outline-none focus:ring-2
          ${error 
            ? 'border-red-500 focus:ring-red-200' 
            : 'border-slate-300 focus:border-academic-navy focus:ring-academic-navy/20'
          }
          bg-white text-academic-slate placeholder-slate-400
        `}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-600 mt-0.5">
          {error.message || error}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
