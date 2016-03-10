describe('RemovalArea', function () {
  beforeEach(function () {
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.setAttribute("viewBox", "0 0 1000 1000");
    this.subject = new RemovalArea(this.svg);
    document.body.appendChild(this.svg);
    this.subject.appendTo(document.body);

    this.dragon = window.burninate(this.svg);

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

  beforeEach(function() {
    this.melee = new Melee([],this.dragon);
    this.svgHeight = this.svg.clientHeight;
  });

  afterEach(function () {
    document.body.removeChild(this.svg);
    this.subject.remove();
  });

  describe('overlaps', function () {
    it("should return true when the circle's center is inside the subject", function () {
      var point = this.htmlToSvgCoords(199, this.svgHeight - 199);
      this.melee.appendTo(this.svg);
      this.melee.moveTo(point.x, point.y);

      expect(this.subject.overlaps(this.melee)).toEqual(true);
    });

    it("should return false when the circle does not overlap the subject", function () {
      this.melee.appendTo(this.svg);

      var point = this.htmlToSvgCoords(280, this.svgHeight);
      this.melee.moveTo(point.x, point.y);
      expect(this.subject.overlaps(this.melee)).toEqual(false);

      point = this.htmlToSvgCoords(0, this.svgHeight - 280);
      this.melee.moveTo(point.x, point.y);
      expect(this.subject.overlaps(this.melee)).toEqual(false);
    });

    it("should return true when the circle's center is outside but it overlaps the subject", function () {
      this.melee.appendTo(this.svg);

      var point = this.htmlToSvgCoords(279, this.svgHeight);
      this.melee.moveTo(point.x, point.y);
      expect(this.subject.overlaps(this.melee)).toEqual(true);

      point = this.htmlToSvgCoords(0, this.svgHeight - 279);
      this.melee.moveTo(point.x, point.y);
      expect(this.subject.overlaps(this.melee)).toEqual(true);
    });
  });
});