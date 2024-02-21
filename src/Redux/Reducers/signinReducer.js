import {
  SET_NAME,
  SET_SURNAME,
  SET_USERNAME,
  SET_GENDER,
  SET_AVATAR,
  SET_EMAIL,
  SET_PASSWORD,
} from "../Actions/signinActions.js";

const initialState = {
  name: "",
  surname: "",
  username: "",
  gender: "",
  avatarId: "",
  email: "",
  password: "",
};

const signinReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case SET_SURNAME:
      return {
        ...state,
        surname: action.payload,
      };
    case SET_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    case SET_GENDER:
      return {
        ...state,
        gender: action.payload,
      };
    case SET_AVATAR:
      return {
        ...state,
        avatarId: action.payload,
      };
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case SET_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };

    default:
      return state;
  }
};

export default signinReducer;
