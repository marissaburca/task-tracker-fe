
export default async function getAvatars() {
    try {
      const response = await fetch("http://localhost:3001/avatar");
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(`Request failed: ${response.status}`);
      }
    } catch (error) {
      console.error("Error while fetching avatars: ", error.message);
      throw error;
    }
  }

  
