package com.someshop.intershop.controller;

import com.someshop.intershop.model.Advert;
import com.someshop.intershop.model.Comment;
import com.someshop.intershop.model.Shop;
import com.someshop.intershop.security.CurrentUser;
import com.someshop.intershop.security.UserPrincipal;
import com.someshop.intershop.service.impl.CommentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
public class CommentController {

    @Autowired
    private CommentServiceImpl commentService;

    @GetMapping("/shops/{shop}/comments")
    public ResponseEntity<?> getShopComments (@PathVariable Shop shop) {
        return commentService.findAllByShop(shop);
    }

    @GetMapping("/adverts/{advert}/comments")
    public ResponseEntity<?> getShopComments (@PathVariable Advert advert) {
        return commentService.findAllByAdvert(advert);
    }

    @PostMapping("/shops/{shop}/comments")
    public ResponseEntity<?> createShopComment(@PathVariable Shop shop, @RequestBody Comment comment,
                                  @CurrentUser UserPrincipal user) {
        return commentService.createShopComment(comment, shop, user);
    }

    @PostMapping("/adverts/{advert}/comments")
    public ResponseEntity<?> createAdvertComment(@PathVariable Advert advert, @RequestBody Comment comment,
                                  @CurrentUser UserPrincipal user) {
        return commentService.createAdvertComment(comment, advert, user);
    }

    @DeleteMapping("/comments/{comment}")
    public void deleteShopComment (@PathVariable Comment comment) {
        commentService.deleteComment(comment);
    }

}
