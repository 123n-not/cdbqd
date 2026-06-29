package com.powerbank.service.impl;

import com.powerbank.dao.PowerBankMapper;
import com.powerbank.entity.PowerBank;
import com.powerbank.service.PowerBankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PowerBankServiceImpl implements PowerBankService {

    @Autowired
    private PowerBankMapper powerBankMapper;

    @Override
    public List<PowerBank> list(Integer stationId, Integer status) {
        return powerBankMapper.list(stationId, status);
    }

    @Override
    public PowerBank findById(Integer id) {
        return powerBankMapper.findById(id);
    }

    @Override
    public PowerBank findBySerialNumber(String serialNumber) {
        return powerBankMapper.findBySerialNumber(serialNumber);
    }

    @Override
    public boolean add(PowerBank powerBank) {
        return powerBankMapper.insert(powerBank) > 0;
    }

    @Override
    public boolean update(PowerBank powerBank) {
        return powerBankMapper.update(powerBank) > 0;
    }

    @Override
    public boolean updateStatus(Integer id, Integer status) {
        return powerBankMapper.updateStatus(id, status) > 0;
    }

    @Override
    public boolean deleteById(Integer id) {
        return powerBankMapper.deleteById(id) > 0;
    }
}
