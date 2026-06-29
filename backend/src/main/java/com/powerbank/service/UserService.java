package com.powerbank.service;

import com.powerbank.entity.User;
import java.util.List;

public interface UserService {

    User findByUsername(String username);

    User register(String username, String password);

    User findById(Integer id);

    List<User> list();

    boolean update(User user);

    boolean deleteById(Integer id);
}