(function(window) {
  var dragon = {
    draggedEl: null,
    startDragging: function(el) {
      this.draggedEl = el;
    },
    stopDragging: function(el) {
      this.draggedEl = null;
    }
  };

  window.burninate = function(root, melees) {
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
            if (melee.overlaps(dragon.draggedEl)) {
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

    return dragon;
  };
})(window);
