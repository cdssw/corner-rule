export const USER_INFO = 'userinfo/USER_INFO';

export const userInfo = () => ({ type: USER_INFO});

const initialState = {};

const userdata = (state = initialState, action) => {
  switch(action.type) {
    case USER_INFO:
      return { ...state, userInfo: action.payload};
    default:
      return state;
  }
};

export default userdata;