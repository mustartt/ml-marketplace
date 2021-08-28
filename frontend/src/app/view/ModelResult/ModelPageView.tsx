import React from 'react';
import ModelResultComponent from '../../components/Product/ModelResultComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers/rootReducer';
import { ModelType } from '../../../store/reducers/ModelReducer/modelReducer';

const IMG_URL = 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*';

const ModelPageView: React.FC = () => {

  const models = useSelector((state: RootState) => state.modelState.models);

  const renderModels = () => {
    return models.map((model: ModelType, index: number) => {

        const publisherInfo = {
          name: model.publisher.username,
          profileUrl: '', /* not used */
        };

        const tags = model.tags.map((tag: string) => {
          return {
            name: tag,
            /* calculate redirect links */
          };
        });

        return <ModelResultComponent
          key={index}
          productID={model.id}
          img={IMG_URL}
          name={model.name}
          publisher={publisherInfo}
          type={model.category}
          excerpt={model.excerpt || ''}
          price={model.price || undefined}
          updatedAt={model.updateAt || undefined}
          architecture={model.framework || undefined}
          format={model.format || undefined}
          tags={tags}
        />;
      },
    );
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 place-content-center gap-5">
      {renderModels()}
    </div>
  );
};

export default ModelPageView;

