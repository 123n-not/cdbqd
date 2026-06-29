<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>用户管理 - 共享充电宝后台管理系统</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    <style>
        body {
            font-family: 'Microsoft YaHei', Arial, sans-serif;
            background-color: #f5f5f5;
        }
        .sidebar {
            min-height: 100vh;
            background-color: #343a40;
            color: #fff;
        }
        .sidebar .nav-link {
            color: #fff;
            padding: 15px 20px;
            margin: 5px 0;
            border-radius: 5px;
            transition: all 0.3s;
            text-decoration: none;
        }
        .sidebar .nav-link:hover {
            background-color: #495057;
            color: #fff;
        }
        .sidebar .nav-link.active {
            background-color: #4CAF50;
            color: #fff;
        }
        .sidebar .nav-link i {
            margin-right: 10px;
        }
        .main-content {
            padding: 20px;
        }
        .card {
            border: none;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        .card-header {
            background-color: #4CAF50;
            color: #fff;
            font-weight: bold;
        }
        .navbar-brand {
            font-weight: bold;
            color: #fff !important;
        }
        .navbar {
            background-color: #4CAF50;
        }
        .btn-action {
            padding: 5px 10px;
            font-size: 14px;
        }
    </style>
</head>
<body>
<div class="container-fluid">
    <div class="row">
        <div class="col-md-2 sidebar">
            <div class="text-center py-4">
                <h4>后台管理系统</h4>
            </div>
            <nav class="nav flex-column">
                <a class="nav-link" href="/admin/dashboard">
                    <i class="bi bi-speedometer2"></i> 首页
                </a>
                <a class="nav-link active" href="/admin/user/list">
                    <i class="bi bi-people"></i> 用户管理
                </a>
                <a class="nav-link" href="/admin/station/list">
                    <i class="bi bi-geo-alt"></i> 投放点管理
                </a>
                <a class="nav-link" href="/admin/powerbank/list">
                    <i class="bi bi-battery"></i> 充电宝管理
                </a>
                <a class="nav-link" href="/admin/order/list">
                    <i class="bi bi-receipt"></i> 订单管理
                </a>
            </nav>
        </div>
        <div class="col-md-10 main-content">
            <nav class="navbar navbar-expand-lg navbar-dark mb-4">
                <div class="container-fluid">
                    <span class="navbar-brand">共享充电宝后台管理系统</span>
                    <div class="ms-auto">
                        <span class="text-white me-3">管理员</span>
                        <button class="btn btn-light btn-sm" onclick="logout()">退出</button>
                    </div>
                </div>
            </nav>
            <div class="card">
                <div class="card-header">
                    用户管理
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>用户名</th>
                                <th>昵称</th>
                                <th>手机号</th>
                                <th>注册时间</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <c:choose>
                                <c:when test="${empty users}">
                                    <tr>
                                        <td colspan="6" class="text-center">暂无数据</td>
                                    </tr>
                                </c:when>
                                <c:otherwise>
                                    <c:forEach items="${users}" var="user">
                                        <tr>
                                            <td>${user.id}</td>
                                            <td>${user.username}</td>
                                            <td>${user.nickname != null ? user.nickname : '-'}</td>
                                            <td>${user.phone != null ? user.phone : '-'}</td>
                                            <td><fmt:formatDate value="${user.createTime}" pattern="yyyy-MM-dd HH:mm:ss"/></td>
                                            <td>
                                                <button class="btn btn-primary btn-action" onclick="editUser(${user.id})">编辑</button>
                                                <button class="btn btn-danger btn-action" onclick="deleteUser(${user.id})">删除</button>
                                            </td>
                                        </tr>
                                    </c:forEach>
                                </c:otherwise>
                            </c:choose>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script>
    function logout() {
        if (confirm('确定要退出登录吗？')) {
            window.location.href = '/login.html';
        }
    }

    function editUser(id) {
        window.location.href = '/admin/user/edit/' + id;
    }

    function deleteUser(id) {
        if (confirm('确定要删除该用户吗？')) {
            axios.delete('/admin/user/delete/' + id)
                .then(response => {
                    if (response.data.code === 200) {
                        alert('删除成功');
                        window.location.reload();
                    } else {
                        alert('删除失败：' + response.data.message);
                    }
                })
                .catch(error => {
                    alert('删除失败：' + error.message);
                });
        }
    }
</script>
</body>
</html>