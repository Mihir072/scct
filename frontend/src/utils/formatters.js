/**
 * Utility functions for data formatting and localization.
 * @module utils/formatters
 */

/**
 * Formats a numerical value as Indian Rupee (INR) currency.
 * 
 * @param {number} amount - The currency amount to format.
 * @returns {string} The formatted currency string, or 'N/A' if invalid.
 */
export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return 'N/A';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Formats a placement package numerical value with an "LPA" suffix.
 * 
 * @param {number} packageLpa - The package amount in Lakhs Per Annum.
 * @returns {string} The formatted string (e.g., '5.50 LPA'), or 'N/A' if invalid.
 */
export const formatPackage = (packageLpa) => {
  if (packageLpa === undefined || packageLpa === null) return 'N/A';
  return `${Number(packageLpa).toFixed(2)} LPA`;
};

/**
 * Formats an ISO date string into a localized, human-readable Indian date format.
 * 
 * @param {string} dateString - The raw ISO date string to format.
 * @returns {string} The formatted date string, or 'N/A' if invalid.
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
