describe('Melee', function() {
  beforeEach(function() {
    var dragon = window.burninate(document.createElement("div"));
    this.meleeFactory = meleeFactory(document.createElementNS.bind(document, 'http://www.w3.org/2000/svg'), dragon);
  });

  it('overlaps to the left', function() {
    var melee1 = this.meleeFactory([]),
      melee2 = this.meleeFactory([]),
      melee3 = this.meleeFactory([]);

    melee1.moveTo(0, 0);
    melee2.moveTo(155, 0);
    melee3.moveTo(156, 0);

    expect(melee1.overlaps(melee2)).toBe(true);
    expect(melee1.overlaps(melee3)).toBe(false);
  });

  it('overlaps down', function() {
    var melee1 = this.meleeFactory([]),
      melee2 = this.meleeFactory([]),
      melee3 = this.meleeFactory([]);

    melee1.moveTo(0, 0);
    melee2.moveTo(0, 155);
    melee3.moveTo(0, 156);

    expect(melee1.overlaps(melee2)).toBe(true);
    expect(melee1.overlaps(melee3)).toBe(false);
  });

  it('overlaps diagonally', function() {
    var melee1 = this.meleeFactory([]),
      melee2 = this.meleeFactory([]),
      melee3 = this.meleeFactory([]);

    melee1.moveTo(0, 0);
    melee2.moveTo(100, 100);
    melee3.moveTo(120, 120);

    expect(melee1.overlaps(melee2)).toBe(true);
    expect(melee1.overlaps(melee3)).toBe(false);
  });

  it('does not overlap itself', function() {
    var melee = this.meleeFactory([]);
    melee.moveTo(0, 0);

    expect(melee.overlaps(melee)).toBe(false);
  });
});
