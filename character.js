(function(window) {
  var newCharacter;
  function CharacterCircle(character, characterList) {
    this.circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    this.circle.setAttribute('r', 20);
    this.circle.setAttribute('class', 'character');

    this.text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    this.text.setAttribute('text-anchor', 'middle');
    this.text.innerHTML = character.name;

    this.characterList = characterList;
    this.character = character;
  }

  CharacterCircle.prototype = {
    appendTo: function(parent) {
      parent.appendChild(this.text);
      parent.appendChild(this.circle);
    },

    moveTo: function(x, y) {
      this.circle.setAttribute('cx', x);
      this.circle.setAttribute('cy', y);
      this.text.setAttribute('x', x);
      this.text.setAttribute('y', y + 5);
    },

    remove: function () {
      this.circle.parentNode.removeChild(this.circle);
      this.text.parentNode.removeChild(this.text);
      this.characterList.removeCharacter(this.character);
    }
  };

  window.characterFactory = function(characterList, dragon) {
    newCharacter = function newCharacter(character) {
      return new CharacterCircle(character, characterList, dragon);
    };

    return newCharacter;
  };
})(window);
