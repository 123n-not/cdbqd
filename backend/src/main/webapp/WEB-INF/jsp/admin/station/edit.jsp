<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>编辑投放点 - 共享充电宝后台管理系统</title>
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
        .form-label {
            font-weight: bold;
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
                <a class="nav-link" href="/admin/user/list">
                    <i class="bi bi-people"></i> 用户管理
                </a>
                <a class="nav-link active" href="/admin/station/list">
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
                    编辑投放点
                </div>
                <div class="card-body">
                    <form id="stationForm">
                        <div class="mb-3">
                            <label class="form-label">ID</label>
                            <input type="text" class="form-control" id="id" value="${station.id}" readonly>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">名称</label>
                            <input type="text" class="form-control" id="name" value="${station.name}">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">地址</label>
                            <input type="text" class="form-control" id="address" value="${station.address}">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">描述</label>
                            <textarea class="form-control" id="description" rows="3">${station.description != null ? station.description : ''}</textarea>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">总槽位</label>
                            <input type="number" class="form-control" id="totalSlots" value="${station.totalSlots}">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">可用槽位</label>
                            <input type="number" class="form-control" id="availableSlots" value="${station.availableSlots}">
                        </div>
                        <button type="button" class="btn btn-primary" onclick="saveStation()">保存</button>
                        <button type="button" class="btn btn-secondary" onclick="goBack()">返回</button>
                    </form>
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

    function saveStation() {
        const station = {
            id: document.getElementById('id').value,
            name: document.getElementById('name').value,
            address: document.getElementById('address').value,
            description: document.getElementById('description').value,
            totalSlots: document.getElementById('totalSlots').value,
            availableSlots: document.getElementById('availableSlots').value
        };

        axios.post('/admin/station/save', station)
            .then(response => {
                if (response.data.code === 200) {
                    alert('保存成功');
                    window.location.href = '/admin/station/list';
                } else {
                    alert('保存失败：' + response.data.message);
                }
            })
            .catch(error => {
                alert('保存失败：' + error.message);
            });
    }

    function goBack() {
        window.location.href = '/admin/station/list';
    }
</script>
</body>
</html>