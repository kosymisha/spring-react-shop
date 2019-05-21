package com.someshop.intershop.service;

import com.someshop.intershop.model.Advert;
import com.someshop.intershop.model.Comment;
import com.someshop.intershop.model.Shop;
import com.someshop.intershop.model.User;
import com.someshop.intershop.security.UserPrincipal;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Set;


public interface CommentService {
    ResponseEntity<?> createShopComment (Comment comment, Shop shop, UserPrincipal user);
    ResponseEntity<?> createAdvertComment (Comment comment, Advert advert, UserPrincipal user);
    void deleteComment (Comment comment);
    ResponseEntity<?> findAllByAdvert (Advert advert);
    ResponseEntity<?> findAllByShop (Shop shop);
}
