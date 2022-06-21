var favoriteArr = localStorage.getItem("favorite");
var cartArr = localStorage.getItem("cart");

if (favoriteArr === null) favoriteArr = [];
else favoriteArr = localStorage.getItem("favorite").split(",");

if (cartArr === null) cartArr = [];
else cartArr = localStorage.getItem("cart").split(",");

updateCounter("favorite", favoriteArr);
updateCounter("cart", cartArr);

document.addEventListener("DOMContentLoaded", getCatalog);

async function getCatalog() {
   const response = await fetch("data.json");
   const catalog = await response.json();

   fillSelection(catalog, "popular-top", 11);
   fillSelection(catalog, "popular-bottom", 10);
   fillSelection(catalog, "NY", 4);
   fillSelection(catalog, "main-catalog", catalog.length);
   fillCart(catalog, "order", cartArr);
   fillSelection(catalog, "together", 4);
   fillRecently(catalog, "recently", 4);
}

function fillSelection(catalog, elementId, length) {
   if (document.getElementById(elementId))
      var innerText = document.getElementById(elementId).innerHTML;
   else return;

   for (let i = 0; i < length; i++) {
      innerText += `<li class="catalog__list-item product" data-catalog-id="${
         catalog[i].id
      }">
                        <div class="product__content">
                           <a class="product__link" href="/book.html">
                              <img class="product__picture" src="${
                                 catalog[i].image
                              }" title="${catalog[i].title}" alt="${
         catalog[i].title
      }" width="272" height="216">
                           </a>
                           <div class="product__description">
                                 <div class="product__title">
                                    ${catalog[i].title}
                                 <div class="product__author">
                                    ${catalog[i].author}
                                 </div>
                                 </div>
                              <div class="product__rating rating">
                                 <div class="rating__stars rating__stars--${
                                    catalog[i].rating
                                 }"></div>
                              </div>
                              <div class="product__bottom">
                                 <div class="product__cost">
                                    <div class="product__price product__price--emphasis">
                                    ${catalog[i].price}
                                    </div>
                                    <s class="product__old-price">${
                                       catalog[i].preprice
                                    }</s>
                                 </div>
                                 <div class="product__control">
                                    <input type="checkbox" class="product__favorite favorite" data-favorite ${checkedControl(
                                       favoriteArr,
                                       catalog[i].id
                                    )}>
                                    <input type="checkbox" class="product__cart"  data-cart ${checkedControl(
                                       cartArr,
                                       catalog[i].id
                                    )}>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </li>`;
   }

   document.getElementById(elementId).innerHTML = innerText;
}

function fillRecently(catalog, elementId, length) {
   if (document.getElementById(elementId))
      var innerText = document.getElementById(elementId).innerHTML;
   else return;

   for (let i = 0; i < length; i++) {
      innerText += `<li class="catalog__list-item product" data-catalog-id="${catalog[i].id}">
                        <div class="product__content">
                           <a class="product__link" href="#">
                              <img class="product__picture product__picture--no-transform" src="${catalog[i].image}" title="${catalog[i].title}" alt="${catalog[i].title}" width="136">
                           </a>
                        </div>
                     </li>`;
   }

   document.getElementById(elementId).innerHTML = innerText;
}

function fillCart(catalog, elementId, cartArr) {
   if (document.getElementById(elementId))
      var innerText = document.getElementById(elementId).innerHTML;
   else return;

   for (let i = 0; i < cartArr.length; i++) {
      for (let obj of catalog) {
         if (obj.id == cartArr[i]) {
            innerText += `<li class="description__order-list-item order">
                           <div class="order__content">
                              <div class="order__description product">
                                 <a href="/book.html">
                                    <img src="${obj.image}" class="product__picture product__picture--no-transform" alt="${obj.title}" width="140" title="${obj.title}">
                                 </a>

                                 <div class="product__description">
                                    <div class="product__title">
                                       ${obj.title}
                                    </div>
                                    <div class="product__author">
                                       ${obj.author}
                                    </div>
                                    <div class="product__state">на складе</div>
                                 </div>
                              </div>
                              <div class="order__counter counter">
                                 <div class="counter__content">
                                    <button class="counter__decrement">
                                       –
                                    </button>
                                    <input class="counter__amount" type="text" maxlength="2" value="1">
                                    <button class="counter__increment">
                                       +
                                    </button>
                                 </div>
                              </div>
                              <div class="order__cost"> ${obj.price}</div>
                              <div class="order__control">
                                 <input type="checkbox" name="favorite" class="order__favorite favorite">
                                 <button class="order__remove"></button>
                              </div>
                           </div>
                        </li>`;
         }
      }
   }

   document.getElementById(elementId).innerHTML = innerText;
}

function checkedControl(arr, id) {
   if (arr.includes(id)) return "checked";
}

document.addEventListener("click", function (event) {
   if (event.target.dataset.favorite != undefined) {
      if (event.target.checked)
         incrementArray(
            favoriteArr,
            event.target.closest("[data-catalog-id]").dataset.catalogId,
            "favorite"
         );
      else
         decrementArray(
            favoriteArr,
            event.target.closest("[data-catalog-id]").dataset.catalogId,
            "favorite"
         );
   }
});

document.addEventListener("click", function (event) {
   if (event.target.dataset.cart != undefined) {
      if (event.target.checked)
         incrementArray(
            cartArr,
            event.target.closest("[data-catalog-id]").dataset.catalogId,
            "cart"
         );
      else
         decrementArray(
            cartArr,
            event.target.closest("[data-catalog-id]").dataset.catalogId,
            "cart"
         );
   }
});

function incrementArray(array, elem, dataAttr) {
   array.push(elem);
   updateLocalStorage(array);
   updateCounter(dataAttr, array);
}

function decrementArray(array, elem, dataAttr) {
   array.pop(elem);
   updateLocalStorage(array);
   updateCounter(dataAttr, array);
}

function updateLocalStorage(array) {
   switch (array) {
      case favoriteArr:
         localStorage.setItem("favorite", array);
         break;

      case cartArr:
         localStorage.setItem("cart", array);
         break;
   }
}

function updateCounter(dataAttr, array) {
   array.length == 0
      ? (document.querySelector(`[data-${dataAttr}-counter]`).innerText = "")
      : (document.querySelector(`[data-${dataAttr}-counter]`).innerText =
           array.length);
}
