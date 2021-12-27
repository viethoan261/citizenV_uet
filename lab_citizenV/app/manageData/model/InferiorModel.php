<?php
    namespace manageData\model;
    require_once("app/core/model/Connect.php");
          
    class InferiorModel {
        private $db;
        public function __construct() { $this->db = new \core\model\Connect();}
        public function __destruct() { $this->db = null;}
        
        function getInferior() {
            if(isset($_SESSION["localManagementName"])) {
                if($_SESSION["location"] == "country") {
                    $sql = "SELECT p.* , ac.role FROM `province` p
                    INNER JOIN account ac ON ac.manageToProvince = p.id;";
                    return $this->db->doQuery($sql);
                }
                if($_SESSION["location"] == "province") {
                    $id = $_SESSION["userId"];
                    $sql = "SELECT d.id , d.name ,d.entitled , d.progress , ac.role FROM district d
                    INNER JOIN province p ON p.id = d.belongToProvince
                    INNER JOIN account ac ON ac.manageToDistrict = d.id WHERE p.id = $id;";
                    return $this->db->doQuery($sql);
                }
                if($_SESSION["location"] == "district") {
                    $id = $_SESSION["userId"];
                    $sql = "SELECT c.id , c.name , c.entitled , c.progress , ac.role FROM  commune c
                    INNER JOIN district d ON d.id = c.belongToDistrict 
                    INNER JOIN account ac ON ac.manageToCommune = c.id
                    WHERE d.id = $id;";
                    return $this->db->doQuery($sql);
                }
                if($_SESSION["location"] == "commune") {
                    $id = $_SESSION["userId"];
                    $sql = "SELECT v.id , v.name , v.entitled , v.progress , ac.role FROM village v
                    INNER JOIN commune c ON c.id = v.belongToCommune
                    INNER JOIN account ac ON ac.manageToVillage = v.id 
                    WHERE c.id = $id;";
                    return $this->db->doQuery($sql);
                }
            }
        }
        function getInferiorById($id , $role) {
            $location = "";
            $manageTo = "manageTo";
            if(strtoupper($role) == "A2") {
                $location = "province";
            }
            if(strtoupper($role) == "A3") {
                $location = "district";
            }
            if(strtoupper($role) == "B1") {
                $location = "commune";
            }
            if(strtoupper($role) == "B2") {
                $location = "village";
            }
            $manageTo .= ucfirst($location);
            $sql = "SELECT l.id , l.name , l.entitled , l.progress FROM $location l
            INNER JOIN account ac ON ac.$manageTo = l.id WHERE l.id = $id;";
            $query =  $this->db->doPreparedQuery($sql, array()); // Kiểm tra xem quyền có hay không
            if($query[0]["entitled"] == "Có Quyền") {
                $sql = "SELECT l.id , l.name , l.entitled , l.progress , dc.startTime , dc.endTime FROM $location l
                INNER JOIN account ac ON ac.$manageTo = l.id
                INNER JOIN declared dc ON dc.userName = ac.userName
                WHERE l.id = $id;";
                return $this->db->doPreparedQuery($sql, array());
            } else {
                return $this->db->doPreparedQuery($sql, array());
            }
        }
        function deleteInferiorById($id , $role) {
            $location = "";
            if(strtoupper($role) == "A2") {
                $location = "province";
            }
            if(strtoupper($role) == "A3") {
                $location = "district";
            }
            if(strtoupper($role) == "B1") {
                $location = "commune";
            }
            if(strtoupper($role) == "B2") {
                $location = "village";
            }
            $sqlDeleteLocation = "DELETE FROM $location WHERE id = $id";
            $sqlDeleteAccount = "DELETE FROM account WHERE userName = $id";
            $count1 =  $this->db->doPreparedSql($sqlDeleteLocation, array());
            $count2 = $this->db->doPreparedSql($sqlDeleteAccount, array());
            return $count1 + $count2;
        }
        function addEntitledById($id , $role , $startTime , $endTime) {
            $location = "";
            if(strtoupper($role) == "A2") {
                $location = "province";
            }
            if(strtoupper($role) == "A3") {
                $location = "district";
            }
            if(strtoupper($role) == "B1") {
                $location = "commune";
            }
            if(strtoupper($role) == "B2") {
                $location = "village";
            }
            $sqlUpdateEntitled = "UPDATE $location SET entitled = 'Có Quyền' WHERE id = $id";
            $sqladdDeclared = "INSERT INTO declared(userName , startTime , endTime) VALUES ('$id' , '$startTime' , '$endTime');";
            $count1 =  $this->db->doPreparedSql($sqlUpdateEntitled, array());
            $count2 = $this->db->doPreparedSql($sqladdDeclared, array());
            return $count1 + $count2;
        }
        function deleteEntitled($id , $role) {
            $location = "";
            if(strtoupper($role) == "A2") {
                $location = "province";
            }
            if(strtoupper($role) == "A3") {
                $location = "district";
            }
            if(strtoupper($role) == "B1") {
                $location = "commune";
            }
            if(strtoupper($role) == "B2") {
                $location = "village";
            }
            $sqlUpdateEntitled = "UPDATE $location SET entitled = 'Không' WHERE id = $id";
            $sqlDeleteDeclared = "DELETE FROM declared WHERE userName = $id";
            $count1 =  $this->db->doPreparedSql($sqlUpdateEntitled, array());
            $count2 = $this->db->doPreparedSql($sqlDeleteDeclared, array());
            return $count1 + $count2;
        }
        function checkEndTime() {
            $locationChild = "";
            $manageTo = "manageTo";
            if(isset($_SESSION["localManagementName"])) {
                if($_SESSION["location"] == "country") {
                    $locationChild = "province";
                }
                if($_SESSION["location"] == "province") {
                    $locationChild = "district";

                }
                if($_SESSION["location"] == "district") {
                    $locationChild = "commune";
                }
                if($_SESSION["location"] == "commune") {
                    $locationChild = "village";
                }
                $manageTo .= ucfirst($locationChild);
                $sql = "SELECT l.id , ac.role , d.endTime FROM $locationChild l
                INNER JOIN account ac ON ac.$manageTo = l.id
                INNER JOIN declared d ON d.userName = ac.userName
                WHERE l.entitled = 'Có Quyền';";
                return $this->db->doQuery($sql);
            }
        }
        function addLocal($id , $localName , $roleParent , $password) {
            $location = "";
            $manageTo = "manageTo";
            $belongTo = "belongTo";
            $roleCurrent = "";
            if($roleParent == "A1") {
                $location = "province";
                $roleCurrent ="A2";
            } else if($roleParent == "A2") {
                $roleCurrent = "A3";
                $location = "district";
            } else if($roleParent == "A3") { 
                $roleCurrent = "B1";
                $location = "commune";
            } else if($roleParent == "B1") {
                $location = "village";
                $roleCurrent = "B2";
            } 
            $manageTo .= ucfirst($location);
            $belongTo .= ucfirst($_SESSION["location"]);
            $parentID = $_SESSION["userId"];
            if($roleCurrent == "A2") {
                $insertLocalSql = "INSERT INTO $location(id , name)
                VALUES($id , '$localName');";
            } else {
                $insertLocalSql = "INSERT INTO $location(id , name , $belongTo)
                VALUES($id , '$localName' , $parentID);";
            }
            $addAccount = "INSERT INTO account(userName , password , role , $manageTo)
            VALUES($id , '$password' , '$roleCurrent' , $id)";
            $count1 =  $this->db->doPreparedSql($insertLocalSql, array());
            $count2 = $this->db->doPreparedSql($addAccount, array());
            return $count1 + $count2;
        }
        function getAccountA1() {
            $sql = "SELECT userName , role , password FROM account WHERE role = 'A1'";
            return $this->db->doQuery($sql);
        }
        function addAccountA1($userName , $pass , $role) {
            $sql = "INSERT INTO account(userName , password , role)
            VALUES('$userName' , '$pass' , '$role')";
            $count =  $this->db->doPreparedSql($sql, array());
            return $count;
        }
        function deleteAccountA1($userName) {
            $sql = "DELETE FROM account WHERE userName = '$userName'";
            $count =  $this->db->doPreparedSql($sql, array());
            return $count;
        }
        function checkEntiled() {
            $userId = $_SESSION["userId"];
            $role = $_SESSION["role"];
            $location = $_SESSION["location"];
            if($role == "A1") {
                return ["Có Quyền"];
            } else {
                $sql = "SELECT entitled FROM $location WHERE id = $userId";
                return $this->db->doQuery($sql);
            }
        }
        function getTotalByrole() {
            $sql = "SELECT ac.role AS role , COUNT(*) AS total FROM `account` ac 
            GROUP BY role;";
            return $this->db->doQuery($sql);
        }
    }         
