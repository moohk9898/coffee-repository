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

// 모달 관련 요소
const modal = document.getElementById('optionModal');
const modalTitle = modal.querySelector('.selected-item-name');
const tempOptions = modal.querySelectorAll('.temp-option');
const quantityBtns = modal.querySelectorAll('.quantity-btn');
const quantitySpan = modal.querySelector('.quantity');
const priceValue = modal.querySelector('.price-value');
const closeBtn = modal.querySelector('.close-modal');
const cancelBtn = modal.querySelector('.cancel-btn');
const addToCartBtn = modal.querySelector('.add-to-cart-btn');

let currentItem = null;
let currentTemp = null;
let currentQuantity = 1;

// 옵션 선택 버튼 클릭
document.querySelectorAll('.select-option').forEach(button => {
    button.addEventListener('click', () => {
        currentItem = {
            name: button.dataset.item,
            price: parseInt(button.dataset.price)
        };
        
        // 모달 초기화
        modalTitle.textContent = currentItem.name;
        tempOptions.forEach(opt => opt.classList.remove('selected'));
        currentTemp = null;
        currentQuantity = 1;
        quantitySpan.textContent = '1';
        updateTotalPrice();
        
        // 모달 표시
        modal.classList.add('show');
    });
});

// 온도 옵션 선택
tempOptions.forEach(option => {
    option.addEventListener('click', () => {
        tempOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        currentTemp = option.dataset.temp;
    });
});

// 수량 조절
quantityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('minus') && currentQuantity > 1) {
            currentQuantity--;
        } else if (btn.classList.contains('plus') && currentQuantity < 10) {
            currentQuantity++;
        }
        quantitySpan.textContent = currentQuantity;
        updateTotalPrice();
    });
});

// 총 금액 업데이트
function updateTotalPrice() {
    if (currentItem) {
        const total = currentItem.price * currentQuantity;
        priceValue.textContent = total.toLocaleString() + '원';
    }
}

// 모달 닫기
function closeModal() {
    modal.classList.remove('show');
    currentItem = null;
    currentTemp = null;
    currentQuantity = 1;
}

closeBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);

// 장바구니에 담기
addToCartBtn.addEventListener('click', () => {
    if (!currentTemp) {
        alert('온도를 선택해주세요.');
        return;
    }
    
    const cartItem = {
        name: currentItem.name,
        temperature: currentTemp,
        quantity: currentQuantity,
        price: currentItem.price,
        totalPrice: currentItem.price * currentQuantity
    };
    
    // 장바구니에 추가
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // 성공 메시지 표시
    alert('장바구니에 추가되었습니다.');
    closeModal();
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