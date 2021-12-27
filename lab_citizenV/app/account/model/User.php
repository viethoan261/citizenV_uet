<?php
namespace account\model;
require_once("app/core/model/Connect.php");

class User {
	private $db;
    public function __construct() { $this->db = new \core\model\Connect();}
    public function __destruct() { $this->db = null;}
    //
	//
	// Xác thực username/password
	// return true/false + họ tên người dùng đăng nhập thành công 
    public function checkAccount($userName, $password) {
        $sql = "SELECT * FROM `account` WHERE userName = '?1' AND password = '?2'"; 
        $check_data = $this->db->doPreparedQuery($sql, array($userName, $password));
     	// Thành công
        if (count($check_data) > 0) {
            // xác định xem tài khoản quản lý địa phương nào
            $location = "";
            $levelName = "OK";
            if($check_data[0]["role"] == "AD") {
                $location = "AD";
                $levelName = "admin";
            } 
            if($check_data[0]["role"] == "A1") {
                $location = "country";
                $levelName = "Tổng Cục Dân Số";
            } 
            if($check_data[0]["role"] == "A2") {
                $location = "province";
                $levelName = "Sở Y Tế";
            } 
            if($check_data[0]["role"] == "A3") {
                $location = "district";
                $levelName = "Phòng Y tế";
            } 
            if($check_data[0]["role"] == "B1") {
                $location = "commune";
                $levelName = "Trạm Y tế";
            } 
            if($check_data[0]["role"] == "B2") {
                $location = "village";
                $levelName = "CTV dân số";
            } 
            if($location == "province" || $location == "district" || $location == "commune" || $location == "village") {
                $manageToLocation = "manageTo" . ucfirst($location);
                $result_sql = "SELECT ac.userName AS userName , ac.role AS role , p.name AS localManagementName FROM `account` ac INNER JOIN  $location p ON p.id = ac.$manageToLocation WHERE ac.userName = $userName AND ac.password = '$password';";
                $result_data = $this->db->doPreparedQuery($result_sql, array($userName, $password));
                $levelName .= " " . $result_data[0]["localManagementName"];
                if($result_data[0] != "Lỗi") {
                    return [true, $result_data[0]["userName"] , $result_data[0]["role"] , $result_data[0]["localManagementName"] , $location , $levelName];
                }
            } else {
                if($location == 'AD') {
                    return [true, $check_data[0]["userName"] , $check_data[0]["role"] , "admin" , $location , $levelName];
                } else {
                    return [true, $check_data[0]["userName"] , $check_data[0]["role"] , "Tổng cục Dân số" , $location , $levelName];
                }
            }
        } 
        // không thành công
        return [false, ""];
    }
	//
	// Kiểm tra quyền truy cập
	// Input: user, resource
	// return Danh sách quyền 
    public function accessRights($user, $resource) {
        // $data = $this->db->doPreparedQuery("select quyen from quyensd where tsd like ? and tainguyen like ?;", array($user, $resource));
		// $ret = array();
		// foreach ($data as $item)
		// 	array_push($ret, $item["quyen"]);
        // return $ret;
    }
}
