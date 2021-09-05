import React from 'react';

import { StarIcon as SolidStar } from '@heroicons/react/solid';
import { ChatIcon, CloudDownloadIcon, StarIcon as EmptyStar } from '@heroicons/react/outline';
import PriceComponent from './PriceComponent';
import { Link } from 'react-router-dom';

export type ProductDetails = {
  key: string,
  value: string | JSX.Element;
}

export type PublisherInfo = {
  name: string;
  profileUrl: string;
};

interface GenericProductComponentProps {
  productID: number;

  typeProp: JSX.Element;
  type: string;

  name: string;
  publisher: PublisherInfo;
  img?: string;
  excerpt?: string;
  price?: number;

  details: ProductDetails[];

  stars?: number;
  ratings?: number;
  comments?: number;
  downloads?: number;
}

const GenericProductComponent: React.FC<GenericProductComponentProps> = (props) => {

  const renderProductDetails = () => {
    return props.details.map((value, index) =>
      (
        <tr key={index}>
          <td>{value.key}:</td>
          <td>{value.value}</td>
        </tr>
      ),
    );
  };

  const renderRatings = () => {
    const normRating = Math.max(Math.min(Math.round(props.stars || 5), 0), 5);
    return Array.from(new Array(5), (val, index) => {
      if (val < normRating) {
        return <SolidStar key={index} className="w-5 h-5"/>;
      } else {
        return <EmptyStar key={index} className="w-5 h-5"/>;
      }
    });
  };

  return (
    <div
      className="justify-self-center flex flex-col xl:flex-row w-full max-w-lg xl:w-full xl:max-w-3xl bg-gray-100 rounded-lg shadow-xl">
      <div className="w-full xl:w-1/2 space-y-5 p-5">
        <div className="flex flex-row space-x-2 text-gray-600 items-center leading-none">
          {props.typeProp}
          <span className="font-normal">
            {props.type}
          </span>
        </div>
        <div className="flex flex-row flex-wrap items-center justify-between">
          <Link to={`/model/${props.productID}`}>
            <span
              className="block text-2xl py-2 font-semibold text-gray-700 hover:text-indigo-600 transition duration-200 ease-linear">
              {props.publisher.name}/{props.name}
            </span>
          </Link>
          <PriceComponent price={props.price}/>
        </div>
        <div className="bg-white xl:bg-gray-100 rounded-lg shadow-lg xl:shadow-none">
          <img className="block xl:hidden rounded-t-lg"
               src={props.img} alt="product image"/>
          <p className="p-5 xl:border-0 xl:p-0 xl:text-lg xl:font-semibold text-gray-700">
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
            <span className="font-semibold text-gray-700">{props.ratings || 0}</span>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <ChatIcon className="h-6 w-6 text-indigo-600"/>
            <span className="font-semibold text-gray-700">{props.comments || 0}</span>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <CloudDownloadIcon className="h-6 w-6 text-indigo-600"/>
            <span className="font-semibold text-gray-700">{props.downloads || 0}</span>
          </div>
        </div>
      </div>
      <div className="hidden xl:block w-1/2 xl:relative shadow-inner">
        <img className="absolute inset-0 h-full w-full object-cover object-center rounded-r-lg"
             src={props.img} alt="product image"/>
      </div>

    </div>
  );
};

export default GenericProductComponent;