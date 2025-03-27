document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('loginButton');
    const loginForm = document.getElementById('loginForm');
    const navLoginForm = document.getElementById('navLoginForm');

    // 로그인 버튼 클릭 시 폼 토글
    loginButton.addEventListener('click', (e) => {
        e.stopPropagation();
        loginForm.classList.toggle('hidden');
    });

    // 문서 클릭 시 로그인 폼 닫기
    document.addEventListener('click', (e) => {
        if (!loginForm.contains(e.target) && !loginButton.contains(e.target)) {
            loginForm.classList.add('hidden');
        }
    });

    // 로그인 폼 제출
    navLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('navUsername').value;
        const password = document.getElementById('navPassword').value;

        // 여기에 로그인 처리 로직 추가
        console.log('로그인 시도:', { username, password });
        
        // 폼 초기화 및 닫기
        navLoginForm.reset();
        loginForm.classList.add('hidden');
    });
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
