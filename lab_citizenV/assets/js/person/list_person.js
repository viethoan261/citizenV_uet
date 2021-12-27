function start() {
  checkEntiled();
  getPeoPle(renderPeople);
  getName();
}
start();
// Lấy Ra danh sách người dân
function getPeoPle(callback) {
  fetch("index.php/people").then((resp) => {
    if (resp.status == 200) {
      return resp
        .json()
        .then((ret) => {
          if (ret.status == "OK") {
            return ret.data;
          }
        })
        .then(callback);
    }
  });
}
// In Danh Sách Người Dân Vào Table
function renderPeople(people) {
   if(people.length != 0) {
    for (let i = 0; i < people.length; i++) {
      let r = document.createElement("tr");
      let c1 = document.createElement("td");
      c1.setAttribute("data-label",'STT')
     // c1.setAttribute('label','Stt');
      let c2 = document.createElement("td");
      c2.setAttribute("data-label",'CMND')
      let c3 = document.createElement("td");
      c3.setAttribute("data-label",'Họ Tên')
      let c4 = document.createElement("td");
      c4.setAttribute("data-label",'Quê Quán')
      let c5 = document.createElement("td");
      c5.setAttribute("data-label",'Giới Tính')
      let c6 = document.createElement("td");
      c6.setAttribute("data-label",'Actions')
      // progress
      c1.innerHTML = i + 1;
      c2.innerHTML = people[i].cmnd;
      c2.className = "td_cmnd";
      c3.innerHTML = people[i].hoVaTen;
      c4.innerHTML = people[i].queQuan;
      c5.innerHTML = people[i].gioiTinh;
      var actionHtml =
        "<a onclick='getInfoById(event)' class='infoClick' href='#infoPerson' data-toggle='modal'><i style='color:cornflowerblue; cursor: pointer;'class='fas fa-search-plus' style='font-size: 16px;'></i></a>";
      actionHtml +=
        "<a onclick='getEditById(event)' href='#editPerson' style='display: none;'' class='btn editClick edit' data-toggle='modal'><i class='fas fa-user-edit' style='font-size: 18px;'></i></a>";
      actionHtml +=
        "<a href='#deletePerson'  onclick='getCmndOnDelete(event)' style='display: none;' class='btn deleteClick delete' data-toggle='modal'><i class='fas fa-user-minus' style='font-size: 18px;'></i></a>";
      c6.innerHTML = actionHtml;
      c6.style.minWidth = "180px";
      r.appendChild(c1);
      r.appendChild(c2);
      r.appendChild(c3);
      r.appendChild(c4);
      r.appendChild(c5);
      r.appendChild(c6);
      document.getElementById("tbody_people").appendChild(r);
      checkPermissions();
    }
   } else {
    fetch("./index.php/logged")
    .then((reponse) => {
      if (reponse.status == 200) {
        return reponse.json();
      }
    })
    .then((ret) => {
      if (ret.status == "OK") {
        if (ret.data[0] == 1) {
          if (ret.data[2] == "B1" || ret.data[2] == "B2") {
            document.getElementById("addClick").style.display = "block";
            document.getElementById('completedReport').style.display = "inline";
            document.getElementById('downloadForm').style.display = "inline";
          } else {
            document.querySelector('.entiledErr').style.display = "none";
          }
        }
      }
    });
   }
}
// Lấy Ra Danh Sách Cấp Trên
function getSuperior() {
  var superior = [];
  return superior;
}
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
          var list = "Danh Sách Người Dân ";
          if(ret.data[2] == 'B2') {
            document.querySelector('a[href="./statistical.html"]').style.display = "none";
          }
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
function checkEntiled() {
  fetch("index.php/checkentiled")
  .then(reponse => {
    return reponse.json();
  })
  .then(ret => {
    if(ret.data[0] == "Có Quyền" || ret.data[0].entitled == "Có Quyền") {
      if(document.querySelector('a[href="#addPerson"]') != null) {
        document.querySelector('a[href="#addPerson"]').removeAttribute('disabled');
      }
      if(document.querySelector('a[href="#deletePerson"]') != null) {
        document.querySelector('a[href="#deletePerson"]').removeAttribute('disabled');
      }
      if(document.querySelector('a[href="#editPerson"]') != null) {
        document.querySelector('a[href="#editPerson"]').removeAttribute('disabled');
      }
      document.querySelector('.entiledErr').style.display = "none";
    } else {
      if(document.querySelector('a[href="#addPerson"]') != null) {
        document.querySelector('a[href="#addPerson"]').setAttribute('disabled' , "true");
      }
      if(document.querySelector('a[href="#deletePerson"]') != null) {
        document.querySelector('a[href="#deletePerson"]').setAttribute('disabled' , "true");
      }
      if(document.querySelector('a[href="#editPerson"]') != null) {
        document.querySelector('a[href="#editPerson"]').setAttribute('disabled' , "true");
      }
      document.querySelector('.entiledErr').style.display = "block";
    }
  })
}
// Kiểm tra xem có phải xã và phường thì có thêm sửa xóa
function checkPermissions() {
  fetch("./index.php/logged")
    .then((reponse) => {
      if (reponse.status == 200) {
        return reponse.json();
      }
    })
    .then((ret) => {
      if (ret.status == "OK") {
        if (ret.data[0] == 1) {
          if (ret.data[2] == "B1" || ret.data[2] == "B2") {
            document.getElementById("addClick").style.display = "block";
            document.getElementById('completedReport').style.display = "inline";
            var editClicks = document.querySelectorAll(".editClick");
            var deleteClicks = document.querySelectorAll(".deleteClick");
            editClicks.forEach(function (editClick) {
              editClick.style.display = "inline";
            });
            deleteClicks.forEach(function (deleteClick) {
              deleteClick.style.display = "inline";
            });
          }
        }
      }
    });
}
// xử Lý Báo Cáo Hoàn Thành
var completedReport = document.getElementById('completedReport');
completedReport.onclick = function(e) {
  fetch(
    "index.php/completedreport" ,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    })
  .then(reponse => {
    return reponse.json();
  })
  .then(ret => {
      console.log(ret);
  })
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
// Xử Lý Click Xem Thông Tin Người Dân
function getInfoById(event) {
  var cmnd =
    event.target.parentNode.parentNode.parentNode.querySelector(
      ".td_cmnd"
    ).innerHTML;
  fetch("index.php/people/" + cmnd)
    .then((reponse) => {
      return reponse.json();
    })
    .then((ret) => {
      document.querySelector('#infoPerson input[name="hoVaTen"]').value =
        ret.data[0].hoVaTen;
      document.querySelector('#infoPerson input[name="cmnd"]').value =
        ret.data[0].cmnd;
      document.querySelector('#infoPerson input[name="ngaySinh"]').value =
        ret.data[0].ngaySinh;
      document.querySelector('#infoPerson input[name="gioiTinh"]').value =
        ret.data[0].gioiTinh;
      document.querySelector('#infoPerson input[name="ngheNghiep"]').value =
        ret.data[0].ngheNghiep;
      document.querySelector('#infoPerson input[name="trinhDoVanHoa"]').value =
        ret.data[0].trinhDoVanHoa;
      document.querySelector('#infoPerson input[name="danToc"]').value =
        ret.data[0].danToc;
      document.querySelector('#infoPerson input[name="tonGiao"]').value =
        ret.data[0].tonGiao;
      document.querySelector('#infoPerson input[name="dcThuongTru"]').value =
        ret.data[0].diaChiThuongTru;
      document.querySelector('#infoPerson input[name="dcTamTru"]').value =
        ret.data[0].diaChiTamTru;
      document.querySelector('#infoPerson input[name="queQuan"]').value =
        ret.data[0].queQuan;
    });
}
// Lấy Ra thông tin Person khi edit
function getEditById(event) {
  var cmnd =
    event.target.parentNode.parentNode.parentNode.querySelector(
      ".td_cmnd"
    ).innerHTML;
  fetch("index.php/people/" + cmnd)
    .then((reponse) => {
      return reponse.json();
    })
    .then((ret) => {
      document.querySelector('#editPerson input[name="id"]').value =
        ret.data[0].id;
      document.querySelector('#editPerson input[name="hoVaTen"]').value =
        ret.data[0].hoVaTen;
      document.querySelector('#editPerson input[name="cmnd"]').value =
        ret.data[0].cmnd;
      document.querySelector('#editPerson input[name="ngaySinh"]').value =
        ret.data[0].ngaySinh;
      document.querySelector('#editPerson input[name="gioiTinh"]').value =
        ret.data[0].gioiTinh;
      document.querySelector('#editPerson input[name="ngheNghiep"]').value =
        ret.data[0].ngheNghiep;
      document.querySelector('#editPerson input[name="trinhDoVanHoa"]').value =
        ret.data[0].trinhDoVanHoa;
      document.querySelector('#editPerson input[name="danToc"]').value =
        ret.data[0].danToc;
      document.querySelector('#editPerson input[name="tonGiao"]').value =
        ret.data[0].tonGiao;
      document.querySelector('#editPerson input[name="dcThuongTru"]').value =
        ret.data[0].diaChiThuongTru;
      document.querySelector('#editPerson input[name="dcTamTru"]').value =
        ret.data[0].diaChiTamTru;
      document.querySelector('#editPerson input[name="queQuan"]').value =
        ret.data[0].queQuan;
    });
}
//  Xử lý xác nhận edit
var editConfirm = document.getElementById("editConfirm");
editConfirm.onclick = function (e) {
  fetch(
    "index.php/people/" +
      document.querySelector('#editPerson input[name="id"]').value,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body:
        '{"id":"' +
        document.querySelector('#editPerson input[name="id"]').value +
        '","hoVaTen":"' +
        document.querySelector('#editPerson input[name="hoVaTen"]').value +
        '", "cmnd":"' +
        document.querySelector('#editPerson input[name="cmnd"]').value +
        '", "ngaySinh":"' +
        document.querySelector('#editPerson input[name="ngaySinh"]').value +
        '", "gioiTinh":"' +
        document.querySelector('#editPerson input[name="gioiTinh"]').value +
        '", "ngheNghiep":"' +
        document.querySelector('#editPerson input[name="ngheNghiep"]').value +
        '", "trinhDoVanHoa":"' +
        document.querySelector('#editPerson input[name="trinhDoVanHoa"]')
          .value +
        '", "danToc":"' +
        document.querySelector('#editPerson input[name="danToc"]').value +
        '", "tonGiao":"' +
        document.querySelector('#editPerson input[name="tonGiao"]').value +
        '", "dcThuongTru":"' +
        document.querySelector('#editPerson input[name="dcThuongTru"]').value +
        '", "dcTamTru":"' +
        document.querySelector('#editPerson input[name="dcTamTru"]').value +
        '", "queQuan":"' +
        document.querySelector('#editPerson input[name="queQuan"]').value +
        '"}',
    }
  )
    .then((reponse) => {
      return reponse.json();
    })
    .then((ret) => {
      if (ret.data == 1) {
        document.getElementById("tbody_people").innerHTML = "";
        getPeoPle(renderPeople);
      } else {
        alert("Có Lỗi Xảy Ra Trong Quá trình Update");
      }
    });
};
//  Lấy ra id của tk đang sử dụng
function resetFromAdd() {
  fetch("./index.php/logged")
    .then((reponse) => {
      if (reponse.status == 200) {
        return reponse.json();
      }
    })
    .then((ret) => {
      if (ret.status == "OK") {
        if (ret.data[0] == 1) {
          document.querySelector('#addPerson input[name="belongToVillage"]').value = ret.data[1];
          document.querySelector('#addPerson input[name="hoVaTen"]').value = "";
          document.querySelector('#addPerson input[name="cmnd"]').value = "";
          document.querySelector('#addPerson input[name="ngaySinh"]').value = "";
          document.querySelector('#addPerson input[name="gioiTinh"]').value = "";
          document.querySelector('#addPerson input[name="ngheNghiep"]').value = "";
          document.querySelector('#addPerson input[name="trinhDoVanHoa"]').value = "";
          document.querySelector('#addPerson input[name="danToc"]').value = "";
          document.querySelector('#addPerson input[name="tonGiao"]').value = "";
          document.querySelector('#addPerson input[name="dcThuongTru"]').value = "";
          document.querySelector('#addPerson input[name="dcTamTru"]').value = "";
          document.querySelector('#addPerson input[name="queQuan"]').value = "";
        }
      }
    });
}

