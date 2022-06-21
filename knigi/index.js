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

   fillSelection(catalog, "popular-top", 11);
   fillSelection(catalog, "popular-bottom", 10);
   fillSelection(catalog, "NY", 4);
   fillSelection(catalog, "main-catalog", catalog.length);
}

function fillSelection(catalog, elementId, length) {
   if (document.getElementById(elementId))
      var innerText = document.getElementById(elementId).innerHTML;
   else return;

   for (let i = 0; i < length; i++) {
      innerText += `<li class="catalog__list-item product" data-catalog-id="${catalog[i].id}">
                        <div class="product__content">
                           <a class="product__link" href="/book.html">
                              <img class="product__picture" src="${catalog[i].image}" title="${catalog[i].title}" alt="${catalog[i].title}" width="272" height="216">
                           </a>
                           <div class="product__description">
                                 <div class="product__title">
                                    ${catalog[i].title}
                                 <div class="product__author">
                                    ${catalog[i].author}
                                 </div>
                                 </div>
                              <div class="product__rating rating">
                                 <div class="rating__stars rating__stars--${catalog[i].rating}"></div>
                              </div>
                              <div class="product__bottom">
                                 <div class="product__cost">
                                    <div class="product__price product__price--emphasis">
                                    ${catalog[i].price}
                                    </div>
                                    <s class="product__old-price">${catalog[i].preprice}</s>
                                 </div>
                                 <div class="product__control">
                                    <input type="checkbox" name="favorite" class="product__favorite favorite">
                                    <input type="checkbox" class="product__cart" name="cart" cart>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </li>`;
   }

   // document.getElementById("popular-top").innerHTML = innerText;
   document.getElementById(elementId).innerHTML = innerText;
}

function fillPopularBottom(catalog, elementId, length) {
   // var innerText = document.getElementById("popular-bottom").innerHTML;
   var innerText = document.getElementById(elementId).innerHTML;
   for (let i = 0; i < length; i++) {
      let i = iInteger(1, catalog.length - 1);
      innerText += `<li class="catalog__list-item product" data-catalog-id="${catalog[i].id}">
                        <div class="product__content">
                           <a class="product__link" href="#">
                              <img class="product__picture" src="${catalog[i].image}" title="${catalog[i].title}" width="272" height="216">
                           </a>
                           <div class="product__description">
                                 <div class="product__title">
                                    ${catalog[i].title}
                                 </div>
                                 <div class="product__author">
                                    ${catalog[i].author}
                                 </div>
                              <div class="product__rating rating">
                                 <div class="rating__stars rating__stars--${catalog[i].rating}"></div>
                              </div>
                              <div class="product__bottom">
                                 <div class="product__cost">
                                    <div class="product__price product__price--emphasis">
                                    ${catalog[i].price}
                                    </div>
                                    <s class="product__old-price">${catalog[i].preprice}</s>
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

   // document.getElementById("popular-bottom").innerHTML = innerText;
   document.getElementById(elementId).innerHTML = innerText;
}
