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


let foods = [{
    'name': 'Pizza Margherita',
    'description': 'mit Käse, Tomatensauce und Schokolade',
    'choice': 'Wahl aus: Klein, Ø 24cm, Normal, Ø 29cm oder Familia, Ø 40cm',
    'price': '6.80',
},
{
    'name': 'Pizza Salami',
    'description': 'mit Salami',
    'choice': 'Wahl aus: Klein, Ø 24cm, Normal, Ø 29cm oder Familia, Ø 40cm',
    'price': '8.00',
},
{
    'name': 'Pizza Prosciutto',
    'description': 'mit Schinken',
    'choice': 'Wahl aus: Klein, Ø 24cm, Normal, Ø 29cm oder Familia, Ø 40cm',
    'price': '8.50',
},
{
    'name': 'Pizza Funghi',
    'description': 'mit frischen Champignons',
    'choice': 'Wahl aus: Klein, Ø 24cm, Normal, Ø 29cm oder Familia, Ø 40cm',
    'price': '8.50',
},
{
    'name': 'Pizza Spinaci',
    'description': 'mit Spinat und Knoblauch',
    'choice': 'Wahl aus: Klein, Ø 24cm, Normal, Ø 29cm oder Familia, Ø 40cm',
    'price': '8.50',
},
{
    'name': 'Pizza Diabolo',
    'description': 'mit Salami und Peperoni',
    'choice': 'Wahl aus: Klein, Ø 24cm, Normal, Ø 29cm oder Familia, Ø 40cm',
    'price': '8.80',
}];


function show() {
    document.getElementById('menu').innerHTML += '';
    for (let i = 0; i < foods.length; i++) {
        const food = foods[i];
        document.getElementById('menu').innerHTML += createShowHTML(i);
    }
}


function createShowHTML(i) {
    const food = foods[i];
    const name = food['name'];
    const price = food['price'];

    return /*html*/`
    <div class="card" onclick="addToBasket('${name}', ${price});">
        <div class = "card-content">
            <h3>${name}</h3>
            <div>${food['description']}</div>
            <div>${food['choice']}</div>
            <span>${price}</span>
        </div>
      <img src="img/plus.png" class="plus">
    </div>
    `;
}

//--------------------------------BASKET--------------------------------

let basket = [];

function addToBasket(name, price) {
    let index = basket.findIndex(pizza => {
        return pizza.name === name;
    })
    if (index === -1) {
        basket.push({
            'counter': 1,
            'name': name,
            'price': price
        });
    } else {
        basket[index]['counter']++;
    }
    updateShoppingBasket();
    createResponsiveBasketSection()
}


function removeFromBasket(i) {

    if (basket[i]['counter'] > 1) {
        basket[i]['counter']--;
    } else {
        basket.splice(i, 1)
    }
    updateShoppingBasket();
}


function increaseValue(i) {
    basket[i]['counter']++
    updateShoppingBasket();
}


updateShoppingBasket('basket-dishes', 'basket-prices');
updateShoppingBasket('basket-dishes-mobile', 'basket-prices-mobile');

function updateShoppingBasket(basketId, basketPricesId) {
    document.getElementById(basketId).innerHTML = '';
    if (basket.length < 1) {
        document.getElementById(basketPricesId).innerHTML = '';
        showEmptyBasket();
    } else {
        hideEmptyBasket();
        let sum = 0;
        for (let i = 0; i < basket.length; i++) {
            basket[i]['price'] = parseFloat(basket[i]['price']).toFixed(2);
            sum += basket[i]['counter'] * basket[i]['price'];
            document.getElementById("basket-dishes-mobile").innerHTML += createBasketHTML(basket, i)
        }
        let finalSum = sum + 1;
        sum = parseFloat(Math.round(sum * 100) / 100).toFixed(2)
        finalSum = parseFloat(Math.round(finalSum * 100) / 100).toFixed(2)
        document.getElementById(basketId).innerHTML = generateCostOverviewHTML(sum, finalSum);
    }
}

function createBasketHTML(basket, i) {
    return `
    <div class="basket-dish">
        <div class="basket-value-name">
            <div>${basket[i]['counter']}</div>  
            <div>${basket[i]['name']}</div> 
        </div>
        <div class="basket-dishes-price">
            <span>${basket[i]['price']} €</span> 
        </div>
    </div>  
    <div class="basket-plus-minus-buttons">
            <a href="##" onclick="removeFromBasket(${i});">
                <img src="img/minus.png" class="plus-basket">
            </a>
            <a href="##" onclick="increaseValue(${i});">
                <img src="img/plus.png" class="plus-basket">
            </a>
    </div>
    `;
}

