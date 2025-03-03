// Admin Login
let isAdminLoggedIn = false;

function adminLogin() {
    const password = document.getElementById('admin-password').value;
    // In real application, use proper authentication
    if(password === 'admin123') {
        isAdminLoggedIn = true;
        document.getElementById('admin-login').style.display = 'none';
        document.getElementById('product-management').style.display = 'block';
        loadProductsForAdmin();
    } else {
        alert('Invalid password!');
    }
}

// Add Product
async function addProduct() {
    if(!isAdminLoggedIn) return alert('Please login first!');

    const product = {
        name: document.getElementById('product-name').value,
        description: document.getElementById('product-desc').value,
        price: parseFloat(document.getElementById('product-price').value),
        imageUrl: document.getElementById('product-image').value,
        category: document.getElementById('product-category').value
    };

    try {
        const response = await fetch('http://localhost:8080/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product)
        });

        if(response.ok) {
            alert('Product added successfully!');
            loadProductsForAdmin();
            loadProductsForCustomers(); // Refresh customer view
        }
    } catch(error) {
        console.error('Error:', error);
    }
}

// Load Products for Admin
async function loadProductsForAdmin() {
    try {
        const response = await fetch('http://localhost:8080/api/products');
        const products = await response.json();
        
        const productsHTML = products.map(product => `
            <div class="admin-product">
                <img src="${product.imageUrl}" alt="${product.name}">
                <h4>${product.name} (₹${product.price})</h4>
                <p>${product.description}</p>
                <button onclick="editProduct('${product.id}')">Edit</button>
                <button onclick="deleteProduct('${product.id}')">Delete</button>
            </div>
        `).join('');

        document.getElementById('admin-products').innerHTML = productsHTML;
    } catch(error) {
        console.error('Error:', error);
    }
}

// Delete Product
async function deleteProduct(productId) {
    if(!isAdminLoggedIn) return alert('Please login first!');
    
    try {
        const response = await fetch(`http://localhost:8080/api/products/${productId}`, {
            method: 'DELETE'
        });

        if(response.ok) {
            alert('Product deleted successfully!');
            loadProductsForAdmin();
            loadProductsForCustomers();
        }
    } catch(error) {
        console.error('Error:', error);
    }
}