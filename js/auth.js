document.addEventListener('DOMContentLoaded', () => {
    // 장바구니 배지 업데이트
    updateCartBadge();

    // 로그인 폼 처리
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;

            // 이메일 형식 검사
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('올바른 이메일 형식이 아닙니다.');
                return;
            }

            // localStorage에서 사용자 정보 가져오기
            const userData = JSON.parse(localStorage.getItem('userData'));
            
            if (!userData || userData.email !== email || userData.password !== password) {
                alert('이메일 또는 비밀번호가 일치하지 않습니다.');
                return;
            }

            // 로그인 성공 처리
            localStorage.setItem('isLoggedIn', 'true');
            if (remember) {
                localStorage.setItem('rememberedEmail', email);
            }

            alert('로그인이 완료되었습니다.');
            window.location.href = 'index.html';
        });

        // 저장된 이메일이 있으면 자동 입력
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail) {
            document.getElementById('email').value = rememberedEmail;
            document.getElementById('remember').checked = true;
        }
    }

    // 회원가입 폼 처리
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 입력값 가져오기
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const phone = document.getElementById('phone').value;
            const agreeTerms = document.getElementById('agreeTerms').checked;

            // 유효성 검사
            if (!name || !email || !password || !confirmPassword || !phone) {
                alert('모든 필드를 입력해주세요.');
                return;
            }

            if (password !== confirmPassword) {
                alert('비밀번호가 일치하지 않습니다.');
                return;
            }

            if (!agreeTerms) {
                alert('이용약관에 동의해주세요.');
                return;
            }

            // 이메일 형식 검사
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('올바른 이메일 형식이 아닙니다.');
                return;
            }

            // 전화번호 형식 검사
            const phoneRegex = /^01[016789]-?[0-9]{3,4}-?[0-9]{4}$/;
            if (!phoneRegex.test(phone)) {
                alert('올바른 전화번호 형식이 아닙니다.');
                return;
            }

            // 회원가입 처리
            const userData = {
                name,
                email,
                password,
                phone,
                registeredAt: new Date().toISOString()
            };

            // localStorage에 사용자 정보 저장
            localStorage.setItem('userData', JSON.stringify(userData));
            
            alert('회원가입이 완료되었습니다.');
            window.location.href = 'login.html';
        });
    }
});

// 장바구니 배지 업데이트 함수
function updateCartBadge() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const badge = document.querySelector('.cart-badge');
    if (badge) {
        if (cartItems.length > 0) {
            badge.style.display = 'flex';
            badge.textContent = cartItems.length;
        } else {
            badge.style.display = 'none';
        }
    }
} 