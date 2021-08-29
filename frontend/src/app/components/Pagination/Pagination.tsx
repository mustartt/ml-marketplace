import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';

interface PaginationProps {
  curr: number; // zero-indexed
  totalPage: number;
  onChange: (newPage: number) => void; // callback when number changes
}

const Pagination: React.FC<PaginationProps> = (props) => {

  const changePage = (num: number) => {
    if (num < 0 || num >= props.totalPage)
      return;
    props.onChange(num);
  };

  let pages = [];
  // making pages 5 numbers depending on current
  if (props.totalPage >= 5) {
    if (props.curr + 1 < 3) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
    } else if (props.curr + 1 > props.totalPage - 3) {
      for (let i = props.totalPage - 4; i <= props.totalPage; i++) {
        pages.push(i);
      }
    } else {
      for (let i = props.curr - 1; i < props.curr + 4; i++) {
        pages.push(i);
      }
    }
  } else {
    for (let i = 1; i <= props.totalPage; i++) {
      pages.push(i);
    }
  }

  return (
    <div
      className="flex flex-row rounded-full w-min px-2 py-1 leading-none bg-gray-100 space-x-2 items-center text-gray-800 font-semibold text-base space-x-1 shadow-lg">
      <span
        className="cursor-pointer hover:bg-indigo-600 hover:text-gray-200 hover:shadow-md transition duration-150 rounded-full p-1"
        onClick={() => changePage(props.curr - 1)}>
        <ChevronLeftIcon className="w-5 h-5"/>
      </span>
      {
        pages.map(num => {
          if (num === props.curr + 1) {
            return <span
              className="cursor-pointer text-gray-200 bg-indigo-600 hover:bg-indigo-500 shadow-md transition duration-150 rounded-full p-1 px-2">{num}</span>;
          } else {
            return <span
              className="cursor-pointer text-gray-800 hover:bg-indigo-600 hover:text-gray-200 hover:shadow-md transition duration-150 rounded-full p-1 px-2"
              key={num}
              onClick={() => changePage(num)}
            >
              {num}
            </span>;
          }
        })
      }
      <span
        className="cursor-pointer hover:bg-indigo-600 hover:text-gray-200 hover:shadow-md transition duration-150 rounded-full p-1"
        onClick={() => changePage(props.curr + 1)}>
        <ChevronRightIcon className="w-5 h-5"/>
      </span>
    </div>
  );
};

export default Pagination;