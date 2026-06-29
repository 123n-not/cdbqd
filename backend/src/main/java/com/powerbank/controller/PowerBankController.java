package com.powerbank.controller;

import com.powerbank.entity.PowerBank;
import com.powerbank.service.PowerBankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/powerbank")
@CrossOrigin
public class PowerBankController {

    @Autowired
    private PowerBankService powerBankService;

    @GetMapping("/list")
    public Map<String, Object> list(@RequestParam(required = false) Integer stationId,
                                    @RequestParam(required = false) Integer status) {
        Map<String, Object> result = new HashMap<>();

        List<PowerBank> powerBanks = powerBankService.list(stationId, status);

        result.put("code", 200);
        result.put("message", "查询成功");
        result.put("data", powerBanks);
        return result;
    }

    @GetMapping("/{id}")
    public Map<String, Object> findById(@PathVariable Integer id) {
        Map<String, Object> result = new HashMap<>();

        PowerBank powerBank = powerBankService.findById(id);
        if (powerBank == null) {
            result.put("code", 404);
            result.put("message", "充电宝不存在");
            return result;
        }

        result.put("code", 200);
        result.put("message", "查询成功");
        result.put("data", powerBank);
        return result;
    }

    @PostMapping("/add")
    public Map<String, Object> add(@RequestBody PowerBank powerBank) {
        Map<String, Object> result = new HashMap<>();

        boolean success = powerBankService.add(powerBank);
        if (!success) {
            result.put("code", 400);
            result.put("message", "添加失败");
            return result;
        }

        result.put("code", 200);
        result.put("message", "添加成功");
        result.put("data", powerBank);
        return result;
    }

    @PostMapping("/update")
    public Map<String, Object> update(@RequestBody PowerBank powerBank) {
        Map<String, Object> result = new HashMap<>();

        boolean success = powerBankService.update(powerBank);
        if (!success) {
            result.put("code", 400);
            result.put("message", "更新失败");
            return result;
        }

        result.put("code", 200);
        result.put("message", "更新成功");
        result.put("data", powerBank);
        return result;
    }

    @DeleteMapping("/{id}")
    public Map<String, Object> deleteById(@PathVariable Integer id) {
        Map<String, Object> result = new HashMap<>();

        boolean success = powerBankService.deleteById(id);
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