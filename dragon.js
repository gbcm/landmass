(function(window) {
  var melees = [];
  var isFirstMove = false;

  var dragon = {
    draggedMelee: null,
    startDragging: function(meleeBeingDragged) {
      if (this.draggedMelee) {
        throw new Error("startDragging was called while already dragging");
      }
      this.draggedMelee = meleeBeingDragged;
      isFirstMove = true;
    },
    stopDragging: function() {
      this.draggedMelee = null;
      isFirstMove = false;
    },
    addMelee: function(melee) {
      melees.push(melee);
    },
    removeMelee: function(melee) {
      melees.splice(melees.indexOf(melee), 1);
    }
  };

  window.burninate = function(root) {
    console.log("Burninating the countryside. Burninating the village.");
    melees = [];

    var mousemovehandler = function(event) {
      event.preventDefault();
      if(dragon.draggedMelee) {
        if (isFirstMove) {
          melees.forEach(function (m) {
            m.moveToTop();
          });
          dragon.draggedMelee.moveToTop();
        }

        var matrix = root.getScreenCTM(),
          point = root.createSVGPoint();

        point.x = event.clientX || event.touches[0].clientX;
        point.y = event.clientY || event.touches[0].clientY;
        point = point.matrixTransform(matrix.inverse());
        dragon.draggedMelee.moveTo(point.x, point.y);

        melees.forEach(function(melee) {
          melee.removeClass('incoming');
          if (melee.overlaps(dragon.draggedMelee)) {
            melee.addClass('incoming');
          }
        });
      }
    };
    root.addEventListener('mousemove', mousemovehandler);
    root.addEventListener('touchmove', mousemovehandler);

    var mouseupHandler = function() {
      var target;

      melees.forEach(function(melee) {
        melee.removeClass('incoming');
      });

      if (dragon.draggedMelee) {
        target = melees.find(function(melee) {
          return melee.overlaps(dragon.draggedMelee);
        });

        if (target) {
          target.addCharacterCircles(dragon.draggedMelee.characterCircles);
          dragon.draggedMelee.remove();
          dragon.removeMelee(dragon.draggedMelee);
        }
      }

      dragon.stopDragging();
    };
    root.addEventListener('mouseup', mouseupHandler);
    root.addEventListener('touchend', mouseupHandler);

    return dragon;
  };
})(window);
