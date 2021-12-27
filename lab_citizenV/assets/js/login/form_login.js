// kiếm tra xem nếu người dùng đã đăng nhập thì trở về trang home
fetch("./index.php/logged")
    .then(reponse => {
        if(reponse.status == 200) {
            return reponse.json();
        }
    })
    .then(ret => {
        if (ret.status == "OK") {
            if (ret.data[0] == 1) {
                document.location.href = "home.html";
            }
        }
})
// Khi Người dùng Bấm Vào Nút Đăng Nhâpk
var btn_Login = document.getElementById('login_btn');
btn_Login.onclick = function(e) {
    var username = document.querySelector('#username').value;
    var pass = document.querySelector('#password').value;
    if(username.length == 0) {
        document.querySelector('.usNameErr').innerHTML = "* Bạn chưa nhập Username";
    } else if(pass.length == 0) {
        document.querySelector('.usNameErr').innerHTML = "";
        document.querySelector('.passErr').innerHTML = "* Bạn chưa nhập mật khẩu";
    } else {
        document.querySelector('.usNameErr').innerHTML = "";
        document.querySelector('.passErr').innerHTML = "";
        fetch("index.php/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: '{"userName":"' + document.getElementById("username").value + 
                '","password":"' + document.getElementById("password").value + '", "loginSubmitted":"1"}'
        })
        .then(resp => {
            if (resp.status == 200) {
                resp.json()
                .then(ret => {
                    if (ret.status == "OK") {
                        if (ret.data == 1) {
                            // Đăng nhập thành công
                            document.location.href = "home.html";
                        }
                        else {
                            document.querySelector('.userErr').innerHTML = "*Sai tên Tài Khoản Hoặc Mật Khẩu , Vui Lòng Đăng Nhập Lại";
                        }
                    } else {
                        // Xử lý lỗi HTTP
                    }
                });
            } else {
                // Xử lý lỗi HTTP
            }
        });
    }
}
// var username_input = document.getElementById('username'),
    password_input = document.getElementById('password');
  /* show the password */
  var show_pass = document.getElementById("show_or_hidden");
  console.log(show_pass);
  show_pass.onclick = function() {
      if (password_input.getAttribute('type') === "password" ) {
          password_input.setAttribute('type', 'text');
          show_pass.style.opacity = '1';
      } else {
          password_input.setAttribute('type', 'password');
          show_pass.style.opacity = '0.6';
      }
  };