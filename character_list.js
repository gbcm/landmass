(function (window) {
  function CharacterList() {
    this.root = document.createElement("ol");
    this.root.className = "hidden";
  }

  CharacterList.prototype = {
    appendTo: function (parent) {
      parent.appendChild(this.root);
    },

    addCharacter: function (name) {
      this.root.className = "";
      var characterItem = document.createElement("li");
      characterItem.innerText = name;
      this.root.appendChild(characterItem);
    }
  };

  window.CharacterList = CharacterList;
})(window);