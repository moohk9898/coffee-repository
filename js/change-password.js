document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('changePasswordForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 입력값 가져오기
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // 유효성 검사
        if (!validatePassword(newPassword)) {
            showError('newPassword', '비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            showError('confirmPassword', '새 비밀번호가 일치하지 않습니다.');
            return;
        }
        
        // 현재 비밀번호 확인 (실제 구현 시에는 서버와 통신 필요)
        if (!checkCurrentPassword(currentPassword)) {
            showError('currentPassword', '현재 비밀번호가 올바르지 않습니다.');
            return;
        }
        
        // 비밀번호 변경 처리 (실제 구현 시에는 서버와 통신 필요)
        changePassword(newPassword);
    });
    
    // 입력 필드 변경 시 에러 메시지 초기화
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', function() {
            clearError(this.id);
        });
    });
});

function validatePassword(password) {
    // 비밀번호 규칙: 영문, 숫자, 특수문자 포함 8자 이상
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    
    // 에러 메시지 요소가 없으면 생성
    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('p');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    
    formGroup.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('error');
    
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

function checkCurrentPassword(password) {
    // 실제 구현 시에는 서버와 통신하여 현재 비밀번호 확인
    // 임시로 true 반환
    return true;
}

function changePassword(newPassword) {
    // 실제 구현 시에는 서버와 통신하여 비밀번호 변경
    // 임시로 성공 메시지 표시 후 이전 페이지로 이동
    alert('비밀번호가 성공적으로 변경되었습니다.');
    history.back();
} 