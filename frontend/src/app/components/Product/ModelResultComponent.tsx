import GenericProductComponent, { PublisherInfo } from './GenericProductComponent';
import React from 'react';
import { CubeTransparentIcon } from '@heroicons/react/outline';
import TagComponent, { TagType } from './TagComponent';
import { Link } from 'react-router-dom';

interface ModelResultComponentProps {
  productID: number;

  name: string;
  type: string;
  publisher: PublisherInfo;
  img?: string;
  excerpt?: string;
  price?: number;

  updatedAt?: Date;
  architecture?: string;
  format?: string;
  tags?: TagType[];

  ratings?: number;
  comments?: number;
  downloads?: number;
}

const ModelResultComponent: React.FC<ModelResultComponentProps> = (props) => {

  const tags = props.tags || [];

  const details = [
    {
      key: 'Publisher',
      value: (
        <Link to={`/user/${props.publisher.name}`}>
           <span>
          {props.publisher.name}
        </span>
        </Link>
      ),
    },
    {
      key: 'Updated',
      value: props.updatedAt?.toDateString() || '',
    },
    {
      key: 'Format',
      value: props.format || '',
    },
    {
      key: 'Architecture',
      value: props.architecture || '',
    },
    {
      key: 'tags',
      value: (
        <div className="max-w-xs space-y-1">
          {tags.map((tag, index) => (
              <TagComponent key={index} {...tag}/>
            ),
          )}
        </div>
      ),
    },
  ];

  return (
    <GenericProductComponent productID={props.productID}
                             typeProp={<CubeTransparentIcon className="h-6 w-6"/>}
                             type={props.type}
                             name={props.name}
                             publisher={props.publisher}
                             img={props.img}
                             excerpt={props.excerpt}
                             price={props.price}
                             details={details}
                             ratings={props.ratings}
                             comments={props.comments}
                             downloads={props.downloads}/>
  );
};

export default ModelResultComponent;

