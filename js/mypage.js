// 페이지 로드 시 사용자 정보 표시
document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        window.location.href = 'auth.html';
        return;
    }

    // 사용자 정보 표시
    document.getElementById('email').value = currentUser.email;
    document.getElementById('name').value = currentUser.name;
    document.getElementById('phone').value = currentUser.phone;

    // 장바구니 아이콘 업데이트
    updateCartIcon();
});

// 정보 수정
document.querySelector('.update-btn').addEventListener('click', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    // 현재 비밀번호 확인
    if (currentPassword && currentPassword !== currentUser.password) {
        alert('현재 비밀번호가 일치하지 않습니다.');
        return;
    }

    // 새 비밀번호 형식 검사
    if (newPassword) {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            alert('비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 포함해야 합니다.');
            return;
        }
    }

    // 전화번호 형식 검사
    const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
    if (!phoneRegex.test(phone)) {
        alert('올바른 전화번호 형식이 아닙니다.');
        return;
    }

    // 사용자 정보 업데이트
    const updatedUser = {
        ...currentUser,
        password: newPassword || currentUser.password,
        name,
        phone
    };

    // localStorage 업데이트
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    users[userIndex] = updatedUser;
    
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    alert('정보가 수정되었습니다.');
    window.location.reload();
});

// 로그아웃
document.querySelector('.logout-btn').addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'auth.html';
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