const charactersAPI = new APIHandler("http://localhost:8000");

function renderCharacter(character) {
  const characterCard = document.createElement("div");
  characterCard.classList.add("character-info");

  characterCard.innerHTML = `
    <div class="name">Character Name: <span>${character.name}</span></div>
    <div class="occupation">Character Occupation: <span>${character.occupation}</span></div>
    <div class="weapon">Character Weapon: <span>${character.weapon}</span></div>
    <div class="cartoon">Is a Cartoon? <span>${character.cartoon}</span></div>
  `;

  document.querySelector(".characters-container").appendChild(characterCard);
}

window.addEventListener("load", () => {
  document
    .getElementById("fetch-all")
    .addEventListener("click", async function (event) {
      document.querySelector(".characters-container").innerHTML = "";

      try {
        const characters = await charactersAPI.getAllCharacters();

        if (characters) {
          characters.forEach(renderCharacter);
        }
      } catch (error) {
        console.error("Error fetching all characters:", error);
      }
    });

  document
    .getElementById("fetch-one")
    .addEventListener("click", async function (event) {
      document.querySelector(".characters-container").innerHTML = "";

      try {
        const characterIdInput = document.querySelector(
          "input[name='character-id']"
        );
        console.log(characterIdInput);
        const characterId = characterIdInput.value;

        const oneCharacter = await charactersAPI.getCharacterById(characterId);

        if (oneCharacter) {
          renderCharacter(oneCharacter);
        } else {
          const notFoundMessage = document.createElement("p");
          notFoundMessage.textContent = "Character not found in the database.";
          document
            .querySelector(".characters-container")
            .appendChild(notFoundMessage);
        }
      } catch (error) {
        console.error("Error fetching one character:", error);
      }
    });

  document
    .getElementById("delete-one")
    .addEventListener("click", async function (event) {
      try {
        const characterIdInput = document.querySelector(
          "input[name='character-id-delete']"
        );
        const characterId = characterIdInput.value;
        const deleteOne = await charactersAPI.deleteCharacterById(characterId);
        if (deleteOne === "Character has been successfully deleted") {
          event.target.style.backgroundColor = "green";

          document.querySelector(".characters-container").innerHTML = "";

          const characters = await charactersAPI.getAllCharacters();
          if (characters) {
            characters.forEach(renderCharacter);
          }
        } else {
          event.target.style.backgroundColor = "red";
        }
      } catch (error) {
        event.target.style.backgroundColor = "red";
        console.error("Error deleting one character:", error);
      }
    });
  document
    .getElementById("new-character-form")
    .addEventListener("submit", async function (event) {
      const createCharacterForm = document.getElementById("new-character-form");
      const createCharacterButton = document.getElementById("send-data");
      event.preventDefault();

      const formData = new FormData(createCharacterForm);
      const characterData = {
        name: formData.get("name"),
        occupation: formData.get("occupation"),
        weapon: formData.get("weapon"),
        cartoon: formData.get("cartoon") === "on",
      };
      console.log(characterData);

      try {
        const createCharacter = await charactersAPI.createCharacter(
          characterData
        );

        if (characterData) {
          createCharacterButton.style.backgroundColor = "green";
          const characters = await charactersAPI.getAllCharacters();
        }
      } catch (error) {
        console.error("Error creating character:", error);
      }
    });

  document
    .getElementById("edit-character-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const updateCharacterForm = document.getElementById(
        "edit-character-form"
      );
      const updateCharacterButton = document.getElementById("send-data");

      const formData = new FormData(updateCharacterForm);
      const characterData = {
        name: formData.get("name"),
        occupation: formData.get("occupation"),
        weapon: formData.get("weapon"),
        cartoon: formData.get("cartoon") === "on",
      };
      console.log(characterData);

      try {
        const updateCharacter = await charactersAPI.editCharacterById(
          characterData
        );
        if (updateCharacter) {
          updateCharacterButton.style.backgroundColor = "green";
        }
      } catch (error) {
        updateCharacterButton.style.backgroundColor = "red";
        console.error("Error updating character:", error);
      }
    });
});
