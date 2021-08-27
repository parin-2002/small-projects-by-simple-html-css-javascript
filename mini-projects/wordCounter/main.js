class wordCounter {
  constructor(element) {
    this.element = element;
    this.element.addEventListener("input", (e) => {
      this.count();
    });
  }

  count() {
    let result = this.result(this.element.value.trim());
    this.show(result);
  }

  result(val) {
    return {
      words: val.match(/\S+/g)?.length ?? 0,
      characters: val.match(/\w/g)?.length ?? 0,
    };
  }

  show(result) {
    let event = new CustomEvent("result", {
      detail: result,
    });

    this.element.dispatchEvent(event);
  }
}

let textarea = document.querySelector("textarea");
new wordCounter(textarea);

let result = document.querySelector(".result");

textarea.addEventListener("result", (e) => {
  result.innerHTML = `You've written <b>${e.detail.words} words</b> and <b>${e.detail.characters} characters</b>.`;
});
