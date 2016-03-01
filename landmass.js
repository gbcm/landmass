(function(window) {
  var document = window.document,
    $ = document.querySelector.bind(document),
    makeSvg = document.createElementNS.bind(document, 'http://www.w3.org/2000/svg'),
    melees = [];
  var root;

  window.bootLand = function() {
    root = $('svg');

    $('.add-character a').addEventListener('click', add);
    $('.add-character').addEventListener('submit', add);

    root.addEventListener('mousemove', function(event) {
      if(dragon.draggedEl) {
        var matrix = root.getScreenCTM(),
          point = root.createSVGPoint();

        point.x = event.clientX;
        point.y = event.clientY;
        point = point.matrixTransform(matrix.inverse());
        dragon.draggedEl.moveTo(point.x, point.y);

        melees.forEach(function(melee) {
          melee.removeClass('incoming');
          if (melee !== dragon.draggedEl && melee.overlaps(dragon.draggedEl)) {
            melee.addClass('incoming');
          }
        });
      }
    });

    root.addEventListener('mouseup', function() {
      melees.forEach(function(melee) {
        melee.removeClass('incoming');
      });
      dragon.stopDragging();
    });
  };

  function add(event) {
    var character = new Character($('.add-character input').value),
      melee = new Melee([character], makeSvg, dragon);
    $('.add-character input').value = '';
    melee.appendTo(root);
    melees.push(melee);
    event.preventDefault();
    return false;
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

  function Character(text) {
    this.circle = makeSvg('circle');
    this.circle.setAttribute('r', 50);
    this.circle.setAttribute('class', 'character');

    this.text = makeSvg('text');
    this.text.setAttribute('text-anchor', 'middle');
    this.text.innerHTML = text;
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
})(window);
