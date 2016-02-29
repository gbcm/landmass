(function(window) {
  var document = window.document,
    $ = document.querySelector.bind(document),
    makeSvg = document.createElementNS.bind(document, 'http://www.w3.org/2000/svg');
  var root;

  window.bootLand = function() {
    root = $('svg');

    $('.add-melee').addEventListener('click', add);
  };


  function add() {
    var melee = new Melee('foo');
    melee.appendTo(root);
  }

  function Melee(text) {
    this.circle = makeSvg('circle');
    this.circle.setAttribute('r', 20);
    this.circle.setAttribute('class', 'melee');

    this.text = makeSvg('text');
    this.text.setAttribute('text-anchor', 'middle');
    this.text.innerHTML = text;
  }

  Melee.prototype = {
    appendTo: function(parent) {
      parent.appendChild(this.circle);
      parent.appendChild(this.text);

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
