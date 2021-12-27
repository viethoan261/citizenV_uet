<?php
	// Tệp app/core/control/Router.php
    namespace core\control;
    
    class Router {
        public static function proc() {
			$ret = array();
			$moduleName = "fallback";		// Tên module, mặc định là module báo lỗi
            $controllerName = "fallback";	// Tên bộ điều khiển, mặc định là trình điều khiển báo lỗi
            $actionName = "proc";			// Tên hành động
            $parameters = array();			// Các tham số

			// Tách URI
			$requestURI = explode('/', strtolower($_SERVER['REQUEST_URI']));
			$scriptName = explode('/', strtolower($_SERVER['SCRIPT_NAME']));
			$commandArray = array_diff_assoc($requestURI, $scriptName);
			$commandArray = array_values($commandArray);
			
			// GET / people
			if ($_SERVER["REQUEST_METHOD"] == "GET" &&
				count($commandArray) == 1	&&
				strtolower($commandArray[0]) == "people")
			{
				$moduleName = "manageData";
				$controllerName = "People";
				$actionName = "listPeople";
			}
			// GET /people/{id}
			else if ($_SERVER["REQUEST_METHOD"] == "GET" && 	
					count($commandArray) == 2 &&
					strtolower($commandArray[0]) == "people") 
			{
				$moduleName = "manageData";
				$controllerName = "People";
				$actionName = "getPeopleById";
				$parameters[0] = $commandArray[1];
			}
			// POST /people/{id}
			else if ($_SERVER["REQUEST_METHOD"] == "POST" &&
				count($commandArray) == 2 &&	
				strtolower($commandArray[0]) == "people") 
			{
				$moduleName = "manageData";
				$controllerName = "People";
				$actionName = "addPerson";
				$parameters[0] = $commandArray[1];
			}
			// DELETE /people/{id}
			else if ($_SERVER["REQUEST_METHOD"] == "DELETE" && 	
					count($commandArray) == 2 &&
					strtolower($commandArray[0]) == "people") 
			{
				$moduleName = "manageData";
				$controllerName = "People";
				$actionName = "deletePerson";
				$parameters[0] = $commandArray[1];
			}
			// PUT /people/{id}
			else if ($_SERVER["REQUEST_METHOD"] == "PUT" &&
				count($commandArray) == 2 &&
				strtolower($commandArray[0]) == "people") 
			{
				$moduleName = "manageData";
				$controllerName = "People";
				$actionName = "updatePerSon";
				$parameters[0] = $commandArray[1];
			}

			// GET /logged
			else if ($_SERVER["REQUEST_METHOD"] == "GET" &&
				count($commandArray) == 1 &&
				strtolower($commandArray[0]) == "logged") 
			{
				$moduleName = "account";
				$controllerName = "user";
				$actionName = "hasLogged";
			}

			// POST /login 
			else if ($_SERVER["REQUEST_METHOD"] == "POST" &&
				count($commandArray) == 1 &&
				strtolower($commandArray[0]) == "login") 
			{
				$moduleName = "account";
				$controllerName = "user";
				$actionName = "doLogin";
			}

			// GET /logout
			else if ($_SERVER["REQUEST_METHOD"] == "GET" &&
				count($commandArray) == 1 &&
				strtolower($commandArray[0]) == "logout") 
			{
				$moduleName = "account";
				$controllerName = "user";
				$actionName = "doLogout";
			}
			// GET / superior
			else if ($_SERVER["REQUEST_METHOD"] == "GET" &&
				count($commandArray) == 1 &&
				strtolower($commandArray[0]) == "superior") 
			{
				$moduleName = "manageData";
				$controllerName = "Superior";
				$actionName = "listSuperior";
			}
			// GET / inferior
			else if ($_SERVER["REQUEST_METHOD"] == "GET" &&
				count($commandArray) == 1 &&
				strtolower($commandArray[0]) == "inferior") 
			{
				$moduleName = "manageData";
				$controllerName = "Inferior";
				$actionName = "listInferior";
			}
			// GET /inferior/id/role
			else if ($_SERVER["REQUEST_METHOD"] == "GET" &&
				count($commandArray) == 3 &&
				strtolower($commandArray[0]) == "inferior") 
			{
				$moduleName = "manageData";
				$controllerName = "Inferior";
				$actionName = "getInferiorById";
				$parameters[0] = $commandArray[1];
				$parameters[1] = $commandArray[2];
			}
			// DELETE /inferior/id/role
			else if ($_SERVER["REQUEST_METHOD"] == "DELETE" && 	
					count($commandArray) == 3 &&
					strtolower($commandArray[0]) == "inferior") 
			{
				$moduleName = "manageData";
				$controllerName = "Inferior";
				$actionName = "deleteInferiorById";
				$parameters[0] = $commandArray[1];
				$parameters[1] = $commandArray[2];
			}
			// POST/addentitled/id
			else if ($_SERVER["REQUEST_METHOD"] == "POST" && 	
					count($commandArray) == 2 &&
					strtolower($commandArray[0]) == "addentitled") 
			{
				$moduleName = "manageData";
				$controllerName = "Inferior";
				$actionName = "addEntitledById";
				$parameters[0] = $commandArray[1];
			}
			// DELETE/deleteEntitled/id/role
			else if ($_SERVER["REQUEST_METHOD"] == "DELETE" && 	
					count($commandArray) == 3 &&
					strtolower($commandArray[0]) == "deleteentitled") 
			{
				$moduleName = "manageData";
				$controllerName = "Inferior";
				$actionName = "deleteEntitled";
				$parameters[0] = $commandArray[1];
				$parameters[1] = $commandArray[2];
			}
			// GET/checkendtime
			else if ($_SERVER["REQUEST_METHOD"] == "GET" && 	
					count($commandArray) == 1 &&
					strtolower($commandArray[0]) == "checkendtime") 
			{
				$moduleName = "manageData";
				$controllerName = "Inferior";
				$actionName = "checkEndTime";
			}
			// POST/addLocal/id
			else if ($_SERVER["REQUEST_METHOD"] == "POST" && 	
					count($commandArray) == 2 &&
					strtolower($commandArray[0]) == "addlocal") 
			{
				$moduleName = "manageData";
				$controllerName = "Inferior";
				$actionName = "addLocal";
				$parameters[0] = $commandArray[1];
			}
			// GET/accounta1
			else if ($_SERVER["REQUEST_METHOD"] == "GET" && 	
					count($commandArray) == 1 &&
					strtolower($commandArray[0]) == "accounta1") 
			{
				$moduleName = "manageData";
				$controllerName = "Inferior";
				$actionName = "getAccountA1";
			}
			// POST/addaccounta1
			else if ($_SERVER["REQUEST_METHOD"] == "POST" && 	
					count($commandArray) == 1 &&
					strtolower($commandArray[0]) == "addaccounta1") 
			{
				$moduleName = "manageData";
				$controllerName = "Inferior";
				$actionName = "addAccountA1";
			}
			// DELETE/deleteaccounta1/userName
			else if ($_SERVER["REQUEST_METHOD"] == "DELETE" && 	
					count($commandArray) == 2 &&
					strtolower($commandArray[0]) == "deleteaccounta1") 
			{
				$moduleName = "manageData";
				$controllerName = "Inferior";
				$actionName = "deleteAccountA1";
				$parameters[0] = $commandArray[1];
			}
			//GET/checkentiled
			else if ($_SERVER["REQUEST_METHOD"] == "GET" && 	
					count($commandArray) == 1 &&
					strtolower($commandArray[0]) == "checkentiled") 
			{
				$moduleName = "manageData";
				$controllerName = "Inferior";
				$actionName = "checkEntiled";
			}
			// PUT/completedReport
			else if ($_SERVER["REQUEST_METHOD"] == "PUT" && 	
					count($commandArray) == 1 &&
					strtolower($commandArray[0]) == "completedreport") 
			{
				$moduleName = "manageData";
				$controllerName = "People";
				$actionName = "completedReport";
			}
			// GET/totalPeopleByLocation
			else if ($_SERVER["REQUEST_METHOD"] == "GET" && 	
					count($commandArray) == 1 &&
					strtolower($commandArray[0]) == "totalpeoplebylocation") 
			{
				$moduleName = "manageData";
				$controllerName = "People";
				$actionName = "totalPeopleByLocation";
			}
			// GET/totalsexByLocation
			else if ($_SERVER["REQUEST_METHOD"] == "GET" && 	
					count($commandArray) == 1 &&
					strtolower($commandArray[0]) == "totalsexbylocation") 
			{
				$moduleName = "manageData";
				$controllerName = "People";
				$actionName = "totalSexByLocation";
			}
			// GET/gettotalbyrole
			else if ($_SERVER["REQUEST_METHOD"] == "GET" && 	
					count($commandArray) == 1 &&
					strtolower($commandArray[0]) == "gettotalbyrole") 
			{
				$moduleName = "manageData";
				$controllerName = "Inferior";
				$actionName = "getTotalByrole";
			}
			// Trả kết quả về cho bộ điều khiển mặt trước
			$ret["moduleName"]  = $moduleName;		
			$ret["controllerName"]  = $controllerName;
			$ret["actionName"]  = $actionName;
			$ret["parameters"]  = $parameters;	
			return $ret;
        }
    }
