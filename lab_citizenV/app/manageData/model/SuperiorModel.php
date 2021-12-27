<?php
    namespace manageData\model;
    require_once("app/core/model/Connect.php");
          
    class SuperiorModel {
        private $db;
        public function __construct() { $this->db = new \core\model\Connect();}
        public function __destruct() { $this->db = null;}
        
        public function getSuperior() {
            if(isset($_SESSION["localManagementName"])) {
                if($_SESSION["location"] == "province") {
                    return [];
                }
                if($_SESSION["location"] == "district") {
                    $id = $_SESSION["userId"];
                    $sql = "SELECT p.name AS province FROM district d
                    INNER JOIN province p ON p.id = d.belongToProvince
                    WHERE d.id = $id;";
                    return $this->db->doQuery($sql);
                }
                if($_SESSION["location"] == "commune") {
                    $id = $_SESSION["userId"];
                    $sql = "SELECT d.name AS district , p.name AS province FROM commune c
                    INNER JOIN district d ON d.id = c.belongToDistrict
                    INNER JOIN province p ON p.id = d.belongToProvince
                    WHERE c.id = $id;";
                    return $this->db->doQuery($sql);
                }
                if($_SESSION["location"] == "village") {
                    $id = $_SESSION["userId"];
                    $sql = "SELECT c.name AS commune , d.name AS district , p.name AS province FROM village v
                    INNER JOIN commune c ON c.id = v.belongToCommune
                    INNER JOIN district d ON d.id = c.belongToDistrict
                    INNER JOIN province p ON p.id = d.belongToProvince
                    WHERE v.id = $id;";
                    return $this->db->doQuery($sql);
                }
            }
        }
    }         
