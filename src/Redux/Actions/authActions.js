export const SET_EMAIL = "SET_EMAIL";
export const SET_PASSWORD = "SET_PASSWORD";
export const SET_TOKEN = "SET_TOKEN";

export const setEmail = (email) => {
  return {
    type: SET_EMAIL,
    payload: email,
  };
};

export const setPassword = (password) => {
  return {
    type: SET_PASSWORD,
    payload: password,
  };
};

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      alert("There's something wrong with your credentials. Try Again!");
      throw new Error("Login failed");
    }
    const data = await response.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("userId",data.userId)
    dispatch({ type: "SET_TOKEN", payload: data.token });
  } catch (error) {
    console.log(error);
  }
};
