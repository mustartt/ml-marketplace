import React from 'react';
import { ModelType } from '../../../../types/ResponseTypes';
import CategoryIcon from '../../../components/Utils/CategoryIcon';
import { DownloadIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

interface ModelExcerptProps {
  model: ModelType;
}

const ModelExcerpt: React.FC<ModelExcerptProps> = ({model}) => {
  return (
    <div className="p-4 bg-gray-200 rounded-lg shadow-lg max-w-md">
      <div className="flex space-x-2 items-center text-gray-700">
        <CategoryIcon category={model.category}/>
        <span className="leading-none">{model.category}</span>
      </div>
      <div className="mt-2">
        <Link to={`/user/${model.publisher.username}`}>
          <h1 className="font-semibold text-lg text-gray-900 hover:text-indigo-600 transition duration-200">
            {model.name}
          </h1>
        </Link>
        <p className="mt-2 text-gray-700 text-sm">{model.excerpt}</p>
      </div>
      <div className="mt-2 flex justify-between">
        <div>
          <div className="font-semibold space-x-2">
            <span>{model.framework}</span>
            <span>{model.format}</span>
          </div>
        </div>
        <div>
          <div className="flex items-center space-x-1">
            <DownloadIcon className="h-5 w-5"/>
            <span className="font-semibold">123</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelExcerpt;