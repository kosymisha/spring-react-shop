package com.someshop.intershop.service;

import com.someshop.intershop.dto.CurrencyDto;

import java.math.BigDecimal;

public interface CurrencyService {
    BigDecimal convertUsdToEur (Integer intPartPrice, Integer fractPartPrice);
    BigDecimal convertUsdToByn (Integer intPartPrice, Integer fractPartPrice);
    CurrencyDto getEurValueFromUsd (Integer intPartPrice, Integer fractPartPrice);
    CurrencyDto getBynValueFromUsd (Integer intPartPrice, Integer fractPartPrice);
    CurrencyDto getUsdValue (Integer intPartPrice, Integer fractPartPrice);
}
