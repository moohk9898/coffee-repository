// 로그인 폼 제출 처리
document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    // 입력값 검증
    if (!username || !password) {
        showStatus('아이디와 비밀번호를 모두 입력해주세요.', 'error');
        return;
    }

    try {
        // localStorage에서 사용자 데이터 확인 (임시 구현)
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            // 로그인 성공
            showStatus('로그인 성공!', 'success');
            
            // 로그인 상태 저장
            if (remember) {
                localStorage.setItem('loggedInUser', JSON.stringify({
                    username: user.username,
                    name: user.name,
                    email: user.email
                }));
            }

            // 로그인 성공 처리
            setTimeout(() => {
                alert('로그인이 완료되었습니다.');
                window.location.href = '/'; // 메인 페이지로 이동
            }, 1000);
        } else {
            // 로그인 실패
            showStatus('아이디 또는 비밀번호가 올바르지 않습니다.', 'error');
        }
    } catch (error) {
        showStatus('로그인 중 오류가 발생했습니다.', 'error');
        console.error('Error:', error);
    }
});

// 상태 메시지 표시 함수
function showStatus(message, type) {
    const statusElement = document.getElementById('login-status');
    statusElement.textContent = message;
    statusElement.className = `status-message ${type}`;
}

// 페이지 로드 시 자동 로그인 확인
window.addEventListener('load', function() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        document.getElementById('username').value = user.username;
        document.getElementById('remember').checked = true;
    }
});
