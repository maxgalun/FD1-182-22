addEventListener("DOMContentLoaded", getCatalog);

var cartCounter = localStorage.getItem("cartCounter");
//updateCartCounterDOM();

function updateCartCounterDOM() {
   document.querySelector(".header-menu__cart-counter").innerText = cartCounter;
}

function incrementCartCounter() {
   cartCounter++;
   updateCartCounterDOM();
   setlocalStorageCartCounter();
}

function setlocalStorageCartCounter() {
   localStorage.setItem("cartCounter", cartCounter);
}

async function getCatalog() {
   const response = await fetch("data.json");
   const catalog = await response.json();
   console.log(catalog);
   fillPopular(catalog, 12);
}

function randomInteger(min, max) {
   let rand = min + Math.random() * (max + 1 - min);
   return Math.floor(rand);
}

function fillPopular(catalog, length) {
   console.log("fillPopular");
   var innerText = "";
   for (let i = 0; i < length; i++) {
      let random = randomInteger(0, catalog.length);
      innerText += `<li class="catalog__list-item product" data-catalog-id="${catalog[random].id}">
                        <div class="product__content">
                           <a class="product__link" href="#">
                              <img class="product__picture" src="${catalog[random].image}" title="${catalog[random].title}" width="272" height="216">
                           </a>
                           <div class="product__description">
                                 <div class="product__title">
                                    ${catalog[random].title}
                                 </div>
                                 <div class="product__author">
                                    ${catalog[random].author}
                                 </div>
                              <div class="product__rating rating">
                                 <div class="rating__stars rating__stars--${catalog[random].rating}"></div>
                              </div>
                              <div class="product__bottom">
                                 <div class="product__cost">
                                    <div class="product__price product__price--emphasis">
                                    ${catalog[random].price}
                                    </div>
                                    <s class="product__old-price">${catalog[random].preprice}</s>
                                 </div>
                                 <div class="product__control">
                                    <input type="checkbox" name="favorite" class="product__favorite-checkbox">
                                    <input type="checkbox" class="product__cart-checkbox" name="cart">
                                 </div>
                              </div>
                           </div>
                        </div>
                     </li>`;
   }

   document.getElementById("popular").innerHTML = innerText;
   console.log(innerText);
}