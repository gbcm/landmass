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

  function Melee(characterCircles, makeSvg, dragon) {
    this.characterCircles = characterCircles.slice();
    this.circle = makeSvg('circle');
    this.circle.setAttribute('class', 'melee');
    this.circle.setAttribute('r', this.radius);

    this.rangeBands = [];
    var longCircle = makeSvg('circle');
    longCircle.setAttribute('class', 'long');
    longCircle.setAttribute('r', this.radius * 7 + 30);
    this.rangeBands.push(longCircle);

    var medCircle = makeSvg('circle');
    medCircle.setAttribute('class', 'medium');
    medCircle.setAttribute('r', this.radius * 5 + 20);
    this.rangeBands.push(medCircle);

    var closeCircle = makeSvg('circle');
    closeCircle.setAttribute('class', 'close');
    closeCircle.setAttribute('r', this.radius * 3 + 10);
    this.rangeBands.push(closeCircle);

    this.dragon = dragon;
  }

  Melee.prototype = {
    radius: 80,
    addCharacterCircles: function(chars) {
      this.characterCircles = this.characterCircles.concat(chars);
      this.updateLayout();
      this.moveToTop();
    },

    updateLayout: function() {
      var center = this.center();

      for (var i = 0, length = this.characterCircles.length; i < length; i++) {
        var character = this.characterCircles[i],
          offset = characterOffsets[i];
        character.moveTo(center.x + offset.x, center.y + offset.y);
      }

      this.rangeBands.forEach(function(rangeBand) {
        rangeBand.setAttribute('cx', center.x);
        rangeBand.setAttribute('cy', center.y);
      });
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
      this._parent = parent;
      this.rangeBands.forEach(function(rangeBand) {
        parent.appendChild(rangeBand);
      });
      this.moveToTop();
      this.moveTo(500, 500);

      this.circle.addEventListener('mousedown', function(event) {
        if (event.button === 0 && !event.altKey && !event.ctrlKey) {
          this.dragon.startDragging(this);
        }
      }.bind(this));

      this.circle.addEventListener('dblclick', function(event) {
        var center = this.center();
        this.characterCircles.forEach(function(character, index) {
          var m = newMelee([]);
          m.appendTo(parent);
          m.addCharacterCircles([character]);
          var meleeCenter = characterOffsets[index];
          m.moveTo(center.x + meleeCenter.x, center.y + meleeCenter.y);
        });
        this.remove();
        this.dragon.removeMelee(this);
      }.bind(this));
    },

    moveToTop: function() {
      this._parent.appendChild(this.circle);
      this.characterCircles.forEach(function(child) {
        child.appendTo(this._parent);
      }.bind(this));
    },

    remove: function() {
      this.characterCircles = [];
      this.circle.remove();
      this.circle = null;
      this.rangeBands.forEach(function(rangeBand) {
        rangeBand.remove();
      });
      this.rangeBands = null;
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
