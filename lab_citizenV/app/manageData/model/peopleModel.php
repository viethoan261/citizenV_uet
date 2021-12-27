<?php
    namespace manageData\model;
    require_once("app/core/model/Connect.php");
          
    class peopleModel {
        private $db;
        public function __construct() { $this->db = new \core\model\Connect();}
        public function __destruct() { $this->db = null;}
	
        public function getAll() {
            if(isset($_SESSION["localManagementName"])) {
                if($_SESSION["location"] == "country") {
                    $sql = "SELECT per.cmnd AS cmnd , per.hoVaTen AS hoVaTen , per.queQuan AS queQuan , per.gioiTinh AS gioiTinh FROM person per";
                }
                if($_SESSION["location"] == "province") {
                    $locationId = $_SESSION["userId"];
                    $sql = "SELECT per.cmnd AS cmnd , per.hoVaTen AS hoVaTen , per.queQuan AS queQuan , per.gioiTinh AS gioiTinh FROM province p
                    INNER JOIN district d ON d.belongToProvince = p.id
                    INNER JOIN commune cm ON cm.belongToDistrict = d.id
                    INNER JOIN village v ON v.belongToCommune = cm.id
                    INNER JOIN person per ON per.belongToVillage = v.id
                    WHERE p.id = $locationId ORDER BY per.id DESC;";
                }
                if($_SESSION["location"] == "district") {
                    $locationId = $_SESSION["userId"];
                    $sql = "SELECT per.cmnd AS cmnd , per.hoVaTen AS hoVaTen , per.queQuan AS queQuan , per.gioiTinh AS gioiTinh FROM district d
                    INNER JOIN commune cm ON cm.belongToDistrict = d.id
                    INNER JOIN village v ON v.belongToCommune = cm.id
                    INNER JOIN person per ON per.belongToVillage = v.id
                    WHERE d.id = $locationId ORDER BY per.id DESC;";
                }
                if($_SESSION["location"] == "commune") {
                    $locationId = $_SESSION["userId"];
                    $sql = "SELECT per.cmnd AS cmnd , per.hoVaTen AS hoVaTen , per.queQuan AS queQuan , per.gioiTinh AS gioiTinh FROM commune cm
                    INNER JOIN village v ON v.belongToCommune = cm.id
                    INNER JOIN person per ON per.belongToVillage = v.id
                    WHERE cm.id = $locationId ORDER BY per.id DESC;";
                }
                if($_SESSION["location"] == "village") {
                    $locationId = $_SESSION["userId"];
                    $sql = "SELECT per.cmnd AS cmnd , per.hoVaTen AS hoVaTen , per.queQuan AS queQuan , per.gioiTinh AS gioiTinh FROM village v 
                    INNER JOIN person per ON per.belongToVillage = v.id
                    WHERE v.id = $locationId ORDER BY per.id DESC;";
                }
            }
            return $this->db->doQuery($sql);
        }
		public function getPersonById($m) {
            $sql = "SELECT * FROM `person` WHERE cmnd = '?1'";
            return $this->db->doPreparedQuery($sql, array($m));
        }
		public function addPerson($hoVaTen, $cmnd, $ngaySinh , $gioiTinh , $ngheNghiep , $trinhDoVanHoa , $danToc , $tonGiao , $dcThuongTru , $dcTamTru, $queQuan , $belongToVillage) {
                $sql = "INSERT INTO person(hoVaTen , cmnd , ngaySinh , gioiTinh , ngheNghiep , trinhDoVanHoa , danToc , tonGiao , diachiThuongTru , diachiTamTru , queQuan , belongToVillage)
                VALUES('$hoVaTen' , '$cmnd' , '$ngaySinh' , '$gioiTinh' , '$ngheNghiep' , '$trinhDoVanHoa' , '$danToc' , '$tonGiao' , '$dcThuongTru' , '$dcTamTru' , '$queQuan' , $belongToVillage)";
                return $this->db->doPreparedSql($sql, array());
        }
		public function deletePersonById($m) {
            $sql = "DELETE FROM person WHERE cmnd = '?1';";
            return $this->db->doPreparedSql($sql, array($m));
        }
		public function updatePerson($id, $hoVaTen, $cmnd, $ngaySinh , $gioiTinh , $ngheNghiep , $trinhDoVanHoa , $danToc , $tonGiao , $dcThuongTru , $dcTamTru, $queQuan) {
            $sql = "UPDATE `person` SET hoVaTen = '$hoVaTen' , cmnd = '$cmnd' , ngaySinh = '$ngaySinh' , gioiTinh = '$gioiTinh' ,
            ngheNghiep = '$ngheNghiep' , trinhDoVanHoa = '$trinhDoVanHoa' , danToc = '$danToc' , tonGiao = '$tonGiao' , diachiThuongTru = '$dcThuongTru' ,
            diachiTamTru = '$dcTamTru' , queQuan = '$queQuan' WHERE id = $id;";
            return $this->db->doPreparedSql($sql , array($hoVaTen, $cmnd, $ngaySinh, $gioiTinh , $ngheNghiep , $trinhDoVanHoa , $danToc , $tonGiao , $dcThuongTru , $dcTamTru , $queQuan , $id));
        }
        public function completedReport() {
            $location = $_SESSION["location"];
            $id = $_SESSION['userId'];
            $sql = "UPDATE $location SET progress = 'Hoàn Thành' WHERE id = $id";
            return $this->db->doPreparedSql($sql, array());
        }
        public function totalPeopleByLocation() {
            if(isset($_SESSION["localManagementName"])) {
                if($_SESSION["location"] == "country") {
                    $sql = "SELECT p.name AS name , COUNT(*) AS total FROM person per
                    INNER JOIN village v ON v.id = per.belongToVillage
                    INNER JOIN commune c ON c.id = v.belongToCommune
                    INNER JOIN district d ON d.id = c.belongToDistrict
                    INNER JOIN province p ON p.id = d.belongToProvince
                    GROUP BY p.name;";
                }
                if($_SESSION["location"] == "province") {
                    $locationId = $_SESSION["userId"];
                    $sql = "SELECT d.name AS name , COUNT(*) AS total FROM person per
                    INNER JOIN village v ON v.id = per.belongToVillage
                    INNER JOIN commune c ON c.id = v.belongToCommune
                    INNER JOIN district d ON d.id = c.belongToDistrict
                    INNER JOIN province p ON p.id = d.belongToProvince
                    WHERE p.id = '$locationId'
                    GROUP BY d.name;";
                }
                if($_SESSION["location"] == "district") {
                    $locationId = $_SESSION["userId"];
                    $sql = "SELECT c.name AS name , COUNT(*) AS total FROM person per
                    INNER JOIN village v ON v.id = per.belongToVillage
                    INNER JOIN commune c ON c.id = v.belongToCommune
                    INNER JOIN district d ON d.id = c.belongToDistrict
                    WHERE d.id = '$locationId'
                    GROUP BY c.name;";
                }
                if($_SESSION["location"] == "commune") {
                    $locationId = $_SESSION["userId"];
                    $sql = "SELECT v.name AS name , COUNT(*) AS total FROM person per
                    INNER JOIN village v ON v.id = per.belongToVillage
                    INNER JOIN commune c ON c.id = v.belongToCommune
                    WHERE c.id = 320101
                    GROUP BY v.name;";
                }
            }
            return $this->db->doQuery($sql);
        }
        function totalSexByLocation() {
            if(isset($_SESSION["localManagementName"])) {
                if($_SESSION["location"] == "country") {
                    $sql = "SELECT gioiTinh AS sex , COUNT(*) AS total FROM `person`
                    GROUP BY gioiTinh;";
                }
                if($_SESSION["location"] == "province") {
                    $locationId = $_SESSION["userId"];
                    $sql = "SELECT gioiTinh AS sex , COUNT(*) AS total FROM `person` per
                    INNER JOIN village v ON v.id = per.belongToVillage
                    INNER JOIN commune c ON c.id = v.belongToCommune
                    INNER JOIN district d ON d.id = c.belongToDistrict
                    INNER JOIN province p ON p.id = d.belongToProvince
                    WHERE p.id = $locationId
                    GROUP BY gioiTinh;";
                }
                if($_SESSION["location"] == "district") {
                    $locationId = $_SESSION["userId"];
                    $sql = "SELECT gioiTinh AS sex , COUNT(*) AS total FROM `person` per
                    INNER JOIN village v ON v.id = per.belongToVillage
                    INNER JOIN commune c ON c.id = v.belongToCommune
                    INNER JOIN district d ON d.id = c.belongToDistrict
                    WHERE d.id = $locationId
                    GROUP BY gioiTinh;";
                }
                if($_SESSION["location"] == "commune") {
                    $locationId = $_SESSION["userId"];
                    $sql = "SELECT gioiTinh AS sex , COUNT(*) AS total FROM `person` per
                    INNER JOIN village v ON v.id = per.belongToVillage
                    INNER JOIN commune c ON c.id = v.belongToCommune
                    WHERE c.id = $locationId
                    GROUP BY gioiTinh;";
                }
            }
            return $this->db->doQuery($sql);
        }
    }         
