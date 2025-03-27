const CACHE_NAME = 'mocha-blend-v1';
const urlsToCache = [
    './',
    './index.html',
    './styles/index.css',
    './styles/auth.css',
    './js/index.js',
    './js/auth.js',
    './js/cart.js',
    './images/americano.jpg',
    './images/cappuccino.jpg',
    './images/latte.jpg',
    './images/vanilla-latte.jpg',
    './images/soy-latte.jpg',
    './images/signature-latte.jpg',
    './images/club-sandwich.jpg',
    './images/hotcake.jpg',
    './images/store-front.jpg',
    './manifest.json',
    './images/icons/icon-72x72.png',
    './images/icons/icon-96x96.png',
    './images/icons/icon-128x128.png',
    './images/icons/icon-144x144.png',
    './images/icons/icon-152x152.png',
    './images/icons/icon-192x192.png',
    './images/icons/icon-384x384.png',
    './images/icons/icon-512x512.png'
];

// 서비스 워커 설치 및 캐시
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
    // 새로운 서비스 워커를 즉시 활성화
    self.skipWaiting();
});

// 캐시된 컨텐츠로 응답
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // 캐시가 있으면 캐시된 버전 반환
                if (response) {
                    return response;
                }

                // 네트워크 요청 복제
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest)
                    .then(response => {
                        // 유효한 응답이 아니면 그대로 반환
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // 응답을 복제하여 캐시에 저장
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(() => {
                        // 오프라인이고 캐시된 응답이 없는 경우
                        if (event.request.mode === 'navigate') {
                            return caches.match('./index.html');
                        }
                    });
            })
    );
});

// 이전 버전의 캐시 삭제
self.addEventListener('activate', event => {
    event.waitUntil(
        Promise.all([
            // 새로운 서비스 워커가 즉시 페이지 제어
            self.clients.claim(),
            // 이전 캐시 삭제
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== CACHE_NAME) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        ])
    );
}); 