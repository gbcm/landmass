(function (window) {
  var Dragon = function (svg) {
    this.draggables = [];
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
    addDraggable: function (draggable) {
      this.draggables.push(draggable);
    },
    removeDraggable: function (draggable) {
      this.draggables.splice(this.draggables.indexOf(draggable), 1);
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
      this.draggables.forEach(function (draggable) {
        draggable.removeClass('incoming');
        if (draggable.overlaps(this.thingBeingDragged)) {
          draggable.addClass('incoming');
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
      this.draggables.forEach(function (draggable) {
        draggable.removeClass('incoming');
      });
    },
    findTarget: function () {
      return this.draggables.find(function (draggable) {
        return draggable.overlaps(this.thingBeingDragged);
      }.bind(this));
    },
    mouseupHandler: function () {
      var target;
      this.renderPreDrop();
      if (this.thingBeingDragged) {
        target = this.findTarget();

        if (target) {
          target.receiveDrop(this.thingBeingDragged);
          this.removeDraggable(this.thingBeingDragged);
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
