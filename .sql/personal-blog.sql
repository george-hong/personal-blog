/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 80030
Source Host           : localhost:3306
Source Database       : personal-blog

Target Server Type    : MYSQL
Target Server Version : 80030
File Encoding         : 65001

Date: 2022-09-27 23:56:20
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'article id',
  `title` char(50) NOT NULL COMMENT 'article title',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'article content',
  `authorId` int NOT NULL COMMENT 'author id of article',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('1', 'hello', '在元素作为flex布局的子元素，设置flex属性，并使用overflow添加滚动条时，可能有无法显示滚动条的问题。\n\n此时可为元素设置flex-shrink: 0; height: 0;注意，需要确保所有父级容器均设置此属性。\n\n详情参考[此文章](https://blog.csdn.net/milugloomy/article/details/109850418)\n\n以下为示例代码\n\n```html\n<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\r\n  <meta name=\"viewport\" content=\"width=device-width,initial-scale=1.0,maximum-scale=1,user-scalable=no\">\r\n  <meta charset=\"UTF-8\">\r\n  <title>Title</title>\r\n</head>\r\n<style>\r\n* {\r\n  margin: 0;\r\n  box-sizing: border-box;\r\n}\r\n.app {\r\n  height: 100vh;\r\n  width: 100vw;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n.top{\r\n  height: 50px;\r\n  padding: 10px 50px;\r\n  width: 100%;\r\n  background: #faa3ef;\r\n}\r\n.bottom {\r\n  flex: 1;\r\n  /* 方式一 设置flex-shrink为0，设置height为0 */\r\n  /* 方式二 设置overflow: scroll */\r\n  flex-shrink: 0;\r\n  height: 0;\r\n  /*overflow: scroll;*/\r\n  width: 100%;\r\n  display: flex;\r\n}\r\n.bottom_left {\r\n  height: 100%;\r\n  width: 100px;\r\n  overflow: scroll;\r\n}\r\n.menu {\r\n  height: 100px;\r\n  background: linear-gradient(#fafafc, blue);\r\n}\r\n.bottom_right {\r\n  flex: 1;\r\n  /* 方式一 设置flex-shrink为0，设置width为0 */\r\n  /* 方式二 设置overflow: scroll */\r\n  flex-shrink: 0;\r\n  width: 0;\r\n  /*overflow: scroll;*/\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n.bottom_right_top {\r\n  height: 50px;\r\n  padding: 10px 50px;\r\n}\r\n.bottom_right_bottom {\r\n  flex: 1;\r\n  overflow: scroll;\r\n}\r\n.page {\r\n  width: 2000px;\r\n  height: 2000px;\r\n  padding: 10px;\r\n  overflow: scroll;\r\n  border: 5px dashed red;\r\n}\r\n</style>\r\n<body>\r\n<div class=\"app\">\r\n  <div class=\"top\">标题</div>\r\n  <div class=\"bottom\">\r\n    <div class=\"bottom_left\">\r\n      <div class=\"menu\">菜单1</div>\r\n      <div class=\"menu\">菜单2</div>\r\n      <div class=\"menu\">菜单3</div>\r\n      <div class=\"menu\">菜单4</div>\r\n      <div class=\"menu\">菜单5</div>\r\n      <div class=\"menu\">菜单6</div>\r\n    </div>\r\n    <div class=\"bottom_right\">\r\n      <div class=\"bottom_right_top\">子页面标题</div>\r\n      <div class=\"bottom_right_bottom\">\r\n        <div class=\"page\">可左右上下拖动的子页面</div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n</body>\r\n</html>\r\n\n```\n', '1');
INSERT INTO `article` VALUES ('38', 'addFormOtherSource', 'addFormOtherSource\n', '1');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT 'user name',
  `password` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL COMMENT 'user avatar',
  `createTime` timestamp NULL DEFAULT NULL,
  `updateTime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
