export const SET_NAME = "SET_NAME";
export const SET_SURNAME = "SET_SURNAME";
export const SET_USERNAME = "SET_USERNAME";
export const SET_GENDER = "SET_GENDER";
export const SET_AVATAR = "SET_AVATAR";
export const SET_EMAIL = "SET_EMAIL";
export const SET_PASSWORD = "SET_PASSWORD";

export const setName = (name) => {
  return {
    type: SET_NAME,
    payload: name,
  };
};

export const setSurname = (surname) => {
  return {
    type: SET_SURNAME,
    payload: surname,
  };
};

export const setUsername = (username) => {
  return {
    type: SET_USERNAME,
    payload: username,
  };
};
export const setGender = (gender) => {
  return {
    type: SET_GENDER,
    payload: gender,
  };
};
export const setAvatar = (avatar) => {
  return {
    type: SET_AVATAR,
    payload: avatar,
  };
};
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

export const signinUser = async (userDetails) => {
  try {
    const response = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });
    if (!response.ok) {
      alert("Error during Signin! Try again.");
      throw new Error("Registration failed");
    }
    const data = await response.json();
    localStorage.setItem("userId", data.id.toString());
  } catch (error) {
    console.log(error.message);
  }
};


