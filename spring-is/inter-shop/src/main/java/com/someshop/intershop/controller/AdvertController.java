package com.someshop.intershop.controller;

import com.someshop.intershop.dto.AdvertDto;
import com.someshop.intershop.model.Advert;
import com.someshop.intershop.model.Shop;
import com.someshop.intershop.model.User;
import com.someshop.intershop.repository.ShopRepository;
import com.someshop.intershop.security.CurrentUser;
import com.someshop.intershop.security.UserPrincipal;
import com.someshop.intershop.service.*;

import com.someshop.intershop.service.impl.AdvertServiceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.jws.WebParam;
import javax.validation.Valid;
import java.io.IOException;
import java.util.Map;

@RestController
public class AdvertController {

    @Autowired
    private AdvertService advertService;

    @Autowired
    private OrderService orderService;

    @GetMapping("/adverts")
    public ResponseEntity<?> getAllAdverts () {
        return advertService.findAll();
    }

    @GetMapping("/adverts/{advert}")
    public ResponseEntity<?> getAdvert (@PathVariable Advert advert) {
        advertService.addView(advert);
        return advertService.getAdvert(advert);
    }

    @PostMapping("/adverts")
    public ResponseEntity<?> createAdvert (@RequestBody AdvertDto advertDto) {
        return advertService.create(advertDto);
    }

    @PostMapping("/adverts/{advert}/photo")
    public void uploadFile (@RequestParam("file") MultipartFile file, @PathVariable Advert advert) {
        advertService.setPhotoUrl(file, advert);
    }

    @GetMapping("/adverts/{advert}/available")
    public void setAvailable (@PathVariable Advert advert) {
        advertService.setAvailable(advert);
    }

    @GetMapping("/adverts/{advert}/addToCart")
    public void addToCart (@CurrentUser UserPrincipal user, @PathVariable Advert advert) {
        orderService.createOrder(user, advert);
    }

    @DeleteMapping("/adverts/{advert}")
    public void deleteAdvert (@PathVariable Advert advert) {
        advertService.delete(advert);
    }

}
