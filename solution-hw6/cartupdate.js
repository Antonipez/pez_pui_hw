class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;

        this.element = null;
    }
}

//retrieve data from storage
let rollData = JSON.parse(localStorage.getItem('storedRolls'));
let rollSet = new Set([...rollData]);


function addNewRoll(rollType, rollGlazing, packSize, basePrice){
    const rollCart = new Roll(rollType, rollGlazing, packSize, basePrice);
    rollSet.add(rollCart);
}


//calculate price when change
const glazeOptions = {
    "Glazing: Original": 0,
    "Glazing: Sugar Milk": 0,
    "Glazing: Vanilla Milk": 0.50,
    "Glazing: Double Chocolate": 1.50
}
const sizeOptions = {
    "Pack Size: 1": 1,
    "Pack Size: 3": 3,
    "Pack Size: 6": 5,
    "Pack Size: 12": 10
}

function calculatePrice(rollCart){
    const sum = ((rollCart.basePrice + glazeOptions[rollCart.glazing]) * sizeOptions[rollCart.size]).toFixed(2);
    return sum;
}


// update the checkout price in the cart
function updateCheckOutPrice() {
    let checkOutPrice = 0;
    for (const rollCart of rollSet) {
        checkOutPrice = checkOutPrice + calculatePrice(rollCart);
    }
    const totalPrice = document.querySelector("#total-price");
    totalPrice.innerText = "$ " + checkOutPrice;
}

//clone the roll info into template
function addElement(rollCart){
    let template = document.querySelector(".notecard-template");
    const clone = template.content.cloneNode(true);
    rollCart.element = clone.querySelector(".notecard-cart");
  
    const btnDelete = rollCart.element.querySelector(".remove");
    btnDelete.addEventListener("click", () =>{
        deleteCard(rollCart);
    });

    const cartItems = document.querySelector(".notecard-list")
    cartItems.prepend(rollCart.element);

    updateElement(rollCart);
}


//update the template with the actual content
function updateElement(rollCart){

    let noteRollTypeElement = rollCart.element.querySelector("#note-rolltype");
    let noteGlazingElement = rollCart.element.querySelector("#note-glazing");
    let notePackSizeElement = rollCart.element.querySelector("#note-packsize");
    let notePriceElement = rollCart.element.querySelector(".price");
    let imageElement = rollCart.element.querySelector(".notecard-cart-image");
  
    noteRollTypeElement.innerHTML = rollCart.type + " Cinnamon Roll";
    noteGlazingElement.innerHTML = rollCart.glazing;
    notePackSizeElement.innerHTML = rollCart.size;
    notePriceElement.innerHTML = "$ " + calculatePrice(rollCart);
    imageElement.src = "products/" + rollCart.type + "-cinnamon-roll.jpg";

    //update total checkout price in cart
    updateCheckOutPrice();
}


//remove cart element
function deleteCard(rollCart){
    rollCart.element.remove();
    rollSet.delete(rollCart);
    
    localStorage.setItem("storedRolls", JSON.stringify(Array.from(rollSet)));
    updateTotalPrice();
}

//call addElement function
for (const rollCart of rollSet){
    addElement(rollCart);
}