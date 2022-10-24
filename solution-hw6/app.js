class Roll {
  constructor(rollType, rollGlazing, packSize, basePrice) {
      this.type = rollType;
      this.glazing = rollGlazing;
      this.size = packSize;
      this.basePrice = basePrice;
  }
}

// store glazing dropdown menu content
let allGlazing = [
  {
    type: "Keep original",
    price: 0.00,
  },
  {
    type: "Sugar milk",
    price: 0.00,
  },
  {
    type: "Vanilla milk",
    price: 0.50,
  },
  {
    type: "Double chocolate",
    price: 1.50,
  }
];

// store pack size dropdown menu content
let allPackSize = [
  {
    pack: "1",
    number: 1
  },
  {
    pack: "3",
    number: 3
  },
  {
    pack: "6",
    number: 5
  },
  {
    pack: "12",
    number: 10
  }
]

// Create the glazing dropdown menu
let selectGlazing = document.querySelector("#glazing-options");
for (let i=0; i<allGlazing.length; i++){
  let glazeType = allGlazing[i];
  let dropdownOption = document.createElement("option");
  dropdownOption.text = glazeType.type;
  dropdownOption.value = glazeType.price;
  selectGlazing.appendChild(dropdownOption);
}

// Create the pack size dropdown menu
let selectPackSize = document.querySelector("#pack-size");
for (let i=0; i<allPackSize.length; i++){
  let packSizeType = allPackSize[i];
  let dropdownOption = document.createElement("option");
  dropdownOption.text = packSizeType.pack;
  dropdownOption.value = packSizeType.number;
  selectPackSize.appendChild(dropdownOption);
}


const cart = [];

//save rolls to local storage
let rollData = localStorage.getItem("storedRolls");
// if (rollData) cart = Array.from(JSON.parse(rollData));


// update the detail page links
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const chosenRolls = params.get('rolls');
const basePrice = rolls[chosenRolls].basePrice;


// update the final total price
function updatePrice(){
  let checkOutPrice = (parseFloat(basePrice) + parseFloat(selectGlazing.value)) * selectPackSize.value;
  document.querySelector(".checkout-price").innerHTML = "$ " + checkOutPrice.toFixed(2);
}

// change glazing event
let glazingOption = document.querySelector('#glazing-options');
glazingOption.addEventListener('change', updatePrice);

// change pack size event
let packOption = document.querySelector('#pack-size');
packOption.addEventListener('change', updatePrice)


// Update the header text
const headerElement = document.querySelector(".headline");
headerElement.innerText = chosenRolls + " Cinnamon Roll";

// Update the image
const rollImage = document.querySelector(".infoimage");
rollImage.src = "./products/" + rolls[chosenRolls].imageFile;
rollImage.alt = chosenRolls + " Cinnamon Roll";

// Update the price
const priceElement = document.querySelector(".checkout-price");
priceElement.innerText = "$" + rolls[chosenRolls].basePrice;


//add to cart action
function addToCart() {
    const rollGlazing = selectGlazing.options[selectGlazing.selectedIndex].text;
    const packSize = selectPackSize.options[selectPackSize.selectedIndex].text;
    const addedRoll = new Roll(chosenRolls, rollGlazing, packSize, basePrice);
    cart.push(addedRoll);
    
    saveToLocalStorage();
}

function saveToLocalStorage(){
  const rollArrayString = JSON.stringify(cart);
  localStorage.setItem("storedRolls", rollArrayString);
}