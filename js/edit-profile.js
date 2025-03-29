document.addEventListener('DOMContentLoaded', function() {
    // 장바구니 뱃지 업데이트
    function updateCartBadge() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const badges = document.querySelectorAll('.cart-badge');
        
        badges.forEach(badge => {
            badge.style.display = 'inline-flex';
            badge.textContent = totalItems;
        });
    }

    // 로그인 상태 확인
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }

    const profileUpload = document.getElementById('profileUpload');
    const profileImage = document.getElementById('profileImage');
    const profileForm = document.getElementById('profileForm');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const addressInput = document.getElementById('address');

    // 기본 프로필 이미지 설정
    const defaultProfileImage = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23666"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';

    // 프로필 이미지 로드 실패 시 기본 이미지 표시
    profileImage.onerror = function() {
        this.src = defaultProfileImage;
    };

    // 프로필 이미지 업로드 처리
    profileUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            // 파일 크기 체크 (5MB 제한)
            if (file.size > 5 * 1024 * 1024) {
                alert('파일 크기는 5MB를 초과할 수 없습니다.');
                return;
            }

            // 파일 타입 체크
            if (!file.type.startsWith('image/')) {
                alert('이미지 파일만 업로드 가능합니다.');
                return;
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                profileImage.src = e.target.result;
                // 로컬 스토리지에 이미지 저장
                localStorage.setItem('profileImage', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // 저장된 사용자 정보 불러오기
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    nameInput.value = userData.name || '';
    phoneInput.value = userData.phone || '';
    emailInput.value = userData.email || '';
    addressInput.value = userData.address || '';

    // 저장된 프로필 이미지 불러오기
    const savedProfileImage = localStorage.getItem('profileImage');
    if (savedProfileImage) {
        profileImage.src = savedProfileImage;
    } else {
        profileImage.src = defaultProfileImage;
    }

    // 폼 제출 처리
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // 입력값 검증
        if (!nameInput.value.trim()) {
            alert('이름을 입력해주세요.');
            return;
        }

        if (!phoneInput.value.trim()) {
            alert('전화번호를 입력해주세요.');
            return;
        }

        if (!emailInput.value.trim()) {
            alert('이메일을 입력해주세요.');
            return;
        }

        // 사용자 정보 저장
        const updatedUserData = {
            ...userData,
            name: nameInput.value.trim(),
            phone: phoneInput.value.trim(),
            email: emailInput.value.trim(),
            address: addressInput.value.trim()
        };

        localStorage.setItem('userData', JSON.stringify(updatedUserData));
        alert('프로필이 성공적으로 업데이트되었습니다.');
        window.location.href = 'mypage.html';
    });

    // 장바구니 뱃지 업데이트
    updateCartBadge();
}); 