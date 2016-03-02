(function(window) {
  var newMelee;
  var characterOffsets = [
    { x: -40, y: -40 },
    { x: 0, y: -40 },
    { x: 40, y: -40 },
    { x: -40, y: 0 },
    { x: 0, y: 0 },
    { x: 40, y: 0 },
    { x: -40, y: 40 },
    { x: 0, y: 40 },
    { x: 40, y: 40 }
  ];

  function Melee(characters, makeSvg, dragon) {
    this.characters = characters.slice();
    this.circle = makeSvg('circle');
    this.circle.setAttribute('class', 'melee');
    this.circle.setAttribute('r', this.radius);
    this.dragon = dragon;
  }

  Melee.prototype = {
    radius: 80,
    addCharacters: function(chars) {
      this.characters = this.characters.concat(chars);
      this.updateLayout();
    },

    updateLayout: function() {
      var center = this.center();

      for (var i = 0, length = this.characters.length; i < length; i++) {
        var character = this.characters[i],
          offset = characterOffsets[i];
        character.moveTo(center.x + offset.x, center.y + offset.y);
      }
    },

    center: function() {
      return {
        x: parseFloat(this.circle.getAttribute('cx')),
        y: parseFloat(this.circle.getAttribute('cy'))
      };
    },

    moveTo: function(x, y) {
      this.circle.setAttribute('cx', x);
      this.circle.setAttribute('cy', y);

      this.updateLayout();
    },

    appendTo: function(parent) {
      this.characters.forEach(function(child) {
        child.appendTo(parent);
      });
      parent.appendChild(this.circle);
      this.moveTo(500, 500);

      this.circle.addEventListener('mousedown', function(event) {
        if (event.button === 0 && !event.altKey && !event.ctrlKey) {
          this.dragon.startDragging(this);
        }
      }.bind(this));

      this.circle.addEventListener('dblclick', function(event) {
        var center = this.center();
        this.characters.forEach(function(character, index) {
          var m = newMelee([]);
          m.appendTo(parent);
          m.addCharacters([character]);
          var meleeCenter = characterOffsets[index];
          m.moveTo(center.x + meleeCenter.x, center.y + meleeCenter.y);
        });
        this.remove();
        this.dragon.removeMelee(this);
      }.bind(this));
    },

    remove: function() {
      this.characters = [];
      this.circle.remove();
      this.circle = null;
    },

    addClass: function(klass) {
      this.circle.classList.add(klass);
    },

    removeClass: function(klass) {
      this.circle.classList.remove(klass);
    },

    overlaps: function(other) {
      if (this === other) {
        return false;
      }

      var center = this.center(),
      otherCenter = other.center(),
      centerDistance = Math.sqrt(Math.pow(center.x - otherCenter.x, 2) + Math.pow(center.y - otherCenter.y, 2));

      return (centerDistance - this.radius - other.radius) <= -5;
    }
  };

  window.meleeFactory = function(makeSvg, dragon) {
    newMelee = function newMelee(characters) {
      var melee = new Melee(characters, makeSvg, dragon);
      dragon.addMelee(melee);
      return melee;
    };

    return newMelee;
  };
})(window);
