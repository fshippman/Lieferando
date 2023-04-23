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
    'price': '7.99',
},
{
    'name': 'Pizza balbla',
    'description': 'mit Käse und Tomatensauce',
    'choice': 'Wahl aus: Klein, Ø 24cm, Normal, Ø 29cm oder Familia, Ø 40cm',
    'price': '7.99',
},
{
    'name': 'Pizza Margherita',
    'description': 'mit Käse und Tomatensauce',
    'choice': 'Wahl aus: Klein, Ø 24cm, Normal, Ø 29cm oder Familia, Ø 40cm',
    'price': '7.99',
},
{
    'name': 'Pizza Margherita',
    'description': 'mit Käse und Tomatensauce',
    'choice': 'Wahl aus: Klein, Ø 24cm, Normal, Ø 29cm oder Familia, Ø 40cm',
    'price': '7.99',
},
{
    'name': 'Pizza Margherita',
    'description': 'mit Käse und Tomatensauce',
    'choice': 'Wahl aus: Klein, Ø 24cm, Normal, Ø 29cm oder Familia, Ø 40cm',
    'price': '7.99',
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
    <div class="card">
        <h3>${name}</h3>
        <div>${food['description']}</div>
        <div>${food['choice']}</div>
        <span>${price}</span>
       <button onclick="addToBasekt('${name}', ${price});">test</button>
    </div>
    `;
}


//--------------------------------BASKET--------------------------------



function addComment(index) {
    let comment = getId(`textarea${index}`);
    if (formIsValid(index)) {
        posts[index]['comments'].push(comment.value);
        comment.value = '';
        renderComments(index);
    } else {
        openDialog();
    }
}




/* let names = [];
let prices = [];
let counter = []; */

let basket = [{
    'counter': [],
    'names': [],
    'price': []
}];

function addToBasekt(name, price) {
    basket[0]['names'].push(name);
    basket[0]['price'].push(price);

    /* names.push(name);
    prices.push(price); */
    document.getElementById("basket-dishes").innerHTML += ` ${basket[0]['names']} ${basket[0]['price']}<br>`;
    hideEmptyBasket()
    updateShoppingBasket();
}


function updateShoppingBasket() {

    let sum = 0;
    for (let i = 0; i < prices.length; i++) {
        sum += prices[i];
    }
    let finalSum = sum + 1;

    document.getElementById("basket-prices").innerHTML = ` Sum ${sum} <br> Final sum ${finalSum}`;
}

function hideEmptyBasket() {
    document.getElementById("basket").classList.add('d-none');
}
