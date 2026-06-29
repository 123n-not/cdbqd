package com.powerbank.service;

import com.powerbank.entity.PowerBank;
import java.util.List;

public interface PowerBankService {

    List<PowerBank> list(Integer stationId, Integer status);

    PowerBank findById(Integer id);

    PowerBank findBySerialNumber(String serialNumber);

    boolean add(PowerBank powerBank);

    boolean update(PowerBank powerBank);

    boolean updateStatus(Integer id, Integer status);

    boolean deleteById(Integer id);
}