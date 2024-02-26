import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../Reducers/authReducer";
import { taskReducer } from "../Reducers/taskReducer";
import userReducer from "../Reducers/userReducer";

const allReducers = combineReducers({
  auth: authReducer,
  user:userReducer,
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
