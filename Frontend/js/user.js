const id = localStorage.getItem("userId");

if (id) {
  // function getUser() {
  //   axios
  //     .get(`http://localhost:3030/user/${id}`)
  //     .then((res) => {
  //       const user = res.data;
  //       document.getElementById("firstname").textContent = localStorage.getItem('firstname');
  //       document.getElementById("user-cards").innerHTML = `
  //     <div class="user-card">
  //       <p>First Name: ${user.firstname}</p>
  //       <p>Last Name: ${user.lastname}</p>
  //       <p>Username: ${user.username}</p>
  //     </div>
  //     `;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  // getUser();

  document.getElementById("firstname").textContent = localStorage.getItem('firstname');
  document.getElementById("myPhotos").addEventListener("click", () => {
    window.location.href = `./myPhotos.html`;
  });

  document.getElementById("logout-btn").addEventListener("click", goToLogin);
} else {
  goToLogin();
}

function goToLogin() {
  localStorage.removeItem("userId");
  window.location.href = "../index.html";
}
