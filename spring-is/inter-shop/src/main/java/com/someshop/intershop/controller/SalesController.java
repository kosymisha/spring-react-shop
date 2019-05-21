package com.someshop.intershop.controller;

import com.someshop.intershop.dto.CurrencyDto;
import com.someshop.intershop.model.Order;
import com.someshop.intershop.model.Shop;
import com.someshop.intershop.model.User;
import com.someshop.intershop.security.CurrentUser;
import com.someshop.intershop.security.UserPrincipal;
import com.someshop.intershop.service.CurrencyService;
import com.someshop.intershop.service.OrderService;
import com.someshop.intershop.service.PriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Controller
public class SalesController {

    @Autowired
    private PriceService priceService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private CurrencyService currencyService;


    @GetMapping("/sales")
    public ResponseEntity<?> getSales (@CurrentUser UserPrincipal user,
                                       @RequestParam(name = "shopId", defaultValue = "0") String shopId,
                                       @RequestParam(name = "keyword", defaultValue = "") String keyword) {
        return orderService.getSales(user.getId().toString(), shopId, keyword);
    }
}
