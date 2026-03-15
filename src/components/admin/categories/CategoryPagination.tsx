import React from 'react';

interface CategoryPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const CategoryPagination: React.FC<CategoryPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-end mt-6 pt-6 border-t border-neutral-100">
      <div className="flex gap-1">
        <button 
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 border border-neutral-200 rounded-md text-sm cursor-pointer transition-colors ${
            currentPage === 1 
            ? 'text-neutral-400 bg-neutral-50 cursor-not-allowed opacity-50' 
            : 'text-neutral-600 hover:bg-neutral-50'
          }`}
        >
          Trang trước
        </button>
        
        {Array.from({ length: totalPages }).map((_, idx) => {
          const pageNumber = idx + 1;
          return (
            <button 
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                currentPage === pageNumber
                  ? 'bg-black text-white'
                  : 'text-neutral-600 hover:bg-neutral-50 border border-transparent hover:border-neutral-200'
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button 
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 border border-neutral-200 rounded-md text-sm cursor-pointer transition-colors ${
            currentPage === totalPages 
            ? 'text-neutral-400 bg-neutral-50 cursor-not-allowed opacity-50' 
            : 'text-neutral-600 hover:bg-neutral-50'
          }`}
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};
