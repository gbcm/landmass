(function(window) {
  function Melee(characters, makeSvg, dragon) {
    this.characters = characters.slice();
    makeSvg = makeSvg || window.document.createElement.bind(window.document);
    this.circle = makeSvg('circle');
    this.circle.setAttribute('class', 'melee');
    this.updateRadius();
    this.dragon = dragon;
  }

  Melee.prototype = {
    addCharacter: function(char) {
      this.characters.push(char);
      this.updateRadius();
    },

    updateRadius: function() {
      this.radius = 60;
      this.circle.setAttribute('r', this.radius);
    },

    moveTo: function(x, y) {
      this.circle.setAttribute('cx', x);
      this.circle.setAttribute('cy', y);

      if (this.characters.length === 1) {
        this.characters[0].moveTo(x, y);
      }
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
    },

    addClass: function(klass) {
      this.circle.classList.add(klass);
    },

    removeClass: function(klass) {
      this.circle.classList.remove(klass);
    },

    overlaps: function(other) {
      var center = {
        x: this.circle.getAttribute('cx'),
        y: this.circle.getAttribute('cy')
      },
      otherCenter = {
        x: other.circle.getAttribute('cx'),
        y: other.circle.getAttribute('cy')
      },
      centerDistance = Math.sqrt(Math.pow(center.x - otherCenter.x, 2) + Math.pow(center.y - otherCenter.y, 2));

      return (centerDistance - this.radius - other.radius) <= -5;
    }
  };

  window.Melee = Melee;
})(window);
