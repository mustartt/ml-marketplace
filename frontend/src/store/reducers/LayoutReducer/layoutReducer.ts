export type SideBarState = {
  open: boolean;
}

export type NotificationState = {
  type: string;
  message: string;
  open: boolean;
}

export type FilterLayoutState = {
  open: boolean;
}

export interface LayoutState {
  sidebar: SideBarState;
  notification: NotificationState;
  filter: FilterLayoutState;
}

export type LayoutActionType = {
  type: string;
  payload: any;
}

const isDesktopWidth = window.innerWidth > 768;

const defaultState = {
  sidebar: {
    open: false,
  },
  notification: {
    type: 'warning',
    message: 'message',
    open: false,
  },
  filter: {
    open: false,
  },
};

export { defaultState as layoutDefaultState };

const layoutReducer = (state: LayoutState = defaultState, action: LayoutActionType) => {
  switch (action.type) {
    case 'SIDEBAR_OPEN':
      return Object.assign({}, state, {
        sidebar: {
          open: true,
        },
      });
    case 'SIDEBAR_CLOSE':
      return Object.assign({}, state, {
        sidebar: {
          open: false,
        },
      });

    case 'NOTIFICATION_OPEN':
      return Object.assign({}, state, {
        notification: {
          type: action.payload.type,
          message: action.payload.message,
          open: true,
        },
      });
    case 'NOTIFICATION_CLOSE':
      state.notification = Object.assign({}, state.notification, {
        open: false,
      });
      return state;

    case 'FILTER_OPEN':
      return Object.assign({}, state, {
        filter: {
          open: true,
        },
      });
    case 'FILTER_CLOSE':
      return Object.assign({}, state, {
        filter: {
          open: false,
        },
      });

    default:
      return state;
  }
};

export default layoutReducer;