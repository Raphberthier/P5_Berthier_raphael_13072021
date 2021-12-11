let orderId = document.getElementById('orderId');



    const query = window.location.search;
    const urlParam = new URLSearchParams(query);
    const id = urlParam.get("orderId");
    orderId.textContent = id ;

   
    