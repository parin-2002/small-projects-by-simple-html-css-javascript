// const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info|extracts&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${searchTerm}`;

let input = document.querySelector("input");
input.addEventListener(
  "input",
  debouncing(function (e) {
    CallApi(e.target.value);
  }, 1000)
);

function debouncing(fun, delay) {
  let clear;
  return function (e) {
    clearTimeout(clear);
    clear = setTimeout(() => {
      fun(e);
    }, 1000);
  };
}

async function CallApi(searchText) {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info|extracts&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${searchText}`;
    let data = await fetch(url);
    data = await data.json();
    show(data?.query?.search, searchText);
    console.log(data);
  } catch (e) {
    console.log(e);
  }
}

function show(data, searchText) {
  let contain = document.querySelector(".contain");
  contain.innerHTML = "";
  data = highlight(data, searchText);
  contain.innerHTML = data ??= "<h3>😊 Hope You got good result 😊</h3>";
}

function highlight(data, searchText) {
  data = data?.map((one) => {
    one.title = one.title.replace(
      new RegExp(searchText, "gi"),
      `<span style="color:red">${searchText}</span>`
    );
    one.snippet = one.snippet.replace(
      new RegExp(searchText, "gi"),
      `<span style="color:red">${searchText}</span>`
    );
    return `
       <section>
        <p><a href="https://en.wikipedia.org/?curid=${one.pageid}">${one.title}</a></p>
        <p>
        ${one.snippet}
        </p>
      </section>`;
  });

  return data?.join("");
}
