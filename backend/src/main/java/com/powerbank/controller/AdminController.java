package com.powerbank.controller;
import com.powerbank.entity.Order;
import com.powerbank.entity.PowerBank;
import com.powerbank.entity.Station;
import com.powerbank.entity.User;
import com.powerbank.service.OrderService;
import com.powerbank.service.PowerBankService;
import com.powerbank.service.StationService;
import com.powerbank.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private StationService stationService;

    @Autowired
    private PowerBankService powerBankService;

    @Autowired
    private OrderService orderService;

    @GetMapping("/dashboard")
    public String dashboard(Model model) {
        List<User> users = userService.list();
        List<Station> stations = stationService.list(null);
        List<PowerBank> powerBanks = powerBankService.list(null, null);
        List<Order> orders = orderService.listByUserId(null);

        model.addAttribute("userCount", users != null ? users.size() : 0);
        model.addAttribute("stationCount", stations != null ? stations.size() : 0);
        model.addAttribute("powerbankCount", powerBanks != null ? powerBanks.size() : 0);
        model.addAttribute("orderCount", orders != null ? orders.size() : 0);

        return "admin/dashboard";
    }

    @GetMapping("/user/list")
    public String userList(Model model) {
        List<User> users = userService.list();
        model.addAttribute("users", users);
        return "admin/user/list";
    }

    @GetMapping("/user/edit/{id}")
    public String userEdit(@PathVariable Integer id, Model model) {
        User user = userService.findById(id);
        model.addAttribute("user", user);
        return "admin/user/edit";
    }

    @PostMapping("/user/save")
    @ResponseBody
    public Map<String, Object> userSave(@RequestBody User user) {
        Map<String, Object> result = new HashMap<>();
        try {
            boolean success = userService.update(user);
            if (success) {
                result.put("code", 200);
                result.put("message", "保存成功");
            } else {
                result.put("code", 400);
                result.put("message", "保存失败");
            }
        } catch (Exception e) {
            result.put("code", 500);
            result.put("message", "保存失败：" + e.getMessage());
        }
        return result;
    }

    @PostMapping("/user/delete/{id}")
    @ResponseBody
    public Map<String, Object> userDelete(@PathVariable Integer id) {
        Map<String, Object> result = new HashMap<>();
        try {
            boolean success = userService.deleteById(id);
            if (success) {
                result.put("code", 200);
                result.put("message", "删除成功");
            } else {
                result.put("code", 400);
                result.put("message", "删除失败");
            }
        } catch (Exception e) {
            result.put("code", 500);
            result.put("message", "删除失败：" + e.getMessage());
        }
        return result;
    }

    @GetMapping("/station/list")
    public String stationList(Model model) {
        List<Station> stations = stationService.list(null);
        model.addAttribute("stations", stations);
        return "admin/station/list";
    }

    @GetMapping("/station/edit/{id}")
    public String stationEdit(@PathVariable Integer id, Model model) {
        Station station = stationService.findById(id);
        model.addAttribute("station", station);
        return "admin/station/edit";
    }

    @PostMapping("/station/save")
    @ResponseBody
    public Map<String, Object> stationSave(@RequestBody Station station) {
        Map<String, Object> result = new HashMap<>();
        try {
            boolean success = stationService.update(station);
            if (success) {
                result.put("code", 200);
                result.put("message", "保存成功");
            } else {
                result.put("code", 400);
                result.put("message", "保存失败");
            }
        } catch (Exception e) {
            result.put("code", 500);
            result.put("message", "保存失败：" + e.getMessage());
        }
        return result;
    }

    @PostMapping("/station/delete/{id}")
    @ResponseBody
    public Map<String, Object> stationDelete(@PathVariable Integer id) {
        Map<String, Object> result = new HashMap<>();
        try {
            boolean success = stationService.deleteById(id);
            if (success) {
                result.put("code", 200);
                result.put("message", "删除成功");
            } else {
                result.put("code", 400);
                result.put("message", "删除失败");
            }
        } catch (Exception e) {
            result.put("code", 500);
            result.put("message", "删除失败：" + e.getMessage());
        }
        return result;
    }

    @GetMapping("/powerbank/list")
    public String powerBankList(Model model) {
        List<PowerBank> powerBanks = powerBankService.list(null, null);
        model.addAttribute("powerBanks", powerBanks);
        return "admin/powerbank/list";
    }

    @GetMapping("/powerbank/edit/{id}")
    public String powerBankEdit(@PathVariable Integer id, Model model) {
        PowerBank powerBank = powerBankService.findById(id);
        model.addAttribute("powerBank", powerBank);
        return "admin/powerbank/edit";
    }

    @PostMapping("/powerbank/save")
    @ResponseBody
    public Map<String, Object> powerBankSave(@RequestBody PowerBank powerBank) {
        Map<String, Object> result = new HashMap<>();
        try {
            boolean success = powerBankService.update(powerBank);
            if (success) {
                result.put("code", 200);
                result.put("message", "保存成功");
            } else {
                result.put("code", 400);
                result.put("message", "保存失败");
            }
        } catch (Exception e) {
            result.put("code", 500);
            result.put("message", "保存失败：" + e.getMessage());
        }
        return result;
    }

    @PostMapping("/powerbank/delete/{id}")
    @ResponseBody
    public Map<String, Object> powerBankDelete(@PathVariable Integer id) {
        Map<String, Object> result = new HashMap<>();
        try {
            boolean success = powerBankService.deleteById(id);
            if (success) {
                result.put("code", 200);
                result.put("message", "删除成功");
            } else {
                result.put("code", 400);
                result.put("message", "删除失败");
            }
        } catch (Exception e) {
            result.put("code", 500);
            result.put("message", "删除失败：" + e.getMessage());
        }
        return result;
    }

    @GetMapping("/order/list")
    public String orderList(Model model) {
        List<Order> orders = orderService.listByUserId(null);
        model.addAttribute("orders", orders);
        return "admin/order/list";
    }
}