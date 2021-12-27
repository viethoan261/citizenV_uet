// Bắt đầu Load Trang
function start() {
  getName();
  getInferior(showInferior);
  checkEndTime();
  checkEntiled();
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
          var list = "Danh Sách Cấp Dưới ";
          if (ret.data[2] != "A1") {
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
                  if (ret.data.length != 0) {
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
                  document.getElementById("listName").innerHTML = list;
                } else {
                  document.getElementById("listName").innerHTML = list;
                }
              }
            });
        }
      }
    });
}
// Lấy Ra Danh Sách Cấp Dưới
function getInferior(callback) {
  fetch("index.php/inferior")
    .then((reponse) => {
      return reponse.json();
    })
    .then((ret) => {
      return ret.data;
    })
    .then(callback);
}
// Show Cấp Dưới Vào Table
function showInferior(inferior) {
  for (var i = 0; i < inferior.length; i++) {
    let r = document.createElement("tr");
    let c1 = document.createElement("td");
    c1.setAttribute("data-label",'STT');
    let c2 = document.createElement("td");
    c2.setAttribute("data-label",'Mã');
    c2.className = "td_id";
    let c3 = document.createElement("td");
    c3.setAttribute("data-label",'Tên');
    c3.className = "td_name";
    let c4 = document.createElement("td");
    c4.setAttribute("data-label",'Quyền');
    c4.setAttribute("style",'color:black;');
    let c5 = document.createElement("td");
    c5.setAttribute("data-label",'Tiến Độ');
    let c6 = document.createElement("td");
    c6.setAttribute("data-label",'Chức vụ');
    c6.className = "td_role";
    let c7 = document.createElement("td");
    c7.setAttribute("data-label",'Actions');
    c1.innerHTML = i + 1;
    c2.innerHTML = inferior[i].id;
    c3.innerHTML = inferior[i].name;
    if (inferior[i].entitled == "Có Quyền") {
      c4.style.color = "#5cb85c";
      c4.innerHTML =
        inferior[i].entitled +
        "<a  href='#deleteEntitled' data-toggle='modal' onclick='removePermissions(event)' style='margin-left: 20px; padding: 4px; font-size: 11px; color:#fff;font-weight: normal;' type='button' class='btn btn-danger'>Xóa Quyền</a>";
    } else {
      c4.style.color = "#F44336";
      c4.innerHTML =
        inferior[i].entitled +
        "<a  href='#addEntitled' data-toggle='modal' onclick='grantPermission(event)' style='margin-left: 48px; padding: 4px; font-size: 11px;color:#fff;font-weight: normal;' type='button' class='btn btn-success'>Cấp Quyền</a>";
    }
    c4.style.fontSize = "18px";
    c5.innerHTML = inferior[i].progress;
    if (inferior[i].progress == "Hoàn Thành") {
      c5.style.color = "#5cb85c";
    } else {
      c5.style.color = "#F44336";
    }
    c6.innerHTML = inferior[i].role;
    var actionHtml =
      "<a class='infoClick' href='#infoInferior' onclick='getInferiorById(event)' data-toggle='modal'><i style='color:cornflowerblue; cursor: pointer;'class='fas fa-search-plus' style='font-size: 16px;'></i></a>";
    actionHtml +=
      "<a href='#deleteInferior' onclick='getIdOnDelete(event)' style='display: inline-block;' class='btn deleteClick delete' data-toggle='modal'><i class='fas fa-trash-alt' style='font-size: 18px;'></i></a>";
    c7.innerHTML = actionHtml;
    c7.style.minWidth = "140px";
    r.appendChild(c1);
    r.appendChild(c2);
    r.appendChild(c3);
    r.appendChild(c4);
    r.appendChild(c5);
    r.appendChild(c6);
    r.appendChild(c7);
    document.getElementById("tbody_inferior").appendChild(r);
  }
}
// Xử Lý Xem Có Quyền Hay Không 
function checkEntiled() {
    fetch("index.php/checkentiled")
    .then(reponse => {
      return reponse.json();
    })
    .then(ret => {
      if(ret.data[0] == "Có Quyền" || ret.data[0].entitled == "Có Quyền") {
        if(document.querySelector('a[href="#deleteInferior"]') != null) {
          document.querySelector('a[href="#deleteInferior"]').removeAttribute('disabled');
        }
        document.querySelector('a[href="#addLocation"]').removeAttribute('disabled');
        document.querySelector('.entiledErr').style.display = "none";
        if(document.querySelector('a[href="#addEntitled"]') != null) {
          document.querySelector('a[href="#addEntitled"]').removeAttribute('disabled');
        }
      } else {
        if(document.querySelector('a[href="#deleteInferior"]') != null) {
          document.querySelector('a[href="#deleteInferior"]').setAttribute('disabled' , "true")
        }
        document.querySelector('a[href="#addLocation"]').setAttribute('disabled' , "true");
        document.querySelector('.entiledErr').style.display = "block";
        if(document.querySelector('a[href="#addEntitled"]') != null) {
          document.querySelector('a[href="#addEntitled"]').setAttribute('disabled' , "true");
        }
      }
    })
}
// Xử Lý Click Xem Thông Tin Cấp Dưới
function getInferiorById(event) {
  var id =
    event.target.parentNode.parentNode.parentNode.querySelector(
      ".td_id"
    ).innerHTML;
  var role =
    event.target.parentNode.parentNode.parentNode.querySelector(
      ".td_role"
    ).innerHTML;
  document.querySelector('#infoInferior input[name="startTime"]').value = "";
  document.querySelector('#infoInferior input[name="endTime"]').value = "";
  fetch("index.php/inferior/" + id + "/" + role)
    .then((reponse) => {
      return reponse.json();
    })
    .then((ret) => {
      document.querySelector('#infoInferior input[name="id"]').value =
        ret.data[0].id;
      document.querySelector('#infoInferior input[name="name"]').value =
        ret.data[0].name;
      document.querySelector('#infoInferior input[name="quyen"]').value =
        ret.data[0].entitled;
      if (ret.data[0].entitled == "Có Quyền") {
        document.querySelector(
          '#infoInferior input[name="quyen"]'
        ).style.color = "#5cb85c";
      } else {
        document.querySelector(
          '#infoInferior input[name="quyen"]'
        ).style.color = "#c9302c";
      }
      document.querySelector('#infoInferior input[name="tienDo"]').value =
        ret.data[0].progress;
      if (ret.data[0].progress == "Hoàn Thành") {
        document.querySelector(
          '#infoInferior input[name="tienDo"]'
        ).style.color = "#5cb85c";
      } else {
        document.querySelector(
          '#infoInferior input[name="tienDo"]'
        ).style.color = "#c9302c";
      }
      if (typeof ret.data[0].startTime != "undefined") {
        document.querySelector('#infoInferior input[name="startTime"]').value =
          ret.data[0].startTime;
      }
      if (typeof ret.data[0].endTime != "undefined") {
        document.querySelector('#infoInferior input[name="endTime"]').value =
          ret.data[0].endTime;
      }
    });
}
// Lấy Ra số id khi ấn vào xóa và xóa địa phương
function getIdOnDelete(event) {
  var id =
    event.target.parentNode.parentNode.parentNode.querySelector(
      ".td_id"
    ).innerHTML;
  var role =
    event.target.parentNode.parentNode.parentNode.querySelector(
      ".td_role"
    ).innerHTML;
  // Xác Nhận Xóa Địa Phương
  var clickDeleteInferior = document.getElementById("clickDeleteInferior");
  clickDeleteInferior.onclick = function (e) {
    fetch("index.php/inferior/" + id + "/" + role, {
      method: "DELETE",
    })
      .then((reponse) => {
        return reponse.json();
      })
      .then((ret) => {
        if (ret.data == 2) {
          document.getElementById("tbody_inferior").innerHTML = "";
          getInferior(showInferior);
        } else {
          alert("Có Lỗi Xảy Ra Trong Quá Trính Xóa");
        }
      });
  };
  clickDeleteInferior.setAttribute("data-dismiss", "modal");
}
function checkHaNoi(arr) {
  var count = 0;
    for(var i = 0; i < arr.length; i++) {
      if(arr[i].toLowerCase().includes("thành phố hà n")) {
        count++;
      } 
    }
    if(count > 0) {
      return true;
    } else {
      return false;
    }
}
// Xử Lý Cấp Mã Và Tài Khoản
var addClick = document.getElementById("addClick");
addClick.onclick = function (e) {
  document.querySelector('input[name="nameLocation"]').innerHTML = "";
  document.querySelector('input[name="idLocation"]').innerHTML = "";
  document.querySelector('input[name="pass"]').innerHTML = "";
  document.querySelector('input[name="repass"]').innerHTML = "";
  var role = "";
  var name = "";
  var id = "";
  var nameParentProvine = "";
  fetch("./index.php/logged")
    .then((reponse) => {
      if (reponse.status == 200) {
        return reponse.json();
      }
    })
    .then((ret) => {
      if (ret.status == "OK") {
        if (ret.data[0] == 1) {
          role = ret.data[2];
          name = ret.data[3];
          id = ret.data[1];
          if (role == "A1") {
            id = 0;
            fetch("local.json")
              .then((resp) => {
                return resp.json();
              })
              .then((ret) => {
                var selectLocation = document.querySelector(
                  "select[name='nameLocation']"
                );
                var listTdName = document.querySelectorAll("#tbody_inferior tr td.td_name");
                var listNameCurrent = [];
                for(var i = 0; i < listTdName.length; i++) {
                    listNameCurrent[i] = listTdName[i].innerHTML;
                }
                for (var i = 0; i < ret.length; i++) {
                  var option = document.createElement("option");
                  if(!checkHaNoi(listNameCurrent)) {
                    if(!listNameCurrent.includes(ret[i].name)) {
                      option.innerHTML = ret[i].name;
                      option.value = ret[i].name;
                      selectLocation.appendChild(option);
                    }
                  } else {
                    if(!listNameCurrent.includes(ret[i].name) && !ret[i].name.toLowerCase().includes("thành phố hà n")) {
                      option.innerHTML = ret[i].name;
                      option.value = ret[i].name;
                      selectLocation.appendChild(option);
                    }
                  }
                }
              });
          } else if (role == "A2") {
            fetch("local.json")
              .then((resp) => {
                return resp.json();
              })
              .then((ret) => {
                var indexProvince = 1;
                for (var i = 0; i < ret.length; i++) {
                  if (ret[i].name.toLowerCase() == name.trim().toLowerCase()) {
                    indexProvince = i;
                  }
                  if (ret[i].name.toLowerCase().includes("thành phố hà n")) {
                    indexProvince = i;
                  }
                }
                var districts = ret[indexProvince].districts;
                var selectLocation = document.querySelector(
                  "select[name='nameLocation']"
                );
                var labelIdLocation = document.getElementById("lbidLocation");
                var listTdName = document.querySelectorAll("#tbody_inferior tr td.td_name");
                var listNameCurrent = [];
                for(var i = 0; i < listTdName.length; i++) {
                    listNameCurrent[i] = listTdName[i].innerHTML;
                }
                for (var i = 0; i < districts.length; i++) {
                  if(!listNameCurrent.includes(districts[i].name)) {
                  var option = document.createElement("option");
                  option.innerHTML = districts[i].name;
                  option.value = districts[i].name;
                  selectLocation.appendChild(option);
                  }
                }
                labelIdLocation.innerHTML =
                  "Mã Địa Phương (" + id + "01 - " + id + "99)";
              });
          } else if (role == "A3") {
            fetch("./index.php/superior")
              .then((reponse) => {
                if (reponse.status == 200) {
                  return reponse.json();
                }
              })
              .then((ret) => {
                if (ret.status == "OK") {
                  if (ret.data != null) {
                    if (ret.data.length != 0) {
                      if (typeof ret.data[0].province != "undefined") {
                        nameParentProvine = ret.data[0].province;
                      }
                    }
                  }
                  //  Lấy ra dữ Liệu Con
                  fetch("local.json")
                    .then((resp) => {
                      return resp.json();
                    })
                    .then((ret) => {
                      var indexProvince = 1;
                      var indexDistrict = 1; 
                      for (var i = 0; i < ret.length; i++) {
                        if (
                          ret[i].name.toLowerCase() == name.trim().toLowerCase()
                        ) {
                          indexProvince = i;
                        }
                      }
                      var districts = ret[indexProvince].districts;
                      for (var i = 0; i < districts.length; i++) {
                        if (districts[i].name.toLowerCase() == name.trim().toLowerCase()) {
                          indexDistrict = i;
                        }
                      }
                      var communes = districts[indexDistrict].wards;
                      var listTdName = document.querySelectorAll("#tbody_inferior tr td.td_name");
                      var listNameCurrent = [];
                      for(var i = 0; i < listTdName.length; i++) {
                          listNameCurrent[i] = listTdName[i].innerHTML;
                      }
                      var selectLocation = document.querySelector("select[name='nameLocation']");
                      var labelIdLocation = document.getElementById("lbidLocation");
                      for (var i = 0; i < communes.length; i++) {
                        if(!listNameCurrent.includes(communes[i].prefix + " " +  communes[i].name)) {
                        var option = document.createElement("option");
                        option.innerHTML = communes[i].prefix + " " +  communes[i].name;
                        option.value = communes[i].prefix + " " +  communes[i].name;
                        selectLocation.appendChild(option);
                        }
                      }
                      labelIdLocation.innerHTML = "Mã Địa Phương (" + id + "01 - " + id + "99)";
                    });
                }
              });
          } else if (role == "B1") {
            document.querySelector('.location_child_select').style.display = "none";
            document.querySelector('.location_child_input').style.display = "block";
            var labelIdLocation = document.getElementById("lbidLocation");
            labelIdLocation.innerHTML = "Mã Địa Phương (" + id + "01 - " + id + "99)";
          } 

          //  XỬ Lý Xác Nhận Thêm Mới
          var nameLocation = document.querySelector('input[name="nameLocation"]');
          var idLocation = document.querySelector('input[name="idLocation"]');
           var passElement = document.querySelector('input[name="pass"]');
           var repassElement = document.querySelector('input[name="repass"]');
           idLocation.innerHTML = "";
           passElement.innerHTML = "";
           idLocation.innerHTML = "";
          if(nameLocation.parentNode.style.display == "none") {
            idLocation.focus();
          } else {
            nameLocation.focus();
          }
          nameLocation.onkeydown = function(e) {
            if(e.keyCode == 13) {
              e.preventDefault();
              idLocation.focus();
            }
          }
          idLocation.onkeydown = function(e) {
            if(e.keyCode == 13) {
                e.preventDefault();
                passElement.focus();
            }
        }
        passElement.onkeydown = function(e) {
          if(e.keyCode == 13) {
              e.preventDefault();
              repassElement.focus();
          }
        }
          var addConfirmLocal = document.getElementById("addConfirmLocal");
            addConfirmLocal.onclick = function (e) {
              var idl = idLocation.value;
              var pass = passElement.value;
              var repass = repassElement.value;
              var tdIdList = document.querySelectorAll('#tbody_inferior tr .td_id');
              var idlist = [];
              for(var i = 0; i < tdIdList.length; i++) {
                idlist[i] = tdIdList[i].innerHTML;
              }
              if(nameLocation.parentNode.style.display == "none") {
                if(idl.length == 0) {
                    document.querySelector('.idErr').innerHTML = "* Vui Lòng Nhập Mã Địa Phương";
                } else if(pass.length == 0) {
                  document.querySelector('.passErr').innerHTML = "* Vui Lòng Nhập Mật Khẩu";
                  document.querySelector('.idErr').innerHTML = "";
                } else if(repass.length == 0) {
                  document.querySelector('.repassErr').innerHTML = "* Vui Lòng Nhập Lại Mật Khẩu";
                  document.querySelector('.passErr').innerHTML = "";
                  document.querySelector('.idErr').innerHTML = "";
                } else {
                  if(role == "A1") {
                    if(isNaN(parseInt(idl))) {
                      document.querySelector('.idErr').innerHTML = "* Mã phải đúng định dạng số";
                    } else if(parseInt(idl) <= 0 || parseInt(idl) > 63) {
                      document.querySelector('.repassErr').innerHTML = "";
                      document.querySelector('.idErr').innerHTML = "* Mã phải đúng định dạng số từ 01 -> 63";
                    } else if(repass != pass) {
                      document.querySelector('.repassErr').innerHTML = "* Mật Khẩu Nhập Lại Không Chính Xác";
                    } else if(idlist.includes(idl)) {
                      document.querySelector('.idErr').innerHTML = "* Mã Địa Phương Đã Tồn Tại Vui lòng Nhập Lại";
                    } 
                    else {
                      addConfirmLocal.setAttribute("data-dismiss", "modal");
                      document.querySelector('.idErr').innerHTML = "";
                      var localName =  document.querySelector("select[name='nameLocation']").value;
                      fetch(
                        "index.php/addlocal/" + idl,
                        {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body:
                            '{"id":"' + idl +
                            '", "localName":"' + localName +
                            '", "roleParent":"' + role +
                            '", "password":"' + pass +
                            '"}' , 
                        }
                      ) .then(reponse => {
                        return reponse.json();
                      }) .then(ret => {
                        if (ret.data == 2) {
                          document.getElementById("tbody_inferior").innerHTML = "";
                          getInferior(showInferior);
                        } else {
                          alert("Có Lỗi Xảy Ra Trong Quá Trính Thêm Mới");
                        }
                      })
                    }
                  } else {
                    if(isNaN(parseInt(idl))) {
                      document.querySelector('.idErr').innerHTML = "* Mã phải đúng định dạng số";
                    } else if(parseInt(idl) <= (id * 100) || parseInt(idl) > (id * 100 + 99) ) {
                      document.querySelector('.idErr').innerHTML = "* Mã phải đúng định dạng số từ " + (id * 100) + "-> " + (id * 100 + 99);
                    } else if(repass != pass) {
                      document.querySelector('.idErr').innerHTML = "";
                      document.querySelector('.repassErr').innerHTML = "* Mật Khẩu Nhập Lại Không Chính Xác";
                    } else if(idlist.includes(idl)) {
                      document.querySelector('.idErr').innerHTML = "* Mã Đại Phương Đã Tồn Tại Vui lòng Nhập Lại";
                    } else {
                      document.querySelector('.idErr').innerHTML = "";
                      document.querySelector('.repassErr').innerHTML = "";
                      var localName =  document.querySelector("select[name='nameLocation']").value;
                      addConfirmLocal.setAttribute("data-dismiss", "modal");
                      fetch(
                        "index.php/addlocal/" + idl,
                        {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body:
                            '{"id":"' + idl +
                            '", "localName":"' + localName +
                            '", "roleParent":"' + role +
                            '", "password":"' + pass +
                            '"}' , 
                        }
                      ) .then(reponse => {
                        return reponse.json();
                      }) .then(ret => {
                        if (ret.data == 2) {
                          document.getElementById("tbody_inferior").innerHTML = "";
                          getInferior(showInferior);
                        } else {
                          alert("Có Lỗi Xảy Ra Trong Quá Trính Thêm Mới");
                        }
                      })
                    }
                  }
                }
              } else {
                var nameLocationElement = document.querySelector('input[name="nameLocation"');
                var nameLocal = nameLocationElement.value;
                var listTdName = document.querySelectorAll("#tbody_inferior tr td.td_name");
                var listNameCurrent = [];
                for(var i = 0; i < listTdName.length; i++) {
                    listNameCurrent[i] = listTdName[i].innerHTML;
                }
                if(nameLocal.length == 0) {
                  document.querySelector('.nameLocalErr').innerHTML = "Vui Lòng Nhập Tên Cộng Tác Viên";
                } else if(idl.length == 0) {
                  document.querySelector('.nameLocalErr').innerHTML = "";
                  document.querySelector('.idErr').innerHTML = "* Vui Lòng Nhập Mã Địa Phương";
                } else if(pass.length == 0) {
                  document.querySelector('.nameLocalErr').innerHTML = "";
                document.querySelector('.passErr').innerHTML = "* Vui Lòng Nhập Mật Khẩu";
                document.querySelector('.idErr').innerHTML = "";
                } else if(repass.length == 0) {
                document.querySelector('.repassErr').innerHTML = "* Vui Lòng Nhập Lại Mật Khẩu";
                document.querySelector('.passErr').innerHTML = "";
                document.querySelector('.idErr').innerHTML = "";
                document.querySelector('.nameLocalErr').innerHTML = "";
              } else {
                document.querySelector('.nameLocalErr').innerHTML = "";
                if(isNaN(parseInt(idl))) {
                  document.querySelector('.idErr').innerHTML = "* Mã phải đúng định dạng số";
                } else if(parseInt(idl) <= (id * 100) || parseInt(idl) > (id * 100 + 99) ) {
                  document.querySelector('.idErr').innerHTML = "* Mã phải đúng định dạng số từ " + (id * 100) + "-> " + (id * 100 + 99);
                } else if(repass != pass) {
                  document.querySelector('.idErr').innerHTML = "";
                  document.querySelector('.repassErr').innerHTML = "* Mật Khẩu Nhập Lại Không Chính Xác";
                } else if(idlist.includes(idl)) {
                  document.querySelector('.idErr').innerHTML = "* Mã Đại Phương Đã Tồn Tại Vui lòng Nhập Lại";
                } else if(listNameCurrent.includes(nameLocal)) {
                  document.querySelector('.idErr').innerHTML = "";
                  document.querySelector('.repassErr').innerHTML = "";
                  document.querySelector('.nameLocalErr').innerHTML = "*Tên Cộng Tác Viên Đã Tồn Tại Vui Lòng Nhập Tên Khác";
                } else {
                  document.querySelector('.idErr').innerHTML = "";
                  addConfirmLocal.setAttribute("data-dismiss", "modal");
                  fetch(
                    "index.php/addlocal/" + idl,
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body:
                        '{"id":"' + idl +
                        '", "localName":"' + nameLocal +
                        '", "roleParent":"' + role +
                        '", "password":"' + pass +
                        '"}' , 
                    }
                  ) .then(reponse => {
                    return reponse.json();
                  }) .then(ret => {
                    if (ret.data == 2) {
                      document.getElementById("tbody_inferior").innerHTML = "";
                      getInferior(showInferior);
                    } else {
                      alert("Có Lỗi Xảy Ra Trong Quá Trình Thêm Mới");
                    }
                  })
                }
                }
              }
          };
        }
      }
    });
  };

