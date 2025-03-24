
document.addEventListener("DOMContentLoaded", function () {
    checkLogin();
});
function checkLogin() {
    const token = localStorage.getItem("token");
    if (!token) {
        //eslint-disable-next-line no-undef
        Swal.fire({
            icon: 'warning',
            title: 'Access Denied',
            text: 'Please login first!',
        }).then(() => {
            window.location.href = "index.html";
        });
        return;
    }

    fetch("http://103.163.24.134:8080/api/UserInformation", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    })
    .then(response => {
        if (!response.ok) {
            // eslint-disable-next-line no-undef
        Swal.fire({
            icon: 'warning',
            title: 'Access Denied',
            text: 'Please login first!',
        }).then(() => {
            window.location.href = "index.html";
        });
            throw new Error(`HTTP error! Status: ${response.status}`);
        }else{
            if (window.location.pathname.includes("Login") || window.location.pathname.includes("Register")) {
                window.location.href = "Home.html";
            }
            
        }
        return response.json();
    })
    .then(data => {          
        if (data.id) {
            document.getElementById("userNameDisplay").textContent = data.fullName;
        } else {
            throw new Error("Invalid user data");
        }
    })
    .catch(error => {
        console.error(error);
    });
}

function logout() {
    // eslint-disable-next-line no-undef
    Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, logout!"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("token");
            window.location.href = "index.html";
        }
    });
}

// Gán sự kiện logout cho nút bấm
document.addEventListener("DOMContentLoaded", function () {
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    if (!token) {
    // eslint-disable-next-line no-undef
      Swal.fire({
          icon: 'warning',
          title: 'Access Denied',
          text: 'Please login first!',
      }).then(() => {
          window.location.href = "index.html";
      });
  }
    fetch("http://103.163.24.134:8080/api/UserInformation", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.id) {
          document.getElementById("userNameDisplay").textContent = data.fullName;
          
        } else {
          throw new Error("Invalid user data");
        }
      })
      .catch(error => {
        console.error(error);
      });
  });