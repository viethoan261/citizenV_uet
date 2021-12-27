<?php
	namespace core\model;

use Exception;
use mysqli;

class Connect {
		private $conn;
		
		// /**
		// * Ham tao
		// */
		public function __construct() {
			$this->conn = new mysqli('localhost' , 'root' , '' , 'citizenv');
		}
		
		/**
		* Ham huy
		*/
		public function __destruct() {
		    /** Dong ket noi */
				$this->conn = null;
		}

        /**
		* Thuc hien truy van
		* $query: Cau lenh select
		* return: mang cac ban ghi, so trang
		*/
		public function doQuery($query) {
			$ret = array(); 
				$peopleQuery = $this->conn->query($query);  
				if (!$peopleQuery) {
					$ret[] = "Lỗi";
				} else {
					while ($row = $peopleQuery->fetch_assoc()) {
						$ret[] = $row; 
					}
				}
			return $ret;
		}
		
		/**
		* Thực hiện truy vấn theo câu lệnh chuẩn bị trước
		* $queryTmpl: Mẫu câu truy vấn
		* $paras: Mảng các tham số cho truy vấn
		* return: Mảng các bản ghi
		*/
		public function doPreparedQuery($queryTmpl, $paras) {
			$ret = array();
			$parasLength = count($paras);
			$unknow_query = array();
			for($i = 1; $i <= $parasLength; $i++) {
				$unknow_query[] = '?' . $i;
			}
			$sql =  str_replace($unknow_query , $paras , $queryTmpl);
			$peopleQuery = $this->conn->query($sql); 
			if(!$peopleQuery) {
				$ret[] = "Lỗi"; 
			} else {
				while ($row = $peopleQuery->fetch_assoc()) {
					$ret[] = $row; 
				}
			}
			return $ret;
		}	

		// /**
		// * Thực hiện cập nhật 
		// * $sql: Câu lệnh insert, update, delete
		// * return: Số bản ghi được cập nhật
		// */
		// public function doSql($sql) {
		//     $count = 0;
		// 	try {
		// 		$count = $this->db->exec($sql);
		// 	} catch(PDOException $ex) {
		// 		$count = -1;
		// 	}
		// 	return $count;
		// }

		/**
		* Thực hiện cập nhật theo câu lệnh chuẩn bị trước
		* $sql: Câu lệnh insert, update, delete
		* return: Số bản ghi được cập nhật
		*/
		public function doPreparedSql($queryTmpl, $paras) { 
			$count = 0;
			$parasLength = count($paras);
			$unknow_query = array();
			for($i = 1; $i <= $parasLength; $i++) {
				$unknow_query[] = '?' . $i;
			}
			$sql =  str_replace($unknow_query , $paras , $queryTmpl);
			$peopleQuery = $this->conn->query($sql); 
			if(!$peopleQuery) {
					return "Lỗi";
			} else {
				$count++;
			}
			return $count;
		}	
	}
