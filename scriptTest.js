// Bitte hier Code eingeben


let shoppingBasket = ["Pizza Salami"];
let prices = [6.99];


async function includeHTML() {
  let includeElements = document.querySelectorAll('[w3-include-html]');
  for (let i = 0; i < includeElements.length; i++) {
      const element = includeElements[i];
      file = element.getAttribute("w3-include-html"); // "includes/header.html"
      let resp = await fetch(file);
      if (resp.ok) {
          element.innerHTML = await resp.text();
      } else {
          element.innerHTML = 'Page not found';
      }
  }
}

function addToBasekt(name, price) {
  names.push(name)
  prices.push(price)
}

function updateShoppingBasket() {
  let sum = 0;

  for (let i = 0; i < prices.length; i++) {
    sum += prices[i];
  }
  let finalSum = sum + 1;
  document.getElementById().innerHTML = sum;
}







function getValueFromInput(i) {
  return document.getElementById(i).value;
}

function getMenuFromInput() {
  return getValueFromInput('menu').trim()
}

function getPriceFromInput() {
  return +getValueFromInput('price')
}

function getMenuIndex(menu) {
  return menus.indexOf(menu);
}

function onAddMenu() {
  let menu = getMenuFromInput()
  let index = getMenuIndex(menu)
  if (index == -1) {
    let price = getPriceFromInput()
    menus.push(menu)
    prices.push(price)
    amounts.push(1)
  } else {
    amounts[index] += 1
  }
}




