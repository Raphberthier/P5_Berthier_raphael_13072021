let itemImg = document.querySelector('.item__img');

let priceItem = document.getElementById('price');
let descriptionItem = document.getElementById('description');
let select = document.getElementById('colors');
let qty = document.getElementById('quantity')
let add = document.getElementById('addToCart')

let product = {};


    let productId = getPageId();
    fetchProduct(productId);

//Recover id product in url

function getPageId(){
    const query = window.location.search;
    const urlParam = new URLSearchParams(query);
    const id = urlParam.get("id");
    return id
}

//Request api of id product

async function fetchProduct(id){
    fetch('http://localhost:3000/api/products/' + id)
        .then(res => res.json())
        .then(data => {
            product = data;
            console.log(data)
            display(data)
        })
}

//Show product

function display(data){
    let title = document.getElementById('title');
 //   let name = data.name;
    let price = data.price;
    let imageUrl = data.imageUrl;
    let colors = data.colors;
    let description = data.description;
    let altTxt = data.altTxt;
    console.log(imageUrl)

    title.innerHTML = name;
    priceItem.innerHTML = price.toString();
    descriptionItem.innerHTML = description;

    for(let i in colors){
        const arr = document.createElement('option');
        arr.textContent = colors[i];
        select.appendChild(arr)
    }
    const image = document.createElement('img');
    image.setAttribute('src', data.imageUrl);
    image.setAttribute('alt', data.altTxt);
    itemImg.appendChild(image);
    
}

//Save Item in localStorage

add.addEventListener('click', () => {
    let list = [];
    let local = localStorage.getItem('cart');
    let dataQty = document.getElementById('quantity');
    let dataColor = document.getElementById('colors');
    
//create object of item

    let productList = {
        imageUrl: product.imageUrl,
        name: product.name,
        id: product._id,
        price: product.price,
        colors: dataColor.value,
        altTxt: product.altTxt,
        quantity: dataQty.value
    }

    if(localStorage.getItem('cart') && localStorage.getItem('cart').length > 0) {
        const local = JSON.parse(localStorage.getItem('cart')); 
        const data = local.findIndex(data => data.id=== productList.id && data.colors === productList.colors);
        if(data === -1){
            local.push(productList);
            localStorage.setItem('cart', JSON.stringify(local))
        } else {
            local[data].quantity = parseInt(productList.quantity)
            localStorage.setItem('cart', JSON.stringify(local))
        } 
    } else {
        local = [];
        local.push(productList);
        localStorage.setItem('cart', JSON.stringify(local));
       
    }

    alert ('Produit ajouter au panier')

})

