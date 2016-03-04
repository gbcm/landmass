describe('CharacterList', function () {
  beforeEach(function () {
    this.subject = new CharacterList();
    this.dom = document.createElement("div");
    this.subject.appendTo(this.dom);
  });

  it('should begin empty', function () {
    expect(this.dom.innerHTML).toEqual("<ol></ol>");
  });

  it('should display characters in a list', function () {
    this.subject.addCharacter("Foo");
    this.subject.addCharacter("Bar");
    this.subject.addCharacter("Baz");
    expect(this.dom.innerHTML).toEqual("<ol><li>Foo</li><li>Bar</li><li>Baz</li></ol>");
  });

  it("should properly encode names", function () {
    this.subject.addCharacter("<b>nope");
    expect(this.dom.innerHTML).toEqual("<ol><li>&lt;b&gt;nope</li></ol>")
  })
});