package com.someshop.intershop.repository;

import com.someshop.intershop.model.Shop;
import com.someshop.intershop.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShopRepository extends JpaRepository<Shop, Long> {

    @Query(value = "select * from shop where user_id = ?1", nativeQuery = true)
    List<Shop> findByOwner(String id);

    void delete (Shop shop);

    @Query(value = "select * from shop where name_shop = ?1", nativeQuery = true)
    Shop findByNameShop(String nameShop);

    @Query(value = "select * from shop where url = ?1", nativeQuery = true)
    Shop findByUrl(String url);

    @Query(value = "select * from shop where id = ?1", nativeQuery = true)
    Shop findById (String id);

    @Query(value = "select * from shop where name_shop like ?1", nativeQuery = true)
    List<Shop> findAllByKeyword (String keyword);
}
