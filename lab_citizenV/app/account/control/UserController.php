<?php
namespace account\control;
require_once("app/account/model/User.php");

class UserController {
	public function __contruct() {}
	public function __destruct() {}

	// Kiểm tra trạng thái người dùng đã đăng nhập hay chưa
	public function hasLogged() {
		$permission = 0;
		// session gồm có userId , role : cấp (A1 , A2 ,A3) , localManagementName : tên địa phương quản lý
    	if (isset($_SESSION["userId"])) {
			$permission = 1;
			return array("status" => "OK", "data" => [$permission, $_SESSION["userId"], $_SESSION["role"] , $_SESSION["localManagementName"] , $_SESSION["location"] , $_SESSION["levelName"]]);
		} else {
			return array("status" => "OK", "data" => [$permission, "Chưa Đăng Nhập"]);
		}
	}
	// Đăng nhập (xác thực username/password)
	// return 	1 nếu hợp lệ
	//			0 nếu ngược lại
	 public function doLogin() { 
		$ret = 0; 
    	if (isset($_SESSION["userId"])) {
			$ret = 1;
		} 
		else {
			$input = json_decode(file_get_contents("php://input"), true);
			if (isset($input["userName"]) && 
				isset($input["password"]) && 
				isset($input["loginSubmitted"]) && 
				$input["loginSubmitted"] == "1")
			{
				$user = new \account\model\User();
				$auth = $user->checkAccount($input["userName"], $input["password"]);
				if ($auth[0]) {
					// Thiết lập dữ liệu phiên
				    $_SESSION["userId"] = $auth[1];
					$_SESSION["role"] = $auth[2];
					$_SESSION["localManagementName"] = $auth[3];
					$_SESSION["location"] = $auth[4];
					$_SESSION["levelName"] = $auth[5];
					$ret = 1;
				}
			}
		}
		return array("status" => "OK", "data" => $ret);
   }
	// Đăng xuất
   public function doLogout() {
		unset($_SESSION["userId"]);
		unset($_SESSION["role"]);
		unset($_SESSION["localManagementName"]);
		unset($_SESSION["location"]);
		return array("status" => "OK", "data" => 1);
   }
}
