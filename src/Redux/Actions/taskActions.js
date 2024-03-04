export const ADD_TASKS = "ADD_TASK";
export const ADD_TASKS_SUCCESS = "ADD_TASK_SUCCESS";
export const ADD_TASKS_FAILURE = "ADD_TASK_FAILURE";
export const DELETE_TASK = "DELETE_TASK";
export const DELETE_TASK_SUCCESS = "DELETE_TASK_SUCCESS";
export const DELETE_TASK_FAILURE = "DELETE_TASK_FAILURE";
export const EDIT_TASK_BEGIN = 'EDIT_TASK_BEGIN';
export const EDIT_TASK_SUCCESS = 'EDIT_TASK_SUCCESS';
export const EDIT_TASK_FAILURE = 'EDIT_TASK_FAILURE';
export const CANCEL_EDIT_TASK = 'CANCEL_EDIT_TASK';

export const addTasks = (tasks) => ({
  type: ADD_TASKS,
  payload: tasks,
});

export const addTasksSuccess = (tasks) => ({
  type: ADD_TASKS_SUCCESS,
  payload: tasks,
});

export const addTasksFailure = (error) => ({
  type: ADD_TASKS_FAILURE,
  payload: error,
});
export const deleteTask = (id) => ({
  type: DELETE_TASK,
  payload: id,
});

export const deleteTaskSuccess = (id) => ({
  type: DELETE_TASK_SUCCESS,
  payload: id,
});

export const deleteTaskFailure = (error) => ({
  type: DELETE_TASK_FAILURE,
  payload: error,
});


export const editTaskBegin = (id) => ({
  type: EDIT_TASK_BEGIN,
  payload: id,
});

export const editTaskSuccess = (task) => ({
  type: EDIT_TASK_SUCCESS,
  payload: task,
});

export const editTaskFailure = (error) => ({
  type: EDIT_TASK_FAILURE,
  payload: error,
});


export const handleAddTask = (task, token) => async (dispatch) => {
  
    try {
      const response = await fetch("http://localhost:3001/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      });
  
      if (!response.ok) {
        throw new Error("Something went wrong, check the input fields");
      }
      const addedTask = await response.json(); 
      dispatch(addTasksSuccess(addedTask));
      dispatch(handleGetTasks(token));    
    } catch (error) {
      dispatch(addTasksFailure(error.message));
    }
  };


export const handleGetTasks = (token) => async (dispatch) => {
 
  try {
    const response = await fetch("http://localhost:3001/task", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Something went wrong during fetch request.");
    }
    const tasks = await response.json(); 
    dispatch(addTasksSuccess(tasks));
  } catch (error) {
    dispatch(addTasksFailure("Unable to get tasks. " + error.message));
  }
};
export const handleEditTask = (task,id, token) => async (dispatch) => {
  
  try {
    const response = await fetch(`http://localhost:3001/task/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error("Something went wrong while updating task");
    }
 
    dispatch(editTaskSuccess(task));
    dispatch(handleGetTasks(token));    
  } catch (error) {
    dispatch(editTaskFailure("Error while updating. " + error.message));
  }
};
export const handleDeleteTask = (id, token) => async (dispatch) => {
  console.log(id)
  try {
    const response = await fetch(`http://localhost:3001/task/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Something went wrong while deleting task");
    }
    dispatch(deleteTaskSuccess(id));
    dispatch(handleGetTasks(token));    
  } catch (error) {
    dispatch(deleteTaskFailure("Error during delation. " + error.message));
  }
};

export const updateTaskStatus = (id, newStatus, token) => async (dispatch, getState) => {
  console.log(id);
  console.log(newStatus)
  try {

    const currentTask = getState().tasks.items.find(task => task.id === id);

    if (!currentTask) {
      throw new Error("Task not found");
    }


    const updatedTaskInfo = {
      ...currentTask,
      status: newStatus,
    };

    const response = await fetch(`http://localhost:3001/task/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedTaskInfo),
    });

    if (!response.ok) {
      throw new Error('Failed to update task status');
    }

    const updatedTask = await response.json();
    dispatch(editTaskSuccess(updatedTask)); // 
  } catch (error) {
    dispatch(editTaskFailure("Error during status update. " + error.message));
  }
};