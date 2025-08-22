


$(document).ready(function(){
    // console.log("div click text");

    $('#cart1').click(function(){  
        // alert('Div clicked!');
        updateCartModal();
        showCartModal();
     });

     $('#pbtnxy').click(function(){
        alert('Div clicked!');
              $(`#cart-modal`).hide();
           });

         $('#log').click(function(){
            alert('Div clicked!');
            // $(`#cart-modal`).hide();
        $('.hero').show();
         })  
    

})

// Cart System
// let cart = [];
// let cartCount = 0;
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = cart.length;

// Cart Modal
const cartModal = document.createElement('div');
cartModal.id = 'cart-modal';
document.body.appendChild(cartModal);

// Add to Cart Function
function addToCart(productName, price, image) {
    cart.push({
        name: productName,
        price: price,
        image: image
    });
    
    cartCount++;
    updateCartCounter();
    updateCartModal();
    showCartModal();
    // Add to localStorage whenever cart updates
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log ("itome is ", JSON.stringify(cart));
}

// Update Cart Counter
function updateCartCounter() {
    const counter = document.getElementById('cart-counter');
    if(counter) {
        counter.textContent = cartCount;
    }
}

// Show Cart Modal
function showCartModal() {
    cartModal.style.display = 'block';
    setTimeout(() => {
        cartModal.style.display = 'none';   
    }, 200000);
}

// Update Cart Modal Content
function updateCartModal() {
    let count=0;
    cartModal.innerHTML = `
        <h3 id="pbtnxy">Cart (${cartCount})</h3>
        <div class="pmnvt2m" > 
        <h1 id="xmtClose2"> 
        <button  id="xmuut" onclick="canbtn();">btn</button>
                </h1> 
        </div>

        ${cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h4>${item.name}</h4>fr1
                    <p>₹${item.price}</p>
                </div>
                <button onclick="cancelOrder(${count++});">CancelOrder</button>
            </div>
        `).join('')}
        
        <button onclick="checkout()">Proceed to Checkout</button>
    `;
}

// Checkout Function
async function checkout() {
    alert('Checkout functionality coming soon!');

    // Here you would typically redirect to a checkout page
    const customerName = prompt("Enter your name:");
    const mobile = prompt("Enter your Mobile:");
    // const email = prompt("Enter your email:");
    const address = prompt("Enter delivery address:");

    if (!customerName || !mobile || !address) {
        alert('All fields are required!');
        return;
    }

     const orderData = {
        customerName: customerName,
        mobile: mobile,
        address: address,
        email: email,
        totalAmount: cart.reduce((sum, item) => sum + parseFloat(item.price), 0),
        items: cart.map(item => ({
            productName: item.name,
            price: parseFloat(item.price),
            quantity: 1 // You can add quantity functionality
        }))
    };

    try {
        const response = await fetch('http://localhost:8086/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });

        const result = await response.json();
        if (response.ok) {
            alert(`Order placed successfully! Order ID: ${result.orderId}`);
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCounter();
            updateCartModal();
        } else {
            alert(`Error: ${result.error}`);
        }
    } catch (error) {
        alert('Failed to connect to server');
    }
}

// Initialize Cart Counter
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.navbar');
    const cartCounter = document.createElement('div');
    cartCounter.id = 'cart-counter';
    cartCounter.textContent = '0';
    nav.appendChild(cartCounter);
});

// Update all Add to Cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.parentElement;
        const productName = productCard.querySelector('h3').textContent;
        const price = productCard.querySelector('.price').textContent.replace('₹', '');
        const image = productCard.querySelector('img').src;
        
        addToCart(productName, price, image);
    });
});


// Modify the cart initialization

let cancelOrder=(id)=>{
    // cart = [];
    delete cart[id];
    cart.sort();
    cart.pop();
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartModal();
} 

// Add to localStorage whenever cart updates
// function addToCart() {
//     // ... existing code ...
    
// }