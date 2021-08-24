let password = document.querySelector("input[type=password]");
let eye_icon = document.getElementById("eye-icon");

eye_icon.addEventListener("click", togglePassword);

function togglePassword(display) {
  this.classList.contains("fa-eye-slash")
    ? this.classList.replace("fa-eye-slash", "fa-eye")
    : this.classList.replace("fa-eye", "fa-eye-slash");

  password.getAttribute("type") === "password"
    ? password.setAttribute("type", "text")
    : password.setAttribute("type", "password");
}

password.addEventListener(
  "click",
  function (e) {
    eye_icon.classList.contains("fa-eye-slash")
      ? eye_icon.classList.replace("fa-eye-slash", "fa-eye")
      : eye_icon.classList.replace("fa-eye", "fa-eye-slash");

    password.getAttribute("type") === "password"
      ? password.setAttribute("type", "text")
      : password.setAttribute("type", "password");
    password.value = passwordGenerator();
  },
  { once: true }
);

function passwordGenerator() {
  const data =
    "qwertyuiopasdfghjklzxcvbnm!@#$%^&*()_+=[]{}|?QWERTYUIOPASDFGHJKLZXCVBNM1234567890";
  const password_length = 8;
  let password = "";
  for (let i = 0; i < password_length; i++) {
    let d = Math.floor(Math.random() * (81 - 0) + 0);
    password = password + data[d];
  }
  return password;
}
