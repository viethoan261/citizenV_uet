<?php
    namespace manageData\control;
    require_once("app/manageData/model/InferiorModel.php");
	require_once("app/core/model/Util.php");
	require_once("app/account/model/User.php");
    
    
    class InferiorController {
		// Lấy Ra Danh Sách Cấp Trên
        public function listInferior($arr) {
			$inferior = new \manageData\model\InferiorModel();
            $data = $inferior->getInferior();
            return array("status" => "OK", "data" => $data);
        }
        public function getInferiorById($arr) {
            $inferior = new \manageData\model\InferiorModel();
            $data = $inferior->getInferiorById($arr[0] , $arr[1]);
            return array("status" => "OK", "data" => $data);
        }
        public function deleteInferiorById($arr) {
            $inferior = new \manageData\model\InferiorModel();
            $data = $inferior->deleteInferiorById($arr[0] , $arr[1]);
            return array("status" => "OK", "data" => $data);
        }
        public function addEntitledById($arr) {
            $input = json_decode(file_get_contents("php://input"), true);
            $entitled = new \manageData\model\InferiorModel();
            $data = $entitled->addEntitledById($input["id"] , $input["role"] , $input["startTime"] , $input["endTime"]);
            return array("status" => "OK", "data" => $data);
        }
        public function deleteEntitled($arr) {
            $inferior = new \manageData\model\InferiorModel();
            $data = $inferior->deleteEntitled($arr[0] , $arr[1]);
            return array("status" => "OK", "data" => $data);
        }
        public function checkEndTime($arr) {
            $endTime = new \manageData\model\InferiorModel();
            $data = $endTime->checkEndTime();
            return array("status" => "OK", "data" => $data);
        }
        public function addLocal($arr) {
            $input = json_decode(file_get_contents("php://input"), true);
            $add = new \manageData\model\InferiorModel();
            $data = $add->addLocal($input["id"] , $input["localName"] , $input["roleParent"] , $input["password"]);
            return array("status" => "OK", "data" => $data);
        }
        public function getAccountA1($arr) {
            $getac = new \manageData\model\InferiorModel();
            $data = $getac->getAccountA1();
            return array("status" => "OK", "data" => $data);
        }
        public function addAccountA1($arr) {
            $input = json_decode(file_get_contents("php://input"), true);
            $addAc = new \manageData\model\InferiorModel();
            $data = $addAc->addAccountA1($input["userName"] , $input["pass"] , $input["role"]);
            return array("status" => "OK", "data" => $data);
        }
        public function deleteAccountA1($arr) {
            $deleteAc = new \manageData\model\InferiorModel();
            $data = $deleteAc->deleteAccountA1($arr[0]);
            return array("status" => "OK", "data" => $data);
        }
        public function checkEntiled($arr) {
            $checkEt = new \manageData\model\InferiorModel();
            $data = $checkEt->checkEntiled();
            return array("status" => "OK", "data" => $data);
        }
        public function getTotalByrole($arr) {
            $totalRole = new \manageData\model\InferiorModel();
            $data = $totalRole->getTotalByrole();
            return array("status" => "OK", "data" => $data);
        }
    }
