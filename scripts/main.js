// 로그인 버튼 클릭 이벤트
document.getElementById('loginButton').addEventListener('click', function(e) {
    e.stopPropagation();
    document.getElementById('loginForm').classList.toggle('hidden');
});

// 문서 클릭 시 로그인 폼 닫기
document.addEventListener('click', function(e) {
    const loginForm = document.getElementById('loginForm');
    const loginButton = document.getElementById('loginButton');
    
    if (!loginForm.contains(e.target) && !loginButton.contains(e.target)) {
        loginForm.classList.add('hidden');
    }
});

// 로그인 폼 제출 처리
document.getElementById('navLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('navUsername').value;
    const password = document.getElementById('navPassword').value;

    // localStorage에서 사용자 데이터 확인
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // 로그인 성공
        localStorage.setItem('loggedInUser', JSON.stringify({
            username: user.username,
            name: user.name,
            email: user.email
        }));

        // UI 업데이트
        updateNavigation(user);
        
        // 로그인 폼 초기화 및 닫기
        e.target.reset();
        document.getElementById('loginForm').classList.add('hidden');
        
        // 성공 메시지 표시
        const statusElement = document.createElement('div');
        statusElement.className = 'login-status success';
        statusElement.textContent = '로그인되었습니다!';
        document.querySelector('.login-container').appendChild(statusElement);
        
        // 상태 메시지 3초 후 제거
        setTimeout(() => {
            statusElement.remove();
        }, 3000);
    } else {
        // 로그인 실패
        const statusElement = document.createElement('div');
        statusElement.className = 'login-status error';
        statusElement.textContent = '아이디 또는 비밀번호가 올바르지 않습니다.';
        document.querySelector('.login-container').appendChild(statusElement);
        
        // 상태 메시지 3초 후 제거
        setTimeout(() => {
            statusElement.remove();
        }, 3000);
    }
});

// 로그인 상태 확인
window.addEventListener('load', function() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        updateNavigation(user);
    }
});

// 네비게이션 업데이트
function updateNavigation(user) {
    const loginContainer = document.querySelector('.login-container');
    
    if (user) {
        // 로그인 상태일 때
        loginContainer.innerHTML = `
            <div class="user-menu">
                <button class="nav-link" onclick="toggleUserMenu()">${user.name}님 ▼</button>
                <div class="user-menu-dropdown" id="userMenuDropdown">
                    <a href="./profile/profile.html">프로필 관리</a>
                    <a href="#" onclick="logout(); return false;">로그아웃</a>
                    <a href="./profile/profile.html#delete" class="danger">회원탈퇴</a>
                </div>
            </div>
        `;
    }
}

// 사용자 메뉴 토글
function toggleUserMenu() {
    const dropdown = document.getElementById('userMenuDropdown');
    dropdown.classList.toggle('show');
}

// 문서 클릭 시 드롭다운 닫기
document.addEventListener('click', function(e) {
    if (!e.target.matches('.nav-link')) {
        const dropdowns = document.getElementsByClassName('user-menu-dropdown');
        for (const dropdown of dropdowns) {
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
        }
    }
});

// 로그아웃 처리
function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.reload();
}
