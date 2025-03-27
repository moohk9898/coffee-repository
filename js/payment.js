// 주문 정보 표시
function displayOrderItems() {
    const orderItems = document.getElementById('orderItems');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    orderItems.innerHTML = cart.map(item => `
        <div class="order-item">
            <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-details">
                    <span class="item-temp">${item.temperature}</span>
                    <span class="item-quantity">수량: ${item.quantity}개</span>
                    <span class="item-price">${(item.price * item.quantity).toLocaleString()}원</span>
                </div>
            </div>
        </div>
    `).join('');

    updateAmounts();
}

// 금액 업데이트
function updateAmounts() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const couponDiscount = parseInt(localStorage.getItem('couponDiscount')) || 0;
    const pointDiscount = parseInt(localStorage.getItem('pointDiscount')) || 0;
    const finalAmount = orderAmount - couponDiscount - pointDiscount;

    document.getElementById('orderAmount').textContent = orderAmount.toLocaleString() + '원';
    document.getElementById('couponDiscount').textContent = '-' + couponDiscount.toLocaleString() + '원';
    document.getElementById('pointDiscount').textContent = '-' + pointDiscount.toLocaleString() + '원';
    document.getElementById('finalAmount').textContent = finalAmount.toLocaleString() + '원';
    document.getElementById('totalAmount').textContent = orderAmount.toLocaleString() + '원';
}

// 쿠폰 적용
document.getElementById('applyCoupon').addEventListener('click', () => {
    const couponCode = document.getElementById('couponCode').value;
    
    // 임시 쿠폰 코드 (실제로는 서버에서 검증해야 함)
    const coupons = {
        'WELCOME': 2000,
        'FIRST': 3000,
        'SPECIAL': 5000
    };

    if (coupons[couponCode]) {
        localStorage.setItem('couponDiscount', coupons[couponCode]);
        alert('쿠폰이 적용되었습니다.');
        updateAmounts();
    } else {
        alert('유효하지 않은 쿠폰 코드입니다.');
    }
});

// 포인트 적용
document.getElementById('applyPoint').addEventListener('click', () => {
    const pointAmount = parseInt(document.getElementById('pointAmount').value) || 0;
    const availablePoints = parseInt(document.getElementById('availablePoints').textContent.replace(/[^0-9]/g, ''));
    
    if (pointAmount > availablePoints) {
        alert('사용 가능한 포인트를 초과했습니다.');
        return;
    }

    if (pointAmount < 0) {
        alert('올바른 포인트 금액을 입력해주세요.');
        return;
    }

    localStorage.setItem('pointDiscount', pointAmount);
    alert('포인트가 적용되었습니다.');
    updateAmounts();
});

// 결제하기
document.getElementById('paymentButton').addEventListener('click', () => {
    const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
    const finalAmount = parseInt(document.getElementById('finalAmount').textContent.replace(/[^0-9]/g, ''));
    
    // 결제 수단별 처리 (실제로는 각 결제 시스템과 연동 필요)
    switch(selectedPayment) {
        case 'card':
            alert('카드 결제가 완료되었습니다.');
            break;
        case 'kakao':
            alert('카카오페이 결제가 완료되었습니다.');
            break;
        case 'naver':
            alert('네이버페이 결제가 완료되었습니다.');
            break;
    }

    // 결제 완료 후 장바구니 비우기
    localStorage.removeItem('cart');
    localStorage.removeItem('couponDiscount');
    localStorage.removeItem('pointDiscount');
    
    // 홈으로 이동
    window.location.href = 'index.html';
});

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

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    displayOrderItems();
    updateCartIcon();
}); 