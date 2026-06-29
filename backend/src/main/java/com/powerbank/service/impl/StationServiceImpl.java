package com.powerbank.service.impl;

import com.powerbank.dao.StationMapper;
import com.powerbank.entity.Station;
import com.powerbank.service.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class StationServiceImpl implements StationService {

    @Autowired
    private StationMapper stationMapper;

    @Override
    public List<Station> list(String keyword) {
        return stationMapper.list(keyword);
    }

    @Override
    public Station findById(Integer id) {
        return stationMapper.findById(id);
    }

    @Override
    public boolean add(Station station) {
        return stationMapper.insert(station) > 0;
    }

    @Override
    public boolean update(Station station) {
        return stationMapper.update(station) > 0;
    }

    @Override
    public boolean deleteById(Integer id) {
        return stationMapper.deleteById(id) > 0;
    }
}