import { mapModelResponseToModel, ModelResponseType, ModelType } from '../../../types/ResponseTypes';

const defaultState = {
  isLoading: false,
  error: null,
  filters: [
    {
      name: 'category',
      type: 'multi',
      filters: [],
    },
    {
      name: 'framework',
      type: 'multi',
      filters: [],
    },
    {
      name: 'format',
      type: 'multi',
      filters: [],
    },
    {
      name: 'price',
      type: 'range',
      filters: [20, 200],
    },
  ],
  models: [],
  curr: 0,
  pageSize: 10,
  totalPage: 1,
  totalSize: 0,
};

export { defaultState as modelDefaultState };

export type FilterType = {
  name: string;
  type: string;
  filters: Array<any> | null;
}

export interface ModelState {
  isLoading: boolean;
  error: string | null;
  filters: FilterType[];
  models: ModelType[];
  curr: number;
  pageSize: number;
  totalPage: number;
  totalSize: number;
}

export type ModelAction =
  {
    type: 'CHANGE_MODEL_FILTERS',
    payload: FilterType[]
  } |
  {
    type: 'LOAD_MODEL_START',
    payload: {
      curr: number,
      pageSize: number
    }
  } |
  {
    type: 'LOAD_MODEL_SUCCESS',
    payload: {
      models: ModelResponseType[],
      totalPages: number,
      totalSize: number,
    }
  } |
  {
    type: 'LOAD_MODEL_FAIL',
    payload: string,
  };

const modelReducer = (state: ModelState = defaultState, action: ModelAction) => {
  switch (action.type) {
    case 'CHANGE_MODEL_FILTERS':
      return Object.assign({}, state, {
        filters: action.payload,
      });

    case 'LOAD_MODEL_START':
      return Object.assign({}, state, {
        isLoading: true,
        error: null,
        curr: action.payload.curr,
        pageSize: action.payload.pageSize,
      });

    case 'LOAD_MODEL_SUCCESS':
      const models = action.payload.models.map(model => mapModelResponseToModel(model));
      return Object.assign({}, state, {
        isLoading: false,
        models,
        totalPage: action.payload.totalPages,
        totalSize: action.payload.totalSize,
      });

    case 'LOAD_MODEL_FAIL':
      return Object.assign({}, state, {
        isLoading: false,
        models: [],
        error: action.payload,
      });

    default:
      return state;
  }
};

export default modelReducer;