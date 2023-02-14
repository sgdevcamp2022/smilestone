async function postProduct(sendableResult) {
  return await fetch(`/api/product/post`, {
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    method: "POST",
    body: JSON.stringify({
      ...sendableResult,
    }),
  })
    .then((res) => res.json())
    .then((data) => data);
}

export { postProduct };
