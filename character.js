(function(window) {

  function CharacterCircle(character, characterList, dragon) {
    this.circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    this.circle = makeCircle('character', this.radius);

    this.text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    this.text.setAttribute('text-anchor', 'middle');
    this.text.innerHTML = character.name;

    this.characterList = characterList;
    this.character = character;
    this.dragon = dragon;
    this.dragon.addDraggable(this, this.circle);
  }

  CharacterCircle.prototype = {
    appendTo: function(parent) {
      parent.appendChild(this.text);
      parent.appendChild(this.circle);
      this.parent = parent;
    },
    setParentMelee: function(melee) {
      this.parentMelee = melee;
    },

    //Implements Draggable
    moveToTop: function() {
    },
    moveTo: function(x, y) {
      this.circle.setAttribute('cx', x);
      this.circle.setAttribute('cy', y);
      this.text.setAttribute('x', x);
      this.text.setAttribute('y', y + 5);
    },
    radius: 20,
    center: function() {
      return {
        x: parseFloat(this.circle.getAttribute('cx')),
        y: parseFloat(this.circle.getAttribute('cy'))
      };
    },
    dropped:  function(){
    },
    droppedWithNoTarget: function() {
      this.parentMelee.removeCharacterCircle(this);
      //Create a new melee
      var m = new Melee([this], this.dragon);
      var center = this.center();
      m.appendTo(this.parent);
      m.moveTo(center.x, center.y);
    },
    droppedWithTarget: function() {
      this.parentMelee.removeCharacterCircle(this);
    },
    characterCircles: function(){
      return [this];
    },
    remove: function () {
      this.circle.parentNode.removeChild(this.circle);
      this.text.parentNode.removeChild(this.text);
      this.characterList.removeCharacter(this.character);
    },
  };

  window.CharacterCircle = CharacterCircle;
})(window);
