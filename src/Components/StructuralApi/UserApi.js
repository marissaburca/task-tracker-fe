
export const getUserDetails = async (token) => {
  const id = parseInt(localStorage.getItem("userId"), 10);

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
      console.log("problema in update")
      throw new Error("Registration failed");
    }
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateUserPassword = (passwordData, token) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3001/user/updatePassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(passwordData)
    })
    .then(response => {
      if (!response.ok) {
        alert("New password cannot correspond to the old one.")
        throw new Error("New password cannot correspond to the old one.");
      }
      resolve("Password changed successfully. We are leading you to dashboard.");
    })
    .catch(error => {
      console.error(error.message);
      reject(error); 
    });
  });
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
      resolve("Account deleted successfully. We are leading you to LOGIN page."); 
    })
    .catch(error => {
      console.error(error.message);
      reject(error); 
    });
  });
};


