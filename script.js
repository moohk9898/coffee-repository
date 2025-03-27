// 상품 목록 동적으로 추가 (예시)
const productList = document.querySelector('.product-list');
const products = [
  { name: '아메리카노', price: '4,000원' },
  { name: '카페라떼', price: '4,500원' },
  { name: '카푸치노', price: '5,000원' },
];

products.forEach(product => {
  const productDiv = document.createElement('div');
  productDiv.innerHTML = `
    <h3>${product.name}</h3>
    <p>${product.price}</p>
  `;
  productList.appendChild(productDiv);
});