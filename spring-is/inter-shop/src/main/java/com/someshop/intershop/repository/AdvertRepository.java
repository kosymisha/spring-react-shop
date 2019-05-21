package com.someshop.intershop.repository;

import com.someshop.intershop.model.Advert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdvertRepository extends JpaRepository<Advert, Long>, JpaSpecificationExecutor<Advert> {

    @Query(value = "select * from advert where shop_id = ?1", nativeQuery = true)
    List<Advert> findByShop (String shopId);

    Advert findByStoreId(String storeId);

    @Query(value = "select * from advert where id = ?1", nativeQuery = true)
    Advert findById (String id);

}
