(function(window) {
  var document = window.document,
    $ = document.querySelector.bind(document),
    makeSvg = document.createElementNS.bind(document, 'http://www.w3.org/2000/svg');
  var root;

  window.bootLand = function() {
    root = $('svg');

    $('.add-melee').addEventListener('click', add);

    root.addEventListener('mousemove', function(event) {
      if(dragon.draggedEl) {
        var matrix = root.getScreenCTM(),
          point = root.createSVGPoint();

        point.x = event.clientX;
        point.y = event.clientY;
        point = point.matrixTransform(matrix.inverse());
        dragon.draggedEl.moveTo(point.x, point.y);
      }
    });

    root.addEventListener('mouseup', function() {
      dragon.stopDragging();
    });
  };


  function add() {
    var melee = new Melee('foo');
    melee.appendTo(root);
  }

  var dragon = {
    draggedEl: null,
    startDragging: function(el) {
      this.draggedEl = el;
    },
    stopDragging: function(el) {
      this.draggedEl = null;
    }
  };

  function Melee(text) {
    this.circle = makeSvg('circle');
    this.circle.setAttribute('r', 20);
    this.circle.setAttribute('class', 'melee');

    this.circle.addEventListener('mousedown', function(event) {
      dragon.startDragging(this);
    }.bind(this));

    this.text = makeSvg('text');
    this.text.setAttribute('text-anchor', 'middle');
    this.text.innerHTML = text;
  }

  Melee.prototype = {
    appendTo: function(parent) {
      parent.appendChild(this.text);
      parent.appendChild(this.circle);

      this.moveTo(500, 500);
    },

    moveTo: function(x, y) {
      this.circle.setAttribute('cx', x);
      this.circle.setAttribute('cy', y);
      this.text.setAttribute('x', x);
      this.text.setAttribute('y', y + 5);
    }
  };
})(window);
