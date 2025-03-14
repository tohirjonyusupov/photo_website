const userId = JSON.parse(localStorage.getItem("userId"));
const token = sessionStorage.getItem("token");

if (userId) {
  function getAllPhotos() {
    axios
      .get(`http://localhost:3030/photos/?id=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const userDatas = res.data;
        document.getElementById("firstname").textContent =
          localStorage.getItem("firstname");
        console.log(userDatas);

        userDatas.map((userData) => {
          document.getElementById("images").innerHTML += `
          <div class="image">
            <img src="${userData.imageurl}" alt="Author" class="image-image">
            <div class="image-content">
              <h2 class="author-name">${userData.firstname}</h2>
              <div class="likes">
                <p onclick="likeBtn(${userData.id})" id="${
            userData.id
          }" class="heart">${userData.isliked ? "❤️" : "🤍"}</p>
                <span id="likeCountBtn">${userData.likecount}</span>
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

  getAllPhotos();
  document.getElementById("logout-btn").addEventListener("click", goToLogin);
} else {
  window.location.href = "../index.html";
}

function goToLogin() {
  localStorage.removeItem("userId");
  window.location.href = "../index.html";
}

function likeBtn(imageId) {
  const userId = JSON.parse(localStorage.getItem("userId"));
  let likeBtn = document.getElementById(imageId).nextElementSibling;
  let likeCount = parseInt(likeBtn.textContent);
  console.log(likeCount);

  axios
    .post("http://localhost:3030/like", {
      userid: userId,
      imageid: imageId,
    })
    .then((res) => {
      document.getElementById(imageId).textContent = res.data.liked
        ? "❤️"
        : "🤍";
      res.data.liked ? likeCount++ : likeCount--;
      likeBtn.textContent = likeCount;
    })
    .catch((err) => {
      console.log(err);
    });
}
