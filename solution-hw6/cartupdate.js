class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;

        this.element = null;
    }
}

//create a set to hold the added rolls
const cart = new Set();
let checkOutPrice = 0;

function addNewRoll(rollType, rollGlazing, packSize, basePrice){
    const rollCart = new Roll(rollType, rollGlazing, packSize, basePrice);
    cart.add(rollCart);
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

    const totalPrice = document.querySelector("#total-price");
    totalPrice.innerText = "$ " + calculatePrice(rollCart);
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
    imageElement.src = "products/" + rollCart.type + "-cinnamon-roll.jpg";
    notePriceElement.innerHTML = "$ " + calculatePrice(rollCart);
}

//add the 4 new rolls as required
const notecardOne = addNewRoll(
    "Original",
    "Glazing: Sugar Milk",
    "Pack Size: 1",
    2.49,
    "product/original-cinnamon-roll.jpg"
);
const notecardTwo = addNewRoll(
   "Walnut",
   "Glazing: Vanilla Milk",
   "Pack Size: 12",
   3.49,
   "product/walnut-cinnamon-roll.jpg"
);
const notecardThree = addNewRoll(
   "Raisin",
   "Glazing: Sugar Milk",
   "Pack Size: 3",
   2.99,
   "product/raisin-cinnamon-roll.jpg"
);
const notecardFour = addNewRoll(
   "Apple",
   "Glazing: Original",
   "Pack Size: 3",
   3.49,
   "product/apple-cinnamon-roll.jpg"
);

//remove cart element
function deleteCard(rollCart){
    rollCart.element.remove();
    cart.delete(rollCart);
}

//call addElement function
for (const rollCart of cart){
    addElement(rollCart);
}