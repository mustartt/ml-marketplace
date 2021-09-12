import React from 'react';

const CenterMaxWidthContent: React.FC = ({children}) => {
  return (
    <div className="flex justify-center">
      <div className="flex-grow max-w-6xl">
        {children}
      </div>
    </div>
  );
};

export default CenterMaxWidthContent;