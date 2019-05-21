package com.someshop.intershop.service;

import com.someshop.intershop.dto.ShopDto;
import com.someshop.intershop.model.Shop;
import com.someshop.intershop.model.User;
import com.someshop.intershop.security.UserPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface ShopService {
    Shop create (Map<String, String> form, MultipartFile file, User user) throws IOException;
    void delete (Shop shop);
    void setPhotoUrl (MultipartFile file, Shop shop);
    void deletePhotoUrl (Shop shop);
    Shop saveInfo (Shop shop, User user, Map<String, String> form, MultipartFile file);
    Shop findByNameShop (String shop);
    ResponseEntity<?> findById (String id);
    ResponseEntity<?> findByOwner (String id);
    ResponseEntity<?> getAllShops ();
    ResponseEntity<?> getShopsByKeywordOrUser (String keyword, String userId);
    ResponseEntity<?> create (Shop shop, UserPrincipal user);
    ResponseEntity<?> update (Shop newShop, Shop oldShop);
}
