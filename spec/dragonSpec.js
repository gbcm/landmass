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
  });

  it('should allow a melee to be dragged onto 2 melees and only merge with 1', function() {
    var characterFoo = makeMockCharacter("foo"),
      characterBar = makeMockCharacter("bar"),
      characterBaz = makeMockCharacter("baz"),
      melee1 = new Melee([characterFoo], this.subject),
      melee2 = new Melee([characterBar], this.subject),
      melee3 = new Melee([characterBaz], this.subject);

    melee1.appendTo(this.root);
    melee2.appendTo(this.root);
    melee3.appendTo(this.root);

    spyOn(melee3, "remove");
    spyOn(this.subject, "removeDraggable").and.callThrough();

    melee1.moveTo(0, 0);
    melee2.moveTo(0, 0);
    triggerMouseEvent(melee3.circle, "mousedown");
    melee3.moveTo(0, 0);
    triggerMouseEvent(melee3.circle, "mouseup");

    expect(melee1.characterCircles).toEqual([characterFoo, characterBaz]);
    expect(melee2.characterCircles).toEqual([characterBar]);
    expect(melee3.remove).toHaveBeenCalled();
    expect(this.subject.removeDraggable).toHaveBeenCalledWith(melee3);
  });
});
