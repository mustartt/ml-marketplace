import React from 'react';

const Progressbar: React.FC<{ progress: number }> = ({progress}) => {
  return (
    <div className="flex-grow mt-1 relative">
      <div className="overflow-hidden h-2 text-xs flex rounded bg-indigo-200">
        <div style={{width: progress + '%'}}
             className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"/>
      </div>
    </div>
  );
};

export default Progressbar;