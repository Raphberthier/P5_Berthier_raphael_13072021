

const submit = document.querySelector('.cart__order__form');

let firstErr = document.getElementById('firstNameErrorMsg');
let lastErr = document.getElementById('lastNameErrorMsg');
let addressErr = document.getElementById('addressErrorMsg');
let cityErr = document.getElementById('cityErrorMsg');
let emailErr = document.getElementById('emailErrorMsg');

let orderId;


    showCart()
    total()

//show item in basket
function showCart(){
    let cartItems = document.getElementById('cart__items');
    let arrayProducts = JSON.parse(localStorage.getItem('cart')); // 
    
    console.log(arrayProducts)
    
    if(arrayProducts){ 
        
      for(let i = 0; i < arrayProducts.length; i++){  // Parcours le tableau 
          fetch('http://localhost:3000/api/products' + arrayProducts[i].id)
          .then(res => res.json())
        .then(data => {
            product = data;
            console.log(data);

          let price = arrayProducts[i].price;
            let qty = arrayProducts[i].quantity;
            let total = price * qty;
            let totalItems = total.toString(); 
            
            function getCart(){
              // Insertion de l'élément "article"
                  let productArticle = document.createElement("article");
                  document.querySelector("#cart__items").appendChild(productArticle);
                  productArticle.setAttribute('class', 'cart__item');
                  productArticle.setAttribute('data-id', arrayProducts[i].id);
              
                  // Insertion de l'élément "div"
                  let productDivImg = document.createElement("div");
                  productArticle.appendChild(productDivImg);
                  productDivImg.className = "cart__item__img";
              
                  // Insertion de l'image
                  let productImg = document.createElement("img");
                  productDivImg.appendChild(productImg);
                  productImg.src = arrayProducts[i].imageUrl;
                  productImg.alt = arrayProducts[i].altTxt;
                  
                  // Insertion de l'élément "div"
                  let productItemContent = document.createElement("div");
                  productArticle.appendChild(productItemContent);
                  productItemContent.className = "cart__item__content";
              
                  // Insertion de l'élément "div"
                  let productItemContentTitlePrice = document.createElement("div");
                  productItemContent.appendChild(productItemContentTitlePrice);
                  productItemContentTitlePrice.className = "cart__item__content__titlePrice";
                  
                  // Insertion du titre h3
                  let productTitle = document.createElement("h2");
                  productItemContentTitlePrice.appendChild(productTitle);
                  productTitle.innerHTML = arrayProducts[i].name;
              
                  // Insertion de la couleur
                  let productColor = document.createElement("p");
                  productTitle.appendChild(productColor);
                  productColor.innerHTML = arrayProducts[i].colors;
                  
              
                  // Insertion du prix
                  let productPrice = document.createElement("p");
                  productItemContentTitlePrice.appendChild(productPrice);
                  productPrice.innerHTML = arrayProducts[i].price + " €";
              
                  // Insertion de l'élément "div"
                  let productItemContentSettings = document.createElement("div");
                  productItemContent.appendChild(productItemContentSettings);
                  productItemContentSettings.className = "cart__item__content__settings";
              
                  // Insertion de l'élément "div"
                  let productItemContentSettingsQuantity = document.createElement("div");
                  productItemContentSettings.appendChild(productItemContentSettingsQuantity);
                  productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
                  
                  // Insertion de "Qté : "
                  let productQte = document.createElement("p");
                  productItemContentSettingsQuantity.appendChild(productQte);
                  productQte.innerHTML = "Qté : ";
              
                  // Insertion de la quantité
                  let productQuantity = document.createElement("input");
                  productItemContentSettingsQuantity.appendChild(productQuantity);
                  productQuantity.value = arrayProducts[i].quantity;
                  productQuantity.className = "itemQuantity";
                  productQuantity.setAttribute("type", "number");
                  productQuantity.setAttribute("min", "1");
                  productQuantity.setAttribute("max", "100");
                  productQuantity.setAttribute("name", "itemQuantity");
              
                  // Insertion de l'élément "div"
                  let productItemContentSettingsDelete = document.createElement("div");
                  productItemContentSettings.appendChild(productItemContentSettingsDelete);
                  productItemContentSettingsDelete.className = "cart__item__content__settings__delete";
              
                  // Insertion de "p" supprimer
                  let productSupprimer = document.createElement("p");
                  productItemContentSettingsDelete.appendChild(productSupprimer);
                  productSupprimer.className = "deleteItem";
                  productSupprimer.innerHTML = "Supprimer";
              }
              
              getCart();
            
            

//change quantitys item in basket

function changeQty(input, product){
  let array = JSON.parse(localStorage.getItem('cart'));
  qty = parseInt(product);
  localStorage.setItem('cart', JSON.stringify(array))
  location.reload()
  
};


// calcul total basket

function total(){
    let array = JSON.parse(localStorage.getItem('cart'));  //Recuperation de l'objet de l'item dans le localstorage
    let totalPrice = document.getElementById('totalPrice');
    let totalCart = 0;
    if(array){
        for(let i = 0; i < array.length; i++){
        let priceItems = array[i].price;
        let priceNum = parseInt(priceItems);
        let amount = priceNum * array[i].quantity;
        totalCart += amount
    }
}

    if(totalPrice){
        totalPrice.innerHTML = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(totalCart);// permet de mettre une virgule tout les 3 chiffres au montant total 
      //  sessionStorage.setItem('Total', JSON.stringify(totalCart));

    }
}
// delete item in basket
function deleteItem(product){
  let array = JSON.parse(localStorage.getItem('cart'));
  array.splice(product, 1);
  localStorage.setItem('cart', JSON.stringify(array))
  location.reload()
  
}

//Add to basket

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
        products.push(array[i].id)
        console.log(products)
    }
    function getForm() {
      // Ajout des Regex
      let form = document.querySelector(".cart__order__form");
  
      //Création des expressions régulières
      let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
      let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
      let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
  
      // Ecoute de la modification du prénom
      form.firstName.addEventListener('change', function() {
          validFirstName(this);
      });
  
      // Ecoute de la modification du prénom
      form.lastName.addEventListener('change', function() {
          validLastName(this);
      });
  
      // Ecoute de la modification du prénom
      form.address.addEventListener('change', function() {
          validAddress(this);
      });
  
      // Ecoute de la modification du prénom
      form.city.addEventListener('change', function() {
          validCity(this);
      });
  
      // Ecoute de la modification du prénom
      form.email.addEventListener('change', function() {
          validEmail(this);
      });
  
      //validation du prénom
      const validFirstName = function(inputFirstName) {
          let firstNameErrorMsg = inputFirstName.nextElementSibling;
  
          if (charRegExp.test(inputFirstName.value)) {
              firstNameErrorMsg.innerHTML = '';
          } else {
              firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
          }
      };
  
      //validation du nom
      const validLastName = function(inputLastName) {
          let lastNameErrorMsg = inputLastName.nextElementSibling;
  
          if (charRegExp.test(inputLastName.value)) {
              lastNameErrorMsg.innerHTML = '';
          } else {
              lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
          }
      };
  
      //validation de l'adresse
      const validAddress = function(inputAddress) {
          let addressErrorMsg = inputAddress.nextElementSibling;
  
          if (addressRegExp.test(inputAddress.value)) {
              addressErrorMsg.innerHTML = '';
          } else {
              addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
          }
      };
  
      //validation de la ville
      const validCity = function(inputCity) {
          let cityErrorMsg = inputCity.nextElementSibling;
  
          if (charRegExp.test(inputCity.value)) {
              cityErrorMsg.innerHTML = '';
          } else {
              cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
          }
      };
  
      //validation de l'email
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
  
    let contact = {
      firstName: first.value,
      lastName: last.value,
      email: email.value,
      address: address.value,
      city: city.value
  }



    let data = {
        contact: contact,
        products: products
    }

    order(data)
    
})

function order(data){
  fetch('http://localhost:3000/api/products/order', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
      },
    body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)

      orderId = data.orderId;
    
      location.replace(`confirmation.html?orderId=${orderId}`)
      
    })





  }})}}}
