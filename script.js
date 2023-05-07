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
    'name': 'Spinaci',
    'description': 'mit Spinat und Knoblauch',
    'choice': 'Wahl aus: Klein, Ø 24cm, Normal, Ø 29cm oder Familia, Ø 40cm',
    'price': '8.50',
},
{
    'name': 'Diabolo',
    'description': 'mit Salami und Peperoni',
    'choice': 'Wahl aus: Klein, Ø 24cm, Normal, Ø 29cm oder Familia, Ø 40cm',
    'price': '8.80',
}];


function show() {
    document.getElementById('main').innerHTML += '';
    for (let i = 0; i < foods.length; i++) {
        const food = foods[i];
        document.getElementById('main').innerHTML += createShowHTML(i);
    }
}


function createShowHTML(i) {
    const food = foods[i];
    const name = food['name'];
    const price = food['price'];
    return /*html*/`
        <div class="card" onclick="addToBasekt('${name}', ${price});">
            <div class = "card_content">
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


function addToBasekt(name, price) {
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


function updateShoppingBasket() {
    document.getElementById("basket-dishes").innerHTML = '';
    if (basket.length < 1) {
        document.getElementById("basket-prices").innerHTML = '';
        showEmptyBasket();
    } else {
        hideEmptyBasket();
        let sum = 0;
        for (let i = 0; i < basket.length; i++) {
            basket[i]['price'] = parseFloat(basket[i]['price']).toFixed(2);
            sum += basket[i]['counter'] * basket[i]['price'];
            document.getElementById("basket-dishes").innerHTML += `
                <div class="basket_dish">
                    <div class="basket_value_name">
                        <div>${basket[i]['counter']}</div>  
                        <div>${basket[i]['name']}</div> 
                    </div>
                    <div class="basket_dishes_price">
                        <span>${basket[i]['price']} €</span> 
                    </div>
                </div>  
                <div class="basket_plus_minus_buttons">
                        <a href="##" onclick="removeFromBasket(${i});">
                            <img src="img/minus.png" class="plus_basket">
                        </a>
                        <a href="##" onclick="increaseValue(${i});">
                            <img src="img/plus.png" class="plus_basket">
                        </a>
                </div>
            `;
        }
        let finalSum = sum + 1;
        sum = parseFloat(Math.round(sum * 100) / 100).toFixed(2)
        finalSum = parseFloat(Math.round(finalSum * 100) / 100).toFixed(2)
        document.getElementById("basket-prices").innerHTML = ` 
        <div class="space_between">
            <div>Zwischensumme</div>
            <div>${sum} €</div>
        </div>
        <div class="space_between">
            <div>Lieferkosten</div>
            <div>1€</div>
        </div>
        <div class="space_between">
            <div>Gesamt</div>
            <div>${finalSum} €</div>
        </div>
            `;
    }
}


function showEmptyBasket() {
    document.getElementById("default_basket").classList.remove('d-none');
}


function hideEmptyBasket() {
    document.getElementById("default_basket").classList.add('d-none');
}
