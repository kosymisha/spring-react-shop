package com.someshop.intershop.repository;

import com.someshop.intershop.model.Advert;
import com.someshop.intershop.model.Comment;
import com.someshop.intershop.model.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query(value = "select * from comment where advert_id = ?1 order by date * -1", nativeQuery = true)
    List<Comment> findAllByAdvert(String advertId);

    @Query(value = "select * from comment where shop_id = ?1 order by date * -1", nativeQuery = true)
    List<Comment> findAllByShop(String shopId);

}
