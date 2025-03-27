const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;

  // 유효성 검사 (예: 비밀번호 길이, 이메일 형식 등)
  if (password.length < 8) {
    alert('비밀번호는 8자 이상이어야 합니다.');
    return;
  }

  fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password, email }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert('회원가입이 완료되었습니다!');
        // 로그인 페이지로 이동 또는 다른 작업 수행
      } else {
        alert('회원가입에 실패했습니다.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});