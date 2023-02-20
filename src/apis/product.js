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

async function getProductList() {
  return await fetch(`/api/product/list/all`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  })
    .then((res) => res.json())
    .then((data) => data);
}

async function productId() {
  return await fetch(`/api/product/id`, {
    headers: setHeaders({
      "Content-Type": "application/json",
    }),
  })
    .then((res) => res.json())
    .then((data) => data);
}

export { postProduct, getProductList, productId };
