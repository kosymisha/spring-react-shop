package com.someshop.intershop.service.impl;

import com.someshop.intershop.dto.AdvertDto;
import com.someshop.intershop.dto.OrderDto;
import com.someshop.intershop.dto.ShopDto;
import com.someshop.intershop.dto.UserDto;
import com.someshop.intershop.model.Advert;
import com.someshop.intershop.model.BankCard;
import com.someshop.intershop.model.Order;
import com.someshop.intershop.model.User;
import com.someshop.intershop.repository.AdvertRepository;
import com.someshop.intershop.repository.OrderRepository;
import com.someshop.intershop.repository.UserRepository;
import com.someshop.intershop.security.UserPrincipal;
import com.someshop.intershop.service.BankCardService;
import com.someshop.intershop.service.OrderService;
import com.someshop.intershop.service.PriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class OrderServiceImpl implements OrderService{

    @Autowired
    private PriceService priceService;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private BankCardService bankCardService;

    @Autowired
    private AdvertRepository advertRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void createOrder(UserPrincipal user, Advert advert) {
        if (advert.getAvailable()) {
            orderRepository.save(new Order(
                    false,
                    userRepository.findById(user.getId().toString()),
                    advert));
            advert.setAvailable(false);
            advertRepository.save(advert);
        }
    }

    @Override
    public ResponseEntity<?> confirmOrder(Order order, UserPrincipal user, String cardId) {
        if (order.getUser().getId().equals(user.getId()) &&
                bankCardService.pay(bankCardService.findById(cardId), order)) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
    }

    @Override
    public void deleteOrder(Order order) {
        orderRepository.delete(order);
        order.getAdvert().setAvailable(true);
        advertRepository.save(order.getAdvert());
    }

    @Override
    public ResponseEntity<?> getOrders(Boolean isPaod, String userId, String keyword) {
        if (isPaod) {
            if (!keyword.equals("")) return getOrdersByUserIdAndKeywordPaid(userId, keyword);
            else return getOrdersByUserIdPaid(userId);
        }
        else return getOrdersByUserIdNotPaid(userId);
    }

    @Override
    public ResponseEntity<?> getOrdersByUserIdNotPaid(String id) {
        List<OrderDto> orderDtos = new ArrayList<>();
        for (Order order : orderRepository.findAllByUserIdAndNotPaid(id)) {
            orderDtos.add(new OrderDto(
                    order.getId(),
                    order.getDate(),
                    order.isPaid(),
                    new UserDto(order.getUser().getId(), order.getUser().getEmail()),
                    new AdvertDto(
                            order.getAdvert().getId(),
                            order.getAdvert().getCurrency(),
                            order.getAdvert().getTitle(),
                            order.getAdvert().getPhotoURL(),
                            order.getAdvert().getIntPartPrice(),
                            order.getAdvert().getFractPartPrice()
                    )
            ));
        }
        return new ResponseEntity<>(orderDtos, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> getOrdersByUserIdAndKeywordPaid(String id, String keyword) {
        List<OrderDto> orderDtos = new ArrayList<>();
        for (Order order : orderRepository.findAllPaidByUserAndKeyword(id, "%" + keyword + "%")) {
            orderDtos.add(new OrderDto(
                    order.getId(),
                    order.getDate(),
                    order.isPaid(),
                    new UserDto(order.getUser().getId(), order.getUser().getEmail()),
                    new AdvertDto(
                            order.getAdvert().getId(),
                            order.getAdvert().getCurrency(),
                            order.getAdvert().getTitle(),
                            order.getAdvert().getPhotoURL(),
                            order.getAdvert().getIntPartPrice(),
                            order.getAdvert().getFractPartPrice()
                    )
            ));
        }
        return new ResponseEntity<>(orderDtos, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> getOrdersByUserIdPaid(String id) {
        List<OrderDto> orderDtos = new ArrayList<>();
        for (Order order : orderRepository.findAllByUserIdAndPaid(id)) {
            orderDtos.add(new OrderDto(
                    order.getId(),
                    order.getDate(),
                    order.isPaid(),
                    new UserDto(order.getUser().getId(), order.getUser().getEmail()),
                    new AdvertDto(
                            order.getAdvert().getId(),
                            order.getAdvert().getCurrency(),
                            order.getAdvert().getTitle(),
                            order.getAdvert().getPhotoURL(),
                            order.getAdvert().getIntPartPrice(),
                            order.getAdvert().getFractPartPrice()
                    )
            ));
        }
        return new ResponseEntity<>(orderDtos, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> getSales(String sellerId, String shopId, String keyword) {
        if (!shopId.equals("0")) {
            if (!keyword.equals(""))
                return findAllPaidByShopAndKeyword(shopId, keyword);
            else
                return findAllPaidByShop(shopId);
        } else if (!keyword.equals("")) {
            return findAllPaidBySellerAndKeyword(sellerId, keyword);
        } else
            return findAllPaidBySeller(sellerId);
    }

    @Override
    public ResponseEntity<?> findAllPaidBySeller(String sellerId) {
        List<OrderDto> orderDtos = new ArrayList<>();
        for (Order order : orderRepository.findAllPaidBySeller(sellerId)) {
            orderDtos.add(new OrderDto(
                    order.getId(),
                    order.getDate(),
                    order.isPaid(),
                    new UserDto(order.getUser().getId(), order.getUser().getEmail()),
                    new AdvertDto(
                            order.getAdvert().getId(),
                            order.getAdvert().getCurrency(),
                            order.getAdvert().getTitle(),
                            order.getAdvert().getPhotoURL(),
                            order.getAdvert().getIntPartPrice(),
                            order.getAdvert().getFractPartPrice(),
                            new ShopDto(
                                    order.getAdvert().getShop().getId(),
                                    order.getAdvert().getShop().getNameShop(),
                                    order.getAdvert().getShop().getUrl()
                            )
                    )
            ));
        }
        return new ResponseEntity<>(orderDtos, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> findAllPaidByShop(String shopId) {
        List<OrderDto> orderDtos = new ArrayList<>();
        for (Order order : orderRepository.findAllPaidByShop(shopId)) {
            orderDtos.add(new OrderDto(
                    order.getId(),
                    order.getDate(),
                    order.isPaid(),
                    new UserDto(order.getUser().getId(), order.getUser().getEmail()),
                    new AdvertDto(
                            order.getAdvert().getId(),
                            order.getAdvert().getCurrency(),
                            order.getAdvert().getTitle(),
                            order.getAdvert().getPhotoURL(),
                            order.getAdvert().getIntPartPrice(),
                            order.getAdvert().getFractPartPrice(),
                            new ShopDto(
                                    order.getAdvert().getShop().getId(),
                                    order.getAdvert().getShop().getNameShop(),
                                    order.getAdvert().getShop().getUrl()
                            )
                    )
            ));
        }
        return new ResponseEntity<>(orderDtos, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> findAllPaidBySellerAndKeyword(String sellerId, String keyword) {
        List<OrderDto> orderDtos = new ArrayList<>();
        for (Order order : orderRepository.findAllPaidBySellerAndKeyword(sellerId, "%" + keyword + "%")) {
            orderDtos.add(new OrderDto(
                    order.getId(),
                    order.getDate(),
                    order.isPaid(),
                    new UserDto(order.getUser().getId(), order.getUser().getEmail()),
                    new AdvertDto(
                            order.getAdvert().getId(),
                            order.getAdvert().getCurrency(),
                            order.getAdvert().getTitle(),
                            order.getAdvert().getPhotoURL(),
                            order.getAdvert().getIntPartPrice(),
                            order.getAdvert().getFractPartPrice(),
                            new ShopDto(
                                    order.getAdvert().getShop().getId(),
                                    order.getAdvert().getShop().getNameShop(),
                                    order.getAdvert().getShop().getUrl()
                            )
                    )
            ));
        }
        return new ResponseEntity<>(orderDtos, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> findAllPaidByShopAndKeyword(String shopId, String keyword) {
        List<OrderDto> orderDtos = new ArrayList<>();
        for (Order order : orderRepository.findAllPaidByShopAndKeyword(shopId, "%" + keyword + "%")) {
            orderDtos.add(new OrderDto(
                    order.getId(),
                    order.getDate(),
                    order.isPaid(),
                    new UserDto(order.getUser().getId(), order.getUser().getEmail()),
                    new AdvertDto(
                            order.getAdvert().getId(),
                            order.getAdvert().getCurrency(),
                            order.getAdvert().getTitle(),
                            order.getAdvert().getPhotoURL(),
                            order.getAdvert().getIntPartPrice(),
                            order.getAdvert().getFractPartPrice(),
                            new ShopDto(
                                    order.getAdvert().getShop().getId(),
                                    order.getAdvert().getShop().getNameShop(),
                                    order.getAdvert().getShop().getUrl()
                            )
                    )
            ));
        }
        return new ResponseEntity<>(orderDtos, HttpStatus.OK);
    }

    @Override
    public Map<String, Integer> sumPrice(List<Order> orders) {
        BigDecimal sum = new BigDecimal(0).setScale(2, RoundingMode.FLOOR);
        for (Order order : orders) {
            sum = sum.add(new BigDecimal(order.getAdvert().getIntPartPrice().toString() +
                    "." + order.getAdvert().getFractPartPrice().toString()));
        }
        return priceService.getParts(sum.toString());
    }


}
