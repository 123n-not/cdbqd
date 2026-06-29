package com.powerbank.controller;

import com.powerbank.entity.Order;
import com.powerbank.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/order")
@CrossOrigin
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/list")
    public Map<String, Object> listByUserId(@RequestParam Integer userId) {
        Map<String, Object> result = new HashMap<>();

        List<Order> orders = orderService.listByUserId(userId);

        result.put("code", 200);
        result.put("message", "查询成功");
        result.put("data", orders);
        return result;
    }

    @GetMapping("/{id}")
    public Map<String, Object> findById(@PathVariable Integer id) {
        Map<String, Object> result = new HashMap<>();

        Order order = orderService.findById(id);
        if (order == null) {
            result.put("code", 404);
            result.put("message", "订单不存在");
            return result;
        }

        result.put("code", 200);
        result.put("message", "查询成功");
        result.put("data", order);
        return result;
    }

    @PostMapping("/rent")
    public Map<String, Object> rent(@RequestBody Map<String, Integer> params) {
        Integer userId = params.get("userId");
        Integer powerbankId = params.get("powerbankId");
        Integer stationId = params.get("stationId");

        Map<String, Object> result = new HashMap<>();

        try {
            boolean success = orderService.rent(userId, powerbankId, stationId);
            if (!success) {
                result.put("code", 400);
                result.put("message", "借用失败");
                return result;
            }

            result.put("code", 200);
            result.put("message", "借用成功");
            return result;
        } catch (RuntimeException e) {
            result.put("code", 409);
            result.put("message", e.getMessage());
            return result;
        }
    }

    @PostMapping("/return")
    public Map<String, Object> returnOrder(@RequestBody Map<String, Integer> params) {
        Integer orderId = params.get("orderId");

        Map<String, Object> result = new HashMap<>();

        boolean success = orderService.returnOrder(orderId);
        if (!success) {
            result.put("code", 400);
            result.put("message", "归还失败");
            return result;
        }

        result.put("code", 200);
        result.put("message", "归还成功");
        return result;
    }

    @DeleteMapping("/{id}")
    public Map<String, Object> deleteById(@PathVariable Integer id) {
        Map<String, Object> result = new HashMap<>();

        boolean success = orderService.deleteById(id);
        if (!success) {
            result.put("code", 400);
            result.put("message", "删除失败");
            return result;
        }

        result.put("code", 200);
        result.put("message", "删除成功");
        return result;
    }
}