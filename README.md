充电宝租赁小程序
一个基于微信小程序的充电宝租赁平台，支持用户扫码租借、归还充电宝，以及后台管理功能。

项目结构

Plain Text

cdbqd/
├── miniprogram/          # 微信小程序前端
│   ├── pages/
│   │   ├── index/        # 首页
│   │   ├── login/        # 登录页
│   │   ├── orders/       # 订单列表
│   │   ├── orderDetail/  # 订单详情
│   │   ├── rent/         # 租借页面
│   │   ├── returnPage/   # 归还页面
│   │   ├── station/      # 充电站列表
│   │   └── user/         # 用户中心
│   ├── images/           # 图片资源
│   └── utils/            # 工具函数
├── backend/              # Java 后端（Spring + MyBatis）
│   ├── src/main/java/com/powerbank/
│   │   ├── controller/   # 控制器
│   │   ├── service/      # 业务逻辑层
│   │   ├── dao/          # 数据访问层
│   │   └── entity/       # 实体类
│   └── src/main/resources/
│       └── mapper/       # MyBatis 映射文件
└── project.config.json   # 项目配置文件
技术栈
前端：微信小程序原生框架
后端：Java + Spring MVC + MyBatis
数据库：MySQL
功能模块
用户登录/注册
充电站查询
扫码租借充电宝
归还充电宝
订单管理
后台管理（用户、充电站、充电宝、订单管理）
如何运行
小程序端
下载并安装微信开发者工具
导入 miniprogram 目录
在 app.js 中配置后端 API 地址
点击编译预览
后端
使用 IDEA 导入 backend 目录
配置 jdbc.properties 中的数据库连接信息
运行 Tomcat 服务器
后端默认运行在 http://localhost:8080
