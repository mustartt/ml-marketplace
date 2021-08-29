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

  autoCloseNotification: (
    type: string, msg: string, duration: number = 5000) => (dispatch: Dispatch<LayoutActionType>) => {
    dispatch({
      type: 'NOTIFICATION_OPEN',
      payload: {
        type,
        message: msg,
      },
    });
    setTimeout(() => {
      dispatch({
        type: 'NOTIFICATION_CLOSE',
        payload: null,
      });
    }, duration);
  },
  openNotification: (type: string, msg: string) => (dispatch: Dispatch<LayoutActionType>) => {
    dispatch({
      type: 'NOTIFICATION_OPEN',
      payload: {
        type,
        message: msg,
      },
    });
  },
  closeNotification: () => (dispatch: Dispatch<LayoutActionType>) => {
    dispatch({
      type: 'NOTIFICATION_CLOSE',
      payload: null,
    });
  },

};

export default LayoutActions;