// Xử Lý Cấp Quyền
function grantPermission(event) {
  var addConfirmEntitled = document.getElementById("addConfirmEntitled");
  var id = event.target.parentNode.parentNode.querySelector(".td_id").innerHTML;
  var role =
    event.target.parentNode.parentNode.querySelector(".td_role").innerHTML;
  var date = new Date();
  var curentDate =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    document.querySelector(
      '#addEntitled input[name="startTime"]'
    ).value = curentDate;
  addConfirmEntitled.onclick = function (e) {
    var startTime = document.querySelector(
      '#addEntitled input[name="startTime"]'
    ).value;
    var endTime = document.querySelector(
      '#addEntitled input[name="endTime"]'
    ).value;
    if (startTime == "") {
      document.querySelector(".errStart").innerHTML =
        "Vui Lòng Nhập Ngày Bắt Đầu";
    } else if (endTime == "") {
      document.querySelector(".errStart").innerHTML = "";
      document.querySelector(".errEnd").innerHTML =
        "Vui Lòng Nhập Ngày Kết Thúc";
    } else if (endTime < startTime) {
      document.querySelector(".errStart").innerHTML = "";
      document.querySelector(".errEnd").innerHTML =
        "Ngày Kết Thúc Phải Lớn Hơn Ngày Bắt Đầu";
    } else if (startTime < curentDate) {
      document.querySelector(".errStart").innerHTML =
        "Ngày Bắt Đầu Không Được Nhỏ Hơn Ngày Hiện Tại";
      document.querySelector(".errEnd").innerHTML = "";
    } else {
      document.querySelector(".errEnd").innerHTML = "";
      document.querySelector(".errStart").innerHTML = "";
      fetch("index.php/addEntitled/" + id, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body:
          '{"id":"' +
          id +
          '", "role":"' +
          role +
          '", "startTime":"' +
          startTime +
          '", "endTime":"' +
          endTime +
          '"}',
      })
        .then((reponse) => {
          return reponse.json();
        })
        .then((ret) => {
          if (ret.data == 2) {
            document.getElementById("tbody_inferior").innerHTML = "";
            getInferior(showInferior);
          } else {
            alert("Có Lỗi Xảy Ra Trong Quá Trính Xóa");
          }
        });
      addConfirmEntitled.setAttribute("data-dismiss", "modal");
    }
  };
}
// Xử Lý Xóa Quyền
function removePermissions(event) {
  var id = event.target.parentNode.parentNode.querySelector(".td_id").innerHTML;
  var role =
    event.target.parentNode.parentNode.querySelector(".td_role").innerHTML;
  var confirmDeleteEntitled = document.getElementById("confirmDeleteEntitled");
  confirmDeleteEntitled.onclick = function (e) {
    fetch("index.php/deleteEntitled/" + id + "/" + role, {
      method: "DELETE",
    })
      .then((reponse) => {
        return reponse.json();
      })
      .then((ret) => {
        if (ret.data == 2) {
          document.getElementById("tbody_inferior").innerHTML = "";
          getInferior(showInferior);
        } else {
          alert("Có Lỗi Xảy Ra Trong Quá Trính Xóa");
        }
      });
    confirmDeleteEntitled.setAttribute("data-dismiss", "modal");
  };
}
function removePermissionsByEndTime(id, role) {
  fetch("index.php/deleteEntitled/" + id + "/" + role, {
    method: "DELETE",
  })
    .then((reponse) => {
      return reponse.json();
    })
    .then((ret) => {
      if (ret.data == 2) {
        document.getElementById("tbody_inferior").innerHTML = "";
        getInferior(showInferior);
      } else {
        alert("Có Lỗi Xảy Ra Trong Quá Trính Xóa");
      }
    });
}
// Kiểm Tra xem endTime Đã Hết Thời Gian chưa
function checkEndTime() {
  fetch("index.php/checkendtime")
    .then((reponse) => {
      return reponse.json();
    })
    .then((ret) => {
      if (ret.status == "OK") {
        for (var i = 0; i < ret.data.length; i++) {
          var date = new Date();
          var curentDate =
            date.getFullYear() +
            "-" +
            (date.getMonth() + 1) +
            "-" +
            date.getDate();
          if (ret.data[i].endTime < curentDate) {
            removePermissionsByEndTime(ret.data[i].id, ret.data[i].role);
          }
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
