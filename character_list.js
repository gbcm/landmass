(function (window) {
  function CharacterList() {
    this.root = document.createElement("ol");
    this.root.className = "hidden";
    this.characters = [];
  }

  CharacterList.prototype = {
    appendTo: function (parent) {
      parent.appendChild(this.root);
    },

    addCharacter: function (character) {
      this.characters.push(character);
      this.render();
    },

    updateInit: function (character, initiativeField) {
      character.initiative = parseFloat(initiativeField.value);
      this.render();
    },

    render: function () {
      this.root.className = this.characters.length === 0 ? "hidden": "";
      this.root.innerHTML = "";
      this.characters.sort(function(a, b) {
        return b.initiative - a.initiative;
      });
      this.characters.forEach(function (character) {
        var characterItem = document.createElement("li");
        var initiativeField = document.createElement("input");
        initiativeField.type = "text";
        initiativeField.value = character.initiative;

        initiativeField.addEventListener("click", function () {
          initiativeField.select();
        });

        initiativeField.addEventListener("blur", function () {
          this.updateInit(character, initiativeField);
        }.bind(this));

        initiativeField.addEventListener("keyup", function (event) {
          if (event.keyCode === 13) {
            this.updateInit(character, initiativeField);
          }
        }.bind(this));
        characterItem.innerText = character.name + ": ";
        characterItem.appendChild(initiativeField);
        this.root.appendChild(characterItem);
      }.bind(this));
    },

    removeCharacter: function(character) {
      this.characters.splice(this.characters.indexOf(character), 1);
      this.render();
    }
  };

  window.CharacterList = CharacterList;
})(window);