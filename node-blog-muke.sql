/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50726
Source Host           : localhost:3306
Source Database       : node-blog-muke

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2020-06-08 17:28:01
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for blogs
-- ----------------------------
DROP TABLE IF EXISTS `blogs`;
CREATE TABLE `blogs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `content` longtext NOT NULL,
  `createtime` bigint(20) NOT NULL DEFAULT '0',
  `author` varchar(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of blogs
-- ----------------------------
INSERT INTO `blogs` VALUES ('1', '标题B', '内容B', '1590625236587', 'zzh', '1');
INSERT INTO `blogs` VALUES ('2', '标题A', '内容A', '1590625236587', 'zhangsan', '3');
INSERT INTO `blogs` VALUES ('3', '标题C', '内容C', '1590625236587', 'lisi', '2');
INSERT INTO `blogs` VALUES ('4', 'zzh', '123', '1590655730587', 'zhangsan', '3');
INSERT INTO `blogs` VALUES ('6', 'update', 'update', '1590656023540', 'zhangsan', '3');
INSERT INTO `blogs` VALUES ('7', 'zzh', '123', '1590657310613', 'zhangsan', '3');
INSERT INTO `blogs` VALUES ('8', 'zzh', '123', '1590657311310', 'zhangsan', '3');
INSERT INTO `blogs` VALUES ('9', 'zzh', '123', '1590657311704', 'zhangsan', '3');
INSERT INTO `blogs` VALUES ('10', 'zzh', '123', '1590657312099', 'zhangsan', '3');
INSERT INTO `blogs` VALUES ('11', 'zzh', '123', '1590657312610', 'zhangsan', '3');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8mb4 NOT NULL,
  `password` varchar(32) CHARACTER SET utf8mb4 NOT NULL,
  `realname` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_icelandic_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'zzh', 'e3716887902ec0e448b8ab135857b27f', '张子恒');
INSERT INTO `users` VALUES ('2', 'lisi', 'e3716887902ec0e448b8ab135857b27f', '李四1');
INSERT INTO `users` VALUES ('3', 'zhangsan', '0854956793b0f65a5aa40bda71740fa1', '张三');
INSERT INTO `users` VALUES ('12', '123456', 'e3716887902ec0e448b8ab135857b27f', null);
