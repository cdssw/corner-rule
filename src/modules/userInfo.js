const SET_LOGIN_USER_INFO = 'userInfo/SET_LOGIN_USER';

export const setLoginUserInfo = (value) => ({ type: SET_LOGIN_USER_INFO, payload: value});

const initialState = {};

const userInfo = (state = initialState, action) => {
  switch(action.type) {
    case SET_LOGIN_USER_INFO:
      return { ...state, userInfo: action.payload};
    default:
      return state;
  }
};

export default userInfo;