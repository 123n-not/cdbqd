package com.powerbank.dao;

import com.powerbank.entity.Station;
import org.apache.ibatis.annotations.Param;
import java.util.List;

public interface StationMapper {

    List<Station> list(@Param("keyword") String keyword);

    Station findById(@Param("id") Integer id);

    int insert(Station station);

    int update(Station station);

    int deleteById(@Param("id") Integer id);

    int updateAvailableSlots(@Param("id") Integer id, @Param("change") Integer change);
}