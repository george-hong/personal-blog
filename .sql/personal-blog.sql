/*
 Navicat MySQL Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 80031
 Source Host           : localhost:3306
 Source Schema         : personal-blog

 Target Server Type    : MySQL
 Target Server Version : 80031
 File Encoding         : 65001

 Date: 23/11/2022 23:01:08
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'article id',
  `title` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'article title',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'article content',
  `authorId` int NOT NULL COMMENT 'author id of article',
  `createTime` timestamp NULL DEFAULT NULL,
  `updateTime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `views` int NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 60 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES (1, 'hello', '在元素作为flex布局的子元素，设置flex属性，并使用overflow添加滚动条时，可能有无法显示滚动条的问题。\n\n此时可为元素设置flex-shrink: 0; height: 0;注意，需要确保所有父级容器均设置此属性。\n\n详情参考[此文章](https://blog.csdn.net/milugloomy/article/details/109850418)\n\n以下为示例代码\n\n```html\n<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\r\n  <meta name=\"viewport\" content=\"width=device-width,initial-scale=1.0,maximum-scale=1,user-scalable=no\">\r\n  <meta charset=\"UTF-8\">\r\n  <title>Title</title>\r\n</head>\r\n<style>\r\n* {\r\n  margin: 0;\r\n  box-sizing: border-box;\r\n}\r\n.app {\r\n  height: 100vh;\r\n  width: 100vw;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n.top{\r\n  height: 50px;\r\n  padding: 10px 50px;\r\n  width: 100%;\r\n  background: #faa3ef;\r\n}\r\n.bottom {\r\n  flex: 1;\r\n  /* 方式一 设置flex-shrink为0，设置height为0 */\r\n  /* 方式二 设置overflow: scroll */\r\n  flex-shrink: 0;\r\n  height: 0;\r\n  /*overflow: scroll;*/\r\n  width: 100%;\r\n  display: flex;\r\n}\r\n.bottom_left {\r\n  height: 100%;\r\n  width: 100px;\r\n  overflow: scroll;\r\n}\r\n.menu {\r\n  height: 100px;\r\n  background: linear-gradient(#fafafc, blue);\r\n}\r\n.bottom_right {\r\n  flex: 1;\r\n  /* 方式一 设置flex-shrink为0，设置width为0 */\r\n  /* 方式二 设置overflow: scroll */\r\n  flex-shrink: 0;\r\n  width: 0;\r\n  /*overflow: scroll;*/\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n.bottom_right_top {\r\n  height: 50px;\r\n  padding: 10px 50px;\r\n}\r\n.bottom_right_bottom {\r\n  flex: 1;\r\n  overflow: scroll;\r\n}\r\n.page {\r\n  width: 2000px;\r\n  height: 2000px;\r\n  padding: 10px;\r\n  overflow: scroll;\r\n  border: 5px dashed red;\r\n}\r\n</style>\r\n<body>\r\n<div class=\"app\">\r\n  <div class=\"top\">标题</div>\r\n  <div class=\"bottom\">\r\n    <div class=\"bottom_left\">\r\n      <div class=\"menu\">菜单1</div>\r\n      <div class=\"menu\">菜单2</div>\r\n      <div class=\"menu\">菜单3</div>\r\n      <div class=\"menu\">菜单4</div>\r\n      <div class=\"menu\">菜单5</div>\r\n      <div class=\"menu\">菜单6</div>\r\n    </div>\r\n    <div class=\"bottom_right\">\r\n      <div class=\"bottom_right_top\">子页面标题</div>\r\n      <div class=\"bottom_right_bottom\">\r\n        <div class=\"page\">可左右上下拖动的子页面</div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n</body>\r\n</html>\r\n\n```\n', 11, '2022-11-16 23:09:46', '2022-11-23 22:57:26', 2);
INSERT INTO `article` VALUES (38, 'addFormOtherSource', 'addFormOtherSource222\n', 11, '2022-11-16 23:09:49', '2022-11-23 23:00:38', 4);
INSERT INTO `article` VALUES (39, 'add', 'add\n', 11, '2022-11-16 23:09:52', '2022-11-16 23:09:52', 0);
INSERT INTO `article` VALUES (40, 'add', 'add\n', 11, '2022-11-16 23:09:54', '2022-11-16 23:09:54', 0);
INSERT INTO `article` VALUES (41, '面向对象编程', '### 继承模式\n\n1.  类式继承\n\n    *   通过修改子类的原型对象继承父类的方法\n\n    ```javascript\n    // 父类\n    function SuperClass() {\n      this.superValue = &#39super&#39;\n    }\n\n    // 父类方法\n    SuperClass.prototype.getSuperValue = function() {\n      return this.superValue;\n    }\n\n    // 子类\n    function SubClass() {\n      this.subValue = &#39sub&#39;\n    }\n\n    // 通过替换原型继承父类方法\n    SubClass.prototype = new SuperClass();\n\n    // 添加子类方法\n    SubClass.prototype.getSubValue = function() {\n      return this.subValue;\n    }\n\n    const sub = new SubClass();\n    sub.getSuperValue();   // &#39super&#39\n    sub.getSubValue();     // &#39sub&#39\n    ```\n\n2.  构造函数继承\n\n    *   在子类构造函数中调用父类构造函数，实现父类属性的继承\n\n    *   缺点是为继承父类原型的方法\n\n    ```javascript\n    // 父类\n    function SuperClass(superValue) {\n      this.books = [&#39JavaScript&#39, &#39TypeScript&#39];\n      this.superValue = superValue;\n    }\n\n    // 父类方法\n    SuperClass.prototype.showBooks = function() {\n      console.log(this.books);\n    }\n\n    // 子类\n    function SubClass(superValue) {\n      SuperClass.call(this, superValue);\n    }\n\n    const instanceOne = new SubClass(&#39super one&#39);\n    const instanceTwo = new SubClass(&#39super two&#39);\n    instanceOne.books.push(&#39NodeJS&#39);\n    console.log(instanceOne.showBooks());       // [&#39JavaScript&#39, &#39TypeScript&#39, &#39NodeJS&#39]\n    console.log(instanceTwo.showBooks());       // [&#39JavaScript&#39, &#39TypeScript&#39]\n    console.log(instanceOne.superValue);  // &#39super one&#39\n    console.log(instanceTwo.superValue);  // &#39super two&#39\n     \n    ```\n\n3.  组合继承\n\n    *   结合类式继承与构造函数继承；将父类实例添加到子类原型，并在子类构造函数中调用父类构造函数\n\n    *   缺点是可能因为缺少必要参数导致父类构造函数报错\n\n    ```javascript\n    // 父类\n    function SuperClass(superValue) {\n      this.superValue = superValue;\n      this.books = [&#39JavaScript&#39, &#39TypeScript&#39];\n    }\n    // 添加父类方法\n    SuperClass.prototype.getBooks = function() {\n      return this.books;\n    }\n\n    // 子类\n    function SubClass(superValue, subValue) {\n      SuperClass.call(this, superValue);\n      this.subValue = subValue;\n    }\n    // 类式继承，子类原型继承父类实例，此时可能因为缺少必要参数导致父类构造函数报错\n    SubClass.prototype = new SuperClass();\n    // 子类方法\n    SubClass.getSubValue = function() {\n      return this.subValue;\n    }\n\n    const instanceOne = new SubClass(&#39sup1&#39, &#39sub1&#39);\n    const instanceTwo = new SubClass(&#39sup2&#39, &#39sub2&#39);\n    instanceTwo.books.push(&#39You dont know JS&#39);\n\n    console.log(instanceOne.superValue);  // &#39sup1&#39\n    console.log(instanceTwo.superValue);  // &#39sup2&#39\n\n    console.log(instanceOne.getSubValue());  // &#39sub1&#39\n    console.log(instanceTwo.getSubValue());  // &#39sub2&#39\n\n    console.log(instanceOne.getBooks());  // [&#39JavaScript&#39, &#39TypeScript&#39]\n    console.log(instanceTwo.getBooks());  // [&#39JavaScript&#39, &#39TypeScript&#39, &#39You dont know JS&#39]\n    ```\n\n4.  原型式继承\n\n5.  寄生式继承\n\n6.  寄生组合式继承\n', 11, '2022-11-16 23:09:57', '2022-11-16 23:09:57', 0);
INSERT INTO `article` VALUES (42, 'tt', 'tt\n', 11, '2022-11-16 23:10:00', '2022-11-16 23:10:00', 0);
INSERT INTO `article` VALUES (43, 'tt2', 'tt2\n', 11, '2022-11-16 23:10:02', '2022-11-16 23:10:02', 0);
INSERT INTO `article` VALUES (44, 'nextjs已知问题', '1.  开发环境下未预加载全部界面，导致某些动态生成的变量被重复执行，导致页面拿到的值不正确，最终导致功能异常。\n\n2.  生产环境下由于已加载全部界面，取到的为最终值，因此不存在此问题。\n', 11, '2022-11-16 23:10:05', '2022-11-16 23:10:05', 0);
INSERT INTO `article` VALUES (45, '123', '123132\n', 11, '2022-11-16 23:10:07', '2022-11-16 23:10:07', 0);
INSERT INTO `article` VALUES (46, '777', '777\n', 11, '2022-11-16 23:10:09', '2022-11-16 23:10:09', 0);
INSERT INTO `article` VALUES (47, '213', '123\n', 11, '2022-11-16 23:10:11', '2022-11-16 23:10:11', 0);
INSERT INTO `article` VALUES (48, '123', '8895\n', 11, '2022-11-16 23:10:14', '2022-11-16 23:10:14', 0);
INSERT INTO `article` VALUES (49, '123', '995\n', 11, '2022-11-16 23:10:21', '2022-11-23 22:57:31', 1);
INSERT INTO `article` VALUES (50, '789', '565777\n', 11, '2022-10-25 01:25:56', '2022-10-25 01:25:56', 0);
INSERT INTO `article` VALUES (51, 'addarticle', '.then(result => {\n\n&#x20;     Router.push(`/article/detail?id=${result.data.id}`);kk\n\n&#x20;   })\n\n&#x20;   .catch(error => {\n\n&#x20;     console.log(&#39error&#39, error);\n\n&#x20;   });\n', 11, '2022-10-25 22:36:12', '2022-10-25 22:36:12', 0);
INSERT INTO `article` VALUES (52, 'mapbox-gl-draw绘制完成回调函数', '1.  绘制模式状态变更逻辑\n\n&#x20;   &#x20;当前模式 -> 触发changeMode -> 调用当前模式onStop -> 初始化下一个模式 -> 执行render方法 -> changeMode结束\n\n2.  已实现示例\n\n&#x20;   event.js\n\n```javascript\n    function changeMode(modename, nextModeOptions = {}, eventOptions = {}) {\n\n      const {\n\n        clearUserCallback,    // If specify this option, do not call the user callback.\n\n        ...otherModeOptions\n\n      } = nextModeOptions;\n\n      let userCallback = currentMode.stop();\n\n      if (clearUserCallback) userCallback = null;\n\n      const modebuilder = modes[modename];\n\n      if (modebuilder === undefined) {\n\n        throw new Error(`${modename} is not valid`);\n\n      }\n\n      currentModeName = modename;\n\n      const mode = modebuilder(ctx, otherModeOptions);\n\n      currentMode = setupModeHandler(mode, ctx);\n\n      if (!eventOptions.silent) {\n\n        ctx.map.fire(Constants.events.MODE_CHANGE, { mode: modename});\n\n      }\n\n      ctx.store.setDirty();\n\n      ctx.store.render();\n\n      userCallback && userCallback();\n\n    }\n```\n\n&#x20;   draw\\\\_point.js\n\n```javascript\n    // on setup\n\n    DrawPoint.onSetup = function(options) {\n\n      const { customProperties, callback } = options;\n\n      const point = this.newFeature({\n\n        type: Constants.geojsonTypes.FEATURE,\n\n        properties: {\n\n          ...customProperties,\n\n        },\n\n        geometry: {\n\n          type: Constants.geojsonTypes.POINT,\n\n          coordinates: []\n\n        }\n\n      });\n\n      this.addFeature(point);\n\n      this.clearSelectedFeatures();\n\n      this.updateUIClasses({ mouse: Constants.cursors.ADD });\n\n      this.activateUIButton(Constants.types.POINT);\n\n      this.setActionableState({\n\n        trash: true\n\n      });\n\n      return {\n\n        point,\n\n        // storage callback on mode state\n\n        callback,\n\n        tips: options.tips,\n\n        tooltip: options.tips ? new Tooltip(&#39&#39, this.map) : null,\n\n      };\n\n    };\n\n    ...\n\n    // on stop\n\n    DrawPoint.onStop = function(state) {\n\n      this.updateTooltip(state);\n\n      const { callback } = state;\n\n      this.activateUIButton();\n\n      if (!state.point.getCoordinate().length) {\n\n        this.deleteFeature([state.point.id], { silent: true });\n\n      }\n\n      return () => {\n\n        callback && callback(state.point.toGeoJSON());\n\n        delete state.callback;\n\n      };\n\n    };\n```\n\n', 11, '2022-11-16 23:45:17', NULL, 0);
INSERT INTO `article` VALUES (53, 'undefined', 'undefined', 11, '2022-11-19 19:53:26', NULL, 0);
INSERT INTO `article` VALUES (54, 'undefined', 'undefined', 11, '2022-11-19 19:54:13', NULL, 0);
INSERT INTO `article` VALUES (55, 'undefined', 'undefined', 11, '2022-11-19 19:54:14', NULL, 0);
INSERT INTO `article` VALUES (56, 'undefined', 'undefined', 11, '2022-11-19 19:54:34', NULL, 0);
INSERT INTO `article` VALUES (57, 'ff', 'axccccd\n', 11, '2022-11-19 19:59:35', NULL, 0);
INSERT INTO `article` VALUES (58, 'ff', 'axccccd\n', 11, '2022-11-19 20:00:01', NULL, 0);
INSERT INTO `article` VALUES (59, '实现jenkins自动化部署', '### &#x20;安装Jenkins\n\n提示用户没有权限\n\n[原文地址](https://blog.csdn.net/wuxiaoying888/article/details/124457546)\n\nwin10下非专业版用户无法修改安全策略，需要执行以下bat命令。\n\n```bash\n@echo off\n\npushd \"%~dp0\"\n\ndir /b C:WindowsservicingPackagesMicrosoft-Windows-GroupPolicy-ClientExtensions-Package~3*.mum >List.txt\n\ndir /b C:WindowsservicingPackagesMicrosoft-Windows-GroupPolicy-ClientTools-Package~3*.mum >>List.txt\n\nfor /f %%i in (&#39findstr /i . List.txt 2^>nul&#39) do dism /online /norestart /add-package:\"C:WindowsservicingPackages\\%%i\"\n\npause\n```\n\nJenkins构建报错cannot run program \"sh\"\n\n[原文地址](https://www.cnblogs.com/xieyang07/p/12545742.html)\n\n解决办法：\n\n&#x20; 设置shell程序，修改Jenkins配置Manage Jenkins-> Configure System-> Shell-> Shell execute，将值设置为`C:Windowssystem32cmd.exe`\n\nJenkins提示无法连接git\n\n`OpenSSL SSL\\_read: Connection was reset, errno 10054`\n\n解决办法：关闭git SSL验证 `git config --global http.sslVerify \"false\"`\n\n\n\nGit拉取代码提示连接失败failed to connect to github.com port 443\n\n解决办法：取消https代理\n\n[原文地址](https://blog.csdn.net/Hodors/article/details/103226958?spm=1001.2101.3001.6650.6&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-6-103226958-blog-120484529.pc_relevant_3mothn_strategy_recovery&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-6-103226958-blog-120484529.pc_relevant_3mothn_strategy_recovery&utm_relevant_index=7)\n\n```\n\ngit config --global --unset http.proxy\n \ngit config --global --unset https.proxy\n```\n', 11, '2022-11-19 23:55:47', '2022-11-23 23:00:45', 1);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'user name',
  `nickName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'user avatar',
  `privateKey` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createTime` bigint UNSIGNED NOT NULL,
  `updateTime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 23 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (4, 'user4', NULL, '12345678', NULL, '123456', 1665289822909, '2022-10-17 21:12:45');
INSERT INTO `user` VALUES (5, 'admin', NULL, '45499e4ca39017d2c4a753927362c628aaf52814c256b0521f30330225783244', NULL, '7777', 1665409401000, '2022-10-22 00:02:40');
INSERT INTO `user` VALUES (6, 'admin3', NULL, 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f', NULL, '88888', 1665499362920, '2022-10-21 23:20:18');
INSERT INTO `user` VALUES (7, 'admin7', NULL, '12345678', NULL, '1666454122902', 1666454122902, NULL);
INSERT INTO `user` VALUES (8, 'admin8', NULL, '12345678', NULL, '1666454198446', 1666454198446, NULL);
INSERT INTO `user` VALUES (11, 'usertest', 'usertest', '75e44c02f418661b05d1dd668b20a152fe8502b5749e459b249a8735afa3f670', 'coder.jpg', '1666457271459', 1666457271459, '2022-10-27 21:36:26');
INSERT INTO `user` VALUES (12, 'usertest2', NULL, '6dbe461b11491d6d976c3de5f525707ef7573c08f0b0e07fb4c9bc4f6c97bfbb', NULL, '1666503175313', 1666503175313, NULL);
INSERT INTO `user` VALUES (13, 'usertest9', NULL, '75e44c02f418661b05d1dd668b20a152fe8502b5749e459b249a8735afa3f670', NULL, '1666506609846', 1666506609846, NULL);
INSERT INTO `user` VALUES (14, 'newaccount', NULL, '45499e4ca39017d2c4a753927362c628aaf52814c256b0521f30330225783244', NULL, '1666880459182', 1666880459182, NULL);
INSERT INTO `user` VALUES (15, 'usertest3', 'undefined', '45499e4ca39017d2c4a753927362c628aaf52814c256b0521f30330225783244', NULL, '1666881080031', 1666881080031, NULL);
INSERT INTO `user` VALUES (16, 'usertest6', 'test6', '45499e4ca39017d2c4a753927362c628aaf52814c256b0521f30330225783244', NULL, '1666881479029', 1666881479029, NULL);
INSERT INTO `user` VALUES (17, 'usertest81', '123456', '45499e4ca39017d2c4a753927362c628aaf52814c256b0521f30330225783244', NULL, '1668846726599', 1668846726599, NULL);
INSERT INTO `user` VALUES (18, '123456', 'usertest81', '45499e4ca39017d2c4a753927362c628aaf52814c256b0521f30330225783244', NULL, '1668849831474', 1668849831474, NULL);
INSERT INTO `user` VALUES (19, 'usertest77888', 'usertest77888', '45499e4ca39017d2c4a753927362c628aaf52814c256b0521f30330225783244', NULL, '1668850164335', 1668850164335, NULL);
INSERT INTO `user` VALUES (20, 'usertest778', '1222', '45499e4ca39017d2c4a753927362c628aaf52814c256b0521f30330225783244', NULL, '1668855569207', 1668855569207, NULL);
INSERT INTO `user` VALUES (21, 'usertest8188', '1234569999', '', NULL, '1668855675774', 1668855675774, NULL);
INSERT INTO `user` VALUES (22, 'usertest99', 'nick', '45499e4ca39017d2c4a753927362c628aaf52814c256b0521f30330225783244', NULL, '1668855832321', 1668855832321, NULL);

SET FOREIGN_KEY_CHECKS = 1;
