import React from 'react';

import { StarIcon as SolidStar } from '@heroicons/react/solid';
import { ChatIcon, CloudDownloadIcon, StarIcon as EmptyStar } from '@heroicons/react/outline';

type ProductDetails = {
  key: string,
  value: string | JSX.Element;
}

type PublisherInfo = {
  name: string;
  profileUrl: string;
};

interface GenericProductComponentProps {
  productID: string;
  typeProp: JSX.Element;
  type: string;
  name: string;
  publisher: PublisherInfo;
  img?: string;
  excerpt?: string;
  details: ProductDetails[];
  ratings: number;
  comments: number;
  downloads: number;
}

const GenericProductComponent: React.FC<GenericProductComponentProps> = (props) => {

  const renderProductDetails = () => {
    return props.details.map((value, index) =>
      (
        <tr key={index}>
          <td>value.key</td>
          <td>value.value</td>
        </tr>
      ),
    );
  };

  const renderRatings = () => {
    const normRating = Math.max(Math.min(Math.round(props.ratings), 0), 5);
    return Array.from(new Array(5), (val) => {
      if (val < normRating) {
        return <SolidStar className="w-5 h-5"/>;
      } else {
        return <EmptyStar className="w-5 h-5"/>;
      }
    });
  };

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-lg lg:w-full lg:max-w-2xl bg-gray-100 rounded-lg shadow-xl">
      <div className="w-full lg:w-1/2 space-y-5 p-5">
        <div className="flex flex-row space-x-2 text-gray-600 items-center leading-none">
          {props.typeProp}
          <span className="font-normal">
            {props.type}
          </span>
        </div>
        {/* TODO (HJ): Calculate link from product ID for redirect */}
        <a href="#"
           className="block text-2xl py-2 font-semibold text-gray-700 hover:text-indigo-600 transition duration-200 ease-linear">
          {props.publisher.name}/{props.name}
        </a>
        <div className="space-y-3 bg-white lg:bg-gray-100 rounded-lg shadow-lg lg:shadow-none">
          <img className="block lg:hidden rounded-t-lg"
               src={props.img} alt="product image"/>
          <p className="p-5 border-0 border-t-2 lg:border-0 lg:p-0 lg:text-lg lg:font-semibold">
            {props.excerpt}
          </p>
        </div>
        <div className="flex flex-col w-full">
          <table className="table-auto w-full text-gray-800">
            <tbody>
            {renderProductDetails()}
            </tbody>
          </table>
        </div>

        <div className="flex flex-row space-x-2 justify-between">
          <div className="flex flex-row space-x-2 items-center">
            <div className="flex flex-row items-center text-indigo-600">
              {renderRatings()}
            </div>
            <span className="font-semibold">{props.ratings}</span>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <ChatIcon className="h-6 w-6 text-indigo-600"/>
            <span className="font-semibold">{props.comments}</span>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <CloudDownloadIcon className="h-6 w-6 text-indigo-600"/>
            <span className="font-semibold">{props.downloads}</span>
          </div>
        </div>
      </div>
      <div className="hidden lg:block w-1/2 lg:relative shadow-inner">
        <img className="absolute inset-0 h-full w-full object-cover object-center rounded-r-lg"
             src={props.img} alt="product image"/>
      </div>

    </div>
  );
};

export default GenericProductComponent;