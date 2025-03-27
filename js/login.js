document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // 입력값 가져오기
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // 유효성 검사
    if (!email || !password) {
        alert('이메일과 비밀번호를 입력해주세요.');
        return;
    }

    // 저장된 사용자 정보 가져오기
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email);

    // 사용자 확인 및 비밀번호 검증
    if (!user || user.password !== password) {
        alert('이메일 또는 비밀번호가 일치하지 않습니다.');
        return;
    }

    // 로그인 상태 저장
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
    } else {
        localStorage.removeItem('rememberMe');
    }

    alert('로그인이 완료되었습니다.');
    window.location.href = 'index.html'; // 메인 페이지로 이동
});

// 소셜 로그인 버튼 이벤트 리스너
document.querySelector('.social-button.kakao').addEventListener('click', function() {
    alert('카카오 로그인은 현재 준비중입니다.');
});

document.querySelector('.social-button.naver').addEventListener('click', function() {
    alert('네이버 로그인은 현재 준비중입니다.');
}); 