package com.powerbank.dao;

import com.powerbank.entity.Order;
import org.apache.ibatis.annotations.Param;
import java.util.List;

public interface
OrderMapper {

    List<Order> listByUserId(@Param("userId") Integer userId);

    Order findById(@Param("id") Integer id);

    int insert(Order order);

    int update(Order order);

    int updateStatus(@Param("id") Integer id, @Param("status") Integer status);

    int deleteById(@Param("id") Integer id);
}