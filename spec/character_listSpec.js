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
    this.subject.addCharacter("Foo");
    expect(this.dom.querySelector("ol").className).toEqual("");
  });

  it('should display characters in a list', function () {
    this.subject.addCharacter("Foo");
    this.subject.addCharacter("Bar");
    this.subject.addCharacter("Baz");
    expect(this.dom.querySelector("ol").innerHTML).toEqual(
      "<li>Foo</li><li>Bar</li><li>Baz</li>");
  });

  it("should properly encode names", function () {
    this.subject.addCharacter("<b>nope");
    expect(this.dom.querySelector("ol").innerHTML).toEqual(
      "<li>&lt;b&gt;nope</li>")
  })
});