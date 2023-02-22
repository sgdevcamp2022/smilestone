// 토큰
export default function setHeaders(headers) {
  if (localStorage.getItem("login-token")) {
    return {
      ...headers,
      Authorization: `Bearer ${localStorage.getItem("login-token")}`,
    };
  } else {
    return headers;
  }
}

// 게시하기
async function postProduct(sendableResult) {
  console.log(setHeaders());
  return await fetch(`/api/product/post`, {
    headers: setHeaders({
      "Content-Type": "application/json",
    }),
    method: "POST",
    body: JSON.stringify({
      ...sendableResult,
    }),
  })
    .then((res) => res.json())
    .then((data) => data);
}

// list 가져오기
async function getProductList() {
  return await fetch(`/api/product/list/all`, {
    headers: setHeaders({
      "Content-Type": "application/json",
    }),
  })
    .then((res) => res.json())
    .then((data) => data);
}

// detail 가져오기
async function getProductDetail(productId) {
  return await fetch(`/api/product/id?productId=${productId}`, {
    headers: setHeaders({
      "Content-Type": "application/json",
    }),
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => data);
}

// 수정
async function updateProduct(sendableResult, productId) {
  return await fetch(`/api/product/update/id?=productId${productId}`, {
    headers: setHeaders({
      "Content-Type": "application/json",
    }),
    method: "POST",
    body: JSON.stringify({
      ...sendableResult,
    }),
  })
    .then((res) => res.json())
    .then((data) => data);
}

// 삭제
async function deleteProduct(productId) {
  return await fetch(`/api/product/`, {
    headers: setHeaders({
      "Content-Type": "application/json",
    }),
    method: "GET",
    body: JSON.stringify({
      productId,
    }),
  })
    .then((res) => res.json())
    .then((data) => data);
}

// 카테고리 가져오기
async function category(category) {
  return await fetch(`/api/product/category`, {
    headers: setHeaders({
      "Content-Type": "application/json",
    }),
    method: "GET",
    body: JSON.stringify({
      category,
    }),
  })
    .then((res) => res.json())
    .then((data) => data);
}

// product id로 가져오기
async function productId() {
  return await fetch(`/api/product/id`, {
    headers: setHeaders({
      "Content-Type": "application/json",
    }),
  })
    .then((res) => res.json())
    .then((data) => data);
}

export {
  getProductDetail,
  postProduct,
  getProductList,
  productId,
  updateProduct,
  deleteProduct,
  category,
};
