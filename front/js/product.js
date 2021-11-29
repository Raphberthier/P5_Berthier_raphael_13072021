const title = document.getElementById('title');
const price = document.getElementById('price');
const description = document.getElementById('description');
const colors = document.getElementById('colors');
const quantity = document.getElementById('quantity');
const addToCart = document.getElementById('addToCart');
const imageProduit = document.getElementById('item__img');
const section = document.getElementsByClassName('item');

let products;



//recuperation de l'id dans l'url----------------------------------

let str = document.location;
let url = new URL(str);
let id = url.searchParams.get("id");

//recuperation du produit avec l'id dans l'url---------------------

let ipProduit = 'http://localhost:3000/api/products/' + id;

fetch(ipProduit)
    .then(res => res.json())
    .then(function(product){
            let element = displayElement(product);
         
        
    });

//Affichage des infos du produit------------------------------------

const displayElement = (product) => {
   
    title.textContent = product.name;
    price.textContent = product.price;
    description.textContent = product.description;
    
    const image = document.createElement('img');
        image.setAttribute('src', product.imageUrl);
        image.setAttribute('alt', product.altTxt);
        imageProduit.appendChild(image);
         
    
        let optionValue = product.colors;
            optionValue.forEach(function(color) {
              const option = document.createElement('option');
              option.setAttribute('value', color);
              option.textContent = color;
              colors.appendChild(option);  
            });
        
    
        
       
       
       
         
        console.log(optionValue);
        console.log(product);
};


  //------------------
  
 



  
    


