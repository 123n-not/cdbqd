package com.powerbank.service;

import com.powerbank.entity.Order;
import java.util.List;

public interface OrderService {

    List<Order> listByUserId(Integer userId);

    Order findById(Integer id);

    boolean rent(Integer userId, Integer powerbankId, Integer stationId);

    boolean returnOrder(Integer orderId);

    boolean updateStatus(Integer id, Integer status);

    boolean deleteById(Integer id);
}