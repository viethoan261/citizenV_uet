-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 26, 2021 lúc 06:50 PM
-- Phiên bản máy phục vụ: 10.4.22-MariaDB
-- Phiên bản PHP: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `citizenv`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--
CREATE DATABASE `citizenv`;

CREATE TABLE `account` (
  `userName` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(20) NOT NULL,
  `manageToProvince` varchar(50) DEFAULT NULL,
  `manageToDistrict` varchar(50) DEFAULT NULL,
  `manageToCommune` varchar(50) DEFAULT NULL,
  `manageToVillage` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`userName`, `password`, `role`, `manageToProvince`, `manageToDistrict`, `manageToCommune`, `manageToVillage`) VALUES
('01', '123456', 'A2', '01', NULL, NULL, NULL),
('14', '123', 'A2', '14', NULL, NULL, NULL),
('1401', '123', 'A3', NULL, '1401', NULL, NULL),
('140101', '123', 'B1', NULL, NULL, '140101', NULL),
('14010101', '123', 'B2', NULL, NULL, NULL, '14010101'),
('22', 'ko', 'A2', '22', NULL, NULL, NULL),
('2201', 'ko', 'A3', NULL, '2201', NULL, NULL),
('220101', 'ko', 'B1', NULL, NULL, '220101', NULL),
('23', 'ko', 'A2', '23', NULL, NULL, NULL),
('32', '123456', 'A2', '32', NULL, NULL, NULL),
('3201', '123456', 'A3', NULL, '3201', NULL, NULL),
('320101', '123456', 'B1', NULL, NULL, '320101', NULL),
('32010101', '123456', 'B2', NULL, NULL, NULL, '32010101'),
('3223', '123456', 'A3', NULL, '3223', NULL, NULL),
('322387', '123456', 'B1', NULL, NULL, '322387', NULL),
('32238701', '123456', 'B2', NULL, NULL, NULL, '32238701'),
('33', '123456', 'A2', '33', NULL, NULL, NULL),
('34', '123456', 'A2', '34', NULL, NULL, NULL),
('36', '123456', 'A2', '36', NULL, NULL, NULL),
('3602', '123456', 'A3', NULL, '3602', NULL, NULL),
('360201', '123456', 'B1', NULL, NULL, '360201', NULL),
('36020101', '123456', 'B2', NULL, NULL, NULL, '36020101'),
('9', 'abc', 'A2', '9', NULL, NULL, NULL),
('admin1', '123456', 'AD', NULL, NULL, NULL, NULL),
('vn1', '123456', 'A1', NULL, NULL, NULL, NULL),
('vn2', '123', 'A1', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `commune`
--

CREATE TABLE `commune` (
  `id` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `entitled` varchar(50) DEFAULT 'Không',
  `progress` varchar(50) NOT NULL DEFAULT 'Chưa Hoàn Thành',
  `belongToDistrict` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `commune`
--

INSERT INTO `commune` (`id`, `name`, `entitled`, `progress`, `belongToDistrict`) VALUES
('140101', 'Xã Châu Sơn', 'Có Quyền', 'Hoàn Thành', '1401'),
('220101', 'Xã Ba Trại', 'Có Quyền', 'Hoàn Thành', '2201'),
('320101', 'Xã Tản Lĩnh', 'Có Quyền', 'Chưa Hoàn Thành', '3201'),
('322387', 'Xã Cổ Đô', 'Có Quyền', 'Chưa Hoàn Thành', '3223'),
('360201', 'Xã Ba Trại', 'Có Quyền', 'Hoàn Thành', '3602');

--
-- Bẫy `commune`
--
DELIMITER $$
CREATE TRIGGER `commune_update_finish` AFTER UPDATE ON `commune` FOR EACH ROW BEGIN
IF(NEW.progress = 'Hoàn Thành') THEN
UPDATE village v INNER JOIN commune c ON v.belongToCommune = c.id 
SET v.progress= 'Hoàn Thành' WHERE c.id = OLD.id;
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `declared`
--

CREATE TABLE `declared` (
  `id` int(11) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `startTime` date NOT NULL,
  `endTime` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `declared`
--

INSERT INTO `declared` (`id`, `userName`, `startTime`, `endTime`) VALUES
(4, '32', '2021-12-27', '2021-12-29'),
(5, '36', '2021-12-28', '2021-12-30'),
(6, '3602', '2021-12-31', '2021-12-31'),
(7, '360201', '2021-12-30', '2021-12-31'),
(8, '36020101', '2021-12-30', '2021-12-31'),
(19, '01', '2021-12-31', '2021-12-31'),
(20, '3201', '2021-12-31', '2022-01-08'),
(21, '320101', '2021-12-31', '2022-01-01'),
(22, '32010101', '2021-12-31', '2022-01-08'),
(23, '3223', '2021-12-31', '2022-01-07'),
(24, '322387', '2021-12-30', '2022-01-09'),
(25, '32238701', '2021-12-26', '2022-01-02'),
(28, '22', '2021-12-26', '2022-01-01'),
(29, '2201', '2021-12-26', '2021-12-31'),
(30, '220101', '2021-12-26', '2021-12-31'),
(32, '14', '2021-12-27', '2022-01-09'),
(33, '1401', '2021-12-27', '2021-12-30'),
(34, '140101', '2021-12-27', '2021-12-30'),
(35, '14010101', '2021-12-27', '2021-12-29');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `district`
--

CREATE TABLE `district` (
  `id` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `entitled` varchar(50) DEFAULT 'Không',
  `progress` varchar(50) NOT NULL DEFAULT 'Chưa Hoàn Thành',
  `belongToProvince` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `district`
--

INSERT INTO `district` (`id`, `name`, `entitled`, `progress`, `belongToProvince`) VALUES
('1401', 'Thành phố Đà Lạt', 'Có Quyền', 'Chưa Hoàn Thành', '14'),
('2201', 'Huyện Phú Giáo', 'Có Quyền', 'Chưa Hoàn Thành', '22'),
('3201', 'Quận Đa Đà', 'Có Quyền', 'Chưa Hoàn Thành', '32'),
('3223', 'Quận Sơn Trà', 'Có Quyền', 'Chưa Hoàn Thành', '32'),
('3602', 'Huyện Bá Thước', 'Có Quyền', 'Chưa Hoàn Thành', '36');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `person`
--

CREATE TABLE `person` (
  `id` int(11) NOT NULL,
  `hoVaTen` varchar(100) NOT NULL,
  `ngaySinh` date NOT NULL,
  `gioiTinh` varchar(50) NOT NULL,
  `cmnd` varchar(100) NOT NULL,
  `ngheNghiep` varchar(100) NOT NULL,
  `danToc` varchar(50) NOT NULL,
  `tonGiao` varchar(100) DEFAULT 'Không',
  `trinhDoVanHoa` varchar(100) NOT NULL,
  `diaChiThuongTru` varchar(200) NOT NULL,
  `diaChiTamTru` varchar(200) NOT NULL,
  `queQuan` varchar(200) NOT NULL,
  `belongToVillage` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `person`
--

INSERT INTO `person` (`id`, `hoVaTen`, `ngaySinh`, `gioiTinh`, `cmnd`, `ngheNghiep`, `danToc`, `tonGiao`, `trinhDoVanHoa`, `diaChiThuongTru`, `diaChiTamTru`, `queQuan`, `belongToVillage`) VALUES
(10, 'Đoàn Văn Dự 123', '2001-08-02', 'Nam', '12919219', 'Sinh Viên', 'Kinh', 'Không', '12/12', 'Quảng Xương , Thanh Hóa', 'Thanh Xuân , Hà Nội', 'Quảng Xương , Thanh Hóa', '36020101'),
(11, 'Đoàn Văn Dự B', '2001-08-02', 'Nữ', '1291212', 'Sinh Viên', 'Kinh', 'Không', '12/12', 'Sơn Động , Bắc Giang', 'Thanh Xuân , Hà Nội', 'Quảng Xương , Thanh Hóa', '32010101'),
(12, 'Đoàn Văn Dự B', '2001-08-02', 'Nữ', '12912121212', 'Sinh Viên', 'Kinh', 'Không', '12/12', 'Sơn Động , Bắc Giang', 'Thanh Xuân , Hà Nội', 'Quảng Xương , Thanh Hóa', '32010101'),
(19, 'Đoàn Văn Dự', '2021-12-31', 'Nam', '91291288', 'Sinh viên', 'Kinh', 'Không', '15', 'Quảng Xương , Thanh Hóa', 'Thanh Xuân , Hà Nội', 'Quảng Xương , Thanh Hóa', '32238701'),
(21, 'Đoàn Văn Dự', '2001-04-13', 'Nam', '038201013708', 'Sinh Viên', 'Kinh', 'Không', '2', 'Quảng Thạch , Quảng Xương , Thanh Hóa', 'Xã An Châu , Thành Phố Đà Lạt , Tỉnh Lâm Đồng', 'Quảng Thạch , Quảng Xương , Thanh Hóa', '14010101');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `province`
--

CREATE TABLE `province` (
  `id` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `entitled` varchar(50) DEFAULT 'Không',
  `progress` varchar(50) NOT NULL DEFAULT 'Chưa Hoàn Thành'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `province`
--

INSERT INTO `province` (`id`, `name`, `entitled`, `progress`) VALUES
('01', 'Thành Phố Hồ Chí Minh', 'Có Quyền', 'Chưa Hoàn Thành'),
('14', 'Tỉnh Lâm Đồng', 'Có Quyền', 'Chưa Hoàn Thành'),
('22', 'Tỉnh Bình Dương', 'Có Quyền', 'Chưa Hoàn Thành'),
('23', 'Tỉnh Đồng Nai', 'Không', 'Chưa Hoàn Thành'),
('32', 'Tỉnh Đà Nẵng', 'Có Quyền', 'Chưa Hoàn Thành'),
('33', 'Tỉnh Quảng Nam', 'Không', 'Chưa Hoàn Thành'),
('34', 'Tỉnh Hải Phòng', 'Không', 'Chưa Hoàn Thành'),
('36', 'Tỉnh Thanh Hóa', 'Có Quyền', 'Chưa Hoàn Thành'),
('9', 'Tỉnh Khánh Hòa', 'Không', 'Chưa Hoàn Thành');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `village`
--

CREATE TABLE `village` (
  `id` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `entitled` varchar(50) DEFAULT 'Không',
  `progress` varchar(50) NOT NULL DEFAULT 'Chưa Hoàn Thành',
  `belongToCommune` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `village`
--

INSERT INTO `village` (`id`, `name`, `entitled`, `progress`, `belongToCommune`) VALUES
('14010101', 'cvt1', 'Có Quyền', 'Hoàn Thành', '140101'),
('32010101', 'ctv1', 'Có Quyền', 'Chưa Hoàn Thành', '320101'),
('32238701', 'ctvXaCD', 'Có Quyền', 'Hoàn Thành', '322387'),
('36020101', 'bathuoc1', 'Có Quyền', 'Hoàn Thành', '360201');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`userName`),
  ADD KEY `manageToProvine` (`manageToProvince`),
  ADD KEY `manageToDistrict` (`manageToDistrict`),
  ADD KEY `manageToCommune` (`manageToCommune`),
  ADD KEY `manageToVillage` (`manageToVillage`);

--
-- Chỉ mục cho bảng `commune`
--
ALTER TABLE `commune`
  ADD PRIMARY KEY (`id`),
  ADD KEY `belongToDistrict` (`belongToDistrict`);

--
-- Chỉ mục cho bảng `declared`
--
ALTER TABLE `declared`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userName` (`userName`);

--
-- Chỉ mục cho bảng `district`
--
ALTER TABLE `district`
  ADD PRIMARY KEY (`id`),
  ADD KEY `belongToProvince` (`belongToProvince`);

--
-- Chỉ mục cho bảng `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`id`),
  ADD KEY `belongToVillage` (`belongToVillage`);

--
-- Chỉ mục cho bảng `province`
--
ALTER TABLE `province`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `village`
--
ALTER TABLE `village`
  ADD PRIMARY KEY (`id`),
  ADD KEY `belongToCommune` (`belongToCommune`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `declared`
--
ALTER TABLE `declared`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT cho bảng `person`
--
ALTER TABLE `person`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `account`
--
ALTER TABLE `account`
  ADD CONSTRAINT `account_ibfk_1` FOREIGN KEY (`manageToProvince`) REFERENCES `province` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `account_ibfk_2` FOREIGN KEY (`manageToDistrict`) REFERENCES `district` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `account_ibfk_3` FOREIGN KEY (`manageToCommune`) REFERENCES `commune` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `account_ibfk_4` FOREIGN KEY (`manageToVillage`) REFERENCES `village` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `commune`
--
ALTER TABLE `commune`
  ADD CONSTRAINT `commune_ibfk_1` FOREIGN KEY (`belongToDistrict`) REFERENCES `district` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `declared`
--
ALTER TABLE `declared`
  ADD CONSTRAINT `declared_ibfk_1` FOREIGN KEY (`userName`) REFERENCES `account` (`userName`);

--
-- Các ràng buộc cho bảng `district`
--
ALTER TABLE `district`
  ADD CONSTRAINT `district_ibfk_1` FOREIGN KEY (`belongToProvince`) REFERENCES `province` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `person`
--
ALTER TABLE `person`
  ADD CONSTRAINT `person_ibfk_1` FOREIGN KEY (`belongToVillage`) REFERENCES `village` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `village`
--
ALTER TABLE `village`
  ADD CONSTRAINT `village_ibfk_1` FOREIGN KEY (`belongToCommune`) REFERENCES `commune` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
