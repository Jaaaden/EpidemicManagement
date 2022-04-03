/*
 Navicat Premium Data Transfer

 Source Server         : mysql57
 Source Server Type    : MySQL
 Source Server Version : 50710
 Source Host           : localhost:3306
 Source Schema         : Jing

 Target Server Type    : MySQL
 Target Server Version : 50710
 File Encoding         : 65001

 Date: 31/03/2022 01:39:49
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for authors
-- ----------------------------
DROP TABLE IF EXISTS `authors`;
CREATE TABLE `authors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `a_name` varchar(255) DEFAULT NULL,
  `a_phone` varchar(255) DEFAULT NULL,
  `a_email` varchar(255) DEFAULT NULL,
  `a_start_time` varchar(255) DEFAULT NULL,
  `a_end_time` varchar(255) DEFAULT NULL,
  `aid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of authors
-- ----------------------------
BEGIN;
INSERT INTO `authors` (`id`, `a_name`, `a_phone`, `a_email`, `a_start_time`, `a_end_time`, `aid`) VALUES (3, 'JingYu', '83658888', '83658888@gmail.com', '2022-03-20 08:00:00', '2022-03-20\n10:00:00', 3);
COMMIT;

-- ----------------------------
-- Table structure for campus_notices
-- ----------------------------
DROP TABLE IF EXISTS `campus_notices`;
CREATE TABLE `campus_notices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `n_title` varchar(255) DEFAULT NULL,
  `n_content` varchar(255) DEFAULT NULL,
  `n_date` datetime DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of campus_notices
-- ----------------------------
BEGIN;
INSERT INTO `campus_notices` (`id`, `n_title`, `n_content`, `n_date`, `pid`) VALUES (1, 'Campus Epidemic News Title 1', 'Campus Epidemic News 1', '2021-12-11 00:00:00', 3);
INSERT INTO `campus_notices` (`id`, `n_title`, `n_content`, `n_date`, `pid`) VALUES (2, 'Campus Epidemic News Title 2', 'Campus Epidemic News 2', '2021-12-11 00:00:00', 3);
INSERT INTO `campus_notices` (`id`, `n_title`, `n_content`, `n_date`, `pid`) VALUES (3, 'Campus Epidemic News Title 3', 'Campus Epidemic News 3', '2021-12-11 00:00:00', 3);
INSERT INTO `campus_notices` (`id`, `n_title`, `n_content`, `n_date`, `pid`) VALUES (4, 'Campus Epidemic News Title 4', 'Campus Epidemic News 4', '2021-12-20 00:00:00', 3);
INSERT INTO `campus_notices` (`id`, `n_title`, `n_content`, `n_date`, `pid`) VALUES (5, 'Campus Epidemic News Title 5', 'Campus Epidemic News 5', '2021-12-20 16:00:00', 3);
COMMIT;

-- ----------------------------
-- Table structure for close_manages
-- ----------------------------
DROP TABLE IF EXISTS `close_manages`;
CREATE TABLE `close_manages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `m_stuid` varchar(255) DEFAULT NULL,
  `m_name` varchar(255) DEFAULT NULL,
  `m_gender` int(11) DEFAULT NULL,
  `m_college` varchar(255) DEFAULT NULL,
  `m_class` varchar(255) DEFAULT NULL,
  `m_building` varchar(255) DEFAULT NULL,
  `m_building_num` int(11) DEFAULT NULL,
  `m_recent_place` varchar(255) DEFAULT NULL,
  `m_recent_history` varchar(255) DEFAULT NULL,
  `m_health_status` varchar(255) DEFAULT NULL,
  `aid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of close_manages
-- ----------------------------
BEGIN;
INSERT INTO `close_manages` (`id`, `m_stuid`, `m_name`, `m_gender`, `m_college`, `m_class`, `m_building`, `m_building_num`, `m_recent_place`, `m_recent_history`, `m_health_status`, `aid`) VALUES (1, 'CB16666666666', 'Jyy', 0, 'NUS SoC', 'CS', 'A2', 1313, 'Celmenti', 'PC', 'Good', 1);
INSERT INTO `close_manages` (`id`, `m_stuid`, `m_name`, `m_gender`, `m_college`, `m_class`, `m_building`, `m_building_num`, `m_recent_place`, `m_recent_history`, `m_health_status`, `aid`) VALUES (2, 'CB19999999999', 'Jing', 0, 'NUS FoE', 'EE', 'A2', 1212, 'Celmenti', 'Utown', 'Good', 2);
INSERT INTO `close_manages` (`id`, `m_stuid`, `m_name`, `m_gender`, `m_college`, `m_class`, `m_building`, `m_building_num`, `m_recent_place`, `m_recent_history`, `m_health_status`, `aid`) VALUES (3, 'CB18888888888', 'Jaden', 0, 'SoC', 'GT', 'A2', 1212, 'Celmenti', 'Central Library', 'Good', 3);
COMMIT;

-- ----------------------------
-- Table structure for domestic_notices
-- ----------------------------
DROP TABLE IF EXISTS `domestic_notices`;
CREATE TABLE `domestic_notices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `n_title` varchar(255) DEFAULT NULL,
  `n_date` datetime DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of domestic_notices
-- ----------------------------
BEGIN;
INSERT INTO `domestic_notices` (`id`, `n_title`, `n_date`, `pid`) VALUES (1, 'Domestic epidemic news headlines 1', '2021-12-11 00:00:00', 3);
INSERT INTO `domestic_notices` (`id`, `n_title`, `n_date`, `pid`) VALUES (2, 'Domestic epidemic news headlines 2', '2021-12-11 00:00:00', 3);
INSERT INTO `domestic_notices` (`id`, `n_title`, `n_date`, `pid`) VALUES (3, 'Domestic epidemic news headlines 4', '2021-12-11 00:00:00', 3);
INSERT INTO `domestic_notices` (`id`, `n_title`, `n_date`, `pid`) VALUES (4, 'Domestic epidemic news headlines 5', '2021-12-20 01:35:45', 3);
INSERT INTO `domestic_notices` (`id`, `n_title`, `n_date`, `pid`) VALUES (5, 'Domestic epidemic news headlines 6', '2021-12-20 01:36:14', 3);
INSERT INTO `domestic_notices` (`id`, `n_title`, `n_date`, `pid`) VALUES (6, 'Domestic epidemic news headlines 7', '2021-12-20 01:36:28', 3);
COMMIT;

-- ----------------------------
-- Table structure for health_infoers
-- ----------------------------
DROP TABLE IF EXISTS `health_infoers`;
CREATE TABLE `health_infoers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `i_name` varchar(255) DEFAULT NULL,
  `i_idcard` varchar(255) DEFAULT NULL,
  `i_phone` varchar(255) DEFAULT NULL,
  `i_gender` int(11) DEFAULT NULL,
  `i_birth` datetime DEFAULT NULL,
  `i_nationality` varchar(255) DEFAULT NULL,
  `i_domicile` varchar(255) DEFAULT NULL,
  `i_native` varchar(255) DEFAULT NULL,
  `i_address` varchar(255) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of health_infoers
-- ----------------------------
BEGIN;
INSERT INTO `health_infoers` (`id`, `i_name`, `i_idcard`, `i_phone`, `i_gender`, `i_birth`, `i_nationality`, `i_domicile`, `i_native`, `i_address`, `pid`) VALUES (1, 'Jing', '440666666666666666', '16666666666', 0, '2022-03-23 00:00:00', 'China', 'Beijing', 'Beijing', 'asdf', 1);
INSERT INTO `health_infoers` (`id`, `i_name`, `i_idcard`, `i_phone`, `i_gender`, `i_birth`, `i_nationality`, `i_domicile`, `i_native`, `i_address`, `pid`) VALUES (2, 'Yyyyy', '440999999999999999', '19999999999', 0, '2022-03-24 00:00:00', 'HongKong\n⼤陆', 'HongKong', 'HongKong', 'qwer', 2);
INSERT INTO `health_infoers` (`id`, `i_name`, `i_idcard`, `i_phone`, `i_gender`, `i_birth`, `i_nationality`, `i_domicile`, `i_native`, `i_address`, `pid`) VALUES (3, 'Yuuuu', '440888888888888888', '18888888888', 0, '2022-03-24 00:00:00', 'South Korea', 'Seoul', 'Seoul', 'abcd', 3);
COMMIT;

-- ----------------------------
-- Table structure for health_messages
-- ----------------------------
DROP TABLE IF EXISTS `health_messages`;
CREATE TABLE `health_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `m_stuid` varchar(255) DEFAULT NULL,
  `m_name` varchar(255) DEFAULT NULL,
  `m_college` varchar(255) DEFAULT NULL,
  `m_class` varchar(255) DEFAULT NULL,
  `m_recent_resi` varchar(255) DEFAULT NULL,
  `m_recent_touch` varchar(255) DEFAULT NULL,
  `m_touch_date` datetime DEFAULT NULL,
  `m_health_status` varchar(255) DEFAULT NULL,
  `m_status_des` varchar(255) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of health_messages
-- ----------------------------
BEGIN;
INSERT INTO `health_messages` (`id`, `m_stuid`, `m_name`, `m_college`, `m_class`, `m_recent_resi`, `m_recent_touch`, `m_touch_date`, `m_health_status`, `m_status_des`, `pid`) VALUES (1, 'CB16666666666', 'Yyyy', 'School of Computing', 'GT', 'UT', 'Dining Room', '2022-03-22 00:00:00', 'Good', 'NULL', 1);
INSERT INTO `health_messages` (`id`, `m_stuid`, `m_name`, `m_college`, `m_class`, `m_recent_resi`, `m_recent_touch`, `m_touch_date`, `m_health_status`, `m_status_des`, `pid`) VALUES (2, 'CB19999999999', 'Yuuu', 'SoC', 'GT', 'Vivo', 'Dining Room', '2022-03-22 00:00:00', 'Good', 'NULL', 2);
INSERT INTO `health_messages` (`id`, `m_stuid`, `m_name`, `m_college`, `m_class`, `m_recent_resi`, `m_recent_touch`, `m_touch_date`, `m_health_status`, `m_status_des`, `pid`) VALUES (3, 'CB18888888888', 'Yyuu', 'FoE', 'GT', 'Clementi', 'Dining Room', '2022-03-22 11:05:56', 'Good', 'NULL', 3);
COMMIT;

-- ----------------------------
-- Table structure for health_records
-- ----------------------------
DROP TABLE IF EXISTS `health_records`;
CREATE TABLE `health_records` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `r_stuid` varchar(255) DEFAULT NULL,
  `r_name` varchar(255) DEFAULT NULL,
  `r_vaccine` varchar(255) DEFAULT NULL,
  `r_inject` int(11) DEFAULT NULL,
  `r_num` int(11) DEFAULT NULL,
  `r_manufacturer` varchar(255) DEFAULT NULL,
  `r_vac_unit` varchar(255) DEFAULT NULL,
  `r_vac_date` datetime DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of health_records
-- ----------------------------
BEGIN;
INSERT INTO `health_records` (`id`, `r_stuid`, `r_name`, `r_vaccine`, `r_inject`, `r_num`, `r_manufacturer`, `r_vac_unit`, `r_vac_date`, `pid`) VALUES (1, 'CB16666666666', 'dahuan', 'Novel Coronavirus inactivated vaccine', 3, 20211211, 'Beijing', 'Celmenti vaccination clinic', '2022-03-02 16:00:00', 3);
INSERT INTO `health_records` (`id`, `r_stuid`, `r_name`, `r_vaccine`, `r_inject`, `r_num`, `r_manufacturer`, `r_vac_unit`, `r_vac_date`, `pid`) VALUES (2, 'CB19999999999', 'xiaohuan', 'Novel Coronavirus inactivated vaccine', 3, 20211211, 'Guangzhou', 'Celmenti vaccination clinic', '2022-03-22 00:00:00', 2);
INSERT INTO `health_records` (`id`, `r_stuid`, `r_name`, `r_vaccine`, `r_inject`, `r_num`, `r_manufacturer`, `r_vac_unit`, `r_vac_date`, `pid`) VALUES (3, 'CB18888888888', 'ahuan', 'Novel Coronavirus inactivated vaccine', 3, 20211211, 'HongKong', 'Celmenti vaccination clinic', '2022-03-25 00:00:00', 3);
COMMIT;

-- ----------------------------
-- Table structure for highrick_manages
-- ----------------------------
DROP TABLE IF EXISTS `highrick_manages`;
CREATE TABLE `highrick_manages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `m_stuid` varchar(255) DEFAULT NULL,
  `m_name` varchar(255) DEFAULT NULL,
  `m_gender` int(11) DEFAULT NULL,
  `m_college` varchar(255) DEFAULT NULL,
  `m_class` varchar(255) DEFAULT NULL,
  `m_building` varchar(255) DEFAULT NULL,
  `m_building_num` int(11) DEFAULT NULL,
  `m_recent_place` varchar(255) DEFAULT NULL,
  `m_recent_history` varchar(255) DEFAULT NULL,
  `m_health_status` varchar(255) DEFAULT NULL,
  `aid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of highrick_manages
-- ----------------------------
BEGIN;
INSERT INTO `highrick_manages` (`id`, `m_stuid`, `m_name`, `m_gender`, `m_college`, `m_class`, `m_building`, `m_building_num`, `m_recent_place`, `m_recent_history`, `m_health_status`, `aid`) VALUES (1, 'CB16666666666', 'dahuan', 0, 'school of computing', 'GT', 'A2', 1212, 'Celmenti', 'Dining Room', 'Good', 1);
INSERT INTO `highrick_manages` (`id`, `m_stuid`, `m_name`, `m_gender`, `m_college`, `m_class`, `m_building`, `m_building_num`, `m_recent_place`, `m_recent_history`, `m_health_status`, `aid`) VALUES (2, 'CB19999999999', 'xiaohuan', 0, 'school of computing', 'GT', 'A2', 1212, 'Celmenti', 'Dining Room', 'Good', 2);
INSERT INTO `highrick_manages` (`id`, `m_stuid`, `m_name`, `m_gender`, `m_college`, `m_class`, `m_building`, `m_building_num`, `m_recent_place`, `m_recent_history`, `m_health_status`, `aid`) VALUES (3, 'CB18888888888', 'ahuan', 0, 'school of computing', 'GT', 'A2', 1212, 'Celmenti', 'Dining Room', 'Good', 3);
COMMIT;

-- ----------------------------
-- Table structure for infection_manages
-- ----------------------------
DROP TABLE IF EXISTS `infection_manages`;
CREATE TABLE `infection_manages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `m_stuid` varchar(255) DEFAULT NULL,
  `m_name` varchar(255) DEFAULT NULL,
  `m_gender` int(11) DEFAULT NULL,
  `m_college` varchar(255) DEFAULT NULL,
  `m_class` varchar(255) DEFAULT NULL,
  `m_building` varchar(255) DEFAULT NULL,
  `m_build_num` int(11) DEFAULT NULL,
  `m_inject_source` varchar(255) DEFAULT NULL,
  `m_inject_date` datetime DEFAULT NULL,
  `aid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of infection_manages
-- ----------------------------
BEGIN;
INSERT INTO `infection_manages` (`id`, `m_stuid`, `m_name`, `m_gender`, `m_college`, `m_class`, `m_building`, `m_build_num`, `m_inject_source`, `m_inject_date`, `aid`) VALUES (1, 'CB16666666666', 'dahuan', 0, 'School of Computing', 'GT', 'com1', 1212, 'Dining \nRoom', '2022-03-11 00:00:00', 1);
INSERT INTO `infection_manages` (`id`, `m_stuid`, `m_name`, `m_gender`, `m_college`, `m_class`, `m_building`, `m_build_num`, `m_inject_source`, `m_inject_date`, `aid`) VALUES (2, 'CB19999999999', 'xiaohuan', 0, 'School of Computing', 'CS', 'com2', 1212, 'Dining \nRoom', '2022-03-11 00:00:00', 2);
INSERT INTO `infection_manages` (`id`, `m_stuid`, `m_name`, `m_gender`, `m_college`, `m_class`, `m_building`, `m_build_num`, `m_inject_source`, `m_inject_date`, `aid`) VALUES (3, 'CB18888888888', 'ahuan', 0, 'School of Computing', 'IS', 'com1', 1212, 'Dining \nRoom', '2022-03-11 00:00:00', 3);
COMMIT;

-- ----------------------------
-- Table structure for journals
-- ----------------------------
DROP TABLE IF EXISTS `journals`;
CREATE TABLE `journals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `j_stuid` varchar(255) DEFAULT NULL,
  `j_name` varchar(255) DEFAULT NULL,
  `j_role` int(11) DEFAULT NULL,
  `j_browser` varchar(255) DEFAULT NULL,
  `j_ip` varchar(255) DEFAULT NULL,
  `j_ipname` varchar(255) DEFAULT NULL,
  `j_date` varchar(255) DEFAULT NULL,
  `j_status` varchar(255) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of journals
-- ----------------------------
BEGIN;
INSERT INTO `journals` (`id`, `j_stuid`, `j_name`, `j_role`, `j_browser`, `j_ip`, `j_ipname`, `j_date`, `j_status`, `pid`) VALUES (1, 'CB18888888888', 'Jing Yu', 3, 'Chrome', '182.55.48.32', 'SINGAPORE', '2022-03-30 10:03:56', 'Login successful', 3);
INSERT INTO `journals` (`id`, `j_stuid`, `j_name`, `j_role`, `j_browser`, `j_ip`, `j_ipname`, `j_date`, `j_status`, `pid`) VALUES (2, 'CB18888888888', 'Jing Yu', 3, 'Chrome', '182.55.48.32', 'SINGAPORE', '2022-03-31 01:38:51', 'Login successful', 3);
COMMIT;

-- ----------------------------
-- Table structure for journey_datas
-- ----------------------------
DROP TABLE IF EXISTS `journey_datas`;
CREATE TABLE `journey_datas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `d_stuid` varchar(255) DEFAULT NULL,
  `d_name` varchar(255) DEFAULT NULL,
  `d_college` varchar(255) DEFAULT NULL,
  `d_class` varchar(255) DEFAULT NULL,
  `d_building` varchar(255) DEFAULT NULL,
  `d_build_num` int(11) DEFAULT NULL,
  `d_return_num` varchar(255) DEFAULT NULL,
  `d_return_date` datetime DEFAULT NULL,
  `d_start_area` varchar(255) DEFAULT NULL,
  `d_arrival_area` varchar(255) DEFAULT NULL,
  `d_in_reach` varchar(255) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of journey_datas
-- ----------------------------
BEGIN;
INSERT INTO `journey_datas` (`id`, `d_stuid`, `d_name`, `d_college`, `d_class`, `d_building`, `d_build_num`, `d_return_num`, `d_return_date`, `d_start_area`, `d_arrival_area`, `d_in_reach`, `pid`) VALUES (1, 'CB16666666666', 'dahuan', 'School of Computing', 'GT', 'A2', 1212, 'G1536', '2021-12-11 00:00:00', 'Beijing', 'Clementi', 'NaN', 1);
INSERT INTO `journey_datas` (`id`, `d_stuid`, `d_name`, `d_college`, `d_class`, `d_building`, `d_build_num`, `d_return_num`, `d_return_date`, `d_start_area`, `d_arrival_area`, `d_in_reach`, `pid`) VALUES (2, 'CB19999999999', 'xiaohuan', 'SoC', 'GT', 'A2', 1212, 'G1536', '2021-12-11 00:00:00', 'Utown', 'Clementi', 'Null', 2);
INSERT INTO `journey_datas` (`id`, `d_stuid`, `d_name`, `d_college`, `d_class`, `d_building`, `d_build_num`, `d_return_num`, `d_return_date`, `d_start_area`, `d_arrival_area`, `d_in_reach`, `pid`) VALUES (3, 'CB18888888888', 'ahuan', 'FoE', 'GT', 'A2', 1212, 'G1536', '2021-12-20 16:00:00', 'Vivo', 'Clementi', 'NULL', 3);
COMMIT;

-- ----------------------------
-- Table structure for lowrick_manages
-- ----------------------------
DROP TABLE IF EXISTS `lowrick_manages`;
CREATE TABLE `lowrick_manages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `m_stuid` varchar(255) DEFAULT NULL,
  `m_name` varchar(255) DEFAULT NULL,
  `m_gender` int(11) DEFAULT NULL,
  `m_college` varchar(255) DEFAULT NULL,
  `m_class` varchar(255) DEFAULT NULL,
  `m_building` varchar(255) DEFAULT NULL,
  `m_building_num` int(11) DEFAULT NULL,
  `m_recent_place` varchar(255) DEFAULT NULL,
  `m_recent_history` varchar(255) DEFAULT NULL,
  `m_health_status` varchar(255) DEFAULT NULL,
  `aid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of lowrick_manages
-- ----------------------------
BEGIN;
INSERT INTO `lowrick_manages` (`id`, `m_stuid`, `m_name`, `m_gender`, `m_college`, `m_class`, `m_building`, `m_building_num`, `m_recent_place`, `m_recent_history`, `m_health_status`, `aid`) VALUES (1, 'CB16666666666', 'dahuan', 0, 'School of Computing', 'GT', 'A2', 1212, 'Clementi', 'Dining Room', 'Good', 3);
INSERT INTO `lowrick_manages` (`id`, `m_stuid`, `m_name`, `m_gender`, `m_college`, `m_class`, `m_building`, `m_building_num`, `m_recent_place`, `m_recent_history`, `m_health_status`, `aid`) VALUES (2, 'CB19999999999', 'xiaohuan', 0, 'SoC', 'GT', 'A2', 1212, 'Clementi', 'Dining Room', 'Good', 3);
INSERT INTO `lowrick_manages` (`id`, `m_stuid`, `m_name`, `m_gender`, `m_college`, `m_class`, `m_building`, `m_building_num`, `m_recent_place`, `m_recent_history`, `m_health_status`, `aid`) VALUES (3, 'CB18888888888', 'ahuan', 0, 'SoC', 'GT', 'A2', 1212, 'Clementi', 'Dining Room', 'Good', 3);
COMMIT;

-- ----------------------------
-- Table structure for personal_infos
-- ----------------------------
DROP TABLE IF EXISTS `personal_infos`;
CREATE TABLE `personal_infos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `i_stuid` varchar(255) DEFAULT NULL,
  `i_name` varchar(255) DEFAULT NULL,
  `i_gender` int(11) DEFAULT NULL,
  `i_birth` datetime DEFAULT NULL,
  `i_nation` varchar(255) DEFAULT NULL,
  `i_university` varchar(255) DEFAULT NULL,
  `i_college` varchar(255) DEFAULT NULL,
  `i_class` varchar(255) DEFAULT NULL,
  `i_profession` varchar(255) DEFAULT NULL,
  `i_enter_time` datetime DEFAULT NULL,
  `i_background` varchar(255) DEFAULT NULL,
  `rid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of personal_infos
-- ----------------------------
BEGIN;
INSERT INTO `personal_infos` (`id`, `i_stuid`, `i_name`, `i_gender`, `i_birth`, `i_nation`, `i_university`, `i_college`, `i_class`, `i_profession`, `i_enter_time`, `i_background`, `rid`) VALUES (1, '16666666666', 'dahuan', 0, '1999-03-17 00:00:00', 'China', 'NUS', 'school of \ncomputing', 'CS', 'CS', '2022-03-17 00:00:00', 'Phd', 1);
INSERT INTO `personal_infos` (`id`, `i_stuid`, `i_name`, `i_gender`, `i_birth`, `i_nation`, `i_university`, `i_college`, `i_class`, `i_profession`, `i_enter_time`, `i_background`, `rid`) VALUES (18, 'CB18888888888', 'Jing Yu', 0, '2021-12-20 16:00:00', 'Enter Please', 'Enter Please', 'Enter Please', 'Enter Please', 'Enter Please', '2022-03-30 09:46:08', 'Enter Please', 3);
COMMIT;

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `r_account` varchar(255) DEFAULT NULL,
  `r_pwd` varchar(255) DEFAULT NULL,
  `r_serial` varchar(255) DEFAULT NULL,
  `r_name` varchar(255) DEFAULT NULL,
  `r_role` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of roles
-- ----------------------------
BEGIN;
INSERT INTO `roles` (`id`, `r_account`, `r_pwd`, `r_serial`, `r_name`, `r_role`) VALUES (1, '11111111', '$2a$10$bZMFeiTT/hX.KM8wy3dg6e/K/XgH8x69i2COIx6rmEkYHpto/nEsO', 'CB16666666666', 'dahuan', 1);
INSERT INTO `roles` (`id`, `r_account`, `r_pwd`, `r_serial`, `r_name`, `r_role`) VALUES (2, '22222222', '$2a$10$bZMFeiTT/hX.KM8wy3dg6e/K/XgH8x69i2COIx6rmEkYHpto/nEsO', 'CB19999999999', 'xiaohuan', 2);
INSERT INTO `roles` (`id`, `r_account`, `r_pwd`, `r_serial`, `r_name`, `r_role`) VALUES (3, '33333333', '$2a$10$bZMFeiTT/hX.KM8wy3dg6e/K/XgH8x69i2COIx6rmEkYHpto/nEsO', 'CB18888888888', 'Jing Yu', 3);
COMMIT;

-- ----------------------------
-- Table structure for sequelizemeta
-- ----------------------------
DROP TABLE IF EXISTS `sequelizemeta`;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`) USING BTREE,
  UNIQUE KEY `name` (`name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of sequelizemeta
-- ----------------------------
BEGIN;
INSERT INTO `sequelizemeta` (`name`) VALUES ('20211210132155-create-roles.js');
INSERT INTO `sequelizemeta` (`name`) VALUES ('20211210161324-create-personal-infos.js');
INSERT INTO `sequelizemeta` (`name`) VALUES ('20211211023511-create-lowrick-manages.js');
INSERT INTO `sequelizemeta` (`name`) VALUES ('20211211031503-create-highrick-manages.js');
INSERT INTO `sequelizemeta` (`name`) VALUES ('20211211032901-create-close-manages.js');
INSERT INTO `sequelizemeta` (`name`) VALUES ('20211211034301-create-infection-manages.js');
INSERT INTO `sequelizemeta` (`name`) VALUES ('20211211041019-create-journey-datas.js');
INSERT INTO `sequelizemeta` (`name`) VALUES ('20211211043828-create-journey-datas.js');
INSERT INTO `sequelizemeta` (`name`) VALUES ('20211211050830-create-health-records.js');
INSERT INTO `sequelizemeta` (`name`) VALUES ('20211211053204-create-health-records.js');
INSERT INTO `sequelizemeta` (`name`) VALUES ('20211211070408-create-health-messages.js');
INSERT INTO `sequelizemeta` (`name`) VALUES ('20211211072537-create-health-infoers.js');
INSERT INTO `sequelizemeta` (`name`) VALUES ('20211211075507-create-domestic-notices.js');
INSERT INTO `sequelizemeta` (`name`) VALUES ('20211211081134-create-campus-notices.js');
INSERT INTO `sequelizemeta` (`name`) VALUES ('20211211082527-create-authors.js');
INSERT INTO `sequelizemeta` (`name`) VALUES ('20211211083405-create-authors.js');
INSERT INTO `sequelizemeta` (`name`) VALUES ('20211211084143-create-authors.js');
INSERT INTO `sequelizemeta` (`name`) VALUES ('20211211085552-create-journals.js');
INSERT INTO `sequelizemeta` (`name`) VALUES ('20211228042318-create-journals.js');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
