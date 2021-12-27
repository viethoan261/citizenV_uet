<?php
    namespace manageData\control;
    require_once("app/manageData/model/peopleModel.php");
	require_once("app/core/model/Util.php");
	require_once("app/account/model/User.php");
	use \core\model\Util as Util;
	use \account\model\User as User;
    
    
    class PeopleController {
		// Lấy Ra Danh Sách Người Dân
        public function listPeople($arr) {
			$person = new \manageData\model\peopleModel();
            $data = $person->getAll();
            return array("status" => "OK", "data" => $data);
        }

		public function getPeopleById($arr) {
				$person = new \manageData\model\peopleModel();
		        $data = $person->getPersonById($arr[0]);
				return array("status" => "OK", "data" => $data);
        }
		
		public function addPerson($arr) {	
				$input = json_decode(file_get_contents("php://input"), true);
				$person = new \manageData\model\peopleModel();
				$c = $person->addPerson($input["hoVaTen"], $input["cmnd"],
				$input["ngaySinh"] , $input["gioiTinh"],$input["ngheNghiep"] ,$input["trinhDoVanHoa"] ,
				$input["danToc"] , $input["tonGiao"], $input["dcThuongTru"] , $input["dcTamTru"] ,$input["queQuan"] , $input["belongToVillage"]);
				return array("status" => "OK", "data" => $c);
        } 
		public function deletePerson($arr) {
			$person = new \manageData\model\peopleModel();
            $c = $person->deletePersonById($arr[0]);
			return array("status" => "OK", "data" => $c);
        }

        public function updatePerSon($arr) {
			$input = json_decode(file_get_contents("php://input"), true);
			$person = new \manageData\model\peopleModel();
			$c = $person->updatePerson($input["id"], $input["hoVaTen"], $input["cmnd"],
			$input["ngaySinh"] , $input["gioiTinh"],$input["ngheNghiep"] ,$input["trinhDoVanHoa"] ,
			$input["danToc"] , $input["tonGiao"], $input["dcThuongTru"] , $input["dcTamTru"] ,$input["queQuan"]);
			return array("status" => "OK", "data" => $c);
        }  
		public function completedReport() {
			$comple = new \manageData\model\peopleModel();
            $c = $comple->completedReport();
			return array("status" => "OK", "data" => $c);
		}
		public function totalPeopleByLocation() {
			$total = new \manageData\model\peopleModel();
            $c = $total->totalPeopleByLocation();
			return array("status" => "OK", "data" => $c);
		}
		public function totalSexByLocation() {
			$totalsex = new \manageData\model\peopleModel();
            $c = $totalsex->totalSexByLocation();
			return array("status" => "OK", "data" => $c);
		}
    }
