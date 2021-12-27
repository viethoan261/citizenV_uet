function start() {
    getName();
}
start();
// Xử Tên Địa Phương
function getName() {
  var welcome = document.querySelector(".wellcome");
  // Kiểm Tra đăng nhập và trả về Tên Quản Lý
  fetch("./index.php/logged")
    .then((reponse) => {
      if (reponse.status == 200) {
        return reponse.json();
      }
    })
    .then((ret) => {
      if (ret.status == "OK") {
        if (ret.data[0] == 1) {
          welcome.style.display = "inline-block";
          welcome.querySelector("span").innerHTML = ret.data[5];
          var list = "";
          if(ret.data[2] != "A1") {
             list += ret.data[3];
          } else {
            list += "Quốc Gia";
          }
          fetch("./index.php/superior")
            .then((reponse) => {
              if (reponse.status == 200) {
                return reponse.json();
              }
            })
            .then((ret) => {
              if (ret.status == "OK") {
                if (ret.data != null) {
                   if(ret.data.length != 0) {
                    if (typeof ret.data[0].commune != "undefined") {
                      list += ", " + ret.data[0].commune;
                    }
                    if (typeof ret.data[0].district != "undefined") {
                      list += ", " + ret.data[0].district;
                    }
                    if (typeof ret.data[0].province != "undefined") {
                      list += ", " + ret.data[0].province;
                    }
                   }
                   document.querySelector("#listName1 span").innerHTML = list;
                   document.querySelector("#listName2 span").innerHTML = list;
                } else {
                   document.querySelector("#listName1 span").innerHTML = list;
                  document.querySelector("#listName2 span").innerHTML = list;
                }
              }
            });
        }
      }
    });
}
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
