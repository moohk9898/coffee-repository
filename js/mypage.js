// 장바구니 배지 업데이트
function updateCartBadge() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const badge = document.querySelector('.cart-badge');
    if (cartItems.length > 0) {
        badge.style.display = 'flex';
        badge.textContent = cartItems.length;
    } else {
        badge.style.display = 'none';
    }
}

// 페이지 로드 시 장바구니 배지 업데이트
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();

    // 포인트 내역 버튼 클릭 이벤트
    const pointsHistoryBtn = document.querySelector('.points-history-btn');
    pointsHistoryBtn.addEventListener('click', () => {
        alert('포인트 내역 기능은 준비 중입니다.');
    });

    // 메뉴 아이템 클릭 이벤트
    const menuItems = document.querySelectorAll('.menu-section .menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const menuText = item.querySelector('span:last-child').textContent;
            alert(`${menuText} 기능은 준비 중입니다.`);
        });
    });
}); 