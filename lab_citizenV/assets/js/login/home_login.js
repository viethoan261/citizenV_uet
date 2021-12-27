// Khi Ấn Vào Nút Đăng Nhập
var loginClick = document.getElementById("loginClick");
loginClick.onclick = function(e) {
    e.preventDefault();
    document.location.href = "login.html";
}
// Xử lÝ Load trang
fetch("./index.php/logged")
    .then(reponse => {
        if(reponse.status == 200) {
            return reponse.json();
        }
    })
    .then(ret => {
        if (ret.status == "OK") {
            if (ret.data[0] == 1) {
                document.querySelector('.link_login').style.display = "none";
                document.querySelector('.wellcome').style.display = "block";
                document.querySelector('.wellcome').querySelector('span').innerHTML = ret.data[5];
                document.getElementById('manage').style.display = 'list-item';
                if(ret.data[2] != "AD") {
                  document.getElementById('statistical').style.display = 'list-item';
                } else {
                  document.querySelector('.li_admin').style.display = "inline-block";
                  document.querySelector('.li_people').style.display = "none";
                  document.querySelector('.li_inferior').style.display = "none";
                }
                if(ret.data[2] == "B2") {
                  document.querySelector('.li_inferior').style.display = "none";
                  console.log( document.querySelector('#statistical'));
                  document.querySelector('#statistical').style.display = "none";
                }
            }
        }
})
// xử lý đăng xuất
var logoutClick = document.getElementById("logoutClick");
logoutClick.onclick = function (e) {
  fetch("index.php/logout").then((resp) => {
    if (resp.status == 200) {
      resp.json().then((ret) => {
        if (ret.status == "OK") {
          if (ret.data == 1) {
            document.location.href = "login.html";
          }
        }
      });
    }
  });
};