// Register User
function registerUser(e) {
  e.preventDefault();
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const alreadyExists = users.find(u => u.email === email);
  if (alreadyExists) {
    sessionStorage.setItem("loginMessage", "This email is already registered.");
    sessionStorage.setItem("alertType", "warning");
    window.location.href = "login.html";
    return;
  }

  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));
  sessionStorage.setItem("loginMessage", "Registered successfully! Please login.");
  window.location.href = "login.html";
}

// Login User
function loginUser(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.setItem("loginSuccess", "true");
    window.location.href = "index.html";
  } else {
    document.getElementById("login-alert").innerHTML = `
      <div class="alert-box warning">Invalid credentials. Redirecting to register...</div>`;
    setTimeout(() => {
      window.location.href = "register.html";
    }, 2000);
  }
}
