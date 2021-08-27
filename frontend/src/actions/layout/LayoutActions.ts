import { Dispatch } from 'redux';
import { LayoutActionType } from '../../store/reducers/LayoutReducer/layoutReducer';

const LayoutActions = {
  setSidebarState: (open: boolean) => (dispatch: Dispatch<LayoutActionType>) => {
    if (open) {
      dispatch({
        type: 'SIDEBAR_OPEN',
        payload: null,
      });
    } else {
      dispatch({
        type: 'SIDEBAR_CLOSE',
        payload: null,
      });
    }
  },
};

export default LayoutActions;