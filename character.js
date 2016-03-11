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
      this._parent = parent;
    },
    setParentMelee: function(melee) {
      this.parentMelee = melee;
    },
    remove: function () {
      this.circle.parentNode.removeChild(this.circle);
      this.text.parentNode.removeChild(this.text);
      this.characterList.removeCharacter(this.character);
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
    handleDrop: function(target) {
      this.dragon.stopDragging();
      if (target) {
        if (target.isMelee) {
          this.parentMelee.removeCharacterCircle(this);
          target.addCharacterCircles([this]);
        } else if (target.isRemovalArea) {
          this.parentMelee.removeCharacterCircle(this);
          this.remove();
        } else {
          console.log("character dropped onto unknown");
        }
      } else {
        this.parentMelee.removeCharacterCircle(this);
        var m = new Melee([this], this.dragon);
        var center = this.center();
        m.appendTo(this._parent);
        m.moveTo(center.x, center.y);
      }
    }
  };

  window.CharacterCircle = CharacterCircle;
})(window);
