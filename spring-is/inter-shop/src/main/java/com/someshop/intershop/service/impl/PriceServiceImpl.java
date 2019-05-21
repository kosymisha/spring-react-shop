package com.someshop.intershop.service.impl;

import com.someshop.intershop.service.PriceService;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Service
public class PriceServiceImpl implements PriceService {

    @Override
    public Map<String, Integer> getParts(String price) {
        Map<String, Integer> map = new HashMap<>();
        if (price.contains(".")) {
            String[] parts = price.split("\\.");
            map.put("intPartPrice", new Integer(parts[0]));
            map.put("fractPartPrice", new Integer(parts[1]));
        } else {
            map.put("intPartPrice", new Integer(price));
            map.put("fractPartPrice", 0);
        }
        return map;
    }

    @Override
    public BigDecimal getPrice(Map<String, Integer> parts) {
        return new BigDecimal(parts.get("intPartPrice").toString() + "." +
                                parts.get("fractPartPrice").toString());
    }
}
