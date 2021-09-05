import { Dispatch } from 'redux';
import { SingleModelAction } from '../../store/reducers/ModelReducer/singleModelReducer';
import axios from 'axios';
import ApiRoute from '../../services/ApiRoutesService';
import { ModelResponseType } from '../../types/ResponseTypes';

const SingleModelActions = {
  load: (id: number) => (dispatch: Dispatch<SingleModelAction>) => {
    dispatch({
      type: 'LOAD_SINGLE_MODEL_START',
      payload: undefined,
    });
    axios.get<ModelResponseType>(ApiRoute.constructModelUrlWithId(id)).then(res => {
      dispatch({
        type: 'LOAD_SINGLE_MODEL_SUCCESS',
        payload: {
          model: res.data,
        },
      });
    }).catch(err => {
      dispatch({
        type: 'LOAD_SINGLE_MODEL_FAIL',
        payload: err.toString(),
      });
    });
  },
  invalidId: (err: string) => (dispatch: Dispatch<SingleModelAction>) => {
    dispatch({
      type: 'LOAD_SINGLE_MODEL_FAIL',
      payload: err.toString(),
    });
  },
};

export default SingleModelActions;