package com.someshop.intershop.service.impl;

import com.someshop.intershop.dto.CurrencyDto;
import com.someshop.intershop.service.CurrencyService;
import com.someshop.intershop.service.XmlRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
public class CurrencyServiceImpl implements CurrencyService {

    @Autowired
    private XmlRequestService xmlRequestService;

    @Override
    public BigDecimal convertUsdToEur(Integer intPartPrice, Integer fractPartPrice) {
        BigDecimal price = new BigDecimal(intPartPrice.toString() + "." + fractPartPrice.toString());
        BigDecimal valueUSD = null;
        BigDecimal valueEUR = null;
        BigDecimal e2 = null;
        try {
            valueUSD = new BigDecimal(xmlRequestService.getCurrencyValue("USD").replaceAll(",", "."));
            valueEUR = new BigDecimal(xmlRequestService.getCurrencyValue("EUR").replaceAll(",", "."));
            BigDecimal e1 = price.multiply(valueUSD);
            e2 = e1.divide(valueEUR, 2, RoundingMode.FLOOR);
        } catch (IOException | SAXException | ParserConfigurationException e) {
            e.printStackTrace();
        }
        return e2;
    }

    @Override
    public BigDecimal convertUsdToByn(Integer intPartPrice, Integer fractPartPrice) {
        BigDecimal price = new BigDecimal(intPartPrice.toString() + "." + fractPartPrice.toString());
        BigDecimal valueUSD = null;
        BigDecimal valueBYN = null;
        BigDecimal e2 = null;
        try {
            valueUSD = new BigDecimal(xmlRequestService.getCurrencyValue("USD").replaceAll(",", "."));
            valueBYN = new BigDecimal(xmlRequestService.getCurrencyValue("BYN").replaceAll(",", "."));
            BigDecimal e1 = price.multiply(valueUSD);
            e2 = e1.divide(valueBYN, 2, RoundingMode.FLOOR);
        } catch (IOException | SAXException | ParserConfigurationException e) {
            e.printStackTrace();
        }
        return e2;
    }

    @Override
    public CurrencyDto getEurValueFromUsd(Integer intPartPrice, Integer fractPartPrice) {
        return new CurrencyDto(convertUsdToEur(intPartPrice, fractPartPrice), "EUR");
    }

    @Override
    public CurrencyDto getBynValueFromUsd(Integer intPartPrice, Integer fractPartPrice) {
        return new CurrencyDto(convertUsdToByn(intPartPrice, fractPartPrice), "BYN");
    }

    @Override
    public CurrencyDto getUsdValue(Integer intPartPrice, Integer fractPartPrice) {
        return new CurrencyDto(new BigDecimal(
                intPartPrice.toString() + "." + fractPartPrice.toString()), "USD");
    }
}
