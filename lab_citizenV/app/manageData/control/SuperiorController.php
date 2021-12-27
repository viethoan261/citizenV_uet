<?php
    namespace manageData\control;
    require_once("app/manageData/model/SuperiorModel.php");
	require_once("app/core/model/Util.php");
	require_once("app/account/model/User.php");
    
    
    class SuperiorController {
		// Lấy Ra Danh Sách Cấp Trên
        public function listSuperior($arr) {
			$inferior = new \manageData\model\SuperiorModel();
            $data = $inferior->getSuperior();
            return array("status" => "OK", "data" => $data);
        }
    }