// xử lý ấn thêm mới
var addConfirm = document.getElementById("addConfirm");
addConfirm.onclick = function (e) {
  var name = document.getElementById('fullname').value;
  var cmnd = document.getElementById('cmnd').value;
  var ngaySinh = document.getElementById('dob').value;
  var gioiTinh = document.getElementById('sex').value;
  var ngheNghiep = document.getElementById('job').value;
  var vanhoa = document.getElementById('vanhoa').value;
  var danToc = document.getElementById('dantoc').value;
  var tonGiao = document.getElementById('tongiao').value;
  var dcThuongchu = document.getElementById('diaChiThuongTru').value;
  var dcTamTru = document.getElementById('diaChiTamTru').value;
  var queQuan = document.getElementById('queQuan').value;
  console.log(name , cmnd);
  if(name.length == 0) {
    document.querySelector('.nameErr').innerHTML = '* Vui lòng khai báo họ tên';
  }else if(cmnd.length == 0) {
    document.querySelector('.cmndErr').innerHTML = '* Vui lòng khai báo CMND'
    document.querySelector('.nameErr').innerHTML = '';
  }else if(ngaySinh.length == null) {
    document.querySelector('.dobErr').innerHTML = '* Bạn chưa khai báo ngày tháng năm sinh';
    document.querySelector('.nameErr').innerHTML = '';
    document.querySelector('.cmndErr').innerHTML = '';
  }else if(gioiTinh.length ==  0) {
    document.querySelector('.sexErr').innerHTML = '* Vui lòng khai báo giới tính';
    document.querySelector('.dobErr').innerHTML = '';
    document.querySelector('.nameErr').innerHTML = '';
    document.querySelector('.cmndErr').innerHTML = '';
  }else if(ngheNghiep.length == 0) {
    document.querySelector('.jobErr').innerHTML = '* Vui lòng khai báo nghề nghiệp';
    document.querySelector('.sexErr').innerHTML = '';
    document.querySelector('.dobErr').innerHTML = '';
    document.querySelector('.nameErr').innerHTML = '';
    document.querySelector('.cmndErr').innerHTML = '';
  }else if(vanhoa.length == 0) {
    document.querySelector('.vanhoaErr').innerHTML = '* Vui lòng khai báo trình độ văn hóa';
    document.querySelector('.jobErr').innerHTML = '';
    document.querySelector('.sexErr').innerHTML = '';
    document.querySelector('.dobErr').innerHTML = '';
    document.querySelector('.nameErr').innerHTML = '';
    document.querySelector('.cmndErr').innerHTML = '';
  }else if(danToc.length == 0) {
    document.querySelector('.dantocErr').innerHTML = '* Vui lòng khai báo dân tộc';
    document.querySelector('.vanhoaErr').innerHTML = '';
    document.querySelector('.jobErr').innerHTML = '';
    document.querySelector('.sexErr').innerHTML = '';
    document.querySelector('.dobErr').innerHTML = '';
    document.querySelector('.nameErr').innerHTML = '';
    document.querySelector('.cmndErr').innerHTML = '';
  }else if(tonGiao.length == 0) {
    document.querySelector('.tongiaoErr').innerHTML = '* Vui lòng khai báo tôn giáo';
    document.querySelector('.dantocErr').innerHTML = '';
    document.querySelector('.vanhoaErr').innerHTML = '';
    document.querySelector('.jobErr').innerHTML = '';
    document.querySelector('.sexErr').innerHTML = '';
    document.querySelector('.dobErr').innerHTML = '';
    document.querySelector('.nameErr').innerHTML = '';
    document.querySelector('.cmndErr').innerHTML = '';
  }else if(dcThuongchu.length == 0) {
    document.querySelector('.diaChiThuongTruErr').innerHTML = '* Vui lòng khai báo địa chỉ thường trú';
    document.querySelector('.tongiaoErr').innerHTML = '';
    document.querySelector('.dantocErr').innerHTML = '';
    document.querySelector('.vanhoaErr').innerHTML = '';
    document.querySelector('.jobErr').innerHTML = '';
    document.querySelector('.sexErr').innerHTML = '';
    document.querySelector('.dobErr').innerHTML = '';
    document.querySelector('.nameErr').innerHTML = '';
    document.querySelector('.cmndErr').innerHTML = '';
  }else if(dcTamTru.length == 0) {
    document.querySelector('.diaChiTamTruErr').innerHTML = '* Vui lòng khai báo địa chỉ tạm trú';
    document.querySelector('.diaChiThuongTruErr').innerHTML = '';
    document.querySelector('.tongiaoErr').innerHTML = '';
    document.querySelector('.dantocErr').innerHTML = '';
    document.querySelector('.vanhoaErr').innerHTML = '';
    document.querySelector('.jobErr').innerHTML = '';
    document.querySelector('.sexErr').innerHTML = '';
    document.querySelector('.dobErr').innerHTML = '';
    document.querySelector('.nameErr').innerHTML = '';
    document.querySelector('.cmndErr').innerHTML = '';
  }else if(queQuan.length == 0) {
    document.querySelector('.quequanErr').innerHTML = '* Vui lòng khai báo quê quán';
    document.querySelector('.diaChiTamTruErr').innerHTML = '';
    document.querySelector('.diaChiThuongTruErr').innerHTML = '';
    document.querySelector('.tongiaoErr').innerHTML = '';
    document.querySelector('.dantocErr').innerHTML = '';
    document.querySelector('.vanhoaErr').innerHTML = '';
    document.querySelector('.jobErr').innerHTML = '';
    document.querySelector('.sexErr').innerHTML = '';
    document.querySelector('.dobErr').innerHTML = '';
    document.querySelector('.nameErr').innerHTML = '';
    document.querySelector('.cmndErr').innerHTML = '';
  }else {
    // document.querySelector('.quequanErr').innerHTML = '';
    document.querySelector('.diaChiTamTruErr').innerHTML = '';
    document.querySelector('.diaChiThuongTruErr').innerHTML = '';
    document.querySelector('.tongiaoErr').innerHTML = '';
    document.querySelector('.dantocErr').innerHTML = '';
    document.querySelector('.vanhoaErr').innerHTML = '';
    document.querySelector('.jobErr').innerHTML = '';
    document.querySelector('.sexErr').innerHTML = '';
    document.querySelector('.dobErr').innerHTML = '';
    document.querySelector('.nameErr').innerHTML = '';
    document.querySelector('.cmndErr').innerHTML = '';
    addConfirm.setAttribute('data-dismiss' ,"modal");
    fetch(
      "index.php/people/" +
        document.querySelector('#editPerson input[name="cmnd"]').value,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body:
          '{"hoVaTen":"' + document.querySelector('#addPerson input[name="hoVaTen"]').value +
          '", "cmnd":"' + document.querySelector('#addPerson input[name="cmnd"]').value +
          '", "ngaySinh":"' + document.querySelector('#addPerson input[name="ngaySinh"]').value +
          '", "gioiTinh":"' + document.querySelector('#addPerson input[name="gioiTinh"]').value +
          '", "ngheNghiep":"' + document.querySelector('#addPerson input[name="ngheNghiep"]').value +
          '", "trinhDoVanHoa":"' + document.querySelector('#addPerson input[name="trinhDoVanHoa"]').value +
          '", "danToc":"' + document.querySelector('#addPerson input[name="danToc"]').value +
          '", "tonGiao":"' + document.querySelector('#addPerson input[name="tonGiao"]').value +
          '", "dcThuongTru":"' + document.querySelector('#addPerson input[name="dcThuongTru"]').value +
          '", "dcTamTru":"' + document.querySelector('#addPerson input[name="dcTamTru"]').value +
          '", "queQuan":"' + document.querySelector('#addPerson input[name="queQuan"]').value +
          '", "belongToVillage":"' + document.querySelector('#addPerson input[name="belongToVillage"]').value +
          '"}' , 
      }
    )
      .then((reponse) => {
        return reponse.json();
      })
      .then((ret) => {
        if (ret.data == 1) {
          document.getElementById("tbody_people").innerHTML = "";
          getPeoPle(renderPeople);
        } else {
          alert("Có Lỗi Xảy Ra Trong Quá trình Thêm Mới");
        }
      });
  }
};

// Lấy Ra số cmnd khi ấn vào xóa
function getCmndOnDelete(event) {
  var cmnd =
    event.target.parentNode.parentNode.parentNode.querySelector(
      ".td_cmnd"
    ).innerHTML;
  var clickDeletePerson = document.getElementById("clickDeletePerson");
  clickDeletePerson.onclick = function () {
    fetch("index.php/people/" + cmnd, {
      method: "DELETE",
    })
      .then((reponse) => {
        return reponse.json();
      })
      .then((ret) => {
        if (ret.data == 1) {
          document.getElementById("tbody_people").innerHTML = "";
          getPeoPle(renderPeople);
        } else {
          alert("Có Lỗi Xảy Ra Trong Quá Trính Xóa");
        }
      });
  };
  clickDeletePerson.setAttribute("data-dismiss", "modal");
}

//add label