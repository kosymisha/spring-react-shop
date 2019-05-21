package com.someshop.intershop.controller;

import com.someshop.intershop.dto.BankCardDto;
import com.someshop.intershop.model.Order;
import com.someshop.intershop.security.CurrentUser;
import com.someshop.intershop.security.UserPrincipal;
import com.someshop.intershop.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
public class OrderController {

    @Autowired
    private PriceService priceService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private AdvertService advertService;

    @Autowired
    private CurrencyService currencyService;

    @Autowired
    private BankCardService bankCardService;


    @GetMapping("/orders")
    public ResponseEntity<?> getOrders (@CurrentUser UserPrincipal user,
                                        @RequestParam(name = "isPaid") Boolean isPaid,
                                        @RequestParam(name = "keyword", defaultValue = "") String keyword) {

        return orderService.getOrders(isPaid, user.getId().toString(), keyword);
        /*
        List<Order> orders = orderService.getOrdersByUserIdPaid(user.getId().toString());
        Map<String, Integer> sumPrice = orderService.sumPrice(orders);
        model.addAttribute("orders", orderService.getOrdersByUserIdNotPaid(user.getId().toString()));
        model.addAttribute("paidOrders", orders);
        model.addAttribute("itemCount", orders.size());
        model.addAttribute("totalUsd", new CurrencyDto(priceService.getPrice(sumPrice), "USD"));
        model.addAttribute("totalEur", currencyService.getEurValueFromUsd(sumPrice.get("intPartPrice"), sumPrice.get("fractPartPrice")));
        model.addAttribute("totalByn", currencyService.getBynValueFromUsd(sumPrice.get("intPartPrice"), sumPrice.get("fractPartPrice")));
        model.addAttribute("defaultBankCard", bankCardService.findActiveByUserId(user.getId().toString()));
        model.addAttribute("bankCards", bankCardService.findNonActiveByUserId(user.getId().toString()));
        return "order/orders";
        */
    }

    @DeleteMapping("/orders/{order}")
    public void deleteOrder (@PathVariable Order order){
        orderService.deleteOrder(order);
    }

    @PutMapping("/orders/{order}")
    public ResponseEntity<?> confirmOrder (@CurrentUser UserPrincipal user, @PathVariable Order order,
                                           @RequestBody BankCardDto bankCard) {
        return orderService.confirmOrder(order, user, bankCard.getId().toString());
    }
}
