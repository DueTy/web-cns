/*
Navicat MySQL Data Transfer

Source Server         : duety_local
Source Server Version : 50703
Source Host           : localhost:3306
Source Database       : cns

Target Server Type    : MYSQL
Target Server Version : 50703
File Encoding         : 65001

Date: 2017-05-28 13:35:17
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for folder
-- ----------------------------
DROP TABLE IF EXISTS `folder`;
CREATE TABLE `folder` (
  `folder_name` varchar(25) DEFAULT NULL,
  `folder_id` varchar(255) NOT NULL,
  `folder_level` int(10) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`folder_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of folder
-- ----------------------------

-- ----------------------------
-- Table structure for note
-- ----------------------------
DROP TABLE IF EXISTS `note`;
CREATE TABLE `note` (
  `note_id` varchar(255) NOT NULL,
  `note_name` varchar(255) DEFAULT NULL,
  `note_type` varchar(10) DEFAULT NULL,
  `note_password` varchar(25) DEFAULT NULL,
  `is_private` int(1) DEFAULT NULL,
  `note_content` longtext,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`note_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of note
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `username` varchar(25) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `user_id` varchar(40) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('duety.no1', '701525', '25540503-1f33-42f6-a03c-fd00089ac211');
INSERT INTO `user` VALUES ('duety123', '123', '6fa3287c-cb93-43cb-9e3c-2ed0d6cea4c1');
INSERT INTO `user` VALUES ('china.no1', '7015258', '8240b0ab-50f0-4666-93a2-7b0fe578919b');
INSERT INTO `user` VALUES ('China.NO1', '7015258', 'a2fafd32-72b0-4562-bb5d-fa2c89abb567');
INSERT INTO `user` VALUES ('duety123123', '123', 'af318ff0-6585-44e7-b97d-c76ff15af7a2');
