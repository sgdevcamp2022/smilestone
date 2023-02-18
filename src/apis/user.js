async function loginUser(userId, password) {
  return await fetch("/api/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("login-token"),
    },
    body: JSON.stringify({
      userId,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => data);
}

async function getUserByToken(token) {
  return await fetch("/api/users/signin", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token,
    },
  })
    .then((res) => res.json())
    .then((data) => data);
}

async function signupUser(userId, password, nickName) {
  return await fetch("/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      nickName,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => data);
}

export { signupUser, loginUser, getUserByToken };
