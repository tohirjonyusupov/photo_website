const userId = localStorage.getItem("userId");
const token = sessionStorage.getItem("token");
document.getElementById("firstname").textContent = localStorage.getItem("firstname");

if (userId) {
  function addPhoto() {
    const fileInput = document.getElementById("photo");

    const file = fileInput.files[0];

    
    if (!file) {
      alert("Please select a photo");
      return;
    }

    // console.log(userId);
    
    const formData = new FormData();
    formData.append("photo", file);
    formData.append("userId", userId);

    axios
      .post(
        `http://localhost:3030/photos/addPhoto`,
        formData,
        {
          'Content-Type': 'multipart/form-data',
          headers: { Authorization: `Bearer ${token}`},
        }
      )
      .then((res) => {
        console.log(res);
        
        const msg = document.getElementById("msg");
        msg.style.display = "block";
        msg.style.color = "green";
        document.getElementById("msg").textContent = `${res.data.message}`;
        setTimeout(() => {
          msg.style.display = "none";
          window.location.href = "../pages/myPhotos.html";
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault();
    addPhoto();
  });
  document.getElementById("logout-btn").addEventListener("click", goToLogin);
} else {
  window.location.href = "../index.html";
}

function goToLogin() {
  localStorage.removeItem("userId");
  window.location.href = "../index.html";
}
