export type SideBarState = {
  open: boolean;
}

export interface LayoutState {
  sidebar: SideBarState;
}

export type LayoutActionType = {
  type: string;
  payload: any;
}

const defaultState = {
  sidebar: {
    open: true,
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
    default:
      return state;
  }
};

export default layoutReducer;