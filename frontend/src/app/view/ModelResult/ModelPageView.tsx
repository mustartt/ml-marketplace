import React from 'react';
import ModelResultComponent from '../../components/Product/ModelResultComponent';

const IMG_URL = 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*';
const DESC = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque facilisis sem suscipit lacus rhoncus, eu lobortis ligula pulvinar. Sed placerat imperdiet lectus, in auctor libero. Nullam ut augue enim.';

const MODEL_LIST = [
  {
    productID: '1',
    name: 's-r152x4',
    type: 'Image Classification',
    img: IMG_URL,
    excerpt: DESC,
    publisher: {
      name: 'mustartt',
      profileUrl: '#',
    },
  },
  {
    productID: '2',
    name: 'mobilenet_v2',
    type: 'Image Classification',
    img: IMG_URL,
    excerpt: DESC,
    publisher: {
      name: 'mustartt',
      profileUrl: '#',
    },
    updatedAt: new Date(),
    tags: [
      {
        name: 'tag',
        link: '#'
      }
    ]
  },
  {
    productID: '3',
    name: 'resnet50_v1',
    type: 'Image Classification',
    img: IMG_URL,
    excerpt: DESC,
    publisher: {
      name: 'mustartt',
      profileUrl: '#',
    },
  },
];

const ModelPageView: React.FC = () => {

  const renderModels = () => {
    return MODEL_LIST.map((val, index) => (
        <ModelResultComponent
          key={index}
          {...val} />
      ),
    );
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 place-content-center gap-5">
      {renderModels()}
    </div>
  );
};

export default ModelPageView;

