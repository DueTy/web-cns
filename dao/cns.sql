/*
Navicat MySQL Data Transfer

Source Server         : duety_local
Source Server Version : 50703
Source Host           : localhost:3306
Source Database       : cns

Target Server Type    : MYSQL
Target Server Version : 50703
File Encoding         : 65001

Date: 2017-06-17 18:45:15
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for folder
-- ----------------------------
DROP TABLE IF EXISTS `folder`;
CREATE TABLE `folder` (
  `folder_id` varchar(40) NOT NULL,
  `folder_name` varchar(20) DEFAULT NULL,
  `folder_level` tinyint(1) DEFAULT NULL,
  `belong_id` varchar(255) DEFAULT NULL,
  `par_folder_id` varchar(40) DEFAULT NULL,
  `created_at` datetime ,
  `modify_time` datetime ,
  PRIMARY KEY (`folder_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of folder
-- ----------------------------
INSERT INTO `folder` VALUES ('040bea99-c2a0-4e2f-a3b6-9f04badaa4ba', '日报test', '1', '351a22af-89c7-47f6-a05c-5dd2d707b48c', 'root', '2017-06-05 12:10:19', '2017-06-05 12:10:19');
INSERT INTO `folder` VALUES ('059a5877-65c2-43fb-b849-855d15c483d3', '新建文件夹', '2', '351a22af-89c7-47f6-a05c-5dd2d707b48c', 'e9ab6a82-711a-474b-96a6-f34c3f20dcd8', '2017-06-05 12:07:45', '2017-06-05 12:07:45');
INSERT INTO `folder` VALUES ('0ceb566f-5c00-4531-97d6-68035c1dd336', '日报test', '1', '351a22af-89c7-47f6-a05c-5dd2d707b48c', 'root', '2017-06-05 12:10:13', '2017-06-05 12:10:13');
INSERT INTO `folder` VALUES ('1a6cfbc0-2c5c-4740-8ba6-2eee43c0dbdc', '日报test', '1', '351a22af-89c7-47f6-a05c-5dd2d707b48c', 'root', '2017-06-05 12:10:33', '2017-06-05 12:10:33');
INSERT INTO `folder` VALUES ('28979637-d863-403d-9204-985aaf2725a5', '日报test', '1', '351a22af-89c7-47f6-a05c-5dd2d707b48c', 'root', '2017-06-05 12:10:38', '2017-06-05 12:10:38');
INSERT INTO `folder` VALUES ('33e3d386-ae5f-43bb-afc2-ccad0072ce8b', '日报 6.5', '1', '351a22af-89c7-47f6-a05c-5dd2d707b48c', 'root', '2017-06-05 11:23:32', '2017-06-05 11:23:31');
INSERT INTO `folder` VALUES ('566d53e4-6e23-4a53-ad3c-fdb3e57844fa', '日报test', '1', '351a22af-89c7-47f6-a05c-5dd2d707b48c', 'root', '2017-06-05 12:10:04', '2017-06-05 12:10:04');
INSERT INTO `folder` VALUES ('58835a6e-46e2-4146-8a81-93858d65eec5', '日报test', '1', '351a22af-89c7-47f6-a05c-5dd2d707b48c', 'root', '2017-06-05 12:10:29', '2017-06-05 12:10:29');
INSERT INTO `folder` VALUES ('67e8e0d3-0406-4e57-b754-a017013bfaa8', '日报test', '1', '351a22af-89c7-47f6-a05c-5dd2d707b48c', 'root', '2017-06-05 12:10:42', '2017-06-05 12:10:42');
INSERT INTO `folder` VALUES ('695b8df0-e326-438a-bbd6-4cc4b6807cde', '这还是个二级文件夹', '2', '351a22af-89c7-47f6-a05c-5dd2d707b48c', '33e3d386-ae5f-43bb-afc2-ccad0072ce8b', '2017-06-05 11:24:35', '2017-06-05 11:24:35');
INSERT INTO `folder` VALUES ('7057abbd-f8a0-42b1-9843-d832cb330d01', '日报test', '1', '351a22af-89c7-47f6-a05c-5dd2d707b48c', 'root', '2017-06-05 12:10:16', '2017-06-05 12:10:16');
INSERT INTO `folder` VALUES ('7cd9bb1f-640c-4ec9-b7ae-5be23c904f08', '二级', '2', '351a22af-89c7-47f6-a05c-5dd2d707b48c', '33e3d386-ae5f-43bb-afc2-ccad0072ce8b', '2017-06-05 12:12:16', '2017-06-05 12:12:16');
INSERT INTO `folder` VALUES ('88d41be5-0767-46af-b913-c8e8fb68f75d', '日报test', '1', '351a22af-89c7-47f6-a05c-5dd2d707b48c', 'root', '2017-06-05 12:10:45', '2017-06-05 12:10:45');
INSERT INTO `folder` VALUES ('9e5c61bb-7f32-47be-ab1c-c32f45bafc27', '三级', '3', '351a22af-89c7-47f6-a05c-5dd2d707b48c', '7cd9bb1f-640c-4ec9-b7ae-5be23c904f08', '2017-06-05 12:12:21', '2017-06-05 12:12:21');
INSERT INTO `folder` VALUES ('aaa570e3-34f0-416d-ba34-9b73b733ed0b', '日报 6.4 ', '1', '351a22af-89c7-47f6-a05c-5dd2d707b48c', 'root', '2017-06-05 11:16:01', '2017-06-05 11:16:01');
INSERT INTO `folder` VALUES ('b2e85e8c-9f4f-4a62-82ee-a5c0b3f6704c', '日报test', '1', '351a22af-89c7-47f6-a05c-5dd2d707b48c', 'root', '2017-06-05 12:10:51', '2017-06-05 12:10:51');
INSERT INTO `folder` VALUES ('bcd8d6ea-e4ff-4874-ab97-97c6c3c269df', '日报test', '1', '351a22af-89c7-47f6-a05c-5dd2d707b48c', 'root', '2017-06-05 12:10:25', '2017-06-05 12:10:25');
INSERT INTO `folder` VALUES ('ca12295b-c756-468f-b1d4-3f5f119895fa', '新建文件夹', '1', '351a22af-89c7-47f6-a05c-5dd2d707b48c', 'root', '2017-06-06 09:23:43', '2017-06-06 09:23:43');
INSERT INTO `folder` VALUES ('d56b24ec-91db-4f3e-b28f-7a2e455ea6c2', '四级', '4', '351a22af-89c7-47f6-a05c-5dd2d707b48c', '9e5c61bb-7f32-47be-ab1c-c32f45bafc27', '2017-06-05 12:12:52', '2017-06-05 12:12:52');
INSERT INTO `folder` VALUES ('e6b5286e-090e-4a06-9140-684236ee40fe', '日报test', '1', '351a22af-89c7-47f6-a05c-5dd2d707b48c', 'root', '2017-06-05 12:10:11', '2017-06-05 12:10:11');
INSERT INTO `folder` VALUES ('e9ab6a82-711a-474b-96a6-f34c3f20dcd8', '日报 6.3', '1', '351a22af-89c7-47f6-a05c-5dd2d707b48c', 'root', '2017-06-05 11:15:47', '2017-06-05 11:15:47');

-- ----------------------------
-- Table structure for historical_note
-- ----------------------------
CREATE TABLE `historical_note` (
  `note_id` varchar(40) NOT NULL,
  `belong_note_id` varchar(40) DEFAULT NULL,
  `note_type` varchar(4) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `created_user_id` varchar(40) DEFAULT NULL,
  `note_content` longtext,
  `note_abstract` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`note_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of historical_note
-- ----------------------------
INSERT INTO `historical_note` VALUES ('411da356-4905-4661-899a-298814ec60de', 'a29f1b8f-1693-433b-82bc-442b71dcd0fe', 'note', '2017-06-06 06:09:30', '351a22af-89c7-47f6-a05c-5dd2d707b48c', '<p>我猜，我们至少该互换鞋子，，，，，，</p>\n', '我猜，我们至少该互换鞋子，，，，，，');
INSERT INTO `historical_note` VALUES ('4577e87d-fd48-4219-84a0-7ce04d372489', 'a29f1b8f-1693-433b-82bc-442b71dcd0fe', 'note', '2017-06-06 05:07:32', '351a22af-89c7-47f6-a05c-5dd2d707b48c', '<p>我猜，我们至少该互换鞋子</p>\n', '我猜，我们至少该互换鞋子');
INSERT INTO `historical_note` VALUES ('9c2d2f46-5356-4618-8fda-702b69fede35', 'a3ebf101-81fc-4106-a6cd-90adf82d2fc3', 'mk', '2017-06-06 06:09:50', '351a22af-89c7-47f6-a05c-5dd2d707b48c', '| Tables        | Are           | Cool  |\n| ------------- |:-------------:| -----:|\n| col 3 is      | right-aligned | $1600 |\n| col 4 is      | right-aligned | $1600 |', '');

-- ----------------------------
-- Table structure for note
-- ----------------------------
CREATE TABLE `note` (
  `note_id` varchar(40) NOT NULL,
  `note_name` varchar(20) DEFAULT NULL,
  `note_type` char(4) DEFAULT NULL,
  `owner_id` varchar(40) DEFAULT NULL,
  `belong_folder_id` varchar(40) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `modify_time` datetime ,
  `show_modify` char(12) DEFAULT NULL,
  `note_content` longtext,
  `note_abstract` varchar(80) DEFAULT NULL,
  `note_size` char(10) DEFAULT NULL,
  PRIMARY KEY (`note_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of note
-- ----------------------------
INSERT INTO `note` VALUES ('2921d59b-14b9-494f-9036-107e69e93f46', '新建笔记', 'note', '351a22af-89c7-47f6-a05c-5dd2d707b48c', '7cd9bb1f-640c-4ec9-b7ae-5be23c904f08', '2017-06-05 12:11:54', '2017-06-05 12:11:54', '2017-06-05', '', '', '0B');
INSERT INTO `note` VALUES ('326e5506-d20e-47ac-91b5-ad478fd914cc', '新建笔记', 'mk', '351a22af-89c7-47f6-a05c-5dd2d707b48c', 'root', '2017-06-05 01:00:58', '2017-06-05 01:00:58', '2017-06-05', '', '', '0B');
INSERT INTO `note` VALUES ('3a883752-43c7-4dc9-92a1-43b24c444917', '测试更新时间', 'mk', '351a22af-89c7-47f6-a05c-5dd2d707b48c', 'root', '2017-06-05 01:01:00', '2017-06-05 13:06:07', '2017-06-05', '测试更新时间，列表的排序以最后一次更新为准', '', '63B');
INSERT INTO `note` VALUES ('3fd2d18d-de16-4b2d-b317-fc21248503a9', '这是个四级目录下的笔记', 'note', '351a22af-89c7-47f6-a05c-5dd2d707b48c', 'd56b24ec-91db-4f3e-b28f-7a2e455ea6c2', '2017-06-05 12:12:57', '2017-06-05 12:13:11', '2017-06-05', '', '', '0B');
INSERT INTO `note` VALUES ('54ab3a9a-95d2-41cb-8713-b5a3fe4d1e0b', '新建笔记', 'mk', '351a22af-89c7-47f6-a05c-5dd2d707b48c', '695b8df0-e326-438a-bbd6-4cc4b6807cde', '2017-06-05 12:11:46', '2017-06-06 16:08:20', '2017-06-05', '| Tables        | Are           | Cool  |\n| ------------- |:-------------:| -----:|\n| col 3 is      | right-aligned | $1600 |\n| col 2 is      | centered      |   $12 |\n| zebra ni      | are neat      |    $1 |', null, '0B');
INSERT INTO `note` VALUES ('80c9250d-ae6b-4fc2-8b01-8608ec58d188', '最近修改', 'note', '351a22af-89c7-47f6-a05c-5dd2d707b48c', 'root', '2017-06-05 01:00:59', '2017-06-06 08:37:13', '2017-06-06', '<p>最近更新</p>\n', '最近更新', '20B');
INSERT INTO `note` VALUES ('9b82eeb7-7463-46c4-8925-e853eedfffd8', '测试笔记', 'note', '351a22af-89c7-47f6-a05c-5dd2d707b48c', 'root', '2017-06-05 11:54:23', '2017-06-05 11:54:42', '2017-06-05', '<p>你好啊</p>\n', '你好啊', '17B');
INSERT INTO `note` VALUES ('9d064f67-54ac-43be-9392-c7a789422beb', '测试笔', 'note', '351a22af-89c7-47f6-a05c-5dd2d707b48c', '33e3d386-ae5f-43bb-afc2-ccad0072ce8b', '2017-06-05 11:17:22', '2017-06-06 09:23:35', '2017-06-06', '<p>今天开始测试系统了，求不出bug</p>\n', '今天开始测试系统了，求不出bug', '50B');
INSERT INTO `note` VALUES ('a29f1b8f-1693-433b-82bc-442b71dcd0fe', '测试笔记', 'note', '351a22af-89c7-47f6-a05c-5dd2d707b48c', 'root', '2017-06-05 03:39:15', '2017-06-06 18:10:05', '2017-06-06', '<p>我猜，我们至少该互换鞋子，，，</p>\n', '我猜，我们至少该互换鞋子，，，', '44B');
INSERT INTO `note` VALUES ('a3ebf101-81fc-4106-a6cd-90adf82d2fc3', 'markdown示例', 'mk', '351a22af-89c7-47f6-a05c-5dd2d707b48c', 'root', '2017-06-03 03:39:18', '2017-06-06 18:09:50', '2017-06-06', '| Tables        | Are           | Cool  |\n| ------------- |:-------------:| -----:|\n| col 3 is      | right-aligned | $1600 |\n| col 4 is      | right-aligned | $1600 |', '', '167B');
INSERT INTO `note` VALUES ('a698ef99-fba5-4a75-aa20-b6779fb306f1', '这是个三级目录下的markdown', 'mk', '351a22af-89c7-47f6-a05c-5dd2d707b48c', '9e5c61bb-7f32-47be-ab1c-c32f45bafc27', '2017-06-03 12:14:16', '2017-06-05 13:18:05', '2017-06-05', '', '', '0B');
INSERT INTO `note` VALUES ('abd2a759-aeff-462b-adff-d6d64ecafc59', 'connect_false', 'note', '351a22af-89c7-47f6-a05c-5dd2d707b48c', 'e9ab6a82-711a-474b-96a6-f34c3f20dcd8', '2017-06-05 03:20:11', '2017-06-06 02:28:57', '2017-06-06', '<p>web前端---杜豪</p>\n\n<p>&nbsp;</p>\n\n<p>已做: 双旦工行pc图片素材</p>\n\n<p>&nbsp;</p>\n\n<p>正做: 双旦工行切图，js事</p>\n\n<p>&nbsp;</p>\n\n<p>要做: 双旦工行提测</p>\n', 'web前端---杜豪已做: 双旦工行pc图片素材正做: 双旦工行切图，js事', '157B');
INSERT INTO `note` VALUES ('bfe2cca4-3789-4f0d-8353-e87be8aaadc3', 'markdown测试', 'mk', '351a22af-89c7-47f6-a05c-5dd2d707b48c', 'aaa570e3-34f0-416d-ba34-9b73b733ed0b', '2017-06-05 10:22:57', '2017-06-05 12:31:50', '2017-06-05', '这是在测试根目录下的markdown', '', '38B');
INSERT INTO `note` VALUES ('f8683d53-9190-4211-800d-e43e04490182', 'guts over fear', 'note', '351a22af-89c7-47f6-a05c-5dd2d707b48c', 'root', '2017-06-05 01:00:57', '2017-06-06 02:42:20', '2017-06-06', '', '\n', '0B');

-- ----------------------------
-- Table structure for orgnization
-- ----------------------------
CREATE TABLE `orgnization` (
  `orgnization_id` varchar(40) DEFAULT NULL,
  `name` varchar(20) DEFAULT NULL,
  `member_size` tinyint(3) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `org_manager_id` varchar(40) DEFAULT NULL,
  `org_description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of orgnization
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
CREATE TABLE `user` (
  `user_id` varchar(40) NOT NULL,
  `username` varchar(20) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `personal_desc` varchar(255) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `orgnazition_build_count` tinyint(3) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `belong_org_id` varchar(40) DEFAULT NULL,
  `note_mag_permisstion` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('351a22af-89c7-47f6-a05c-5dd2d707b48c', 'duety123', 'male', ' ', '123', '1', '2017-06-03 00:00:00', '', '0');
INSERT INTO `user` VALUES ('9eb12b2b-ce4c-4548-88e2-1b6e9a75afff', 'duety789', 'male', null, '123', '1', '2017-06-03 00:00:00', '', '0');
INSERT INTO `user` VALUES ('9ec43597-7f22-42cd-8c23-8c51bbe559eb', 'duety123', 'female', '你好世界', '123', '1', '2017-06-06 02:36:43', '', '0');
