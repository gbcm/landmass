(function (window) {
  var Dragon = function (svg) {
    this.draggables = [];
    this.dropTargets = [];
    this.isFirstMove = false;
    this.svg = svg;
    svg.addEventListener('mousemove', this.mousemovehandler.bind(this));
    svg.addEventListener('touchmove', this.mousemovehandler.bind(this));
    svg.addEventListener('mouseup', this.mouseupHandler.bind(this));
    svg.addEventListener('touchend', this.mouseupHandler.bind(this));
  };

  Dragon.prototype = {
    thingBeingDragged: null,
    startDragging: function (thingBeingDragged) {
      if (this.thingBeingDragged) {
        throw new Error("startDragging was called while already dragging");
      }
      this.thingBeingDragged = thingBeingDragged;
      this.isFirstMove = true;
    },
    stopDragging: function () {
      this.thingBeingDragged = null;
      this.isFirstMove = false;
    },
    addDraggable: function (draggable, dragHandle) {
      this.draggables.push(draggable);

      dragHandle.addEventListener('mousedown', function (event) {
        if (event.button === 0 && !event.altKey && !event.ctrlKey) {
          this.startDragging(draggable);
        }
      }.bind(this));

      dragHandle.addEventListener('touchstart', function () {
        this.startDragging(draggable);
      }.bind(this));
    },
    addDropTarget: function (dropTarget) {
      this.dropTargets.push(dropTarget);
    },
    removeDraggable: function (draggable) {
      this.draggables.splice(this.draggables.indexOf(draggable), 1);
      this.dropTargets.splice(this.dropTargets.indexOf(draggable), 1);
    },
    eventCoordinates: function (event) {
      var matrix = this.svg.getScreenCTM(),
        point = this.svg.createSVGPoint();

      point.x = event.clientX || event.touches[0].clientX;
      point.y = event.clientY || event.touches[0].clientY;
      return point.matrixTransform(matrix.inverse());
    },
    renderPreMove: function(){
      if (this.isFirstMove) {
        this.draggables.forEach(function (m) {
          m.moveToTop();
        });
        this.thingBeingDragged.moveToTop();
      }
    },
    renderPostMove: function(){
      this.dropTargets.forEach(function (target) {
        target.removeClass('incoming');
        if (target.overlaps(this.thingBeingDragged)) {
          target.addClass('incoming');
        }
      }.bind(this));
    },
    mousemovehandler: function (event) {
      event.preventDefault();
      if (this.thingBeingDragged) {
        this.renderPreMove();
        var point = this.eventCoordinates(event);
        this.thingBeingDragged.moveTo(point.x, point.y);
        this.renderPostMove();
      }
    },
    renderPreDrop: function(){
      this.dropTargets.forEach(function (target) {
        target.removeClass('incoming');
      });
    },

    findTarget: function () {
      return this.dropTargets.find(function (target) {
        return target.overlaps(this.thingBeingDragged);
      }.bind(this));
    },

    mouseupHandler: function () {
      var target;
      this.renderPreDrop();
      if (this.thingBeingDragged) {
        this.thingBeingDragged.dropped();
        target = this.findTarget();

        if (target) {
          target.receiveDrop(this.thingBeingDragged);
          this.thingBeingDragged.droppedWithTarget();
        } else {
          this.thingBeingDragged.droppedWithNoTarget();
        }
      }

      this.stopDragging();
    }
  };

  window.burninate = function (root) {
    console.log("Burninating the countryside. Burninating the village.");
    return new Dragon(root);
  };
})(window);
