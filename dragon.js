(function(window) {
  var dragon = {
    draggedMelee: null,
    startDragging: function(melee) {
      this.draggedMelee = melee;
    },
    stopDragging: function() {
      this.draggedMelee = null;
    }
  };

  window.burninate = function(root, melees) {
    root.addEventListener('mousemove', function(event) {
      if(dragon.draggedMelee) {
        var matrix = root.getScreenCTM(),
          point = root.createSVGPoint();

          point.x = event.clientX;
          point.y = event.clientY;
          point = point.matrixTransform(matrix.inverse());
          dragon.draggedMelee.moveTo(point.x, point.y);

          melees.forEach(function(melee) {
            melee.removeClass('incoming');
            if (melee.overlaps(dragon.draggedMelee)) {
              melee.addClass('incoming');
            }
          });
      }
    });

    root.addEventListener('mouseup', function() {
      melees.forEach(function(melee) {
        melee.removeClass('incoming');
        if (dragon.draggedMelee && melee.overlaps(dragon.draggedMelee)) {
          melee.addCharacters(dragon.draggedMelee.characters);
          dragon.draggedMelee.remove();

          melees.splice(melees.indexOf(dragon.draggedMelee), 1);
        }
      });
      dragon.stopDragging();
    });

    return dragon;
  };
})(window);
