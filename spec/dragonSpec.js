describe('Dragon', function() {

  function triggerMouseEvent(node, eventType) {
    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent(eventType, true, true);
    node.dispatchEvent(clickEvent);
  }

  function makeMockCharacter(name) {
    return {
      name: name,
      appendTo: function () {},
      moveTo: function () {}
    }
  }

  beforeEach(function() {
    this.root = document.createElement("div");
    this.subject = window.burninate(this.root);
    this.meleeFactory = meleeFactory(document.createElementNS.bind(document, 'http://www.w3.org/2000/svg'), this.subject);
  });

  it('should allow a melee to be dragged onto 2 melees and only merge with 1', function() {
    var characterFoo = makeMockCharacter("foo"),
      characterBar = makeMockCharacter("bar"),
      characterBaz = makeMockCharacter("baz"),
      melee1 = this.meleeFactory([characterFoo]),
      melee2 = this.meleeFactory([characterBar]),
      melee3 = this.meleeFactory([characterBaz]);

    melee1.appendTo(this.root);
    melee2.appendTo(this.root);
    melee3.appendTo(this.root);

    spyOn(melee3, "remove");
    spyOn(this.subject, "removeMelee").and.callThrough();

    melee1.moveTo(0, 0);
    melee2.moveTo(0, 0);
    triggerMouseEvent(melee3.circle, "mousedown");
    melee3.moveTo(0, 0);
    triggerMouseEvent(melee3.circle, "mouseup");

    expect(melee1.characterCircles).toEqual([characterFoo, characterBaz]);
    expect(melee2.characterCircles).toEqual([characterBar]);
    expect(melee3.remove).toHaveBeenCalled();
    expect(this.subject.removeMelee).toHaveBeenCalledWith(melee3);
  });
});
