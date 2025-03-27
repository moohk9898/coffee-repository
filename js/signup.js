document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // 입력값 가져오기
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const termsAgreed = document.getElementById('termsAgreement').checked;
    const privacyAgreed = document.getElementById('privacyAgreement').checked;

    // 유효성 검사
    if (!email || !password || !confirmPassword || !name || !phone) {
        alert('모든 필수 항목을 입력해주세요.');
        return;
    }

    if (password !== confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
    }

    if (!termsAgreed || !privacyAgreed) {
        alert('이용약관과 개인정보 처리방침에 동의해주세요.');
        return;
    }

    // 이메일 형식 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('올바른 이메일 형식이 아닙니다.');
        return;
    }

    // 비밀번호 형식 검사 (최소 8자, 영문, 숫자, 특수문자 포함)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        alert('비밀번호는 8자 이상이며, 영문, 숫자, 특수문자를 포함해야 합니다.');
        return;
    }

    // 전화번호 형식 검사
    const phoneRegex = /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/;
    if (!phoneRegex.test(phone)) {
        alert('올바른 전화번호 형식이 아닙니다.');
        return;
    }

    // 회원 정보 저장 (실제로는 서버에 저장해야 함)
    const user = {
        email,
        password,
        name,
        phone,
        points: 2000, // 신규 회원 포인트
        createdAt: new Date().toISOString()
    };

    // localStorage에 사용자 정보 저장 (임시 구현)
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // 이메일 중복 검사
    if (users.some(u => u.email === email)) {
        alert('이미 가입된 이메일입니다.');
        return;
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    // 현재 로그인된 사용자 정보 저장
    localStorage.setItem('currentUser', JSON.stringify(user));

    alert('회원가입이 완료되었습니다!');
    window.location.href = 'index.html'; // 메인 페이지로 이동
}); 