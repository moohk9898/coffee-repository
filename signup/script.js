// 유효성 검사 함수들
const validators = {
    username: (value) => {
        if (value.length < 4) return '아이디는 4자 이상이어야 합니다.';
        if (!/^[a-zA-Z0-9]+$/.test(value)) return '아이디는 영문자와 숫자만 사용 가능합니다.';
        return '';
    },
    password: (value) => {
        if (value.length < 8) return '비밀번호는 8자 이상이어야 합니다.';
        if (!/[A-Z]/.test(value)) return '비밀번호는 대문자를 포함해야 합니다.';
        if (!/[a-z]/.test(value)) return '비밀번호는 소문자를 포함해야 합니다.';
        if (!/[0-9]/.test(value)) return '비밀번호는 숫자를 포함해야 합니다.';
        if (!/[!@#$%^&*]/.test(value)) return '비밀번호는 특수문자(!@#$%^&*)를 포함해야 합니다.';
        return '';
    },
    'confirm-password': (value, formData) => {
        if (value !== formData.get('password')) return '비밀번호가 일치하지 않습니다.';
        return '';
    },
    email: (value) => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return '올바른 이메일 형식이 아닙니다.';
        return '';
    },
    phone: (value) => {
        if (!/^010\d{8}$/.test(value)) return '올바른 전화번호 형식이 아닙니다. (01000000000)';
        return '';
    },
    birthdate: (value) => {
        const date = new Date(value);
        const today = new Date();
        if (date > today) return '미래의 날짜는 선택할 수 없습니다.';
        return '';
    }
};

// EmailJS 초기화
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // EmailJS에서 받은 public key를 입력해주세요
})();

// 전화번호 입력 필드에서 숫자만 입력받기
document.getElementById('phone').addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 11);
});

// 입력 필드 실시간 유효성 검사
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', function() {
        const errorElement = document.getElementById(`${this.id}-error`);
        if (validators[this.id]) {
            const error = validators[this.id](this.value, new FormData(document.getElementById('signup-form')));
            errorElement.textContent = error;
            this.classList.toggle('invalid', error !== '');
        }
    });
});

let verificationCode = '';
let verificationTimer = null;
let isEmailVerified = false;

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signup-form');
    const submitButton = document.getElementById('submit-button');
    const verifyEmailButton = document.getElementById('verify-email');
    const verifyCodeButton = document.getElementById('verify-code');
    
    // 이메일 인증번호 받기 버튼 클릭
    verifyEmailButton.addEventListener('click', async function() {
        const email = document.getElementById('email').value;
        if (!validateEmail(email)) {
            showError('email-error', '유효한 이메일 주소를 입력해주세요.');
            return;
        }
        
        try {
            // 버튼 상태 업데이트
            verifyEmailButton.disabled = true;
            
            // 인증번호 생성
            verificationCode = generateVerificationCode();
            
            // 테스트용: 인증번호를 화면에 표시
            showError('email-error', `테스트용 인증번호: ${verificationCode}`, 'success');
            
            // 인증번호 입력 폼 표시
            document.querySelector('.verification-group').classList.remove('hidden');
            startVerificationTimer();
            
            // 1분 후 재전송 가능
            setTimeout(() => {
                verifyEmailButton.disabled = false;
            }, 60000);
            
        } catch (error) {
            console.error('Error:', error);
            showError('email-error', '인증번호 생성에 실패했습니다. 다시 시도해주세요.');
            verifyEmailButton.disabled = false;
        }
    });
    
    // 인증번호 확인 버튼 클릭
    verifyCodeButton.addEventListener('click', function() {
        const inputCode = document.getElementById('verification-code').value;
        if (inputCode === verificationCode) {
            isEmailVerified = true;
            showError('verification-error', '이메일 인증이 완료되었습니다.', 'success');
            document.getElementById('email').disabled = true;
            verifyEmailButton.disabled = true;
            verifyCodeButton.disabled = true;
            document.getElementById('verification-code').disabled = true;
            clearInterval(verificationTimer);
            document.getElementById('verification-timer').textContent = '';
            submitButton.disabled = false;
        } else {
            showError('verification-error', '인증번호가 일치하지 않습니다.');
        }
    });
    
    // 폼 제출 전 이메일 인증 확인
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!isEmailVerified) {
            showError('email-error', '이메일 인증이 필요합니다.');
            return;
        }
        
        // 모든 필드 유효성 검사
        const formData = new FormData(this);
        let hasError = false;
        
        for (const [fieldName, value] of formData.entries()) {
            if (validators[fieldName]) {
                const error = validators[fieldName](value, formData);
                const errorElement = document.getElementById(`${fieldName}-error`);
                errorElement.textContent = error;
                if (error) hasError = true;
            }
        }
        
        if (hasError) {
            showStatus('모든 필드를 올바르게 입력해주세요.', 'error');
            return;
        }

        // 회원 데이터 생성
        const userData = {
            username: formData.get('username'),
            password: formData.get('password'), // 실제 구현시에는 암호화 필요
            email: formData.get('email'),
            name: formData.get('name'),
            phone: formData.get('phone'),
            birthdate: formData.get('birthdate'),
            createdAt: new Date().toISOString()
        };

        try {
            // 회원 데이터 저장
            saveUserData(userData);
            
            showStatus('회원가입이 완료되었습니다!', 'success');
            // 회원가입 성공 시 메인 페이지로 리다이렉트 (2초 후)
            setTimeout(() => {
                alert('회원가입이 완료되었습니다. 메인 페이지로 이동합니다.');
                window.location.href = '../index.html';
            }, 2000);
            
        } catch (error) {
            showStatus('회원가입 중 오류가 발생했습니다.', 'error');
            console.error('Error:', error);
        }
    });
});

// 회원 데이터 저장 (임시로 localStorage 사용)
function saveUserData(userData) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
}

// 인증번호 생성 함수
function generateVerificationCode() {
    return Math.random().toString().substr(2, 6);
}

// 인증 타이머 시작
function startVerificationTimer() {
    let timeLeft = 180; // 3분
    const timerElement = document.getElementById('verification-timer');
    
    clearInterval(verificationTimer);
    verificationTimer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft === 0) {
            clearInterval(verificationTimer);
            verificationCode = '';
            document.getElementById('verification-code').disabled = true;
            document.getElementById('verify-code').disabled = true;
            showError('verification-error', '인증 시간이 만료되었습니다. 다시 시도해주세요.');
        }
        
        timeLeft--;
    }, 1000);
}

// 이메일 유효성 검사
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// 에러 메시지 표시 함수
function showError(elementId, message, type = 'error') {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.style.color = type === 'error' ? '#dc3545' : '#28a745';
}

// 상태 메시지 표시 함수
function showStatus(message, type) {
    const statusElement = document.getElementById('signup-status');
    statusElement.textContent = message;
    statusElement.className = `status-message ${type}`;
}
