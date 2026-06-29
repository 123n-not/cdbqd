package com.powerbank.controller;

import com.powerbank.entity.User;
import com.powerbank.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> params) {
        String username = params.get("username");
        String password = params.get("password");

        Map<String, Object> result = new HashMap<>();

        User user = userService.findByUsername(username);
        if (user == null) {
            result.put("code", 401);
            result.put("message", "用户不存在");
            return result;
        }

        result.put("code", 200);
        result.put("message", "登录成功");
        result.put("data", user);
        return result;
    }

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody Map<String, String> params) {
        String username = params.get("username");
        String password = params.get("password");

        Map<String, Object> result = new HashMap<>();

        User user = userService.register(username, password);
        if (user == null) {
            result.put("code", 400);
            result.put("message", "用户名已存在");
            return result;
        }

        result.put("code", 200);
        result.put("message", "注册成功");
        result.put("data", user);
        return result;
    }

    @GetMapping("/{id}")
    public Map<String, Object> findById(@PathVariable Integer id) {
        Map<String, Object> result = new HashMap<>();

        User user = userService.findById(id);
        if (user == null) {
            result.put("code", 404);
            result.put("message", "用户不存在");
            return result;
        }

        result.put("code", 200);
        result.put("message", "查询成功");
        result.put("data", user);
        return result;
    }
}