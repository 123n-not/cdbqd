package com.powerbank.service.impl;

import com.powerbank.dao.UserMapper;
import com.powerbank.entity.User;
import com.powerbank.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public User findByUsername(String username) {
        return userMapper.findByUsername(username);
    }

    @Override
    public User register(String username, String password) {
        User existUser = findByUsername(username);
        if (existUser != null) {
            return null;
        }

        User user = new User(username, DigestUtils.md5DigestAsHex(password.getBytes()));
        userMapper.insert(user);
        return user;
    }

    @Override
    public User findById(Integer id) {
        return userMapper.findById(id);
    }

    @Override
    public List<User> list() {
        return userMapper.list();
    }

    @Override
    public boolean update(User user) {
        return userMapper.update(user) > 0;
    }

    @Override
    public boolean deleteById(Integer id) {
        return userMapper.deleteById(id) > 0;
    }
}