import { ModelResponseType } from '../../../actions/model/ModelActions';
import { UserResponseType } from '../../../actions/user/userActions';

const defaultState = {
  isLoading: false,
  error: null,
  /* query params */
  models: [],
  curr: 0,
  pageSize: 10,
  totalPage: 1,
};

export { defaultState as modelDefaultState };

export type ModelType = {
  id: number;

  name: string;

  category: string;
  framework: string | null;
  format: string | null;

  publisher: UserResponseType;

  excerpt: string | null;
  description: string | null;
  createAt: Date | null;
  updateAt: Date | null;

  tags: string[],
  price: number | null;
}

export interface ModelState {
  isLoading: boolean;
  error: string | null;
  /* query params */
  models: ModelType[];
  curr: number;
  pageSize: number;
  totalPage: number;
}

export type ModelActionType = {
  type: string;
  payload: any;
}

const modelReducer = (state: ModelState = defaultState, action: ModelActionType) => {
  switch (action.type) {
    case 'LOAD_MODEL_START':
      return Object.assign({}, state, {
        isLoading: true,
        error: null,
        curr: action.payload.curr,
        pageSize: action.payload.pageSize,
      });

    case 'LOAD_MODEL_SUCCESS':
      const models = action.payload.models.map((model: ModelResponseType) => {
        return Object.assign({}, model, {
          createAt: model.create_at ? new Date(model.create_at) : null,
          updatedAt: model.update_at ? new Date(model.update_at) : null,
        });
      });

      return Object.assign({}, state, {
        isLoading: false,
        models,
        totalPage: action.payload.totalPage,
      });

    case 'LOAD_MODEL_FAIL':
      return Object.assign({}, state, {
        isLoading: false,
        models: [],
        error: action.payload.errorMessage,
      });

    default:
      return state;
  }
};

export default modelReducer;