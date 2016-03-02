(function(window) {
  var document = window.document,
    $ = document.querySelector.bind(document),
    makeSvg = document.createElementNS.bind(document, 'http://www.w3.org/2000/svg');
  var root, dragon, meleeFactory, characterFactory;

  window.bootLand = function() {
    root = $('svg');
    dragon = window.burninate(root);
    meleeFactory = window.meleeFactory(makeSvg, dragon);
    characterFactory = window.characterFactory(makeSvg);

    $('.add-character a').addEventListener('click', add);
    $('.add-character').addEventListener('submit', add);
  };

  function add(event) {
    var character = characterFactory($('.add-character input').value),
      melee = meleeFactory([character]);
    $('.add-character input').value = '';
    melee.appendTo(root);
    event.preventDefault();
    return false;
  }
})(window);
