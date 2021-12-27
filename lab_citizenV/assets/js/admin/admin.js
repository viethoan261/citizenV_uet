function start() {
  getAccountA1(showAccount);
  getTotalByRole();
}
start();
function getAccountA1(callback) {
  fetch("index.php/accounta1")
    .then((reponse) => {
      return reponse.json();
    })
    .then((ret) => {
      return ret.data;
    })
    .then(callback);
}
// Show Tài Khoản Vào Table
function showAccount(inferior) {
  for (var i = 0; i < inferior.length; i++) {
    let r = document.createElement("tr");
    let c1 = document.createElement("td");
    let c2 = document.createElement("td");
    c2.className = "td_userName";
    let c3 = document.createElement("td");
    let c4 = document.createElement("td");
    c1.innerHTML = i + 1;
    c2.innerHTML = inferior[i].userName;
    c3.innerHTML = inferior[i].role;
    var actionHtml =
      "<a href='#deleteInferior' onclick='getUserNameOnDelete(event)' style='display: inline-block;' class='deleteClick delete' data-toggle='modal'><i class='fas fa-trash-alt' style='font-size: 18px;'></i></a>";
    c4.innerHTML = actionHtml;
    c4.style.minWidth = "140px";
    r.appendChild(c1);
    r.appendChild(c2);
    r.appendChild(c3);
    r.appendChild(c4);
    document.getElementById("tbody_admin").appendChild(r);
  }
}
//  Xử Lý Thêm Mới Account
var addAccountClick = document.getElementById("addAccountClick");
addAccountClick.onclick = function (e) {
  var addConfirmAccount = document.getElementById("addConfirmAccount");
  addConfirmAccount.onclick = function (e) {
    var userName = document.querySelector('input[name="userNameA1"').value;
    var pass = document.querySelector('input[name="pass"').value;
    var repass = document.querySelector('input[name="repass"').value;
    var td_userName_list = document.querySelectorAll(
      "#tbody_admin .td_userName"
    );
    var listCurrentName = [];
    for (var i = 0; i < td_userName_list.length; i++) {
      listCurrentName[i] = td_userName_list[i].innerHTML;
    }
    if (userName.length == 0) {
      document.querySelector(".userNameErr").innerHTML =
        "Vui Lòng Nhập UserName";
    } else if (pass.length == 0) {
      document.querySelector(".userNameErr").innerHTML = "";
      document.querySelector(".passErr").innerHTML = "Vui Lòng Nhập Password";
    } else if (repass.length == 0) {
      document.querySelector(".userNameErr").innerHTML = "";
      document.querySelector(".passErr").innerHTML = "";
      document.querySelector(".repassErr").innerHTML =
        "Vui Lòng Nhập Lại Password";
    } else if (repass != pass) {
      document.querySelector(".userNameErr").innerHTML = "";
      document.querySelector(".passErr").innerHTML = "";
      document.querySelector(".repassErr").innerHTML =
        "Mật Khẩu Nhập Lại Không Khớp";
    } else {
      if (listCurrentName.includes(userName)) {
        document.querySelector(".userNameErr").innerHTML =
          "Đã Tồn Tại UserName Này , Vui Lòng Thay Đổi";
      } else {
        document.querySelector(".userNameErr").innerHTML = "";
        document.querySelector(".passErr").innerHTML = "";
        document.querySelector(".repassErr").innerHTML = "";
        addConfirmAccount.setAttribute("data-dismiss", "modal");
        fetch("index.php/addaccounta1", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body:
            '{"userName":"' +
            userName +
            '", "pass":"' +
            pass +
            '", "role":"' +
            "A1" +
            '"}',
        })
          .then((reponse) => {
            return reponse.json();
          })
          .then((ret) => {
            if (ret.data == 1) {
              document.getElementById("tbody_admin").innerHTML = "";
              getAccountA1(showAccount);
            } else {
              alert("Có Lỗi Xảy Ra Trong Quá Trính Thêm Mới");
            }
          });
      }
    }
  };
};
function getUserNameOnDelete(event) {
  var userName =
    event.target.parentNode.parentNode.parentNode.querySelector(
      ".td_userName"
    ).innerHTML;
  var clickDeleteAccount = document.getElementById("clickDeleteAccount");
  clickDeleteAccount.onclick = function (e) {
    clickDeleteAccount.setAttribute("data-dismiss", "modal");
    fetch("index.php/deleteaccounta1/" + userName , {
        method: "DELETE",
      })
        .then((reponse) => {
          return reponse.json();
        })
        .then((ret) => {
          if (ret.data == 1) {
            document.getElementById("tbody_admin").innerHTML = "";
              getAccountA1(showAccount);
          } else {
            alert("Có Lỗi Xảy Ra Trong Quá Trính Xóa");
          }
        });
    // deleteaccounta1
  };
}
function getTotalByRole() {
    fetch('index.php/gettotalbyrole')
    .then(reponse => {
      return reponse.json();
    })
    .then(ret => {
      if(ret.status== "OK") {
        for(var i = 0; i < ret.data.length; i++) {
          if(ret.data[i].role == 'A1') {
            document.querySelector('#totalA1 span').innerHTML = ret.data[i].total;
          } else if(ret.data[i].role == 'A2') {
            document.querySelector('#totalA2 span').innerHTML = ret.data[i].total;
          } else if(ret.data[i].role == 'A3') {
            document.querySelector('#totalA3 span').innerHTML = ret.data[i].total;
          } else if(ret.data[i].role == 'B1') {
            document.querySelector('#totalB1 span').innerHTML = ret.data[i].total;
          } else if(ret.data[i].role == 'B2') {
            document.querySelector('#totalB2 span').innerHTML = ret.data[i].total;
          }
        }
      }
    })
}
