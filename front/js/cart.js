
    let arrayProducts = JSON.parse(localStorage.getItem('cart'));
    console.log(arrayProducts);
    for(product of arrayProducts){
        callProduct(product);
        
    }
    function callProduct(product){
        fetch('http://localhost:3000/api/products/' + product.id )
        .then(res => res.json())
        .then(data => {
            console.log(data)
            displayCart(data, parseInt(product.quantity), product.colors );
            getTotals(data.price, parseInt(product.quantity));
           
        })
    }
    

           function displayCart(product, quantity, color){
                
            //Create cart html whitch createElement

              
                  let productArticle = document.createElement("article");
                  document.querySelector("#cart__items").appendChild(productArticle);
                  productArticle.setAttribute('class', 'cart__item');
                  productArticle.setAttribute('data-id', product._id );
              
                  let productDivImg = document.createElement("div");
                  productArticle.appendChild(productDivImg);
                  productDivImg.className = "cart__item__img";
              
                  let productImg = document.createElement("img");
                  productDivImg.appendChild(productImg);
                  productImg.src = product.imageUrl;
                  productImg.alt = product.altTxt;
              
                  let productItemContent = document.createElement("div");
                  productArticle.appendChild(productItemContent);
                  productItemContent.className = "cart__item__content";
              
                 let productItemContentTitlePrice = document.createElement("div");
                  productItemContent.appendChild(productItemContentTitlePrice);
                  productItemContentTitlePrice.className = "cart__item__content__titlePrice";
                
                  let productTitle = document.createElement("h2");
                  productItemContentTitlePrice.appendChild(productTitle);
                  productTitle.innerHTML = product.name;
              
                  let productColor = document.createElement("p");
                  productTitle.appendChild(productColor);
                  productColor.innerHTML = color;
                  
                  let productPrice = document.createElement("p");
                  productItemContentTitlePrice.appendChild(productPrice);
                  productPrice.innerHTML = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(product.price * quantity) ;
              
                  let productItemContentSettings = document.createElement("div");
                  productItemContent.appendChild(productItemContentSettings);
                  productItemContentSettings.className = "cart__item__content__settings";
              
                  let productItemContentSettingsQuantity = document.createElement("div");
                  productItemContentSettings.appendChild(productItemContentSettingsQuantity);
                  productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
                  
                  let productQte = document.createElement("p");
                  productItemContentSettingsQuantity.appendChild(productQte);
                  productQte.innerHTML = "Qté : ";
              
                  let productQuantity = document.createElement("input");
                  productItemContentSettingsQuantity.appendChild(productQuantity);
                  productQuantity.value = quantity;
                  productQuantity.className = "itemQuantity";
                  productQuantity.setAttribute("type", "number");
                  productQuantity.setAttribute("min", "1");
                  productQuantity.setAttribute("max", "100");
                  productQuantity.setAttribute("name", "itemQuantity");
                  productQuantity.addEventListener('change', (event) => {
                      event.preventDefault();
                      modifyQuantity();
                  })
              
                  let productItemContentSettingsDelete = document.createElement("div");
                  productItemContentSettings.appendChild(productItemContentSettingsDelete);
                  productItemContentSettingsDelete.className = "cart__item__content__settings__delete";
              
                  let productSupprimer = document.createElement("p");
                  productItemContentSettingsDelete.appendChild(productSupprimer);
                  productSupprimer.className = "deleteItem";
                  productSupprimer.innerHTML = "Supprimer";
                  productSupprimer.addEventListener("click", deleteProduct);
                  
              }
             
function getTotals(priceProduct, quantityProduct){
    let productTotalPrice = document.getElementById('totalPrice');
    console.log(productTotalPrice.innerHTML);
    let totalPrice = parseInt(productTotalPrice.innerHTML) + (priceProduct * quantityProduct) + ' €';
    productTotalPrice.innerHTML = totalPrice;
    
    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML =  parseInt(productTotalQuantity.innerHTML) + quantityProduct ;
 
}

function modifyQuantity() {
   const initValue = JSON.parse(localStorage['cart']);
    for (let i = 0; i < initValue.length; i++){
        if( arrayProducts[i].colors === initValue[i].colors && arrayProducts[i].name === initValue[i].name){
              let quantity = document.querySelectorAll(".itemQuantity");
        for (let i = 0 ; i < quantity.length; i++){
            initValue[i].quantity = quantity[i].value;
                 
        }
        localStorage.setItem("cart", JSON.stringify(initValue));
      
   console.log(initValue);
       
    }}
   location.reload();
}     

