package com.powerbank.entity;

import java.io.Serializable;
import java.util.Date;

public class PowerBank implements Serializable {
    private Integer id;
    private String serialNumber;
    private Integer status;
    private Integer stationId;
    private Integer batteryLevel;
    private Integer version;
    private Date createTime;

    public PowerBank() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getStationId() {
        return stationId;
    }

    public void setStationId(Integer stationId) {
        this.stationId = stationId;
    }

    public Integer getBatteryLevel() {
        return batteryLevel;
    }

    public void setBatteryLevel(Integer batteryLevel) {
        this.batteryLevel = batteryLevel;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    @Override
    public String toString() {
        return "PowerBank{" +
                "id=" + id +
                ", serialNumber='" + serialNumber + '\'' +
                ", status=" + status +
                ", stationId=" + stationId +
                ", batteryLevel=" + batteryLevel +
                ", version=" + version +
                '}';
    }
}