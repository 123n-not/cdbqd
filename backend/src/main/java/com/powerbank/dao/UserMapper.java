package com.powerbank.dao;

import com.powerbank.entity.User;
import org.apache.ibatis.annotations.Param;
import java.util.List;

public interface UserMapper {

    User findByUsername(@Param("username") String username);

    int insert(User user);

    User findById(@Param("id") Integer id);

    List<User> list();

    int update(User user);

    int deleteById(@Param("id") Integer id);
}