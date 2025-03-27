document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('.modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const confirmCartBtn = document.querySelector('.confirm-cart-btn');
    const cancelBtn = document.querySelector('.cancel-btn');
    let selectedItem = null;

    // 장바구니 아이콘 업데이트
    function updateCartBadge() {
        try {
            const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
            const cartBadge = document.querySelector('.cart-badge');
            
            if (cartBadge) {
                cartBadge.textContent = totalItems;
                cartBadge.style.display = totalItems > 0 ? 'block' : 'none';
            }
        } catch (error) {
            console.error('장바구니 아이콘 업데이트 중 오류 발생:', error);
        }
    }

    // 모달 열기
    function openModal(item) {
        selectedItem = item;
        const modalTitle = document.querySelector('.modal-title');
        const selectedItemName = document.querySelector('.selected-item-name');
        const quantityInput = document.querySelector('.quantity');
        const priceValue = document.querySelector('.price-value');

        modalTitle.textContent = '옵션 선택';
        selectedItemName.textContent = item.name;
        quantityInput.textContent = '1';
        
        // 초기 가격 표시
        const initialPrice = item.price;
        priceValue.textContent = `${initialPrice.toLocaleString()}원`;

        // HOT 옵션을 기본으로 선택
        const hotOption = document.querySelector('.temp-option[data-temp="HOT"]');
        if (hotOption) {
            hotOption.classList.add('selected');
        }

        modal.style.display = 'flex';
        updateTotalPrice(); // 초기 총 가격 업데이트
    }

    // 모달 닫기
    function closeModal() {
        modal.style.display = 'none';
        selectedItem = null;
        resetOptions();
    }

    // 옵션 초기화
    function resetOptions() {
        const tempOptions = document.querySelectorAll('.temp-option');
        tempOptions.forEach(option => option.classList.remove('selected'));
        document.querySelector('.quantity').textContent = '1';
        updateTotalPrice();
    }

    // 수량 변경
    function updateQuantity(change) {
        const quantityElement = document.querySelector('.quantity');
        let quantity = parseInt(quantityElement.textContent);
        quantity = Math.max(1, Math.min(10, quantity + change));
        quantityElement.textContent = quantity;
        updateTotalPrice();
    }

    // 총 가격 업데이트
    function updateTotalPrice() {
        if (!selectedItem) return;

        const quantity = parseInt(document.querySelector('.quantity').textContent);
        const totalPrice = selectedItem.price * quantity;
        document.querySelector('.price-value').textContent = `${totalPrice.toLocaleString()}원`;
    }

    // 장바구니에 추가
    function addToCart() {
        if (!selectedItem) return;

        try {
            const quantity = parseInt(document.querySelector('.quantity').textContent);
            const temperature = document.querySelector('.temp-option.selected')?.dataset.temp || 'hot';
            
            const cartItem = {
                id: selectedItem.id,
                name: selectedItem.name,
                price: selectedItem.price,
                quantity: quantity,
                temperature: temperature,
                image: selectedItem.image
            };

            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            
            // 동일한 상품과 옵션이 있는지 확인
            const existingItemIndex = cartItems.findIndex(item => 
                item.id === cartItem.id && item.temperature === cartItem.temperature
            );

            if (existingItemIndex !== -1) {
                // 기존 수량에 추가
                cartItems[existingItemIndex].quantity += quantity;
                if (cartItems[existingItemIndex].quantity > 10) {
                    cartItems[existingItemIndex].quantity = 10;
                }
            } else {
                cartItems.push(cartItem);
            }

            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartBadge();
            
            alert('장바구니에 추가되었습니다.');
            closeModal();
        } catch (error) {
            console.error('장바구니 추가 중 오류 발생:', error);
            alert('장바구니 추가 중 오류가 발생했습니다.');
        }
    }

    // 이벤트 리스너 설정
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const menuItem = e.target.closest('.menu-item');
            const item = {
                id: menuItem.dataset.id,
                name: menuItem.querySelector('h3').textContent,
                price: parseInt(menuItem.dataset.price),
                image: menuItem.querySelector('img').src
            };
            openModal(item);
        });
    });

    document.querySelectorAll('.temp-option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('.temp-option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
        });
    });

    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', () => {
            const change = button.classList.contains('minus') ? -1 : 1;
            updateQuantity(change);
        });
    });

    closeModalBtn.addEventListener('click', closeModal);
    confirmCartBtn.addEventListener('click', addToCart);
    cancelBtn.addEventListener('click', closeModal);

    // 모달 외부 클릭 시 닫기
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // 초기 장바구니 아이콘 업데이트
    updateCartBadge();
}); 