(function(window) {
  function CharacterCircle(name, makeSvg) {
    this.circle = makeSvg('circle');
    this.circle.setAttribute('r', 20);
    this.circle.setAttribute('class', 'character');

    this.text = makeSvg('text');
    this.text.setAttribute('text-anchor', 'middle');
    this.text.innerHTML = name;
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
    }
  };

  window.characterCircleFactory = function(makeSvg) {
    return function newCharacter(name) {
      return new CharacterCircle(name, makeSvg);
    };
  };
})(window);
