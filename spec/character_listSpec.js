describe('CharacterList', function () {
  var arrayify = function (nodelist) {
    return Array.prototype.slice.call(nodelist);
  };

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
    var items = arrayify(this.dom.querySelectorAll("li"));

    var texts = items.map(function (item) { return item.innerText });
    expect(texts).toEqual(["Foo: ", "Bar: ", "Baz: "]);
    var values = items.map(function (item) { return item.querySelector("input").value });
    expect(values).toEqual(["3", "3", "3"]);
  });

  it("should properly encode names", function () {
    this.subject.addCharacter({name: "<b>nope", initiative: 3});
    expect(this.dom.querySelector("ol").innerHTML).toEqual(
      "<li>&lt;b&gt;nope: <input type=\"text\"></li>")
  });

  it("should sort itself when a character is added", function () {
    this.subject.addCharacter({name: "Foo", initiative: 3});
    this.subject.addCharacter({name: "Bar", initiative: 1});
    this.subject.addCharacter({name: "Baz", initiative: 4});
    var items = arrayify(this.dom.querySelectorAll("li"));

    var texts = items.map(function (item) { return item.innerText });
    expect(texts).toEqual(["Baz: ", "Foo: ", "Bar: "]);
    var values = items.map(function (item) { return item.querySelector("input").value });
    expect(values).toEqual(["4", "3", "1"]);
  });

  it("should sort itself when an initiative changes", function () {
    this.subject.addCharacter({name: "Foo", initiative: 3});
    this.subject.addCharacter({name: "Bar", initiative: 4});
    this.subject.addCharacter({name: "Baz", initiative: 1});

    var fooInput = this.dom.querySelector("input");
    fooInput.value = 2;
    var event = new UIEvent("blur");
    fooInput.dispatchEvent(event);

    var items = arrayify(this.dom.querySelectorAll("li"));
    var texts = items.map(function (item) { return item.innerText });
    expect(texts).toEqual(["Foo: ", "Bar: ", "Baz: "]);
    var values = items.map(function (item) { return item.querySelector("input").value });
    expect(values).toEqual(["3", "2", "1"]);
  });

  it("should allow decimal initiative values", function () {
    this.subject.addCharacter({name: "Foo", initiative: 2.1});
    this.subject.addCharacter({name: "Bar", initiative: 4.7});
    this.subject.addCharacter({name: "Baz", initiative: 1.2});

    var fooInput = this.dom.querySelectorAll("input")[1];
    fooInput.value = 4.1;
    var event = new UIEvent("blur");
    fooInput.dispatchEvent(event);

    var items = arrayify(this.dom.querySelectorAll("li"));
    var texts = items.map(function (item) { return item.innerText });
    expect(texts).toEqual(["Bar: ", "Foo: ", "Baz: "]);
    var values = items.map(function (item) { return item.querySelector("input").value });
    expect(values).toEqual(["4.7", "4.1", "1.2"]);
  });
});