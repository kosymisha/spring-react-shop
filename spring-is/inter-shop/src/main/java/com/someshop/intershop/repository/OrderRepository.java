package com.someshop.intershop.repository;

import com.someshop.intershop.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    @Query(value = "select * from orders where user_id = ?1 and paid = 0", nativeQuery = true)
    List<Order> findAllByUserIdAndNotPaid(String idUser);

    @Query(value = "select * from orders where user_id = ?1 and paid = 1", nativeQuery = true)
    List<Order> findAllByUserIdAndPaid(String idUser);

    @Query(value = "select orders.id, orders.date, orders.paid, orders.user_id, orders.advert_id" +
                    " from orders inner join advert on orders.advert_id = advert.id" +
                    " inner join shop on advert.shop_id = shop.id" +
                    " where shop.user_id = ?1 and orders.paid = 1;", nativeQuery = true)
    List<Order> findAllPaidBySeller (String idSeller);

    @Query(value = "select orders.id, orders.date, orders.paid, orders.user_id, orders.advert_id" +
            " from orders inner join advert on orders.advert_id = advert.id" +
            " where advert.shop_id = ?1 and orders.paid = 1;", nativeQuery = true)
    List<Order> findAllPaidByShop (String idShop);

    @Query(value = "select orders.id, orders.date, orders.paid, orders.user_id, orders.advert_id" +
                    " from orders inner join advert on orders.advert_id = advert.id" +
                    " inner join shop on advert.shop_id = shop.id" +
                    " where shop.user_id = ?1 and orders.paid = 1 and advert.title like ?2;", nativeQuery = true)
    List<Order> findAllPaidBySellerAndKeyword (String idSeller, String keyword);

    @Query(value = "select orders.id, orders.date, orders.paid, orders.user_id, orders.advert_id " +
            " from orders inner join advert on orders.advert_id = advert.id " +
            " where advert.shop_id = ?1 and orders.paid = 1 and advert.title like ?2 ", nativeQuery = true)
    List<Order> findAllPaidByShopAndKeyword (String idShop, String keyword);

    @Query(value = "select orders.id, orders.date, orders.paid, orders.user_id, orders.advert_id " +
            " from orders inner join advert on orders.advert_id = advert.id " +
            " where orders.user_id = ?1 and advert.title like ?2 ", nativeQuery = true)
    List<Order> findAllPaidByUserAndKeyword (String userId, String keyword);
}
