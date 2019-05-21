package com.someshop.intershop.controller;

import com.someshop.intershop.model.Shop;
import com.someshop.intershop.security.CurrentUser;
import com.someshop.intershop.security.UserPrincipal;
import com.someshop.intershop.service.OrderService;
import com.someshop.intershop.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RestController
public class ShopController {

    @Autowired
    private ShopService shopService;

    @GetMapping("/shops")
    public ResponseEntity<?> getAllShops (@RequestParam (name = "keyword", defaultValue = "") String keyword,
                                          @RequestParam (name = "userId", defaultValue = "") String userId) {
        return shopService.getShopsByKeywordOrUser(keyword, userId);
    }

    @GetMapping("/shops/{shop}")
    public ResponseEntity<?> getShop (@PathVariable Shop shop) {
        return shopService.findById(shop.getId().toString());
    }

    @GetMapping("/shops/my")
    public ResponseEntity<?> getMyShops (@CurrentUser UserPrincipal user) {
        return shopService.findByOwner(user.getId().toString());
    }

    @PostMapping("/shops")
    public ResponseEntity<?> createShop (@RequestBody Shop shop, @CurrentUser UserPrincipal user) {
        return shopService.create(shop, user);
    }

    @DeleteMapping("/shops/{shop}")
    public void deleteShop (@PathVariable Shop shop) {
        shopService.delete(shop);
    }

    @PutMapping("/shops/{oldShop}")
    public ResponseEntity<?> updateShop (@PathVariable Shop oldShop, @RequestBody Shop newShop) {
        return shopService.update(newShop, oldShop);
    }

    @PostMapping("/shops/{shop}/uploadFile")
    public void uploadFile (@RequestParam("file") MultipartFile file, @PathVariable Shop shop) {
        shopService.setPhotoUrl(file, shop);
    }

    @DeleteMapping("/shops/{shop}/uploadFile")
    public void deleteFile (@PathVariable Shop shop) {
        shopService.deletePhotoUrl(shop);
    }
}
