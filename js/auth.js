// 탭 전환 기능
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        // 모든 탭과 폼에서 active 클래스 제거
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
        
        // 클릭된 탭과 해당하는 폼에 active 클래스 추가
        button.classList.add('active');
        document.getElementById(button.dataset.tab + 'Form').classList.add('active');
    });
});

// 로그인 처리
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;

    // 저장된 사용자 정보 가져오기
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('로그인이 완료되었습니다.');
        window.location.href = 'index.html';
    } else {
        alert('이메일 또는 비밀번호가 일치하지 않습니다.');
    }
});

// 회원가입 처리
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelectorAll('input[type="password"]')[0].value;
    const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;
    const name = this.querySelector('input[type="text"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const agreements = this.querySelectorAll('input[type="checkbox"]');

    // 유효성 검사
    if (!email || !password || !confirmPassword || !name || !phone) {
        alert('모든 필수 항목을 입력해주세요.');
        return;
    }

    if (password !== confirmPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
    }

    // 이용약관 동의 확인
    if (!Array.from(agreements).every(checkbox => checkbox.checked)) {
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

    // 회원 정보 저장
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // 이메일 중복 검사
    if (users.some(user => user.email === email)) {
        alert('이미 가입된 이메일입니다.');
        return;
    }

    const user = {
        email,
        password,
        name,
        phone,
        points: 2000, // 신규 회원 포인트
        createdAt: new Date().toISOString()
    };

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(user));

    alert('회원가입이 완료되었습니다!');
    window.location.href = 'index.html';
}); 