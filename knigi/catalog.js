addEventListener("DOMContentLoaded", view);

function view() {
   document.getElementById("view-1").addEventListener("click", convertView);
   document.getElementById("view-2").addEventListener("click", convertView);
}

function convertView() {
   const mainCatalog = document.getElementById("main-catalog");
   const productContentArr = document.querySelectorAll(".product__content");
   const productDescriptionArr = document.querySelectorAll(
      ".product__description"
   );

   const productCostArr = document.querySelectorAll(".product__cost");

   mainCatalog.classList.toggle("catalog__list--grid-1");

   for (let elem of productContentArr) {
      elem.classList.toggle("product__content--row");
   }

   for (let elem of productDescriptionArr) {
      elem.classList.toggle("product__description--row");
   }

   for (let elem of productCostArr) {
      elem.classList.toggle("product__cost--gap");
   }
}
