package com.powerbank.service;

import com.powerbank.entity.Station;
import java.util.List;

public interface StationService {

    List<Station> list(String keyword);

    Station findById(Integer id);

    boolean add(Station station);

    boolean update(Station station);

    boolean deleteById(Integer id);
}