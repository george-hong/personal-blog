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

 Date: 09/12/2022 22:29:38
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
  `summary` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'first hudred charts',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 60 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES (1, 'hello', '在元素作为flex布局的子元素，设置flex属性，并使用overflow添加滚动条时，可能有无法显示滚动条的问题。\n\n此时可为元素设置flex-shrink: 0; height: 0;注意，需要确保所有父级容器均设置此属性。\n\n详情参考[此文章](https://blog.csdn.net/milugloomy/article/details/109850418)\n\n以下为示例代码\n\n```html\n<!DOCTYPE html>\r\n<html lang=_&#34_en_&#34_>\r\n<head>\r\n  <meta http-equiv=_&#34_X-UA-Compatible_&#34_ content=_&#34_IE=edge_&#34_>\r\n  <meta name=_&#34_viewport_&#34_ content=_&#34_width=device-width,initial-scale=1.0,maximum-scale=1,user-scalable=no_&#34_>\r\n  <meta charset=_&#34_UTF-8_&#34_>\r\n  <title>Title</title>\r\n</head>\r\n<style>\r\n* {\r\n  margin: 0;\r\n  box-sizing: border-box;\r\n}\r\n.app {\r\n  height: 100vh;\r\n  width: 100vw;\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n.top{\r\n  height: 50px;\r\n  padding: 10px 50px;\r\n  width: 100%;\r\n  background: #faa3ef;\r\n}\r\n.bottom {\r\n  flex: 1;\r\n  /* 方式一 设置flex-shrink为0，设置height为0 */\r\n  /* 方式二 设置overflow: scroll */\r\n  flex-shrink: 0;\r\n  height: 0;\r\n  /*overflow: scroll;*/\r\n  width: 100%;\r\n  display: flex;\r\n}\r\n.bottom_left {\r\n  height: 100%;\r\n  width: 100px;\r\n  overflow: scroll;\r\n}\r\n.menu {\r\n  height: 100px;\r\n  background: linear-gradient(#fafafc, blue);\r\n}\r\n.bottom_right {\r\n  flex: 1;\r\n  /* 方式一 设置flex-shrink为0，设置width为0 */\r\n  /* 方式二 设置overflow: scroll */\r\n  flex-shrink: 0;\r\n  width: 0;\r\n  /*overflow: scroll;*/\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n.bottom_right_top {\r\n  height: 50px;\r\n  padding: 10px 50px;\r\n}\r\n.bottom_right_bottom {\r\n  flex: 1;\r\n  overflow: scroll;\r\n}\r\n.page {\r\n  width: 2000px;\r\n  height: 2000px;\r\n  padding: 10px;\r\n  overflow: scroll;\r\n  border: 5px dashed red;\r\n}\r\n</style>\r\n<body>\r\n<div class=_&#34_app_&#34_>\r\n  <div class=_&#34_top_&#34_>标题</div>\r\n  <div class=_&#34_bottom_&#34_>\r\n    <div class=_&#34_bottom_left_&#34_>\r\n      <div class=_&#34_menu_&#34_>菜单1</div>\r\n      <div class=_&#34_menu_&#34_>菜单2</div>\r\n      <div class=_&#34_menu_&#34_>菜单3</div>\r\n      <div class=_&#34_menu_&#34_>菜单4</div>\r\n      <div class=_&#34_menu_&#34_>菜单5</div>\r\n      <div class=_&#34_menu_&#34_>菜单6</div>\r\n    </div>\r\n    <div class=_&#34_bottom_right_&#34_>\r\n      <div class=_&#34_bottom_right_top_&#34_>子页面标题</div>\r\n      <div class=_&#34_bottom_right_bottom_&#34_>\r\n        <div class=_&#34_page_&#34_>可左右上下拖动的子页面</div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n</body>\r\n</html>\r\n\n```\n', 1, '2022-11-16 23:09:46', '2022-12-06 22:51:05', 59, '在元素作为flex布局的子元素，设置flex属性，并使用overflow添加滚动条时，可能有无法显示滚动条的问题。\n此时可为元素设置flex-shrink: 0; height: 0;注意，需要确保所');
