describe('Melee', function() {
  beforeEach(function() {
    this.meleeFactory = meleeFactory(document.createElementNS.bind(document, 'http://www.w3.org/2000/svg'));
  });

  it('overlaps to the left', function() {
    var melee1 = this.meleeFactory([]),
      melee2 = this.meleeFactory([]),
      melee3 = this.meleeFactory([]);

    melee1.moveTo(0, 0);
    melee2.moveTo(115, 0);
    melee3.moveTo(116, 0);

    expect(melee1.overlaps(melee2)).toBe(true);
    expect(melee1.overlaps(melee3)).toBe(false);
  });

  it('overlaps down', function() {
    var melee1 = this.meleeFactory([]),
      melee2 = this.meleeFactory([]),
      melee3 = this.meleeFactory([]);

    melee1.moveTo(0, 0);
    melee2.moveTo(0, 115);
    melee3.moveTo(0, 116);

    expect(melee1.overlaps(melee2)).toBe(true);
    expect(melee1.overlaps(melee3)).toBe(false);
  });

  it('overlaps diagonally', function() {
    var melee1 = this.meleeFactory([]),
      melee2 = this.meleeFactory([]),
      melee3 = this.meleeFactory([]);

    melee1.moveTo(0, 0);
    melee2.moveTo(80, 80);
    melee3.moveTo(90, 90);

    expect(melee1.overlaps(melee2)).toBe(true);
    expect(melee1.overlaps(melee3)).toBe(false);
  });

  it('does not overlap itself', function() {
    var melee = this.meleeFactory([]);
    melee.moveTo(0, 0);

    expect(melee.overlaps(melee)).toBe(false);
  });
});
