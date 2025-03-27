document.addEventListener('DOMContentLoaded', function() {
    // 로그인 상태 확인
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        alert('로그인이 필요합니다.');
        window.location.href = '../index.html';
        return;
    }

    // 사용자 정보 표시
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = users.find(user => user.username === loggedInUser.username);
    
    if (currentUser) {
        document.getElementById('profile-name').textContent = currentUser.name;
        document.getElementById('profile-email').textContent = currentUser.email;
        document.getElementById('profile-phone').textContent = formatPhoneNumber(currentUser.phone);
        document.getElementById('profile-birthdate').textContent = formatDate(currentUser.birthdate);
    }

    // 회원탈퇴 모달 관련 이벤트
    const deleteModal = document.getElementById('delete-modal');
    const deleteBtn = document.getElementById('delete-account');
    const confirmDeleteBtn = document.getElementById('confirm-delete');
    const cancelDeleteBtn = document.getElementById('cancel-delete');

    // URL 해시가 #delete인 경우 모달 자동 열기
    if (window.location.hash === '#delete') {
        deleteModal.classList.remove('hidden');
    }

    deleteBtn.addEventListener('click', function() {
        deleteModal.classList.remove('hidden');
        // URL 해시 업데이트
        window.location.hash = 'delete';
    });

    cancelDeleteBtn.addEventListener('click', function() {
        closeDeleteModal();
    });

    confirmDeleteBtn.addEventListener('click', function() {
        const password = document.getElementById('confirm-password').value;
        
        if (password === currentUser.password) {
            // 사용자 데이터 삭제
            const updatedUsers = users.filter(user => user.username !== currentUser.username);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            
            // 로그인 정보 삭제
            localStorage.removeItem('loggedInUser');
            
            alert('회원탈퇴가 완료되었습니다.');
            window.location.href = '../index.html';
        } else {
            document.getElementById('password-error').textContent = '비밀번호가 일치하지 않습니다.';
        }
    });

    // 모달 외부 클릭 시 닫기
    deleteModal.addEventListener('click', function(e) {
        if (e.target === deleteModal) {
            closeDeleteModal();
        }
    });

    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !deleteModal.classList.contains('hidden')) {
            closeDeleteModal();
        }
    });
});

// 모달 닫기 함수
function closeDeleteModal() {
    const deleteModal = document.getElementById('delete-modal');
    deleteModal.classList.add('hidden');
    document.getElementById('confirm-password').value = '';
    document.getElementById('password-error').textContent = '';
    // URL 해시 제거
    history.pushState('', document.title, window.location.pathname);
}

// 전화번호 포맷팅
function formatPhoneNumber(phone) {
    if (!phone) return '';
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
}

// 날짜 포맷팅
function formatDate(date) {
    if (!date) return '';
    return new Date(date).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
