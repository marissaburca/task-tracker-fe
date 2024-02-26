import {
  ADD_TASKS,
  ADD_TASKS_SUCCESS,
  ADD_TASKS_FAILURE,
  DELETE_TASK,
  DELETE_TASK_FAILURE,
  DELETE_TASK_SUCCESS,
  EDIT_TASK_BEGIN,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_FAILURE,
} from "../Actions/taskActions";

const initialState = {
  items: [],
  loading: false,
  error: null,
  editingTaskId: null,
};

export function taskReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TASKS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ADD_TASKS_SUCCESS:
      return {
        ...state,
        items:  action.payload,
        loading: false,
      };
    case ADD_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_TASK:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        items: state.items.filter((task) => task.id !== action.payload),
        loading: false,
      };
    case DELETE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }; case EDIT_TASK_BEGIN:
      return {
        ...state,
        editingTaskId: action.payload,
      };
    case EDIT_TASK_SUCCESS:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
        editingTaskId: null,
      };
    case EDIT_TASK_FAILURE:
      return {
        ...state,
        error: action.payload,
        editingTaskId: null,
      };
  
    default:
      return state;
  }
}
