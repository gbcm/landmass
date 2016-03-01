describe('Melee', function() {
  it('overlaps to the left', function() {
    var melee1 = new Melee([]),
      melee2 = new Melee([]),
      melee3 = new Melee([]);

    melee1.moveTo(0, 0);
    melee2.moveTo(115, 0);
    melee3.moveTo(116, 0);

    expect(melee1.overlaps(melee2)).toBe(true);
    expect(melee1.overlaps(melee3)).toBe(false);
  });

  it('overlaps down', function() {
    var melee1 = new Melee([]),
      melee2 = new Melee([]),
      melee3 = new Melee([]);

    melee1.moveTo(0, 0);
    melee2.moveTo(0, 115);
    melee3.moveTo(0, 116);

    expect(melee1.overlaps(melee2)).toBe(true);
    expect(melee1.overlaps(melee3)).toBe(false);
  });

  it('overlaps diagonally', function() {
    var melee1 = new Melee([]),
      melee2 = new Melee([]),
      melee3 = new Melee([]);

    melee1.moveTo(0, 0);
    melee2.moveTo(80, 80);
    melee3.moveTo(90, 90);

    expect(melee1.overlaps(melee2)).toBe(true);
    expect(melee1.overlaps(melee3)).toBe(false);
  });
});
