// Bitte hier Code eingeben
let menus = ["Pizza Salami"];
let prices = [6.99];
let amounts = [1];

function getValueFromInput(i){
 return document.getElementById(i).value;
}

function getMenuFromInput(menu){
 return getValueFromInput('menu').trim()
}


 function getPriceFromInput(){
  let price = +getValueFromInput('price')
  return price
}

function onAddMenu(){
 let menu = getMenuFromInput()
 let price = getPriceFromInput()
 menus.push(menu)
 prices.push(price)
 amounts.push(1)
}

function getMenuIndex(menu){
  let index = menus.indexOf(menu);
  return index
 } 

