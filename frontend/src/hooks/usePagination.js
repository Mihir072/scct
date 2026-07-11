import { useState } from 'react';

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
