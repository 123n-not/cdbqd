package com.powerbank.dao;

import com.powerbank.entity.PowerBank;
import org.apache.ibatis.annotations.Param;
import java.util.List;

public interface PowerBankMapper {

    List<PowerBank> list(@Param("stationId") Integer stationId, @Param("status") Integer status);

    PowerBank findById(@Param("id") Integer id);

    PowerBank findBySerialNumber(@Param("serialNumber") String serialNumber);

    int insert(PowerBank powerBank);

    int update(PowerBank powerBank);

    int updateStatus(@Param("id") Integer id, @Param("status") Integer status);

    int updateStatusWithVersion(@Param("id") Integer id, @Param("status") Integer status, @Param("version") Integer version);

    int deleteById(@Param("id") Integer id);
}