(function (window) {
  function CharacterList() {
    this.root = document.createElement("ol");
    this.root.className = "hidden";
  }

  CharacterList.prototype = {
    appendTo: function (parent) {
      parent.appendChild(this.root);
    },

    addCharacter: function (character) {
      this.root.className = "";
      var characterItem = document.createElement("li");
      var initiativeField = document.createElement("input");
      initiativeField.type = "text";
      initiativeField.setAttribute("value", character.initiative);
      characterItem.innerText = character.name + ": ";
      characterItem.appendChild(initiativeField);
      this.root.appendChild(characterItem);
    }
  };

  window.CharacterList = CharacterList;
})(window);