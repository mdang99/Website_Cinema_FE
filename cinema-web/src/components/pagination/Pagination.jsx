"use client";
import React from "react";

export default function Pagination({
  totalItems,
  itemsPerPage = 14,
  currentPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center mt-8">
      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
        {/* Previous */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`px-3 py-2 border rounded ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-50"
          }`}
        >
          ‹
        </button>

        {/* Pages */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 border rounded text-sm font-semibold ${
              page === currentPage
                ? "bg-indigo-600 text-white"
                : "hover:bg-indigo-600 hover:text-white"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Next */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`px-3 py-2 border rounded ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-indigo-600 hover:text-white"
          }`}
        >
          ›
        </button>
      </nav>
    </div>
  );
}
