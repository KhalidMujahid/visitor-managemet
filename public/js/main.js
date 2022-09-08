// login page
const userId = document.querySelector(".adminid");
const password = document.querySelector(".password");
const loginButton = document.querySelector(".loginbutton");
const msg = document.querySelector(".msg");
const errorText = document.querySelector(".error");
const X = document.querySelector(".x");
const Signup = document.querySelector(".sign");

loginButton?.addEventListener("click", (e) => {
  e.preventDefault();
  loginButton.innerText = "loading...";
  if (!userId.value || !password.value) {
    msg.style.display = "block";
    loginButton.innerText = "login";
    return;
  }

  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      window.location.href = "/dashboard";
      return;
    }
    loginButton.innerText = "loading...";

    if (this.readyState === 4 && this.status === 401) {
      msg.style.display = "block";
      errorText.innerText = this.responseText;
      loginButton.innerText = "login";
    }
  };
  xhr.open("POST", "/auth/login", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(`username=${userId.value}&password=${password.value}`);
});

X?.addEventListener("click", (e) => {
  if (msg.style.display == "block") {
    msg.style.display = "none";
  }
});

Signup?.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/signup";
});

// signup page
const Login = document.querySelector(".signlogin"),
  Signmsg = document.querySelector(".signmsg"),
  SignX = document.querySelector(".signx"),
  Signuser = document.querySelector(".signuser"),
  Signpassword = document.querySelector(".signpassword"),
  Sconfirm = document.querySelector(".confirm"),
  errorConfirm = document.querySelector(".errorConfirm"),
  SignupButton = document.querySelector(".signup");

Login?.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/";
});

SignupButton?.addEventListener("click", async (e) => {
  e.preventDefault();
  SignupButton.innerText = "loading...";

  if (!Signuser.value || !Signpassword.value || !Sconfirm.value) {
    Signmsg.style.display = "block";
    SignupButton.innerText = "Signup";

    return;
  }

  SignupButton.innerText = "loading...";

  if (String(Signpassword.value) !== String(Sconfirm.value)) {
    Signmsg.style.display = "block";
    errorConfirm.innerText = "Password does not match!";
    SignupButton.innerText = "Signup";

    return;
  }

  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function () {
    SignupButton.innerText = "loading...";

    if (this.readyState === 4 && this.status === 200) {
      window.location.href = "/";
      return;
    }

    if (this.readyState === 4 && this.status === 401) {
      msg.style.display = "block";
      errorText.innerText = this.responseText;
      SignupButton.innerText = "Signup";
    }
  };
  xhr.open("POST", "/register", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(`username=${Signuser.value}&password=${Signpassword.value}`);

  await fetch("");
});
SignX?.addEventListener("click", (e) => {
  if (Signmsg.style.display == "block") {
    Signmsg.style.display = "none";
  }
});

// logout
const Logout = document.querySelector(".logout");

Logout?.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "/";
});

const templates = document.querySelector(".template");

const getData = async () => {
  await fetch("/users")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((d) => {
        const {
          _id,
          name,
          email,
          address,
          phone_number,
          purpose,
          meet,
          date_of_visit,
          status,
        } = d;
        let txt = `
           <tr>
          <td>${name}</td>
          <td>${address}</td>
          <td>${email}</td>
          <td>${phone_number}</td>
          <td>${purpose}</td>
          <td>${meet}</td>
          <td>${date_of_visit}</td>
          <td>${status}</td>
          <td>
            <a href="/edit/${_id}" class="btn btn-primary">edit</a>
            <a href="/delete/${_id}" class="btn btn-danger">delete</a>
          </td>
        </tr>
        `;
        templates.innerHTML += txt;
      });
    })
    .catch((error) => console.log(error));
};
getData();

const deleteButton = document.querySelector(".delete");

const deleteFunc = async () => {
  await fetch(`/delete/${id}`);
};

const visitor_counter = document.querySelector(".visitor_counter");
const buisness_counter = document.querySelector(".buisness_counter");
const personal_counter = document.querySelector(".personal_counter");
const job_counter = document.querySelector(".job_counter");

const counterFunc = async () => {
  // All visitor counter
  await fetch("/users")
    .then((res) => res.json())
    .then((data) => (visitor_counter.innerText = data.length))
    .catch((error) => console.log(error));

  // Buiness counter
  let count = 0;
  await fetch("/users")
    .then((res) => res.json())
    .then((data) => {
      data?.forEach((d) => {
        if (d.purpose === "buisness") {
          count += 1;
        }
      })((buisness_counter.innerText = count));
    })
    .catch((error) => console.log(error));

  // Personal counter
  let per_count = 0;
  await fetch("/users")
    .then((res) => res.json())
    .then((data) => {
      data?.forEach((d) => {
        if (d.purpose === "personal") {
          per_count += 1;
        }
      })((personal_counter.innerText = per_count));
    })
    .catch((error) => console.log(error));

  // Personal counter
  let job_count = 0;
  await fetch("/users")
    .then((res) => res.json())
    .then((data) => {
      data?.forEach((d) => {
        if (d.purpose === "job") {
          job_count += 1;
        }
      })((job_counter.innerText = job_count));
    })
    .catch((error) => console.log(error));
};

counterFunc();
