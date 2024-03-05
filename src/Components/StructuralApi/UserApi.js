
export const getUserDetails = async (token) => {
  const id =localStorage.getItem("userId")

  try {
    const response = await fetch(`http://localhost:3001/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Something went wrong during fetch request.");
    }
    const userDetails = await response.json();
    return userDetails;
  } catch (error) {
    alert("Unable to get tasks. " + error.message);
  }
};

export const updateUserDetails = async (userDetails, token) => {
  try {
    const response = await fetch(`http://localhost:3001/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userDetails),
    });
    if (!response.ok) {
      alert("Error in fetch! Try again.");
      throw new Error("Registration failed");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateUserPassword = async (passwordData, token) => {
  const response = await fetch(`http://localhost:3001/user/updatePassword`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(passwordData)
  });
  if (!response.ok) {
    return response.json().then(errorData => {
      throw new Error(errorData.message || "Error updating password.");
    });
  }
  return "Password changed successfully. We are leading you to dashboard.";
};

export const deleteAccount= (token) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3001/user/deleteAccount`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      if (!response.ok) {
        alert("Account deletion failed")
        throw new Error("Account deletion failed");
      }
      localStorage.removeItem("username");
      localStorage.removeItem("avatar url");
      resolve("Account deleted successfully. We are leading you to LOGIN page."); 
    })
    .catch(error => {
      console.error(error.message);
      reject(error); 
    });
  });
};


