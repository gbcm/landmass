describe('RemovalArea', function () {
  beforeEach(function () {
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute("viewBox", "0 0 1000 1000");
    this.subject = new RemovalArea(this.svg);
    document.body.appendChild(this.svg);
    this.subject.appendTo(document.body);

    var dragon = window.burninate(this.svg);
    this.meleeFactory = meleeFactory(dragon);

    this.subject.root.style.position = "absolute";
    this.subject.root.style.bottom = "0";
    this.subject.root.style.left = "0";
    this.subject.root.style.width = this.subject.root.style.height = "120px";
    this.subject.root.style.padding = "40px";

    this.svg.style.position = "absolute";
    this.svg.style.top = "0";
    this.svg.style.left = "0";
    this.svg.style.width = "100%";
    this.svg.style.height = "100vh";

    this.htmlToSvgCoords = function (x, y) {
      var matrix = this.svg.getScreenCTM(),
        point = this.svg.createSVGPoint();

      point.x = x;
      point.y = y;
      return point.matrixTransform(matrix.inverse());
    };
  });

  afterEach(function () {
    document.body.removeChild(this.svg);
    this.subject.remove();
  });

  describe('overlaps', function () {
    it("should return true when the circle's center is inside the subject", function () {
      var melee = this.meleeFactory([]),
        svgHeight = this.svg.clientHeight;
      var point = this.htmlToSvgCoords(199, svgHeight - 199);
      melee.appendTo(this.svg);
      melee.moveTo(point.x, point.y);

      expect(this.subject.overlaps(melee)).toEqual(true);
    });

    it("should return false when the circle does not overlap the subject", function () {
      var melee = this.meleeFactory([]),
        svgHeight = this.svg.clientHeight;
      melee.appendTo(this.svg);

      var point = this.htmlToSvgCoords(280, svgHeight);
      melee.moveTo(point.x, point.y);
      expect(this.subject.overlaps(melee)).toEqual(false);

      point = this.htmlToSvgCoords(0, svgHeight - 280);
      melee.moveTo(point.x, point.y);
      expect(this.subject.overlaps(melee)).toEqual(false);
    });

    it("should return true when the circle's center is outside but it overlaps the subject", function () {
      var melee = this.meleeFactory([]),
        svgHeight = this.svg.clientHeight;
      melee.appendTo(this.svg);

      var point = this.htmlToSvgCoords(279, svgHeight);
      melee.moveTo(point.x, point.y);
      expect(this.subject.overlaps(melee)).toEqual(true);

      point = this.htmlToSvgCoords(0, svgHeight - 279);
      melee.moveTo(point.x, point.y);
      expect(this.subject.overlaps(melee)).toEqual(true);
    });
  });
});