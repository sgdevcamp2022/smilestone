async function getProductList() {
  return await fetch("/api/product/list/all", {
    headers: {
      token: localStorage.getItem("token") || sessionStorage.getItem("token"),
    },
  })
    .then((res) => res.json())
    .then((data) => data);
}

async function getProductDetail(productId) {
  return await fetch("/api/product/id")
    .then((res) => res.json())
    .then((data) => data);
}

async function postProduct(sendableResult, imageResult) {
  return await fetch("/api/product/post", {
    headers: {
      "Content-Type": "application/json",
      token:
        localStorage.getItem("Authorization") ||
        sessionStorage.getItem("Authorization"),
    },
    method: "POST",
    body: JSON.stringify({
      ...sendableResult,
    }),
  })
    .then((res) => res.json())
    .then((data) =>
      fetch("/products/images", {
        method: "POST",
        headers: {
          token:
            localStorage.getItem("Authorization") ||
            sessionStorage.getItem("Authorization"),
        },
        body: imageResult,
      })
        .then((res) => res.json())
        .then((data) => data)
    );
}

async function getSearchProductList(keyword) {
  return await fetch(`/api/product/title`)
    .then((res) => res.json())
    .then((data) => data);
}

async function updateProduct(sendableResult, imageResult, productId) {
  return await fetch(`/products/${productId}`, {
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token") || sessionStorage.getItem("token"),
    },
    method: "PATCH",
    body: JSON.stringify({
      ...sendableResult,
    }),
  })
    .then((res) => res.json())
    .then((data) =>
      fetch(`/products/${productId}/updateImages`, {
        method: "PATCH",
        headers: {
          token:
            localStorage.getItem("token") || sessionStorage.getItem("token"),
        },
        body: imageResult,
      })
        .then((res) => res.json())
        .then((data) => data)
    );
}

async function deleteProduct(productId) {
  return await fetch(`/products/`, {
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token") || sessionStorage.getItem("token"),
    },
    method: "DELETE",
    body: JSON.stringify({
      productId,
    }),
  })
    .then((res) => res.json())
    .then((data) => data);
}

export {
  getProductList,
  getProductDetail,
  postProduct,
  getSearchProductList,
  updateProduct,
  deleteProduct,
};
