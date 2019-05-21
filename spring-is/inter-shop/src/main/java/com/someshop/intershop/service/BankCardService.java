package com.someshop.intershop.service;

import com.someshop.intershop.dto.BankCardDto;
import com.someshop.intershop.model.BankCard;
import com.someshop.intershop.model.Order;
import com.someshop.intershop.model.User;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface BankCardService {
    boolean pay (BankCard card, Order order);
    BankCard findActiveByUserId (String userId);
    BankCard findById (String id);
    List<BankCard> findNonActiveByUserId (String userId);
    void setDefault (User user, BankCard bankCard);
    void delete (BankCard bankCard);
    void create (Map<String, String> form, User user);
    ResponseEntity<?> create (User user, BankCardDto bankCardDto);
    ResponseEntity<?> getBankCardsByUser(User user, Boolean isDefault);
}
