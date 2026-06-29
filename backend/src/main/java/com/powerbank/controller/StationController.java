package com.powerbank.controller;

import com.powerbank.entity.Station;
import com.powerbank.service.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/station")
@CrossOrigin
public class StationController {

    @Autowired
    private StationService stationService;

    @GetMapping("/list")
    public Map<String, Object> list(@RequestParam(required = false) String keyword) {
        Map<String, Object> result = new HashMap<>();

        List<Station> stations = stationService.list(keyword);

        result.put("code", 200);
        result.put("message", "查询成功");
        result.put("data", stations);
        return result;
    }

    @GetMapping("/{id}")
    public Map<String, Object> findById(@PathVariable Integer id) {
        Map<String, Object> result = new HashMap<>();

        Station station = stationService.findById(id);
        if (station == null) {
            result.put("code", 404);
            result.put("message", "投放点不存在");
            return result;
        }

        result.put("code", 200);
        result.put("message", "查询成功");
        result.put("data", station);
        return result;
    }

    @PostMapping("/add")
    public Map<String, Object> add(@RequestBody Station station) {
        Map<String, Object> result = new HashMap<>();

        boolean success = stationService.add(station);
        if (!success) {
            result.put("code", 400);
            result.put("message", "添加失败");
            return result;
        }

        result.put("code", 200);
        result.put("message", "添加成功");
        result.put("data", station);
        return result;
    }

    @PostMapping("/update")
    public Map<String, Object> update(@RequestBody Station station) {
        Map<String, Object> result = new HashMap<>();

        boolean success = stationService.update(station);
        if (!success) {
            result.put("code", 400);
            result.put("message", "更新失败");
            return result;
        }

        result.put("code", 200);
        result.put("message", "更新成功");
        result.put("data", station);
        return result;
    }

    @DeleteMapping("/{id}")
    public Map<String, Object> deleteById(@PathVariable Integer id) {
        Map<String, Object> result = new HashMap<>();

        boolean success = stationService.deleteById(id);
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