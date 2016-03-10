(function(window) {
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

  function Melee(characterCircles, dragon) {
    this.characterCircles = characterCircles.slice();
    this.circle = makeCircle('melee',this.radius);

    this.rangeBands = [];
    this.rangeBands.push(makeCircle('long', this.radius * 7 + 30));
    this.rangeBands.push(makeCircle('medium', this.radius * 5 + 20));
    this.rangeBands.push(makeCircle('close', this.radius * 3 + 10));

    this.dragon = dragon;
  }

  Melee.prototype = {
    radius: 80,
    receiveDrop: function (melee) {
      this.addCharacterCircles(melee.characterCircles);
      melee.remove();
    },
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
      this.rangeBands.forEach(function (rangeBand) {
        parent.appendChild(rangeBand);
      });
      this.moveToTop();
      this.moveTo(500, 500);

      this.dragon.addDraggable(this, this.circle);
      this.dragon.addDropTarget(this);

      bindDoubleClick(this.circle, this.doubleClickHandler.bind(this))
    },

    doubleClickHandler: function () {
      var center = this.center();
      this.characterCircles.forEach(function (character, index) {
        var m = new Melee([], this.dragon);
        m.appendTo(this._parent);
        m.addCharacterCircles([character]);
        var meleeCenter = characterOffsets[index];
        m.moveTo(center.x + meleeCenter.x, center.y + meleeCenter.y);
      }.bind(this));
      this.remove();
      this.dragon.removeDraggable(this);
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

    removeCharacters: function() {
      this.characterCircles.forEach(function (cc) {
        cc.remove();
      });
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

  window.Melee = Melee;
})(window);
