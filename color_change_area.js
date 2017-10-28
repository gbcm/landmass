(function (window) {
  function ColorChangeArea(svg) {
    this.svg = svg;
    this.root = document.createElement("div");
    this.root.id = "color_change_area";
  }

  ColorChangeArea.prototype = {
    appendTo: function (parent) {
      parent.appendChild(this.root);
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
    },

    //Implements Drop Target
    isColorChangeArea: true,
    overlaps: function (other) {
      if (!other.circle) {
        return false;
      }
      var theirCenter = this.toHtmlCoords(other.center());
      var ourRect = this.root.getBoundingClientRect();
      return (theirCenter.x - other.radius) < ourRect.right && (theirCenter.y + other.radius) > ourRect.top;
    },
  };

  window.ColorChangeArea = ColorChangeArea;
})(window);
