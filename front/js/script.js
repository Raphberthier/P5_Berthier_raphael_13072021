const items = document.getElementById('items');
const productName = document.getElementById ('productName');
const productDescription = document.getElementById ('productDescription');

//API REQUEST
fetch ('http://localhost:3000/api/products')
    .then(res => res.json())
    .then(function(products){
        //FONT-END
        for ( product of products){
            let element = displayElement(product);
            items.appendChild(element);
        }
    

    })
//create elements Html
 function displayElement(product){
     const link = document.createElement('a');
     link.setAttribute('href', `./product.html?id=${product._id}`);

     const article = document.createElement('article');

     const image = document.createElement('img');
     image.setAttribute('src', product.imageUrl);
     image.setAttribute('alt', product.altTxt);

     const title = document.createElement('h3');
     title.classList.add('productName');
     title.textContent = product.name;

     const p = document.createElement('p');
     p.classList.add('productDescription');
     p.textContent = product.description;

     
     //-----------------

    article.appendChild(image);
    article.appendChild(title);
    article.appendChild(p);

    link.appendChild(article);
        return link 


     
 }
















