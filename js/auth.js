function showTab(tabName) {
    // 모든 폼 숨기기
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.remove('active');
    });
    
    // 모든 탭 버튼 비활성화
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 선택된 폼과 탭 버튼 활성화
    document.getElementById(`${tabName}-form`).classList.add('active');
    document.querySelector(`[onclick="showTab('${tabName}')"]`).classList.add('active');
}

// 폼 제출 처리
document.querySelectorAll('.auth-form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // 여기에 실제 인증 로직 추가 예정
        const formData = new FormData(e.target);
        console.log('Form submitted:', Object.fromEntries(formData));
    });
}); 