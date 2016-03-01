(function(window) {
  function Character(name, makeSvg) {
    this.circle = makeSvg('circle');
    this.circle.setAttribute('r', 20);
    this.circle.setAttribute('class', 'character');

    this.text = makeSvg('text');
    this.text.setAttribute('text-anchor', 'middle');
    this.text.innerHTML = name;
  }

  Character.prototype = {
    appendTo: function(parent) {
      parent.appendChild(this.text);
      parent.appendChild(this.circle);
    },

    moveTo: function(x, y) {
      this.circle.setAttribute('cx', x);
      this.circle.setAttribute('cy', y);
      this.text.setAttribute('x', x);
      this.text.setAttribute('y', y + 5);
    }
  };

  window.characterFactory = function(makeSvg) {
    return function newCharacter(name) {
      return new Character(name, makeSvg);
    };
  };
})(window);
