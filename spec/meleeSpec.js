describe('Melee', function() {
  beforeEach(function() {
    this.dragon = window.burninate(document.createElement("div"));
   });

  it('overlaps to the left', function() {
    var melee1 = new Melee([], this.dragon),
      melee2 = new Melee([], this.dragon),
      melee3 = new Melee([], this.dragon);

    melee1.moveTo(0, 0);
    melee2.moveTo(155, 0);
    melee3.moveTo(156, 0);

    expect(melee1.overlaps(melee2)).toBe(true);
    expect(melee1.overlaps(melee3)).toBe(false);
  });

  it('overlaps down', function() {
    var melee1 = new Melee([], this.dragon),
      melee2 = new Melee([], this.dragon),
      melee3 = new Melee([], this.dragon);

    melee1.moveTo(0, 0);
    melee2.moveTo(0, 155);
    melee3.moveTo(0, 156);

    expect(melee1.overlaps(melee2)).toBe(true);
    expect(melee1.overlaps(melee3)).toBe(false);
  });

  it('overlaps diagonally', function() {
    var melee1 = new Melee([], this.dragon),
      melee2 = new Melee([], this.dragon),
      melee3 = new Melee([], this.dragon);

    melee1.moveTo(0, 0);
    melee2.moveTo(100, 100);
    melee3.moveTo(120, 120);

    expect(melee1.overlaps(melee2)).toBe(true);
    expect(melee1.overlaps(melee3)).toBe(false);
  });

  it('does not overlap itself', function() {
    var melee = new Melee([], this.dragon);
    melee.moveTo(0, 0);

    expect(melee.overlaps(melee)).toBe(false);
  });
});
