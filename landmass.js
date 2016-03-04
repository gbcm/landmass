(function(window) {
  var document = window.document,
    $ = document.querySelector.bind(document),
    makeSvg = document.createElementNS.bind(document, 'http://www.w3.org/2000/svg');
  var root, dragon, meleeFactory, characterCircleFactory, characterList;

  window.bootLand = function() {
    root = $('svg');
    dragon = window.burninate(root);
    meleeFactory = window.meleeFactory(makeSvg, dragon);
    characterCircleFactory = window.characterCircleFactory(makeSvg);

    $('.add-character a').addEventListener('click', add);
    $('.add-character').addEventListener('submit', add);

    characterList = new CharacterList();
    characterList.appendTo(document.querySelector("#character_list"));
  };

  function add(event) {
    var characterName = $('.add-character input').value;
    var characterCircle = characterCircleFactory(characterName),
      melee = meleeFactory([characterCircle]);
    characterList.addCharacter(characterName);
    $('.add-character input').value = '';
    melee.appendTo(root);
    event.preventDefault();
    return false;
  }
})(window);
