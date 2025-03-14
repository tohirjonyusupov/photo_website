const userId = localStorage.getItem("userId");
const token = sessionStorage.getItem("token");

if (userId) {
  function getMyPhotos() {
    axios
      .get(`http://localhost:3030/photos/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const userDatas = res.data;
        document.getElementById("firstname").textContent =
          localStorage.getItem("firstname");
        userDatas.map((userData) => {
          document.getElementById("images").innerHTML += `
         <div class="image" id="${userData.id}">
      <img src="${userData.imageurl}" alt="Author" class="image-image">
      <div class="image-content">
        <h2 class="author-name">${userData.firstname}</h2>
        <div class="likes">
          <button class="like-button" onclick="deleteImg(${userData.id})">Delete</button>
        </div>
      </div>
    </div>
        `;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getMyPhotos();
  document.getElementById("logout-btn").addEventListener("click", goToLogin);
} else {
  window.location.href = "../index.html";
}

function goToLogin() {
  localStorage.removeItem("userId");
  window.location.href = "../index.html";
}

function deleteImg(id) {
  axios
    .delete(`http://localhost:3030/photos/deleteImg/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      alert(res.data.message);
    })
    .catch((err) => console.log(err));
  document.getElementById(id).remove();
}
