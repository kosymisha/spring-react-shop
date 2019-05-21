package com.someshop.intershop.service;

import com.someshop.intershop.model.Advert;
import com.someshop.intershop.model.Order;
import com.someshop.intershop.model.User;
import com.someshop.intershop.security.UserPrincipal;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public interface OrderService {
    void createOrder (UserPrincipal user, Advert advert);
    void deleteOrder (Order order);
    ResponseEntity<?> confirmOrder (Order order, UserPrincipal user, String cardId);
    ResponseEntity<?> getOrders(Boolean isPaod, String userId, String keyword);
    ResponseEntity<?> getOrdersByUserIdNotPaid (String id);
    ResponseEntity<?> getOrdersByUserIdAndKeywordPaid (String id, String keyword);
    ResponseEntity<?> getOrdersByUserIdPaid (String id);
    ResponseEntity<?> getSales (String sellerId, String shopId, String keyword);
    ResponseEntity<?> findAllPaidBySeller (String sellerId);
    ResponseEntity<?> findAllPaidByShop (String shopId);
    ResponseEntity<?> findAllPaidBySellerAndKeyword (String sellerId, String keyword);
    ResponseEntity<?> findAllPaidByShopAndKeyword (String shopId, String keyword);
    Map<String, Integer> sumPrice (List<Order> orders);
}
