import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../Reducers/authReducer";
import { taskReducer } from "../Reducers/taskReducer";
import signinReducer from "../Reducers/signinReducer";

const allReducers = combineReducers({
  auth: authReducer,
  signin: signinReducer,
  tasks: taskReducer,
});

const store = configureStore({
  reducer: allReducers,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export default store;
