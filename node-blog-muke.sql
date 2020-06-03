/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : node-blog-muke

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2020-05-30 17:05:19
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of blogs
-- ----------------------------
INSERT INTO `blogs` VALUES ('1', '标题B', '内容B', '1590625236587', 'wanger');
INSERT INTO `blogs` VALUES ('2', '标题A', '内容A', '1590625236587', 'zhangsan');
INSERT INTO `blogs` VALUES ('3', '标题C', '内容C', '1590625236587', 'lisi');
INSERT INTO `blogs` VALUES ('4', 'zzh', '123', '1590655730587', 'zhangsan');
INSERT INTO `blogs` VALUES ('6', 'update', 'update', '1590656023540', 'zhangsan');
INSERT INTO `blogs` VALUES ('7', 'zzh', '123', '1590657310613', 'zhangsan');
INSERT INTO `blogs` VALUES ('8', 'zzh', '123', '1590657311310', 'zhangsan');
INSERT INTO `blogs` VALUES ('9', 'zzh', '123', '1590657311704', 'zhangsan');
INSERT INTO `blogs` VALUES ('10', 'zzh', '123', '1590657312099', 'zhangsan');
INSERT INTO `blogs` VALUES ('11', 'zzh', '123', '1590657312610', 'zhangsan');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8mb4 NOT NULL,
  `password` varchar(20) CHARACTER SET utf8mb4 NOT NULL,
  `realname` varchar(10) CHARACTER SET utf8mb4 NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'zzh', '123', '张子恒');
INSERT INTO `users` VALUES ('2', 'lisi', '123', '李四1');
