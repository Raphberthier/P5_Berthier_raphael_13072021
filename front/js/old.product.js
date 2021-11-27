const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors');
const quantity = document.getElementById('quantity');
const addToCart = document.getElementById('addToCart');
const imgProduit = document.getElementsByClassName('item__img');
const section = document.getElementsByClassName('item');

//recuperation de l'id dans l'url----------------------------------

let str = document.location;
let url = new URL(str);
let id = url.searchParams.get("id");

//---------

fetch ('http://localhost:3000/api/products/' + id)
.then(res => res.json())
.then(function(product) {
    
        let element = displayElement(product);
        items.appendChild(element);
    
});


function displayElement(product){

    const image = document.createElement('img');
    image.setAttribute('src', product.imageUrl);
    image.setAttribute('alt', product.altTxt);
    imgProduit.appendChild(image);

    title.textContent = product.name;
    price.textContent = product.price;
    description.textContent = product.description;
};
displayElement();

