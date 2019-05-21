package com.someshop.intershop.service;

import java.math.BigDecimal;
import java.util.Map;

public interface PriceService {
    Map<String, Integer> getParts (String price);
    BigDecimal getPrice (Map<String, Integer> parts);
}
