import React, { useEffect, useState } from 'react';

const Pagination = ({ articlesPerPage, totalArticles, paginate, currentPage }) => {
  const [pageNumbers, setPageNumbers] = useState([]);
  const [pageRange, setPageRange] = useState([]);
  const maxPagesToShow = 5;
  const totalPages = Math.ceil(totalArticles / articlesPerPage);

  useEffect(() => {
    const numbers = [];
    for (let i = 1; i <= totalPages; i++) {
      numbers.push(i);
    }
    setPageNumbers(numbers);
  }, [totalArticles, articlesPerPage, totalPages]);

  useEffect(() => {
    const range = [];
    const start = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const end = Math.min(totalPages, start + maxPagesToShow - 1);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    setPageRange(range);
  }, [currentPage, totalPages]);

  if (totalArticles === 0 || totalPages <= 1) return null;

  return (
    <nav className="mt-8">
      <ul className="pagination flex justify-center items-center">
        <li className="page-item mx-1">
          <button
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            className="page-link bg-white text-[#DC143C] rounded-full w-[5vw] sm:w-[2.7vw] md:w-[1.7vw] h-[5vw] sm:h-[2.7vw] md:h-[1.7vw] text-[3vw] sm:text-[1.3vw] md:text-[1vw]"
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
        </li>
        {currentPage > Math.floor(maxPagesToShow / 2) + 1 && (
          <>
            <li className="page-item mx-1">
              <button
                onClick={() => paginate(1)}
                className="page-link bg-white text-[#DC143C] rounded-full w-[5vw] sm:w-[2.7vw] md:w-[1.7vw] h-[5vw] sm:h-[2.7vw] md:h-[1.7vw] text-[3vw] sm:text-[1.3vw] md:text-[1vw]"
              >
                1
              </button>
            </li>
            <li className="page-item mx-1">
              <span className="text-[#DC143C] text-[3vw] sm:text-[1.3vw] md:text-[1vw]">...</span>
            </li>
          </>
        )}
        {pageRange.map(number => (
          <li key={number} className="page-item mx-1">
            <button
              onClick={() => paginate(number)}
              className={`page-link ${number === currentPage ? 'bg-[#DC143C] text-white' : 'bg-white text-[#DC143C]'} rounded-full w-[5vw] sm:w-[2.7vw] md:w-[1.7vw] h-[5vw] sm:h-[2.7vw] md:h-[1.7vw] text-[3vw] sm:text-[1.3vw] md:text-[1vw]`}
            >
              {number}
            </button>
          </li>
        ))}
        {currentPage < totalPages - Math.floor(maxPagesToShow / 2) && (
          <>
            <li className="page-item mx-1">
              <span className="text-[#DC143C] text-[3vw] sm:text-[1.3vw] md:text-[1vw]">...</span>
            </li>
            <li className="page-item mx-1">
              <button
                onClick={() => paginate(totalPages)}
                className="page-link bg-white text-[#DC143C] rounded-full w-[5vw] sm:w-[2.7vw] md:w-[1.7vw] h-[5vw] sm:h-[2.7vw] md:h-[1.7vw] text-[3vw] sm:text-[1.3vw] md:text-[1vw]"
              >
                {totalPages}
              </button>
            </li>
          </>
        )}
        <li className="page-item mx-1">
          <button
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            className="page-link bg-white text-[#DC143C] rounded-full w-[5vw] sm:w-[2.7vw] md:w-[1.7vw] h-[5vw] sm:h-[2.7vw] md:h-[1.7vw] text-[3vw] sm:text-[1.3vw] md:text-[1vw]"
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
