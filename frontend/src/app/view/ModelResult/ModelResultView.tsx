import React, { useEffect } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import ModelPageView from './ModelPageView';

const ModelResultView = () => {

  useEffect(() => {
    console.log('loaded');
  }, []);

  return (
    <div className="p-5 space-y-5 bg-gray-900">
      <div className="flex flex-row justify-between items-center flex-wrap space-y-2">
        <h1 className="w-full sm:w-auto text-center sm:text-left font-bold text-2xl text-gray-200 tracking-wide flex-shrink-0">Showing Results for</h1>
        <div className="w-full sm:w-auto flex flex-row justify-center">
          <Pagination curr={2}
                      totalPage={5}
                      onChange={(newPage) => console.log(newPage)}
          />
        </div>
      </div>
      <ModelPageView/>
    </div>
  );
};

export default ModelResultView;