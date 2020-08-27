const SET_LOGIN_USER_INFO = 'userInfo/SET_LOGIN_USER_INFO';
const SET_LOGIN = 'userInfo/SET_LOGIN';

export const setLoginUserInfo = (value) => ({ type: SET_LOGIN_USER_INFO, payload: value });
export const setLogin = (value) => ({ type: SET_LOGIN, payload: value });

const initialState = {
  userInfo: null,
  login: false
};

const userInfo = (state = initialState, action) => {
  switch(action.type) {
    case SET_LOGIN_USER_INFO:
      return { ...state, userInfo: action.payload};
    case SET_LOGIN:
      return { ...state, login: action.payload};
    default:
      return state;
  }
};

export default userInfo;