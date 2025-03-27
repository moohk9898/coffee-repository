// 장바구니 아이템 표시
function displayCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>장바구니가 비어있습니다.</p>
            </div>
        `;
        updateTotalAmount();
        return;
    }
    
    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-details">
                    <span class="item-temp">${item.temperature}</span>
                    <span class="item-price">${item.price.toLocaleString()}원</span>
                </div>
            </div>
            <div class="item-quantity">
                <button class="quantity-btn minus" onclick="updateQuantity(${index}, -1)">
                    <i class="fas fa-minus"></i>
                </button>
                <span class="quantity-num">${item.quantity}</span>
                <button class="quantity-btn plus" onclick="updateQuantity(${index}, 1)">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <button class="delete-btn" onclick="removeItem(${index})">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    `).join('');
    
    updateTotalAmount();
}

// 수량 업데이트
function updateQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart[index]) {
        const newQuantity = cart[index].quantity + change;
        if (newQuantity >= 1 && newQuantity <= 10) {
            cart[index].quantity = newQuantity;
            cart[index].totalPrice = cart[index].price * newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCartItems();
            updateCartIcon();
        }
    }
}

// 아이템 삭제
function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartIcon();
}

// 총 금액 업데이트
function updateTotalAmount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('totalAmount').textContent = totalAmount.toLocaleString() + '원';
}

// 장바구니 아이콘 업데이트
function updateCartIcon() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartBadge = document.querySelector('.cart-badge');
    
    if (cartBadge) {
        cartBadge.textContent = totalItems;
        cartBadge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

// 주문하기 버튼 클릭
document.getElementById('orderButton').addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('장바구니가 비어있습니다.');
        return;
    }
    alert('주문이 완료되었습니다.');
    localStorage.removeItem('cart');
    displayCartItems();
    updateCartIcon();
});

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
    updateCartIcon();
}); 