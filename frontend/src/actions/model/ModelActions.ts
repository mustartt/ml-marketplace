import { Dispatch } from 'redux';
import { ModelActionType } from '../../store/reducers/ModelReducer/modelReducer';
import axios from 'axios';
import ApiRoute from '../../services/ApiRoutesService';
import { PublisherResponseType } from '../user/userActions';

export type ModelResponseType = {
  id: number;

  name: string;

  category: string;
  framework: string | null;
  format: string | null;

  excerpt: string | null;
  description: string | null;
  create_at: string | null;
  update_at: string | null;

  publisher: PublisherResponseType;

  tags: string[],
  price: number | null;
}

interface ModelPageResponseType {
  content: ModelResponseType[],
  page: number,
  page_size: number,
  size: number,
  total_size: number,
}

const ModelActions = {
  load: (page: number = 0, pageSize: number = 10) => (dispatch: Dispatch<ModelActionType>) => {
    const queryParam = {
      params: {
        page: page,
        size: pageSize,
      },
    };

    dispatch({
      type: 'LOAD_MODEL_START',
      payload: {
        curr: page,
        pageSize: pageSize,
      },
    });

    axios.get<ModelPageResponseType>(ApiRoute.getModelsPaged, queryParam).then(res => {
      dispatch({
        type: 'LOAD_MODEL_SUCCESS',
        payload: {
          models: res.data.content,
          totalPage: res.data.total_size,
        },
      });
    }).catch(err => {
      dispatch({
        type: 'LOAD_MODEL_FAIL',
        payload: {
          errorMessage: err,
        },
      });
    });
  },
};

export default ModelActions;