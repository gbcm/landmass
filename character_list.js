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
      this.root.className = "";
      this.characters.push(character);
      this.render();
    },

    render: function () {
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
          character.initiative = parseInt(initiativeField.value, 10);
          this.render();
        }.bind(this));
        characterItem.innerText = character.name + ": ";
        characterItem.appendChild(initiativeField);
        this.root.appendChild(characterItem);
      }.bind(this));
    }
  };

  window.CharacterList = CharacterList;
})(window);