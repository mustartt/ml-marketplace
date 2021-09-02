import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

interface PaginationProps {
  curr: number; // zero-indexed
  totalPage: number;
  onChange: (newPage: number) => void; // callback when number changes
}

const getPageNumbers = (curr: number, total: number): number[] =>
  Array.from(new Array(5),
    (_, x) => x + curr - 2).filter(x => 0 < x && x <= total);

const Pagination: React.FC<PaginationProps> = ({curr, totalPage, onChange}) => {

  const pageNumbers = getPageNumbers(curr, totalPage);

  const changePage = (num: number) => {
    if (num >= 0 && num < totalPage) {
      onChange(num);
    }
  };

  return (
    <div
      className="flex flex-row rounded-full w-min px-2 py-1 leading-none bg-gray-100 space-x-2 items-center text-gray-800 font-semibold text-base space-x-1 shadow-lg">
      <span
        className="cursor-pointer hover:bg-indigo-600 hover:text-gray-200 hover:shadow-md transition duration-150 rounded-full p-1"
        onClick={() => changePage(curr - 1)}>
        <ChevronLeftIcon className="w-5 h-5"/>
      </span>
      {
        pageNumbers.map(num => {
          if (num === curr + 1) {
            return <span
              key={num}
              className="cursor-pointer text-gray-200 bg-indigo-600 hover:bg-indigo-500 shadow-md transition duration-150 rounded-full p-1 px-2">
              {num}
            </span>;
          } else {
            return <span
              className="cursor-pointer text-gray-800 hover:bg-indigo-600 hover:text-gray-200 hover:shadow-md transition duration-150 rounded-full p-1 px-2"
              key={num}
              onClick={() => changePage(num - 1)}
            >
              {num}
            </span>;
          }
        })
      }
      <span
        className="cursor-pointer hover:bg-indigo-600 hover:text-gray-200 hover:shadow-md transition duration-150 rounded-full p-1"
        onClick={() => changePage(curr + 1)}>
        <ChevronRightIcon className="w-5 h-5"/>
      </span>
    </div>
  );
};

export default Pagination;