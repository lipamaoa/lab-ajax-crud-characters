class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
  }

  async getAllCharacters() {
    try {
      const response = await axios.get(`${this.BASE_URL}/characters`);
      if (response.status === 200) {
        console.log("All characters:", response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching all characters:", error);
      return null;
    }
  }

  async getCharacterById(id) {
    try {
      const response = await axios.get(`${this.BASE_URL}/characters/${id}`);
      if (response.status === 200) {
        console.log("Character:", response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching character by ID:", error);
    }
  }

  async createCharacter(characterData) {
    try {
      const response = await axios.post(
        `${this.BASE_URL}/characters`,
        characterData
      );
      if (response.status === 200) {
        console.log("Created character:", response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Error creating character:", error);
    }
  }

  async deleteCharacterById(id) {
    try {
      const response = await axios.delete(`${this.BASE_URL}/characters/${id}`);
      if (response.status === 200) {
        console.log("Deleted character:", response.data);
        return "Character has been successfully deleted"; 
      }
    } catch (error) {
      console.error("Error deleting character by ID:", error);
    }
  }

  async editCharacterById(id, characterData) {
    
    try {
      const response = await axios.put(
        `${this.baseURL}/characters/${id}`,
        characterData
      );
      console.log("Edited character:", response.data);
    } catch (error) {
      console.error("Error editing character by ID:", error);
    }
  }
}