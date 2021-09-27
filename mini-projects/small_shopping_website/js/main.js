//call api and get product category
async function getCategories() {
  let data = await fetch("https://fakestoreapi.com/products/categories");
  data = await data.json();
  addOption(data);
}

//add option to the selectBox in navbar
function addOption(options) {
  let htmlOfoption = options.map((one) => {
    let option = new Option(one, one);
    return option;
  });
  document.querySelector("#categories").append(...htmlOfoption);
}

//get products
async function getProcducts() {
  showLoader();
  let data = await fetch("https://fakestoreapi.com/products");
  data = await data.json();
  hideLoader();
  displayProducts(data);
}

function displayProducts(products) {
  // console.log(products[0]);
  let productSection = document.querySelector(".products");
  // console.log(productSection);
  products.forEach((one) => {
    one = ` <div onClick="getOneProduct(this.id)" class="card" id="${one.id}">
        <img
          src="${one.image}"
        />
        <div>
          <div>
            <b>Price: </b>
            <p>$${one.price}</p>
          </div>
        </div>
        <div class="add-card" onClick="addCard(event,this.id)" id="${one.id}"><i class="fad fa-cart-plus"></i></div>
      </div>`;
    productSection.innerHTML += one;
  });
}

//get product by id
async function getOneProduct(id) {
  document.querySelector(".products").style.display = "none";
  showLoader();
  let data = await fetch(`https://fakestoreapi.com/products/${id}`);
  data = await data.json();
  //console.log(data);
  getDetail(data);
  hideLoader();
  document.querySelector(".products").style.display = "block";
  document.querySelector(".products").style.display = "flex";
}

//detDetail of products in dialogbox
function getDetail(detail) {
  let dialog = document.querySelector("dialog");
  dialog.innerHTML = `
  <div class="main">
        <div class="pro_img">
          <img src="${detail.image}" />
        </div>
        <div class="detail">
          <b>Price: </b>
          <p>$${detail.price}</p>
        </div>
          <div class="detail">
          <b>Title: </b>
          <p>${detail.title}</p>
        </div>
         <div class="detail">
          <b>Category: </b>
          <p>${detail.category}</p>
        </div>
         <div class="detail">
          <b>Description: </b>
          <p>${detail.description}</p>
        </div>
         <div class="detail">
          <b>Rating: </b>
          <p>${detail.rating.rate} got ${detail.rating.count} rate total</p>
        </div>
        <div class="add-card" onClick="addCard(event,this.id)" id="${detail.id}"><i class="fad fa-cart-plus"></i></div>
        <div class="close-dialog" onClick="hideDialog()">
          <i class="fal fa-times"></i>
        </div>
      </div>`;
  dialog.showModal();
}

//close dialog
function hideDialog() {
  let dialog = document.querySelector("dialog");
  dialog.close();
}

//loader show and hide
function showLoader() {
  let loader = document.querySelector(".loading");
  loader.style.display = "block";
}

function hideLoader() {
  let loader = document.querySelector(".loading");
  loader.style.display = "none";
}

//add to card functionality
function addCard(event, id) {
  let getOldCards = localStorage.getItem("cards");
  if (getOldCards) {
    getOldCards = JSON.parse(getOldCards);
    getOldCards.push(id);
    getOldCards = new Set(getOldCards);
    getOldCards = [...getOldCards];
    localStorage.setItem("cards", JSON.stringify(getOldCards));
    alert("added to card");
  } else {
    localStorage.setItem("cards", JSON.stringify([id]));
    alert("added to card");
  }
  event.stopPropagation();
}

(() => {
  //hide loader on load document
  window.addEventListener("load", hideLoader);

  //show and hide search bar on small screen
  let search = document.querySelector("li.search");
  search.addEventListener("click", () => {
    let icon = search.querySelector("i");
    icon.className == "far fa-search"
      ? (icon.className = "fal fa-times")
      : (icon.className = "far fa-search");
    document.querySelector(".search").classList.toggle("show-search");
  });

  getCategories();
  getProcducts();
})();
