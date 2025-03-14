if (localStorage.getItem("userId")) {
  window.location.href = "./pages/user.html";
}

function loginUser() {
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  axios
    .post(`http://localhost:3030/user/login`, {
      username: username.value,
      password: password.value,
    })
    .then((res) => {
      const user = res.data.user;
      console.log(user);

      sessionStorage.setItem("token", res.data.token);

      if (user) {
        window.location.href = `./pages/user.html`;
        localStorage.setItem("userId", user.id);
        localStorage.setItem("firstname", user.firstname);
      }
    })
    .catch((err) => {
      console.log(err.response.data);
      document.querySelector(".err").textContent = err.response.data.message;
      document.querySelector(".err").style.display = "block";
    });
}

document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  loginUser();
});
