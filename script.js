// ================= ORDER SYSTEM =================

let cart = [];


// ================= FOOD DETAILS =================

const foods = [
    {
        name: "Regular Shawarma",
        price: 79
    },
    {
        name: "Spicy Shawarma",
        price: 89
    },
    {
        name: "Spicy Plate Shawarma",
        price: 129
    },
    {
        name: "Chicken Lolipop",
        price: 99
    },
    {
        name: "Boneless Chicken 65",
        price: 89
    },
    {
        name: "Boneless Chicken Biriyani",
        price: 109
    },
    {
        name: "Leg Piece Biriyani",
        price: 99
    },
    {
        name: "Egg Chicken Biriyani",
        price: 99
    }
];


// ================= ADD BUTTON =================

const addButtons = document.querySelectorAll(".add-btn");

addButtons.forEach((button, index) => {

    button.addEventListener("click", function () {

        addToCart(index);

    });

});


// ================= ADD TO CART =================

function addToCart(index) {

    const food = foods[index];

    const existingItem = cart.find(
        item => item.name === food.name
    );

    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({
            name: food.name,
            price: food.price,
            quantity: 1
        });

    }

    updateCart();

}


// ================= UPDATE CART =================

function updateCart() {

    const cartBox =
        document.querySelector(".cart-box");

    const emptyCart =
        document.querySelector(".empty-cart");

    const cartTotal =
        document.querySelector(".cart-total strong");


    // Remove old cart items

    document.querySelectorAll(".cart-item").forEach(item => {
        item.remove();
    });


    // Empty cart

    if (cart.length === 0) {

        emptyCart.style.display = "block";

        cartTotal.textContent = "₹ 0";

        return;

    }


    emptyCart.style.display = "none";


    let total = 0;


    // Create cart items

    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;


        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div>

                <div class="cart-item-name">
                    ${item.name}
                </div>

                <small>
                    ₹ ${item.price} × ${item.quantity}
                </small>

            </div>


            <div>

                <span class="cart-item-price">
                    ₹ ${itemTotal}
                </span>


                <button
                    onclick="decreaseQuantity(${index})"
                    style="
                        margin-left:10px;
                        background:#333;
                        color:white;
                        border:none;
                        padding:6px 9px;
                        cursor:pointer;
                    "
                >
                    −
                </button>


                <span
                    style="
                        margin:0 8px;
                        font-weight:bold;
                    "
                >
                    ${item.quantity}
                </span>


                <button
                    onclick="increaseQuantity(${index})"
                    style="
                        background:#ff6a00;
                        color:white;
                        border:none;
                        padding:6px 9px;
                        cursor:pointer;
                    "
                >
                    +
                </button>


                <button
                    onclick="removeFromCart(${index})"
                    style="
                        margin-left:8px;
                        background:#333;
                        color:white;
                        border:none;
                        padding:6px 10px;
                        cursor:pointer;
                    "
                >
                    REMOVE
                </button>

            </div>

        `;


        cartBox.insertBefore(
            cartItem,
            document.querySelector(".cart-total")
        );

    });


    // Update total

    cartTotal.textContent =
        "₹ " + total;

}


// ================= INCREASE QUANTITY =================

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();

}


// ================= DECREASE QUANTITY =================

function decreaseQuantity(index) {

    cart[index].quantity--;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    updateCart();

}


// ================= REMOVE ITEM =================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


// ================= PLACE ORDER =================

const placeOrderButton =
    document.querySelector(".place-order-btn");


placeOrderButton.addEventListener(
    "click",
    function () {

        if (cart.length === 0) {

            alert(
                "Please add at least one food item."
            );

            return;

        }


        // WhatsApp number

        const phoneNumber =
            "918760884209";


        // Message

        let message =
            "🔥 V2 SMOKE HOUSE - ORDER\n\n";


        let total = 0;


        cart.forEach((item, index) => {

            const itemTotal =
                item.price * item.quantity;

            total += itemTotal;


            message +=
                `${index + 1}. ${item.name}\n` +
                `Qty: ${item.quantity}\n` +
                `Price: ₹${item.price}\n` +
                `Subtotal: ₹${itemTotal}\n\n`;

        });


        message +=
            `TOTAL: ₹${total}\n\n` +
            `Thank you for ordering from V2 Smoke House!`;


        // WhatsApp URL

        const whatsappURL =
            "https://wa.me/" +
            phoneNumber +
            "?text=" +
            encodeURIComponent(message);


        // Open WhatsApp

        window.open(
            whatsappURL,
            "_blank"
        );

    }
);


// ================= CONTACT BUTTON =================

// Contact button direct WhatsApp

const contactButtons =
    document.querySelectorAll(".contact-buttons a");


if (contactButtons.length >= 2) {

    contactButtons[1].href =
        "https://wa.me/918760884209";

    contactButtons[1].target =
        "_blank";

}