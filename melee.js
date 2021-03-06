(function (window) {
  var characterOffsets = [
    {x: -40, y: -40},
    {x: 0, y: -40},
    {x: 40, y: -40},
    {x: -40, y: 0},
    {x: 0, y: 0},
    {x: 40, y: 0},
    {x: -40, y: 40},
    {x: 0, y: 40},
    {x: 40, y: 40}
  ];

  function Melee(characterCircles, dragon) {
    this._characterCircles = characterCircles.slice();
    this.circle = makeCircle('melee', this.radius);

    this.rangeBands = [];
    this.rangeBands.push(makeCircle('long', this.radius * 7 + 30));
    this.rangeBands.push(makeCircle('medium', this.radius * 5 + 20));
    this.rangeBands.push(makeCircle('close', this.radius * 3 + 10));

    this.dragon = dragon;
    this._characterCircles.forEach(function (charCircle) {
        charCircle.setParentMelee(this);
      }.bind(this)
    );
  }

  Melee.prototype = {
    addCharacterCircles: function (chars) {
      this._characterCircles = this._characterCircles.concat(chars);
      this._characterCircles.forEach(function (charCircle) {
          charCircle.setParentMelee(this);
        }.bind(this)
      );
      this.updateLayout();
      this.moveToTop();
    },
    updateLayout: function () {
      var center = this.center();

      for (var i = 0, length = this._characterCircles.length; i < length; i++) {
        var character = this._characterCircles[i],
          offset = characterOffsets[i];
        character.moveTo(center.x + offset.x, center.y + offset.y);
      }

      this.rangeBands.forEach(function (rangeBand) {
        rangeBand.setAttribute('cx', center.x);
        rangeBand.setAttribute('cy', center.y);
      });
    },

    appendTo: function (parent) {
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
      this._characterCircles.forEach(function (character, index) {
        var m = new Melee([], this.dragon);
        m.appendTo(this._parent);
        m.addCharacterCircles([character]);
        var meleeCenter = characterOffsets[index];
        m.moveTo(center.x + meleeCenter.x, center.y + meleeCenter.y);
      }.bind(this));
      this.remove();
    },
    removeCharacterCircle: function (characterCircle) {
      this._characterCircles.splice(this._characterCircles.indexOf(characterCircle), 1);
      if (this._characterCircles.length === 0) {
        this.remove();
      } else {
        this.updateLayout();
      }
    },
    removeCharacters: function () {
      this._characterCircles.forEach(function (cc) {
        cc.remove();
      });
    },

    addClass: function (klass) {
      this.circle.classList.add(klass);
    },

    removeClass: function (klass) {
      this.circle.classList.remove(klass);
    },
    remove: function () {
      this.dragon.removeDraggable(this);
      this._characterCircles = [];
      this.circle.remove();
      this.circle = null;
      this.rangeBands.forEach(function (rangeBand) {
        rangeBand.remove();
      });
      this.rangeBands = null;
    },

    //Implements Draggable
    moveToTop: function () {
      this._parent.appendChild(this.circle);
      this._characterCircles.forEach(function (child) {
        child.appendTo(this._parent);
      }.bind(this));
    },
    moveTo: function (x, y) {
      this.circle.setAttribute('cx', x);
      this.circle.setAttribute('cy', y);

      this.updateLayout();
    },
    handleDrop: function(target) {
      this.dragon.stopDragging();
      if (target) {
        if (target.isMelee) {
          target.addCharacterCircles(this._characterCircles);
          this.remove();
        } else if (target.isRemovalArea) {
          this.removeCharacters();
          this.remove();
        } else if (target.isColorChangeArea) {
          this.addClass('blue');
          this.rangeBands.forEach(function (rb) {
            rb.classList.add('blue');
          });
        } else {
          console.log("Melee has been dropped onto something unknown")
        }
      }
    },
    radius: 80,
    center: function () {
      return {
        x: parseFloat(this.circle.getAttribute('cx')),
        y: parseFloat(this.circle.getAttribute('cy'))
      };
    },

    //Implements Drop Target
    isMelee: true,
    overlaps: function (other) {
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
