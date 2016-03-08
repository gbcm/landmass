(function (window) {
  function RemovalArea(svg) {
    this.svg = svg;
    this.root = document.createElement("div");
    this.root.innerText = "Remove from combat";
    this.root.id = "removal_area";
  }

  RemovalArea.prototype = {
    appendTo: function (parent) {
      parent.appendChild(this.root);
    },
    receiveDrop: function (melee) {
      melee.remove();
    },
    overlaps: function (other) {
      if (!other.circle) {
        return false;
      }
      var theirCenter = this.toHtmlCoords(other.center());
      var ourRect = this.root.getBoundingClientRect();
      return (theirCenter.x - other.radius) < ourRect.right && (theirCenter.y + other.radius) > ourRect.top;
    },
    toHtmlCoords: function (coords) {
      var matrix = this.svg.getScreenCTM(),
        point = this.svg.createSVGPoint();

      point.x = coords.x;
      point.y = coords.y;
      return point.matrixTransform(matrix);
    },
    addClass: function (klass) {
      this.root.classList.add(klass);
    },
    removeClass: function (klass) {
      this.root.classList.remove(klass);
    },
    remove: function(){
      this.root.parentNode.removeChild(this.root);
    }
  };

  window.RemovalArea = RemovalArea;
})(window);
