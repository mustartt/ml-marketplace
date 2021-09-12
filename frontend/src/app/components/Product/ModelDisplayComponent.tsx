import React from 'react';

import { StarIcon as SolidStar } from '@heroicons/react/solid';
import { ChatIcon, CloudDownloadIcon, StarIcon as EmptyStar } from '@heroicons/react/outline';
import PriceComponent from './PriceComponent';
import { Link } from 'react-router-dom';
import { ModelType } from '../../../types/ResponseTypes';
import CategoryIcon from '../Utils/CategoryIcon';
import DescriptionTable, { TableRowType } from '../Layout/DescriptionTable';

interface ModelDisplayComponentProps {
  product: ModelType;
  meta: {
    rating: number;
    likes: number;
    comments: number;
    downloads: number;
  };
}

const ModelDisplayComponent: React.FC<ModelDisplayComponentProps> = ({product, meta}) => {

  const renderProductDetails = () => {
    const table: TableRowType[] = [
      {
        name: 'Publisher',
        value: (
          <Link to={`/user/${product.publisher.username}`}>
            <span className="underline hover:text-indigo-700">{product.publisher.username}</span>
          </Link>
        ),
      }, {
        name: 'Category',
        value: product.category,
      }, {
        name: 'Framework',
        value: product.framework,
      }, {
        name: 'Updated At',
        value: product.updatedAt.toLocaleDateString(),
      },
    ];
    return <DescriptionTable table={table}/>;
  };

  const renderRatings = () => {
    const normRating = Math.min(Math.max(meta.rating, 0), 5);
    return Array.from(new Array(5), (val, index) => {
      if (index < normRating) {
        return <SolidStar key={index} className="w-6 h-6"/>;
      } else {
        return <EmptyStar key={index} className="w-5 h-5"/>;
      }
    });
  };

  return (
    <div
      className="w-full max-w-lg bg-white rounded-lg shadow-xl">
      <div className="w-full space-y-5 p-5">
        <div className="flex flex-row space-x-2 text-gray-600 items-center leading-none">
          <CategoryIcon category="model"/>
          <span className="font-normal">{product.category}</span>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-between">
          <Link to={`/model/${product.id}`}>
            <span
              className="block text-2xl py-2 font-semibold text-gray-700 hover:text-indigo-600 transition duration-200 ease-linear">
              {product.publisher.username}/{product.name}
            </span>
          </Link>
          <PriceComponent price={product.price}/>
        </div>
        <div className="text-gray-700 mt-1 mb-3">
          {product.excerpt}
        </div>
        {renderProductDetails()}
        <div className="flex flex-row space-x-2 justify-between">
          <div className="flex flex-row space-x-2 items-center">
            <div className="flex flex-row items-center text-indigo-600">
              {renderRatings()}
            </div>
            <span className="font-semibold text-gray-700">{meta.likes}</span>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <ChatIcon className="h-6 w-6 text-indigo-600"/>
            <span className="font-semibold text-gray-700">{meta.comments}</span>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <CloudDownloadIcon className="h-6 w-6 text-indigo-600"/>
            <span className="font-semibold text-gray-700">{meta.downloads}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDisplayComponent;