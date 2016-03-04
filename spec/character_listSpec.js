describe('CharacterList', function () {
  beforeEach(function () {
    this.subject = new CharacterList();
    this.dom = document.createElement("div");
    this.subject.appendTo(this.dom);
  });

  it('should begin empty', function () {
    expect(this.dom.querySelectorAll("li").length).toEqual(0);
  });

  it('should begin hidden', function () {
    expect(this.dom.querySelector("ol").className).toEqual("hidden");
  });

  it('should remove hidden class when a character is added', function () {
    this.subject.addCharacter({name: "Foo", initiative: 3});
    expect(this.dom.querySelector("ol").className).toEqual("");
  });

  it('should display characters and initiatives in a list', function () {
    this.subject.addCharacter({name: "Foo", initiative: 3});
    this.subject.addCharacter({name: "Bar", initiative: 3});
    this.subject.addCharacter({name: "Baz", initiative: 3});
    expect(this.dom.querySelector("ol").innerHTML).toEqual(
      "<li>Foo: <input type=\"text\" value=\"3\"></li>" +
      "<li>Bar: <input type=\"text\" value=\"3\"></li>" +
      "<li>Baz: <input type=\"text\" value=\"3\"></li>");
  });

  it("should properly encode names", function () {
    this.subject.addCharacter({name: "<b>nope", initiative: 3});
    expect(this.dom.querySelector("ol").innerHTML).toEqual(
      "<li>&lt;b&gt;nope: <input type=\"text\" value=\"3\"></li>")
  })
});