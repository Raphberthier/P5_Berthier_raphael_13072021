const items = document.getElementById('items');
const productName = document.getElementById ('productName');
const productDescription = document.getElementById ('productDescription');
let products; 

//API REQUEST
const fetchProducts = async() => {
    products = await fetch (
    'http://localhost:3000/api/products').then(res => res.json());
    console.log(products);
};      

//FONT-END
const showProducts = async() => {
    await fetchProducts();

    items.innerHTML = (
        products.map(produit => (
            `
            <a href="./product.html?id=${produit._id}">
            <article>
              <img src="${produit.imageUrl}" alt="${produit.altTxt}">
              <h3 class="productName">${produit.name}</h3>
              <p class="productDescription">${produit.description}</p>
            </article>
            `
        )).join('')
    );
};
showProducts();















