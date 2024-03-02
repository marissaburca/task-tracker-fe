export const getNotes = async (token) => {
    try {
      const response = await fetch(`http://localhost:3001/notes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });
      if (!response.ok) {
        alert("Error in fetch! Try again.");
        throw new Error("Impossible getting notes");
      }
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };


  export const addNote = async (noteBody, token) => {
    try {
      const response = await fetch(`http://localhost:3001/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(noteBody),
      });
      if (!response.ok) {
        alert("Error in fetch! Try again.");
        throw new Error("Adding note failed");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  export const editNote = async (noteId, noteBody, token) => {
    try {
      const response = await fetch(`http://localhost:3001/notes/${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(noteBody),
      });
      if (!response.ok) {
        alert("Error in fetch! Try again.");
        throw new Error("Note update failed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };




  export const deleteNote = async (noteId, token) => {
    try {
      const response = await fetch(`http://localhost:3001/notes/${noteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        alert("Error during deletion! Try again.");
        throw new Error("Note deletion failed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };