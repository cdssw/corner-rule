const SET_LOGIN_USER = 'userinfo/SET_LOGIN_USER';

export const setLoginUser = (value) => ({ type: SET_LOGIN_USER, payload: value});

const initialState = {};

const userdata = (state = initialState, action) => {
  switch(action.type) {
    case SET_LOGIN_USER:
      return { ...state, userInfo: action.payload};
    default:
      return state;
  }
};

export default userdata;