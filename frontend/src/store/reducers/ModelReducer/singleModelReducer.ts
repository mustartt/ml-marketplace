import { mapModelResponseToModel, ModelResponseType, ModelType } from '../../../types/ResponseTypes';

export { defaultState as singleModelDefaultState };

export interface SingleModelState {
  isLoading: boolean;
  error: string | null;
  model: ModelType | null;
}

const defaultState = {
  isLoading: false,
  error: null,
  model: null,
};

export type SingleModelAction =
  {
    type: 'LOAD_SINGLE_MODEL_START',
  } |
  {
    type: 'LOAD_SINGLE_MODEL_SUCCESS',
    payload: {
      model: ModelResponseType,
    }
  } |
  {
    type: 'LOAD_SINGLE_MODEL_FAIL',
    payload: string
  };

const singleModelReducer = (state: SingleModelState = defaultState, action: SingleModelAction) => {
  switch (action.type) {
    case 'LOAD_SINGLE_MODEL_START':
      return Object.assign({}, state, {
        isLoading: true,
        error: null,
      });
    case 'LOAD_SINGLE_MODEL_SUCCESS':
      const model = mapModelResponseToModel(action.payload.model);
      return Object.assign({}, state, {
        isLoading: false,
        model,
      });
    case 'LOAD_SINGLE_MODEL_FAIL':
      return Object.assign({}, state, {
        isLoading: false,
        error: action.payload,
        model: null,
      });
    default:
      return state;
  }
};

export default singleModelReducer;