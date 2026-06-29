package com.powerbank.service.impl;

import com.powerbank.dao.OrderMapper;
import com.powerbank.dao.PowerBankMapper;
import com.powerbank.entity.Order;
import com.powerbank.entity.PowerBank;
import com.powerbank.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

@Service
public class OrderServiceImpl implements OrderService {

    private static final Logger logger = Logger.getLogger(OrderServiceImpl.class.getName());

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private PowerBankMapper powerBankMapper;

    @Autowired
    private com.powerbank.dao.StationMapper stationMapper;

    @Override
    public List<Order> listByUserId(Integer userId) {
        return orderMapper.listByUserId(userId);
    }

    @Override
    public Order findById(Integer id) {
        return orderMapper.findById(id);
    }

    @Override
    @Transactional
    public boolean rent(Integer userId, Integer powerbankId, Integer stationId) {
        logger.info("开始借用充电宝: userId=" + userId + ", powerbankId=" + powerbankId + ", stationId=" + stationId);

        PowerBank powerBank = powerBankMapper.findById(powerbankId);
        if (powerBank == null) {
            logger.warning("充电宝不存在: powerbankId=" + powerbankId);
            return false;
        }

        if (powerBank.getStatus() != 0) {
            logger.warning("充电宝不可用: powerbankId=" + powerbankId + ", status=" + powerBank.getStatus());
            return false;
        }

        logger.info("充电宝可用: powerbankId=" + powerbankId + ", status=" + powerBank.getStatus());

        Order order = new Order();
        order.setUserId(userId);
        order.setPowerbankId(powerbankId);
        order.setStationId(stationId);
        order.setRentTime(new Date());
        order.setStatus(1);

        int insertResult = orderMapper.insert(order);
        logger.info("订单插入结果: " + insertResult);

        int updateResult = powerBankMapper.updateStatusWithVersion(powerbankId, 1, powerBank.getVersion());
        if (updateResult == 0) {
            logger.warning("充电宝状态更新失败，可能已被其他用户借用: powerbankId=" + powerbankId + ", version=" + powerBank.getVersion());
            throw new RuntimeException("充电宝已被借用，请重试");
        }
        logger.info("充电宝状态更新成功: powerbankId=" + powerbankId + ", status=1");

        stationMapper.updateAvailableSlots(stationId, -1);
        logger.info("投放点可用充电宝数量更新成功: stationId=" + stationId + ", change=-1");

        return insertResult > 0;
    }

    @Override
    @Transactional
    public boolean returnOrder(Integer orderId) {
        Order order = orderMapper.findById(orderId);
        if (order == null || order.getStatus() != 1) {
            return false;
        }

        Date now = new Date();
        long durationMs = now.getTime() - order.getRentTime().getTime();
        long hours = (long) Math.ceil(durationMs / (1000.0 * 60 * 60));
        java.math.BigDecimal amount = new java.math.BigDecimal(hours);

        order.setReturnTime(now);
        order.setAmount(amount);
        order.setStatus(2);
        powerBankMapper.updateStatus(order.getPowerbankId(), 0);
        stationMapper.updateAvailableSlots(order.getStationId(), 1);
        return orderMapper.update(order) > 0;
    }

    @Override
    public boolean updateStatus(Integer id, Integer status) {
        return orderMapper.updateStatus(id, status) > 0;
    }

    @Override
    public boolean deleteById(Integer id) {
        return orderMapper.deleteById(id) > 0;
    }
}