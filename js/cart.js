// 장바구니 아이템 예시 데이터
let cartItems = [
    {
        id: 1,
        name: '아메리카노',
        price: 4500,
        quantity: 1,
        image: 'images/americano.jpg'
    }
];

// 장바구니 아이템 렌더링
function renderCartItems() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-price">${item.price.toLocaleString()}원</div>
                <div class="item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
        `;
        cartContainer.appendChild(itemElement);
    });

    updateCartSummary();
}

// 수량 업데이트
function updateQuantity(itemId, change) {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
        item.quantity = Math.max(1, item.quantity + change);
        renderCartItems();
    }
}

// 장바구니 요약 정보 업데이트
function updateCartSummary() {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = subtotal > 0 ? 3000 : 0;
    const total = subtotal + deliveryFee;

    document.getElementById('subtotal').textContent = `${subtotal.toLocaleString()}원`;
    document.getElementById('delivery-fee').textContent = `${deliveryFee.toLocaleString()}원`;
    document.getElementById('total').textContent = `${total.toLocaleString()}원`;
}

// 결제하기 버튼 이벤트
document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (cartItems.length === 0) {
        alert('장바구니가 비어있습니다.');
        return;
    }
    // 여기에 결제 로직 추가
    alert('결제 페이지로 이동합니다.');
});

// 초기 렌더링
renderCartItems(); 