function deleteProduct(e) {
    //Selection de l'element à supprimer en fonction de son id ET sa couleur
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
        const produit = e.target.closest(".cart__item");
        const idToDelete = produit.dataset.id;
        const colorToDelete = produit.dataset.color;
    
        const basket = JSON.parse(localStorage.getItem("cart"));
    
        const indexToDelete = basket.findIndex(
          (article) => article.id === idToDelete && article.color === colorToDelete
        );
    
        //On supprime l'élément
        basket.splice(indexToDelete, 1);
    
        localStorage.removeItem("cart");
        localStorage.setItem("cart", JSON.stringify(basket));
    
        const articlesContainer = document.getElementById("cart__items");
        articlesContainer.removeChild(produit);
        location.reload();
    }}
 

function getForm() {
    // Ajout des Regex
    const form = document.querySelector(".cart__order__form");

    //Création des expressions régulières
    const emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    const charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    const addressRegExp = new RegExp("^[-a-zA-Z 0-9àâäéèêëïîôöùûüç]+$");

    form.firstName.addEventListener('change', function () {
        checkFirstName(this);
      });
    
      const checkFirstName = function (inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;
    
        if (charRegExp.test(inputFirstName.value)) {
          firstNameErrorMsg.innerHTML = 'champ validé';
          return true;
        } else {
          firstNameErrorMsg.innerHTML = 'Veuillez renseigner votre prénom!';
          return false;
        }
      };
    
      form.lastName.addEventListener('change', function () {
        checkLastName(this);
      });
    
      const checkLastName = function (inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;
    
        if (charRegExp.test(inputLastName.value)) {
          lastNameErrorMsg.innerHTML = 'champ validé';
          return true
        } else {
          lastNameErrorMsg.innerHTML = 'Veuillez renseigner votre nom de famille!';
          return false
        }
    
      };
    
      form.address.addEventListener('change', function () {
        checkAddress(this);
      });
    
      const checkAddress = function (inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;
    
        if (addressRegExp.test(inputAddress.value)) {
          addressErrorMsg.innerHTML = 'champ validé';
          return true
        } else {
          addressErrorMsg.innerHTML = 'Veuillez renseigner votre adresse!';
          return false
        }
      };
    
      form.city.addEventListener('change', function () {
        checkCity(this);
      });
    
      const checkCity = function (inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;
    
        if (charRegExp.test(inputCity.value)) {
          cityErrorMsg.innerHTML = 'champ validé';
          return true
        } else {
          cityErrorMsg.innerHTML = 'Veuillez renseigner votre ville!';
          return false
        }
      };
    
      form.email.addEventListener('change', function () {
        checkEmail(this);
      });
    
      const checkEmail = function (inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;
    
        if (emailRegExp.test(inputEmail.value)) {
          emailErrorMsg.innerHTML = 'champ validé';
          return true
        } else {
          emailErrorMsg.innerHTML = 'Veuillez renseigner votre e-mail!';
          return false
        }
      };
    

   //Envoi des informations client 
   const submit = document.querySelector('.cart__order__form');

   submit.addEventListener('submit', (e) => {
    e.preventDefault()
    if (checkFirstName(form.firstName) && checkLastName(form.lastName) && checkAddress(form.address) && checkCity(form.city) && checkEmail(form.email)) {
     let first = document.getElementById('firstName');
     let last = document.getElementById('lastName');
     let address = document.getElementById('address');
     let city = document.getElementById('city');
     let email = document.getElementById('email');
     let products = [];
     let array = JSON.parse(localStorage.getItem('cart'));
     for(let i = 0; i < array.length; i++){
         
       products.push( array[i].id)
        
         console.log(products)
     }

     let contact = {
        firstName: first.value,
        lastName: last.value,
        email: email.value,
        address: address.value,
        city: city.value
    }

    let formResult = {
        contact: contact,
        products: products
    }
    

    order(formResult)
    
}})}
getForm();

function order(formResult){
    fetch('http://localhost:3000/api/products/order', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
      },
    body: JSON.stringify(formResult)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)

      orderId = data.orderId;
    
     location.replace(`confirmation.html?orderId=${orderId}`)
})
}
