import userReducer from "./UserReducer/userReducer";

const defaultState = {
    userState: null
}

const rootReducer = (state = defaultState, action: any) => {
    return {
        userState: userReducer(state.userState, action)
    }
}

export default rootReducer;