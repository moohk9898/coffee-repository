document.addEventListener('DOMContentLoaded', function() {
    // 장바구니 초기화
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartBadge();
    checkLoginStatus();

    // 장바구니 담기 버튼 이벤트 리스너
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // 기본 동작 방지
            
            const id = this.dataset.id;
            const name = this.dataset.name;
            const price = parseInt(this.dataset.price, 10);
            
            if (isNaN(price)) {
                console.error('Invalid price for item:', name);
                return;
            }

            // 옵션 선택 모달 생성
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <h3>${name}</h3>
                    <div class="option-group">
                        <label>온도</label>
                        <div class="temperature-buttons">
                            <button class="temp-btn active" data-temp="HOT">HOT</button>
                            <button class="temp-btn" data-temp="ICE">ICE</button>
                        </div>
                    </div>
                    <div class="option-group">
                        <label>수량</label>
                        <div class="quantity-control">
                            <button class="qty-btn minus">-</button>
                            <span class="qty-display">1</span>
                            <button class="qty-btn plus">+</button>
                        </div>
                    </div>
                    <div class="modal-buttons">
                        <button class="cancel-btn">취소</button>
                        <button class="confirm-btn">담기</button>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
            
            // 스크롤 방지
            document.body.style.overflow = 'hidden';

            let selectedTemp = 'HOT';
            let quantity = 1;

            // 온도 선택 버튼 이벤트
            const tempButtons = modal.querySelectorAll('.temp-btn');
            tempButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    tempButtons.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    selectedTemp = this.dataset.temp;
                });
            });

            // 수량 조절 버튼 이벤트
            const qtyDisplay = modal.querySelector('.qty-display');
            
            modal.querySelector('.minus').addEventListener('click', () => {
                if (quantity > 1) {
                    quantity--;
                    qtyDisplay.textContent = quantity;
                }
            });

            modal.querySelector('.plus').addEventListener('click', () => {
                if (quantity < 10) {
                    quantity++;
                    qtyDisplay.textContent = quantity;
                }
            });

            // 취소 버튼 이벤트
            modal.querySelector('.cancel-btn').addEventListener('click', () => {
                document.body.removeChild(modal);
                document.body.style.overflow = 'auto';
            });

            // 담기 버튼 이벤트
            modal.querySelector('.confirm-btn').addEventListener('click', () => {
                const cartItem = {
                    id: id,
                    name: name,
                    price: price,
                    quantity: quantity,
                    temperature: selectedTemp
                };

                // 이미 장바구니에 있는 동일한 옵션의 아이템인지 확인
                const existingItemIndex = cart.findIndex(item => 
                    item.id === id && item.temperature === selectedTemp
                );

                if (existingItemIndex !== -1) {
                    // 기존 아이템의 수량을 업데이트
                    const newQuantity = cart[existingItemIndex].quantity + quantity;
                    if (newQuantity <= 10) {
                        cart[existingItemIndex].quantity = newQuantity;
                    } else {
                        alert('최대 주문 수량은 10개입니다.');
                        return;
                    }
                } else {
                    cart.push(cartItem);
                }

                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartBadge();
                document.body.removeChild(modal);
                document.body.style.overflow = 'auto';
                
                // 진동 피드백 (지원되는 기기에서만)
                if ('vibrate' in navigator) {
                    navigator.vibrate(100);
                }
                
                // 알림 표시
                alert('장바구니에 추가되었습니다!');
            });
        });
    });
});

// 장바구니 뱃지 업데이트
function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('.cart-badge');
    
    badges.forEach(badge => {
        if (totalItems > 0) {
            badge.textContent = totalItems;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    });
}

// 로그인 상태 확인
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    
    const authButtons = document.querySelector('.auth-buttons');
    const bottomNav = document.querySelector('.bottom-nav');
    
    if (isLoggedIn) {
        // 로그인 상태일 때
        authButtons.innerHTML = `
            <span class="user-name">${userData.name}님 환영합니다</span>
            <button onclick="logout()" class="auth-link login">로그아웃</button>
        `;
        
        if (bottomNav) {
            const loginLink = bottomNav.querySelector('a[href="login.html"]');
            if (loginLink) {
                loginLink.href = 'mypage.html';
                loginLink.querySelector('span:last-child').textContent = '내 정보';
            }
        }
    } else {
        // 로그아웃 상태일 때
        authButtons.innerHTML = `
            <a href="login.html" class="auth-link login">로그인</a>
            <a href="register.html" class="auth-link signup">회원가입</a>
        `;
        
        if (bottomNav) {
            const loginLink = bottomNav.querySelector('a[href="mypage.html"]');
            if (loginLink) {
                loginLink.href = 'login.html';
                loginLink.querySelector('span:last-child').textContent = '로그인';
            }
        }
    }
}

// 로그아웃 함수
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    window.location.reload();
} 