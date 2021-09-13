const cards = document.querySelectorAll(".card");
const search_input = document.querySelector("header").children[1];
const search_button = document.querySelector("header").children[2];
const card_parent = document.querySelector(".cardParent");
let total = document.querySelector("#total");
let pTotal = document.querySelector("#pTotal");
let check_out_buton = document.querySelector("#check_out_buton");
let end = document.querySelector("#end");
let end_buton = document.querySelector(".end_buton");
let myTab = document.querySelector("#myTab");

search_input.addEventListener("change", filterCards);

search_button.addEventListener("click", filterCards);

    function filterCards() {
        if (search_input.value.length > 0) {
            cards.forEach(card => {
                if (card.children[0].innerHTML === search_input.value) {
                    card_parent.appendChild(card);
                }         
                else if (card.children[0].innerHTML !== search_input.value) {
                    card_parent.removeChild(card);
                    // search_input.value ="";
                }

                // else if (search_input.value === "") {
                //     card_parent.appendChild(card);
                // }
            
            }) 
            search_input.value ="";
        } 
    }
    // REMEMBER YOU CAN USE ARRAY.FILTER!!!


addCount = () => {
    cartCounter.innerText = parseInt(cartCounter.innerText) + 1;
}

lessCount = () => {
    cartCounter.innerText = parseInt(cartCounter.innerText) - 1;
}

countDisplay = () => {
    if (cartCounter.innerText !== '0' ) {
        cartCounter.classList.remove("noneCount");
        cartCounter.classList.add("counting");
    } 
    else if (cartCounter.innerText === '0') {
        cartCounter.classList.remove("counting");
        cartCounter.classList.add("noneCount");
    }
} 

endFunc = () => {
    if (confirm(`Confirm Check out?`) === true) {
        setTimeout (() => {
            end.classList.remove("end_process");
            end.classList.add("show_process");
            return myTab.classList.add("end_process");
        }, 1000);
    }
    
    else {
        return myTab;
    }
}

check_out_buton.addEventListener("click", function () {
    endFunc();
})

end_buton.addEventListener("click", function () {
    window.location.href = 'index_dom.html';
})

displayTotal = () => {
    let subTotal = document.querySelector("#subTotal");
    
    if (subTotal !== null) {

        total.classList.remove("hideTotal");
        total.classList.add("showTotal");

        pTotal.classList.remove("hideTotal");
        pTotal.classList.add("showTotal");

        check_out_buton.classList.remove("none_cart_buton");
        check_out_buton.classList.add("cart_buton");

    }
    else if (subTotal === null) {

        total.classList.remove("showTotal");
        total.classList.add("hideTotal");

        pTotal.classList.remove("showTotal");
        pTotal.classList.add("hideTotal");

        check_out_buton.classList.remove("cart_buton");
        check_out_buton.classList.add("none_cart_buton");

    }
}

cards.forEach(card => {
    let add_cart_button = card.children[6];
    let remove_cart_button = card.children[7];
    let favorite_pin = card.children[1];
    let unfavorite_pin = card.children[2];
    const cartItems = document.querySelector("#cartItems");

    // THIS IS THE STARTING POINT FOR CART BUTTONS!!!!!!!!!!
    let newTableRow = document.createElement("tr");
    newTableRow.id = "table_row";

    let newTableData = document.createElement("td");
    newTableData.classList.add("tableClass");
    let img = document.createElement("img");
    img.src = card.children[3].src;
    img.classList.add("imgModal");
    let newPnode = document.createElement("p");
    newPnode.innerText = card.children[0].innerText;

    let newTableDataInput = document.createElement("td");
    newTableDataInput.classList.add("tableClass");

    let newInput = document.createElement("input");
    newInput.type = "number";
    newInput.value = "1";
    newInput.classList.add("modalInput");
    newInput.id = "Quant";

    let newTableDataPrice = document.createElement("td");
    newTableDataPrice.id = "Price";
    newTableDataPrice.value = card.children[8].getAttribute("price");
    let newTDPrice = document.createTextNode(card.children[8].getAttribute("price"));

    let newTableDataSubtotal = document.createElement("td");
    newTableDataSubtotal.id = "subTotal";
    let newTableDataNodeSubtotal = document.createTextNode(card.children[8].getAttribute("price"));

    newTableData.appendChild(img);
    newTableData.appendChild(newPnode);

    newTableDataInput.appendChild(newInput);

    newTableDataPrice.appendChild(newTDPrice);

    newTableDataSubtotal.appendChild(newTableDataNodeSubtotal);

    newTableRow.appendChild(newTableData);
    newTableRow.appendChild(newTableDataInput);
    newTableRow.appendChild(newTableDataPrice);
    newTableRow.appendChild(newTableDataSubtotal);
    
    add_cart_button.addEventListener("click", () => {
        add_cart_button.classList.add("noner");
        add_cart_button.classList.remove("buton");
        remove_cart_button.classList.add("done");
        remove_cart_button.classList.remove("noner");
        
        addCount();

        countDisplay();

        cartItems.appendChild(newTableRow);

        displayTotal();

        addTotalFunc();
    })

    remove_cart_button.addEventListener("click", () => {
        remove_cart_button.classList.add("noner");
        remove_cart_button.classList.remove("done");
        add_cart_button.classList.add("buton");
        add_cart_button.classList.remove("noner");

        lessCount();

        countDisplay();

        cartItems.removeChild(newTableRow);

        displayTotal();

        addTotalFunc();
    })

    function addTotalFunc () {
        const table_rows = document.querySelectorAll("#table_row");
        const subTotals = document.querySelectorAll("#subTotal");
        table_rows.forEach(table_row => {
            let subTotal = table_row.children[3];
            let price = parseInt(table_row.children[2].innerText); 
            let quant = parseInt(table_row.children[1].children[0].value); 
            let initPrice = price * quant; 
            subTotal.innerText = initPrice;
            let totally = 0;
            subTotals.forEach(subTotal => {
                totally -= subTotal.innerText * -1;
                return total.innerHTML = totally;
            })
        })
    }

    newTableDataInput.addEventListener("change", addTotalFunc);
    // THIS IS THE ENDING POINT FOR CART BUTTONS!!!!!!!!!!

    // // THIS IS THE STARTING POINT FOR FAVOURITE BUTTONS!!!!!!!!!!
    const ul = document.querySelector(".favBar");
    let li = document.createElement("li");
    let favNode = document.createTextNode(card.children[0].innerText);
    let favImage = document.createElement("img");
    favImage.src = card.children[3].src;
    favImage.classList.add("apimg");
    li.appendChild(favImage);
    li.appendChild(favNode);

    favorite_pin.addEventListener("click", () => {
        favorite_pin.classList.add("none");
        favorite_pin.classList.remove("favStar");
        unfavorite_pin.classList.remove("none");
        unfavorite_pin.classList.add("favStar");

        ul.appendChild(li);
    })

    unfavorite_pin.addEventListener("click", () => {
        unfavorite_pin.classList.add("none");
        unfavorite_pin.classList.remove("favStar");
        favorite_pin.classList.remove("none");
        favorite_pin.classList.add("favStar");

        ul.removeChild(li);
    })
})
