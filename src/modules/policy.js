const SET_POLICY = 'policy/SET_POLICY';

export const setPolicy = (value) => ({ type: SET_POLICY, payload: value });

const initialState = {
  agree: false,
};

const policy = (state = initialState, action) => {
  switch(action.type) {
    case SET_POLICY:
      return { ...state, agree: action.payload};
    default:
      return state;
  }
};

export default policy;