document.addEventListener('DOMContentLoaded', () => {
    // 장바구니 아이콘 업데이트
    function updateCartCount() {
        try {
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
            const cartCount = document.querySelector('.cart-count');
            
            if (cartCount) {
                cartCount.textContent = totalItems;
                cartCount.style.display = totalItems > 0 ? 'inline' : 'none';
            }
        } catch (error) {
            console.error('장바구니 수량 업데이트 중 오류 발생:', error);
        }
    }

    // 현재 활성화된 메뉴 표시
    function setActiveMenu() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath || (currentPath === '/' && href === '/')) {
                link.classList.add('active');
            }
        });
    }

    // 초기화
    updateCartCount();
    setActiveMenu();
}); 