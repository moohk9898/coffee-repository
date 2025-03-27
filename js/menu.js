// 카테고리 탭 전환 기능
document.querySelectorAll('.category-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // 모든 탭 비활성화
        document.querySelectorAll('.category-tab').forEach(t => {
            t.classList.remove('active');
        });
        
        // 클릭한 탭 활성화
        tab.classList.add('active');
        
        // 모든 메뉴 섹션 숨기기
        document.querySelectorAll('.menu-section').forEach(section => {
            section.style.display = 'none';
        });
        
        // 선택한 카테고리의 메뉴 섹션 표시
        const category = tab.dataset.category;
        document.getElementById(category).style.display = 'block';
    });
});

// 장바구니 담기 기능
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const menuItem = e.target.closest('.menu-item');
        const itemName = menuItem.querySelector('h3').textContent;
        const itemPrice = menuItem.querySelector('.price').textContent;
        
        // 장바구니에 아이템 추가
        addToCart({
            name: itemName,
            price: parseInt(itemPrice.replace(/[^0-9]/g, '')),
            quantity: 1
        });
        
        // 알림 표시
        alert(`${itemName}이(가) 장바구니에 추가되었습니다.`);
    });
});

// 장바구니 관리 함수
function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // 이미 장바구니에 있는 상품인지 확인
    const existingItem = cart.find(i => i.name === item.name);
    
    if (existingItem) {
        existingItem.quantity += item.quantity;
    } else {
        cart.push(item);
    }
    
    // 장바구니 데이터 저장
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // 장바구니 아이콘 업데이트 (옵션)
    updateCartIcon();
}

// 장바구니 아이콘 업데이트
function updateCartIcon() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // 장바구니 아이콘에 수량 표시 (향후 구현)
} 