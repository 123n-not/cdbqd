package com.powerbank.entity;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

public class Order implements Serializable {
    private Integer id;
    private Integer userId;
    private Integer powerbankId;
    private Integer stationId;
    private Date rentTime;
    private Date returnTime;
    private BigDecimal amount;
    private Integer status;
    private Date createTime;
    private String powerBankSerialNumber;
    private String stationName;

    public Order() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getPowerbankId() {
        return powerbankId;
    }

    public void setPowerbankId(Integer powerbankId) {
        this.powerbankId = powerbankId;
    }

    public Integer getStationId() {
        return stationId;
    }

    public void setStationId(Integer stationId) {
        this.stationId = stationId;
    }

    public Date getRentTime() {
        return rentTime;
    }

    public void setRentTime(Date rentTime) {
        this.rentTime = rentTime;
    }

    public Date getReturnTime() {
        return returnTime;
    }

    public void setReturnTime(Date returnTime) {
        this.returnTime = returnTime;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getPowerBankSerialNumber() {
        return powerBankSerialNumber;
    }

    public void setPowerBankSerialNumber(String powerBankSerialNumber) {
        this.powerBankSerialNumber = powerBankSerialNumber;
    }

    public String getStationName() {
        return stationName;
    }

    public void setStationName(String stationName) {
        this.stationName = stationName;
    }

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", userId=" + userId +
                ", powerbankId=" + powerbankId +
                ", stationId=" + stationId +
                ", rentTime=" + rentTime +
                ", returnTime=" + returnTime +
                ", amount=" + amount +
                ", status=" + status +
                '}';
    }
}