/**
 * Custom React hook for managing tabular pagination state mechanisms.
 * @module hooks/usePagination
 */
import { useState } from 'react';

/**
 * Provides state variables and handler functions for navigating paginated record sets.
 * 
 * @param {number} [initialPage=0] - The default zero-indexed starting page.
 * @param {number} [initialSize=10] - The default number of records per page.
 * @returns {Object} An object containing pagination state values and navigational setter methods.
 */
export const usePagination = (initialPage = 0, initialSize = 10) => {
  const [page, setPage] = useState(initialPage);
  const [size, setSize] = useState(initialSize);

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => Math.max(0, prev - 1));
  const goToPage = (pageNumber) => setPage(pageNumber);

  return {
    page,
    size,
    setPage,
    setSize,
    nextPage,
    prevPage,
    goToPage,
  };
};
