const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors');
const quantity = document.getElementById('quantity');
const addToCart = document.getElementById('addToCart');
const imgProduit = document.querySelector('item__img');
let products;

//API REQUEST------------------------------------------------------
const fetchProducts = async() => {
    products = await fetch (
    'http://localhost:3000/api/products').then(res => res.json());
    
};
fetchProducts();

//recuperation de l'id dans l'url----------------------------------

let str = document.location;
let url = new URL(str);
let id = url.searchParams.get("id");

//recuperation du produit avec l'id dans l'url---------------------

let ipProduit = 'http://localhost:3000/api/products/' + id;
const idProduit = async() => {
    products = await fetch (ipProduit)
        .then(res => res.json());
    console.log(products);    
};
idProduit();

//Affichage des infos du produit------------------------------------

const showProductsInfo = async() => {
    await idProduit();
        title.innerText = products.name;
        price.innerText = products.price;
        description.innerText = products.description;
        
};
showProductsInfo();


  
    