INSERT INTO `article` VALUES (2, '面向对象编程', '### 继承模式\n\n1.  类式继承\n\n*   通过修改子类的原型对象继承父类的方法\n\n```javascript\n// 父类\n\nfunction SuperClass() {\n\n    this.superValue = _&#39_super_&#39_;\n\n}\n\n// 父类方法\n\nSuperClass.prototype.getSuperValue = function() {\n\n    return this.superValue;\n\n}\n\n// 子类\n\nfunction SubClass() {\n\n    this.subValue = _&#39_sub_&#39_;\n\n}\n\n// 通过替换原型继承父类方法\n\nSubClass.prototype = new SuperClass();\n\n// 添加子类方法\n\nSubClass.prototype.getSubValue = function() {\n\n    return this.subValue;\n\n}\n\nconst sub = new SubClass();\n\nsub.getSuperValue();   // _&#39_super_&#39_\n\nsub.getSubValue();     // _&#39_sub_&#39_\n```\n\n1.  构造函数继承\n\n*   在子类构造函数中调用父类构造函数，实现父类属性的继承\n\n*   &#x20;缺点是为继承父类原型的方法\n\n```javascript\n// 父类\n\nfunction SuperClass(superValue) {\n\n    this.books = [_&#39_JavaScript_&#39_, _&#39_TypeScript_&#39_];\n\n    this.superValue = superValue;\n\n}\n\n// 父类方法\n\nSuperClass.prototype.showBooks = function() {\n\n    console.log(this.books);\n\n}\n\n// 子类\n\nfunction SubClass(superValue) {\n\n    SuperClass.call(this, superValue);\n\n}\n\nconst instanceOne = new SubClass(_&#39_super one_&#39_);\n\nconst instanceTwo = new SubClass(_&#39_super two_&#39_);\n\ninstanceOne.books.push(_&#39_NodeJS_&#39_);\n\nconsole.log(instanceOne.showBooks());       // [_&#39_JavaScript_&#39_, _&#39_TypeScript_&#39_, _&#39_NodeJS_&#39_]\n\nconsole.log(instanceTwo.showBooks());       // [_&#39_JavaScript_&#39_, _&#39_TypeScript_&#39_]\n\nconsole.log(instanceOne.superValue);  // _&#39_super one_&#39_\n\nconsole.log(instanceTwo.superValue);  // _&#39_super two_&#39_\n```\n\n1.  组合继承\n\n*   结合类式继承与构造函数继承；将父类实例添加到子类原型，并在子类构造函数中调用父类构造函数\n\n*   缺点是可能因为缺少必要参数导致父类构造函数报错\n\n```javascript\n// 父类\n\nfunction SuperClass(superValue) {\n\n    this.superValue = superValue;\n\n    this.books = [_&#39_JavaScript_&#39_, _&#39_TypeScript_&#39_];\n\n}\n\n// 添加父类方法\n\nSuperClass.prototype.getBooks = function() {\n\n    return this.books;\n\n}\n\n// 子类\n\nfunction SubClass(superValue, subValue) {\n\n    SuperClass.call(this, superValue);\n\n    this.subValue = subValue;\n\n}\n\n// 类式继承，子类原型继承父类实例，此时可能因为缺少必要参数导致父类构造函数报错\n\nSubClass.prototype = new SuperClass();\n\n// 子类方法\n\nSubClass.getSubValue = function() {\n\n    return this.subValue;\n\n}\n\nconst instanceOne = new SubClass(_&#39_sup1_&#39_, _&#39_sub1_&#39_);\n\nconst instanceTwo = new SubClass(_&#39_sup2_&#39_, _&#39_sub2_&#39_);\n\ninstanceTwo.books.push(_&#39_You dont know JS_&#39_);\n\nconsole.log(instanceOne.superValue);  // _&#39_sup1_&#39_\n\nconsole.log(instanceTwo.superValue);  // _&#39_sup2_&#39_\n\nconsole.log(instanceOne.getSubValue());  // _&#39_sub1_&#39_\n\nconsole.log(instanceTwo.getSubValue());  // _&#39_sub2_&#39_\n\nconsole.log(instanceOne.getBooks());  // [_&#39_JavaScript_&#39_, _&#39_TypeScript_&#39_]\n\nconsole.log(instanceTwo.getBooks());  // [_&#39_JavaScript_&#39_, _&#39_TypeScript_&#39_, _&#39_You dont know JS_&#39_]\n```\n\n*   原型式继承\n\n*   寄生式继承\n\n*   寄生组合式继承\n', 1, '2022-11-16 23:09:57', '2022-12-04 23:43:29', 11, '继承模式\n\n类式继承\n\n\n通过修改子类的原型对象继承父类的方法\n\n// 父类\n\nfunction SuperClass() {\n\n    this.superValue = &#39;super&#3');
INSERT INTO `article` VALUES (3, 'nextjs已知问题', '1.  开发环境下未预加载全部界面，导致某些动态生成的变量被重复执行，导致页面拿到的值不正确，最终导致功能异常。\n\n2.  生产环境下由于已加载全部界面，取到的为最终值，因此不存在此问题。\n', 1, '2022-11-16 23:10:05', '2022-12-04 23:49:04', 5, '\n开发环境下未预加载全部界面，导致某些动态生成的变量被重复执行，导致页面拿到的值不正确，最终导致功能异常。\n\n生产环境下由于已加载全部界面，取到的为最终值，因此不存在此问题。\n\n\n');
INSERT INTO `article` VALUES (4, 'mapbox-gl-draw绘制完成回调函数', '1.  绘制模式状态变更逻辑\n\n&#x20;   &#x20;当前模式 -> 触发changeMode -> 调用当前模式onStop -> 初始化下一个模式 -> 执行render方法 -> changeMode结束\n\n2.  已实现示例\n\n&#x20;   event.js\n\n```javascript\n    function changeMode(modename, nextModeOptions = {}, eventOptions = {}) {\n\n      const {\n\n        clearUserCallback,    // If specify this option, do not call the user callback.\n\n        ...otherModeOptions\n\n      } = nextModeOptions;\n\n      let userCallback = currentMode.stop();\n\n      if (clearUserCallback) userCallback = null;\n\n      const modebuilder = modes[modename];\n\n      if (modebuilder === undefined) {\n\n        throw new Error(`${modename} is not valid`);\n\n      }\n\n      currentModeName = modename;\n\n      const mode = modebuilder(ctx, otherModeOptions);\n\n      currentMode = setupModeHandler(mode, ctx);\n\n      if (!eventOptions.silent) {\n\n        ctx.map.fire(Constants.events.MODE_CHANGE, { mode: modename});\n\n      }\n\n      ctx.store.setDirty();\n\n      ctx.store.render();\n\n      userCallback && userCallback();\n\n    }\n```\n\n&#x20;   draw\\_point.js\n\n```javascript\n    // on setup\n\n    DrawPoint.onSetup = function(options) {\n\n      const { customProperties, callback } = options;\n\n      const point = this.newFeature({\n\n        type: Constants.geojsonTypes.FEATURE,\n\n        properties: {\n\n          ...customProperties,\n\n        },\n\n        geometry: {\n\n          type: Constants.geojsonTypes.POINT,\n\n          coordinates: []\n\n        }\n\n      });\n\n      this.addFeature(point);\n\n      this.clearSelectedFeatures();\n\n      this.updateUIClasses({ mouse: Constants.cursors.ADD });\n\n      this.activateUIButton(Constants.types.POINT);\n\n      this.setActionableState({\n\n        trash: true\n\n      });\n\n      return {\n\n        point,\n\n        // storage callback on mode state\n\n        callback,\n\n        tips: options.tips,\n\n        tooltip: options.tips ? new Tooltip(&#39&#39, this.map) : null,\n\n      };\n\n    };\n\n    ...\n\n    // on stop\n\n    DrawPoint.onStop = function(state) {\n\n      this.updateTooltip(state);\n\n      const { callback } = state;\n\n      this.activateUIButton();\n\n      if (!state.point.getCoordinate().length) {\n\n        this.deleteFeature([state.point.id], { silent: true });\n\n      }\n\n      return () => {\n\n        callback && callback(state.point.toGeoJSON());\n\n        delete state.callback;\n\n      };\n\n    };\n```\n\n', 1, '2022-11-16 23:45:17', '2022-12-04 23:49:15', 7, '\n绘制模式状态变更逻辑\n\n&#x20;   &#x20;当前模式 -&gt; 触发changeMode -&gt; 调用当前模式onStop -&gt; 初始化下一个模式 -&gt; 执行render');
INSERT INTO `article` VALUES (5, '实现jenkins自动化部署', '### &#x20;安装Jenkins\n\n提示用户没有权限\n\n[原文地址](https://blog.csdn.net/wuxiaoying888/article/details/124457546)\n\nwin10下非专业版用户无法修改安全策略，需要执行以下bat命令。\n\n```bash\n@echo off\n\npushd _&#34_%~dp0_&#34_\n\ndir /b C:WindowsservicingPackagesMicrosoft-Windows-GroupPolicy-ClientExtensions-Package~3*.mum >List.txt\n\ndir /b C:WindowsservicingPackagesMicrosoft-Windows-GroupPolicy-ClientTools-Package~3*.mum >>List.txt\n\nfor /f %%i in (&#39findstr /i . List.txt 2^>nul&#39) do dism /online /norestart /add-package:_&#34_C:WindowsservicingPackages\\%%i_&#34_\n\npause\n```\n\nJenkins构建报错cannot run program _&#34_sh_&#34_\n\n[原文地址](https://www.cnblogs.com/xieyang07/p/12545742.html)\n\n解决办法：\n\n&#x20; 设置shell程序，修改Jenkins配置Manage Jenkins-> Configure System-> Shell-> Shell execute，将值设置为`C:Windowssystem32cmd.exe`\n\nJenkins提示无法连接git\n\n`OpenSSL SSL\\_read: Connection was reset, errno 10054`\n\n解决办法：关闭git SSL验证 `git config --global http.sslVerify _&#34_false_&#34_`\n\nGit拉取代码提示连接失败failed to connect to github.com port 443\n\n解决办法：取消https代理\n\n[原文地址](https://blog.csdn.net/Hodors/article/details/103226958?spm=1001.2101.3001.6650.6&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-6-103226958-blog-120484529.pc_relevant_3mothn_strategy_recovery&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-6-103226958-blog-120484529.pc_relevant_3mothn_strategy_recovery&utm_relevant_index=7)\n\n```\n\ngit config --global --unset http.proxy\n \ngit config --global --unset https.proxy\n```\n', 1, '2022-11-19 23:55:47', '2022-12-04 23:47:49', 15, '&#x20;安装Jenkins\n提示用户没有权限\n原文地址\nwin10下非专业版用户无法修改安全策略，需要执行以下bat命令。\n@echo off\n\npushd &quot;%~dp0&quot;\n\n');

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
INSERT INTO `user` VALUES (1, 'george', 'george', '75e44c02f418661b05d1dd668b20a152fe8502b5749e459b249a8735afa3f670', 'coder.jpg', '1666457271459', 1665289822909, '2022-11-27 00:03:41');

SET FOREIGN_KEY_CHECKS = 1;
