document.addEventListener('DOMContentLoaded', function() {
    // 저장된 설정 불러오기
    loadNotificationSettings();

    // 설정 변경 이벤트 리스너
    document.querySelectorAll('.toggle input').forEach(toggle => {
        toggle.addEventListener('change', function() {
            saveNotificationSettings();
            
            // 알림 권한 요청 (푸시 알림이 활성화된 경우)
            if (this.id === 'pushNotification' && this.checked) {
                requestNotificationPermission();
            }
        });
    });
});

// 알림 설정 저장
function saveNotificationSettings() {
    const settings = {
        orderNotification: document.getElementById('orderNotification').checked,
        marketingNotification: document.getElementById('marketingNotification').checked,
        stampNotification: document.getElementById('stampNotification').checked,
        pushNotification: document.getElementById('pushNotification').checked
    };
    localStorage.setItem('notificationSettings', JSON.stringify(settings));
}

// 저장된 알림 설정 불러오기
function loadNotificationSettings() {
    const settings = JSON.parse(localStorage.getItem('notificationSettings'));
    if (settings) {
        document.getElementById('orderNotification').checked = settings.orderNotification;
        document.getElementById('marketingNotification').checked = settings.marketingNotification;
        document.getElementById('stampNotification').checked = settings.stampNotification;
        document.getElementById('pushNotification').checked = settings.pushNotification;
    }
}

// 알림 권한 요청
async function requestNotificationPermission() {
    if (!('Notification' in window)) {
        alert('이 브라우저는 알림을 지원하지 않습니다.');
        return;
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
        console.log('알림 권한이 허용되었습니다.');
    } else {
        console.log('알림 권한이 거부되었습니다.');
        document.getElementById('pushNotification').checked = false;
        saveNotificationSettings();
    }
}

// 주문 완료 알림 보내기
function sendOrderNotification(orderDetails) {
    const settings = JSON.parse(localStorage.getItem('notificationSettings'));
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || { name: '고객' };
    
    if (settings?.orderNotification && settings?.pushNotification) {
        if (Notification.permission === 'granted') {
            const notification = new Notification('주문 완료', {
                body: `${userInfo.name} 고객님, 주문하신 ${orderDetails.menuName}가 준비되었습니다.`,
                icon: '/images/logo.png',
                badge: '/images/logo-badge.png',
                vibrate: [200, 100, 200]
            });

            notification.onclick = function() {
                window.focus();
                this.close();
            };
        }
    }
}

// 저장 완료 메시지 표시
function showSaveMessage() {
    // 기존 메시지가 있다면 제거
    const existingMessage = document.querySelector('.save-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // 새 메시지 생성
    const message = document.createElement('div');
    message.className = 'save-message';
    message.textContent = '설정이 저장되었습니다.';
    message.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px 20px;
        border-radius: 20px;
        font-size: 0.9rem;
        z-index: 1000;
    `;

    document.body.appendChild(message);

    // 3초 후 메시지 제거
    setTimeout(() => {
        if (message.parentElement) {
            message.remove();
        }
    }, 3000);
} 