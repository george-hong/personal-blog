/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 80030
Source Host           : localhost:3306
Source Database       : personal-blog

Target Server Type    : MYSQL
Target Server Version : 80030
File Encoding         : 65001

Date: 2022-10-23 00:54:56
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
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('1', 'hello', '在元素作为flex布局的子元素，设置flex属性，并使用overflow添加滚动条时，可能有无法显示滚动条的问题。\n\n此时可为元素设置flex-shrink: 0; height: 0;注意，需要确保所有父级容器均设置此属性。\n\n详情参考[此文章](https://blog.csdn.net/milugloomy/article/details/109850418)\n\n以下为示例代码\n\n```html\n<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\r\n  <meta name=\"viewport\" content=\"width=device-width,initial-scale=1.0,maximum-scale=1,user-scalable=no\">\r\n  <meta charset=\"UTF-8\">\r\n  <title>Title</title>\r\n</head>\r\n<style>\r\n* {\r\n  margin: 0;\r\n  box-sizing: border-box;\r\n}\r\n.app {\r\n  height: 100vh;\r\n  width: 100vw;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n.top{\r\n  height: 50px;\r\n  padding: 10px 50px;\r\n  width: 100%;\r\n  background: #faa3ef;\r\n}\r\n.bottom {\r\n  flex: 1;\r\n  /* 方式一 设置flex-shrink为0，设置height为0 */\r\n  /* 方式二 设置overflow: scroll */\r\n  flex-shrink: 0;\r\n  height: 0;\r\n  /*overflow: scroll;*/\r\n  width: 100%;\r\n  display: flex;\r\n}\r\n.bottom_left {\r\n  height: 100%;\r\n  width: 100px;\r\n  overflow: scroll;\r\n}\r\n.menu {\r\n  height: 100px;\r\n  background: linear-gradient(#fafafc, blue);\r\n}\r\n.bottom_right {\r\n  flex: 1;\r\n  /* 方式一 设置flex-shrink为0，设置width为0 */\r\n  /* 方式二 设置overflow: scroll */\r\n  flex-shrink: 0;\r\n  width: 0;\r\n  /*overflow: scroll;*/\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n.bottom_right_top {\r\n  height: 50px;\r\n  padding: 10px 50px;\r\n}\r\n.bottom_right_bottom {\r\n  flex: 1;\r\n  overflow: scroll;\r\n}\r\n.page {\r\n  width: 2000px;\r\n  height: 2000px;\r\n  padding: 10px;\r\n  overflow: scroll;\r\n  border: 5px dashed red;\r\n}\r\n</style>\r\n<body>\r\n<div class=\"app\">\r\n  <div class=\"top\">标题</div>\r\n  <div class=\"bottom\">\r\n    <div class=\"bottom_left\">\r\n      <div class=\"menu\">菜单1</div>\r\n      <div class=\"menu\">菜单2</div>\r\n      <div class=\"menu\">菜单3</div>\r\n      <div class=\"menu\">菜单4</div>\r\n      <div class=\"menu\">菜单5</div>\r\n      <div class=\"menu\">菜单6</div>\r\n    </div>\r\n    <div class=\"bottom_right\">\r\n      <div class=\"bottom_right_top\">子页面标题</div>\r\n      <div class=\"bottom_right_bottom\">\r\n        <div class=\"page\">可左右上下拖动的子页面</div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n</body>\r\n</html>\r\n\n```\n', '1');
INSERT INTO `article` VALUES ('38', 'addFormOtherSource', 'addFormOtherSource222\n', '1');
INSERT INTO `article` VALUES ('39', 'add', 'add\n', '1');
INSERT INTO `article` VALUES ('40', 'add', 'add\n', '1');
INSERT INTO `article` VALUES ('41', '面向对象编程', '### 继承模式\n\n1.  类式继承\n\n    *   通过修改子类的原型对象继承父类的方法\n\n    ```javascript\n    // 父类\n    function SuperClass() {\n      this.superValue = &#39super&#39;\n    }\n\n    // 父类方法\n    SuperClass.prototype.getSuperValue = function() {\n      return this.superValue;\n    }\n\n    // 子类\n    function SubClass() {\n      this.subValue = &#39sub&#39;\n    }\n\n    // 通过替换原型继承父类方法\n    SubClass.prototype = new SuperClass();\n\n    // 添加子类方法\n    SubClass.prototype.getSubValue = function() {\n      return this.subValue;\n    }\n\n    const sub = new SubClass();\n    sub.getSuperValue();   // &#39super&#39\n    sub.getSubValue();     // &#39sub&#39\n    ```\n\n2.  构造函数继承\n\n    *   在子类构造函数中调用父类构造函数，实现父类属性的继承\n\n    *   缺点是为继承父类原型的方法\n\n    ```javascript\n    // 父类\n    function SuperClass(superValue) {\n      this.books = [&#39JavaScript&#39, &#39TypeScript&#39];\n      this.superValue = superValue;\n    }\n\n    // 父类方法\n    SuperClass.prototype.showBooks = function() {\n      console.log(this.books);\n    }\n\n    // 子类\n    function SubClass(superValue) {\n      SuperClass.call(this, superValue);\n    }\n\n    const instanceOne = new SubClass(&#39super one&#39);\n    const instanceTwo = new SubClass(&#39super two&#39);\n    instanceOne.books.push(&#39NodeJS&#39);\n    console.log(instanceOne.showBooks());       // [&#39JavaScript&#39, &#39TypeScript&#39, &#39NodeJS&#39]\n    console.log(instanceTwo.showBooks());       // [&#39JavaScript&#39, &#39TypeScript&#39]\n    console.log(instanceOne.superValue);  // &#39super one&#39\n    console.log(instanceTwo.superValue);  // &#39super two&#39\n     \n    ```\n\n3.  组合继承\n\n    *   结合类式继承与构造函数继承；将父类实例添加到子类原型，并在子类构造函数中调用父类构造函数\n\n    *   缺点是可能因为缺少必要参数导致父类构造函数报错\n\n    ```javascript\n    // 父类\n    function SuperClass(superValue) {\n      this.superValue = superValue;\n      this.books = [&#39JavaScript&#39, &#39TypeScript&#39];\n    }\n    // 添加父类方法\n    SuperClass.prototype.getBooks = function() {\n      return this.books;\n    }\n\n    // 子类\n    function SubClass(superValue, subValue) {\n      SuperClass.call(this, superValue);\n      this.subValue = subValue;\n    }\n    // 类式继承，子类原型继承父类实例，此时可能因为缺少必要参数导致父类构造函数报错\n    SubClass.prototype = new SuperClass();\n    // 子类方法\n    SubClass.getSubValue = function() {\n      return this.subValue;\n    }\n\n    const instanceOne = new SubClass(&#39sup1&#39, &#39sub1&#39);\n    const instanceTwo = new SubClass(&#39sup2&#39, &#39sub2&#39);\n    instanceTwo.books.push(&#39You dont know JS&#39);\n\n    console.log(instanceOne.superValue);  // &#39sup1&#39\n    console.log(instanceTwo.superValue);  // &#39sup2&#39\n\n    console.log(instanceOne.getSubValue());  // &#39sub1&#39\n    console.log(instanceTwo.getSubValue());  // &#39sub2&#39\n\n    console.log(instanceOne.getBooks());  // [&#39JavaScript&#39, &#39TypeScript&#39]\n    console.log(instanceTwo.getBooks());  // [&#39JavaScript&#39, &#39TypeScript&#39, &#39You dont know JS&#39]\n    ```\n\n4.  原型式继承\n\n5.  寄生式继承\n\n6.  寄生组合式继承\n', '1');
INSERT INTO `article` VALUES ('42', 'tt', 'tt\n', '1');
INSERT INTO `article` VALUES ('43', 'tt2', 'tt2\n', '1');
INSERT INTO `article` VALUES ('44', 'nextjs已知问题', '1.  开发环境下未预加载全部界面，导致某些动态生成的变量被重复执行，导致页面拿到的值不正确，最终导致功能异常。\n\n2.  生产环境下由于已加载全部界面，取到的为最终值，因此不存在此问题。\n', '1');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT 'user name',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL COMMENT 'user avatar',
  `privateKey` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createTime` bigint unsigned NOT NULL,
  `updateTime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('4', 'user4', '12345678', null, '123456', '1665289822909', '2022-10-17 21:12:45');
INSERT INTO `user` VALUES ('5', 'admin', '45499e4ca39017d2c4a753927362c628aaf52814c256b0521f30330225783244', null, '7777', '1665409401000', '2022-10-22 00:02:40');
INSERT INTO `user` VALUES ('6', 'admin3', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f', null, '88888', '1665499362920', '2022-10-21 23:20:18');
INSERT INTO `user` VALUES ('7', 'admin7', '12345678', null, '1666454122902', '1666454122902', null);
INSERT INTO `user` VALUES ('8', 'admin8', '12345678', null, '1666454198446', '1666454198446', null);
INSERT INTO `user` VALUES ('11', 'usertest', '75e44c02f418661b05d1dd668b20a152fe8502b5749e459b249a8735afa3f670', null, '1666457271459', '1666457271459', null);