function generateCostOverviewHTML(sum, finalSum){
    return ` 
    <div class="space-between">
        <div>Zwischensumme</div>
        <div>${sum} €</div>
    </div>
    <div class="space-between">
        <div>Lieferkosten</div>
        <div>1€</div>
    </div>
    <div class="space-between">
        <div>Gesamt</div>
        <div>${finalSum} €</div>
    </div>
        `;
}


function showEmptyBasket() {
    document.getElementById("default-basket").classList.remove('d-none');
}

function hideEmptyBasket() {
    document.getElementById("default-basket").classList.add('d-none');
}


function createResponsiveBasketSection() {
    let sum = 0;

    for (let i = 0; i < basket.length; i++) {
        basket[i]['price'] = parseFloat(basket[i]['price']).toFixed(2);
        sum += basket[i]['counter'] * basket[i]['price'];
    }
    let finalSum = sum + 1;
    sum = parseFloat(Math.round(sum * 100) / 100).toFixed(2)
    finalSum = parseFloat(Math.round(finalSum * 100) / 100).toFixed(2)
    document.getElementById("responsive-basket-section").innerHTML = ` 
        
                    <button onclick="openBasketFullscreen()"><!-- Button -->
                            <div class="button-content"><!-- Container fuer Bild und Text -->
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="white"><path d="M4.559 7l4.701-4.702c.198-.198.459-.298.72-.298.613 0 1.02.505 1.02 1.029 0 .25-.092.504-.299.711l-3.26 3.26h-2.882zm12 0h2.883l-4.702-4.702c-.198-.198-.459-.298-.72-.298-.613 0-1.02.505-1.02 1.029 0 .25.092.504.299.711l3.26 3.26zm3.703 4l-.016.041-3.598 8.959h-9.296l-3.597-8.961-.016-.039h16.523zm3.738-2h-24v2h.643c.535 0 1.021.304 1.256.784l4.101 10.216h12l4.102-10.214c.234-.481.722-.786 1.256-.786h.642v-2zm-14 5c0-.552-.447-1-1-1s-1 .448-1 1v3c0 .552.447 1 1 1s1-.448 1-1v-3zm3 0c0-.552-.447-1-1-1s-1 .448-1 1v3c0 .552.447 1 1 1s1-.448 1-1v-3zm3 0c0-.552-.447-1-1-1s-1 .448-1 1v3c0 .552.447 1 1 1s1-.448 1-1v-3z"/></svg>
                              <span>Warenkorb</span><div> (${finalSum}) €</div></div>
                    </button> 
               
            `;
}




function openBasketFullscreen() {
    document.getElementById("dialog").classList.remove('d-none');
    /* hideEmptyBasket(); */
    document.getElementById("dialog").innerHTML = `
    <div id="basket-fullscreen" class="dialog">
    <div class="basket-close">
    <a href="##" onclick="closeFullscreen()"><img src="img/close.png" alt=""></a>
    
    </div>
   
    
    <span class="text-align-center">
        <h2>Warenkorb</h2>
    </span>
    <div id="default-basket" class="empty-basket">
        <img src="img/bag.png" alt="">
        <h2>Fülle deinen Warenkorb</h2>
        Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.
    </div>
    <div id="basket-dishes"></div>
    <div id="basket-prices"></div>
</div>
`;

hideEmptyBasket();
    let sum = 0;
    for (let i = 0; i < basket.length; i++) {
        basket[i]['price'] = parseFloat(basket[i]['price']).toFixed(2);
        sum += basket[i]['counter'] * basket[i]['price'];
        document.getElementById("basket-dishes").innerHTML += `
            <div class="basket-dish">
                <div class="basket-value-name">
                    <div>${basket[i]['counter']}</div>  
                    <div>${basket[i]['name']}</div> 
                </div>
                <div class="basket-dishes-price">
                    <span>${basket[i]['price']} €</span> 
                </div>
            </div>  
            <div class="basket-plus-minus-buttons">
                    <a href="##" onclick="removeFromBasket(${i});">
                        <img src="img/minus.png" class="plus-basket">
                    </a>
                    <a href="##" onclick="increaseValue(${i});">
                        <img src="img/plus.png" class="plus-basket">
                    </a>
            </div>
            `;
    }

    let finalSum = sum + 1;
    sum = parseFloat(Math.round(sum * 100) / 100).toFixed(2)
    finalSum = parseFloat(Math.round(finalSum * 100) / 100).toFixed(2)
    document.getElementById("basket-prices").innerHTML = ` 
        <div class="space-between">
            <div>Zwischensumme</div>
            <div>${sum} €</div>
        </div>
        <div class="space-between">
            <div>Lieferkosten</div>
            <div>1€</div>
        </div>
        <div class="space-between">
            <div>Gesamt</div>
            <div>${finalSum} €</div>
        </div>
            `;
}

function closeFullscreen() {
    document.getElementById("dialog").classList.add('d-none');
}

