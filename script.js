// Bitte hier Code eingeben
let menus = ["Pizza Salami"];
let prices = [6.99];
let amounts = [1];

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




