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
    root.addEventListener('mousemove', function(event) {
      if(dragon.draggedMelee) {
        if (isFirstMove) {
          melees.forEach(function (m) {
            m.moveToTop();
          });
          dragon.draggedMelee.moveToTop();
        }

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
      var target;

      melees.forEach(function(melee) {
        melee.removeClass('incoming');
      });

      if (dragon.draggedMelee) {
        target = melees.find(function(melee) {
          return melee.overlaps(dragon.draggedMelee);
        });

        if (target) {
          target.addCharacters(dragon.draggedMelee.characters);
          dragon.draggedMelee.remove();
          dragon.removeMelee(dragon.draggedMelee);
        }
      }

      dragon.stopDragging();
    });

    return dragon;
  };
})(window);
