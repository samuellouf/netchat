const login = document.getElementById("login");
const loginform = login.querySelector("form");

document.addEventListener("DOMContentLoaded", () => {
  API.getVersion().then((version) => {
    document.querySelector("header .version").innerText = version;
  });

  document.querySelector("header .port").innerText = API.port;
  API.getIP().then((ip) => {
    document.querySelector("header .server").innerText = ip;
  });
});

loginform.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(loginform);
  const username = formData.get("username");
  const password = formData.get("password");
  
  if (username == ""){
    if (password == ""){
      alert("Le nom d'utilisateur et le mot de passe ne sont pas définis.");
    } else {
      alert("Le nom d'utilisateur n'est pas défini.");
    }
  } else if (password == "") {
    alert("Le mot de passe n'est pas défini.");
  } else {
    if (await API.user.exists(username)){
      if (await API.user.password.check(username, password)){
        logIntoChat(username);
      } else {
        alert(`Le mot de passe ne correspond pas.`);
      }
    } else {
      alert(`L'utilisateur "${username}" n'existe pas.`);
    }
  }
});


const signin = document.getElementById("signin");
const signinform = signin.querySelector("form");

signinform.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(signinform);
  const username = formData.get("username");
  const password = formData.get("password");

  if (username == ""){
    if (password == ""){
      alert("Le nom d'utilisateur et le mot de passe ne sont pas définis.");
    } else {
      alert("Le nom d'utilisateur n'est pas défini.");
    }
  } else if (password == "") {
    alert("Le mot de passe n'est pas défini.");
  } else {
    if (await API.user.exists(username)){
      alert(`L'utilisateur "${username}" existe déjà.`);
    } else {
      await API.user.create(username, password);
      logIntoChat(username);
    }
  }
});

const loginlink = signin.querySelector(".link");
const signinlink = login.querySelector(".link");

signinlink.addEventListener("click", () => {
  signin.classList.remove("hidden");
  login.classList.add("hidden");
});

loginlink.addEventListener("click", () => {
  login.classList.remove("hidden");
  signin.classList.add("hidden");
});
