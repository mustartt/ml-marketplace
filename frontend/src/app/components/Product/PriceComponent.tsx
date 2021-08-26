import React from 'react';

interface PriceComponentProps {
  price?: number;
}

const PriceComponent: React.FC<PriceComponentProps> = ({price}) => {
  const priceFormat = price ? '$' + (Math.round(price * 100) / 100).toFixed(2) : 'free';

  return (
    <span className="bg-indigo-600 hover:bg-indigo-500 transform duration-200 py-1.5 px-4 rounded-full
    font-bold text-lg text-white shadow-md uppercase">
      {priceFormat}
    </span>
  );
};

export default PriceComponent;