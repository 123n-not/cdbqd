# 共享充电宝微信小程序

一个基于微信小程序的充电宝租赁平台，支持用户扫码租借、归还充电宝，以及后台管理功能。

## 项目结构

- **miniprogram/** 微信小程序前端
- **backend/** Java 后端（Spring + MyBatis）
- **project.config.json** 项目配置文件

## 技术栈

- 前端：微信小程序原生框架
- 后端：Java + Spring MVC + MyBatis
- 数据库：MySQL

## 功能模块

- 用户登录/注册
- 充电站查询
- 扫码租借充电宝
- 归还充电宝
- 订单管理
- 后台管理（用户、充电站、充电宝、订单管理）

## 如何运行

### 小程序端

1. 下载并安装微信开发者工具
2. 导入 miniprogram 目录
3. 在 app.js 中配置后端 API 地址
4. 点击编译预览

### 后端

1. 使用 IDEA 导入 backend 目录
2. 配置 jdbc.properties 中的数据库连接信息
3. 运行 Tomcat 服务器
