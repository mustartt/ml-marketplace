import { Dispatch } from 'redux';
import { FilterType, ModelActionType } from '../../store/reducers/ModelReducer/modelReducer';
import axios from 'axios';
import ApiRoute from '../../services/ApiRoutesService';
import { UserResponseType } from '../user/userActions';
import { RootState } from '../../store/reducers/rootReducer';

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

  publisher: UserResponseType;

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

const getFilterQueryStrings = (filter: FilterType) => {
  if (!filter.filters || filter.filters.length == 0) return undefined;
  return filter.filters.join(',');
};

const getFiltersQueryParam = (filters: FilterType[]) => {
  const queryObject: { [key: string]: string | undefined } = {};
  filters.forEach((filter) => {
    queryObject[filter.name] = getFilterQueryStrings(filter);
  });
  return queryObject;
};

const ModelActions = {
  load: (search: string) => (
    dispatch: Dispatch<ModelActionType>, getState: () => RootState) => {

    const {modelState: {filters, curr, pageSize}} = getState();

    const queryParam = {
      params: {
        search: search,
        page: curr,
        size: pageSize,
        ...getFiltersQueryParam(filters),
      },
    };

    dispatch({
      type: 'LOAD_MODEL_START',
      payload: {
        curr: curr,
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