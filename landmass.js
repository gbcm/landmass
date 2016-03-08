(function(window) {
  var document = window.document,
    $ = document.querySelector.bind(document);
  var root, dragon, meleeFactory, characterList;

  window.makeCircle = function (cssClass, radius) {
    var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('class', cssClass);
    circle.setAttribute('r', radius );
    return circle;
  };

  window.bindDoubleClick = function (element, handler) {
    var firstTouchTime = null;
    element.addEventListener('dblclick', handler);
    element.addEventListener('touchend', function () {
      var now = new Date().getTime();

      if (firstTouchTime === null) {
        firstTouchTime = new Date().getTime();
      } else {
        if (now - firstTouchTime > 0 && now - firstTouchTime < 500) {
          setTimeout(handler);
        }
        firstTouchTime = null;
      }
    });
  };


  window.bootLand = function() {
    root = $('svg');
    root.width = root.clientWidth;
    root.height = root.clientHeight;
    root.setAttribute("viewBox", "0 0 " + root.clientWidth + " " + root.clientHeight);
    dragon = window.burninate(root);
    meleeFactory = window.meleeFactory(dragon);

    $('.add-character a').addEventListener('click', add);
    $('.add-character').addEventListener('submit', add);

    characterList = new CharacterList();
    characterList.appendTo(document.querySelector("#character_list"));

    removalArea = new RemovalArea(root);
    removalArea.appendTo(document.body);
    dragon.addDropTarget(removalArea);
  };

  function add(event) {
    var characterName = $('.add-character input').value;
    var character = { name: characterName, initiative: 3 };
    var characterCircle = new CharacterCircle(character, characterList),
      melee = meleeFactory([characterCircle]);
    characterList.addCharacter(character);
    $('.add-character input').value = '';
    melee.appendTo(root);
    event.preventDefault();
    return false;
  }
})(window);
