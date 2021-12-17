
    let arrayProducts = JSON.parse(localStorage.getItem('cart'));
    console.log(arrayProducts);
    for(product of arrayProducts){
        fetch('http://localhost:3000/api/products/' + product.id )
        .then(res => res.json())
        .then(data => {
            console.log(data)
            displayCart(data, parseInt(product.quantity), product.colors )
        })
    }
    getTotals();
    
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
                  //deleteProduct()
              }
             
function getTotals(){

    // Recovery of total quantities
    var elemsQtt = document.getElementsByClassName('itemQuantity');
    var myLength = elemsQtt.length,
    totalQtt = 0;

    for (var i = 0; i < myLength; ++i) {
        totalQtt += elemsQtt[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQtt;
    console.log(totalQtt);

    // Recovery of total price
    totalPrice = 0;

    for (var i = 0; i < myLength; ++i) {
        totalPrice += (elemsQtt[i].valueAsNumber * arrayProducts[i].price);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(totalPrice);
    console.log(totalPrice);
}


function modifyQuantity() {
   let initValue = JSON.parse(localStorage['cart']);
    for (let i = 0; i < initValue.length; i++){
        if(product.colors === initValue[i].colors && product.name === initValue[i].name){
              let quantity = document.querySelectorAll(".itemQuantity");
        for (let i = 0 ; i < quantity.length; i++){
            let modifValue = quantity[i].value;
                initValue[i].quantity = modifValue;
        }
        localStorage.setItem("cart", JSON.stringify(initValue));
      
   console.log(initValue);
       
    }}
   
   
  // location.reload();
}     
     
      



// delete product

function deleteProduct() {
    let btn_supprimer = document.querySelectorAll(".deleteItem");

    for (let i = 0; i < btn_supprimer.length; i++){
        btn_supprimer[i].addEventListener("click" , (event) => {
            event.preventDefault();

            //Selection de l'element à supprimer en fonction de son id ET sa couleur
            let idDelete = arrayProducts[i].id;
            let colorDelete = arrayProducts[i].colors;

           arrayProducts = arrayProducts.filter( el => el.id !== idDelete || el.colors !== colorDelete );
            
            localStorage.setItem("cart", JSON.stringify(arrayProducts));

            //Alerte produit supprimé et refresh
            alert("Ce produit a bien été supprimé du panier");
            location.reload();
        })
    }
}
deleteProduct();//

function getForm() {
    // Ajout des Regex
    let form = document.querySelector(".cart__order__form");

    //Création des expressions régulières
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp("^[-a-zA-Z0-9àâäéèêëïîôöùûüç]+$");

    // Ecoute de la modification 
    form.firstName.addEventListener('change', function() {
        validFirstName(this);
    });

    
    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });

    
    form.address.addEventListener('change', function() {
        validAddress(this);
    });

    
    form.city.addEventListener('change', function() {
        validCity(this);
    });

    
    form.email.addEventListener('change', function() {
        validEmail(this);
    });

    //validation 
    const validFirstName = function(inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (charRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';//modif 
        }
    };

    
    const validLastName = function(inputLastName) {
        let lastNameErrorMsg = inputLastName.nextElementSibling;

        if (charRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
        } else {
            lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    
    const validAddress = function(inputAddress) {
        let addressErrorMsg = inputAddress.nextElementSibling;

        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
        } else {
            addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    
    const validCity = function(inputCity) {
        let cityErrorMsg = inputCity.nextElementSibling;

        if (charRegExp.test(inputCity.value)) {
            cityErrorMsg.innerHTML = '';
        } else {
            cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };

    
    const validEmail = function(inputEmail) {
        let emailErrorMsg = inputEmail.nextElementSibling;

        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
        } else {
            emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
        }
    };
    }
getForm();

   //Envoi des informations client 
   const submit = document.querySelector('.cart__order__form');

   submit.addEventListener('submit', (e) => {
    e.preventDefault()
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
    
})

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
