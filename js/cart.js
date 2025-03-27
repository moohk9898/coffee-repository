document.addEventListener('DOMContentLoaded', function() {
    // DOM 요소
    const cartItemsContainer = document.querySelector('.cart-items');
    const subtotalElement = document.querySelector('.subtotal');
    const totalAmountElement = document.querySelector('.total-amount');
    const orderButton = document.querySelector('.order-button');
    const pointInput = document.querySelector('.point-input');
    const paymentMethods = document.querySelectorAll('.payment-method');

    // 상수
    const DELIVERY_FEE = 3000;

    // 장바구니 아이템 렌더링
    function renderCartItems() {
        if (!cartItemsContainer) return;

        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = '';
        let subtotal = 0;

        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">장바구니가 비어있습니다.</p>';
            if (subtotalElement) subtotalElement.textContent = '0원';
            if (totalAmountElement) totalAmountElement.textContent = '0원';
            return;
        }

        cartItems.forEach((item, index) => {
            const price = Number(item.price);
            const quantity = Number(item.quantity);
            const itemTotal = price * quantity;
            subtotal += itemTotal;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <div class="item-price">${price.toLocaleString()}원</div>
                </div>
                <div class="item-quantity">
                    <button class="quantity-btn minus" data-index="${index}">-</button>
                    <span>${quantity}</span>
                    <button class="quantity-btn plus" data-index="${index}">+</button>
                </div>
                <div class="item-total">
                    ${itemTotal.toLocaleString()}원
                </div>
                <button class="remove-item" data-index="${index}">×</button>
            `;
            
            cartItemsContainer.appendChild(itemElement);
        });

        if (subtotalElement) {
            subtotalElement.textContent = subtotal.toLocaleString() + '원';
        }

        const total = subtotal + (subtotal > 0 ? DELIVERY_FEE : 0);
        if (totalAmountElement) {
            totalAmountElement.textContent = total.toLocaleString() + '원';
        }
    }

    // 장바구니 뱃지 업데이트
    function updateCartBadge() {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const totalQuantity = cartItems.reduce((sum, item) => sum + Number(item.quantity), 0);
        const badges = document.querySelectorAll('.cart-badge');
        
        badges.forEach(badge => {
            if (totalQuantity > 0) {
                badge.textContent = totalQuantity;
                badge.style.display = 'flex';
            } else {
                badge.style.display = 'none';
            }
        });
    }

    // 수량 업데이트
    function updateQuantity(index, change) {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const item = cartItems[index];
        const newQuantity = Number(item.quantity) + change;

        if (newQuantity >= 1 && newQuantity <= 10) {
            item.quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cartItems));
            renderCartItems();
            updateCartBadge();
        }
    }

    // 아이템 삭제
    function removeItem(index) {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        cartItems.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        renderCartItems();
        updateCartBadge();
    }

    // 이벤트 리스너 설정
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', function(e) {
            const target = e.target;
            if (!target.dataset.index) return;
            
            const index = parseInt(target.dataset.index);
            
            if (target.classList.contains('quantity-btn')) {
                const change = target.classList.contains('plus') ? 1 : -1;
                updateQuantity(index, change);
            } else if (target.classList.contains('remove-item')) {
                removeItem(index);
            }
        });
    }

    // 포인트 입력 처리
    if (pointInput) {
        pointInput.addEventListener('input', (e) => {
            const points = parseInt(e.target.value) || 0;
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            const subtotal = cartItems.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);
            const total = subtotal + (subtotal > 0 ? DELIVERY_FEE : 0);
            
            if (points > 2000) {
                alert('사용 가능한 포인트를 초과했습니다.');
                e.target.value = 2000;
                return;
            }

            const finalAmount = total - points;
            if (totalAmountElement) {
                totalAmountElement.textContent = finalAmount.toLocaleString() + '원';
            }
        });
    }

    // 결제 수단 선택
    paymentMethods.forEach(method => {
        method.addEventListener('click', () => {
            paymentMethods.forEach(m => m.classList.remove('active'));
            method.classList.add('active');
        });
    });

    // 주문하기 버튼 클릭 이벤트
    if (orderButton) {
        orderButton.addEventListener('click', function() {
            const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            if (cartItems.length === 0) {
                alert('장바구니가 비어있습니다.');
                return;
            }

            const selectedPayment = document.querySelector('.payment-method.active');
            if (!selectedPayment) {
                alert('결제 수단을 선택해주세요.');
                return;
            }
            
            // 주문 처리 로직
            alert('주문이 완료되었습니다.');
            localStorage.setItem('cart', JSON.stringify([]));
            renderCartItems();
            updateCartBadge();
            window.location.href = 'index.html';
        });
    }

    // 초기 렌더링
    renderCartItems();
    updateCartBadge();
}); 