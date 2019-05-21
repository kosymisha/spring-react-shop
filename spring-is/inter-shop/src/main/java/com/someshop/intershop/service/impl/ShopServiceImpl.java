package com.someshop.intershop.service.impl;

import com.someshop.intershop.dto.ShopDto;
import com.someshop.intershop.dto.UserDto;
import com.someshop.intershop.dto.UserListDto;
import com.someshop.intershop.model.Shop;
import com.someshop.intershop.model.User;
import com.someshop.intershop.repository.ShopRepository;
import com.someshop.intershop.repository.UserRepository;
import com.someshop.intershop.security.UserPrincipal;
import com.someshop.intershop.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class ShopServiceImpl implements ShopService {

    @Autowired
    private ShopRepository shopRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FileServiceImpl fileService;

    @Value("${noImageUrl}")
    private String noImageUrl;

    public Shop create(Map<String, String> form, MultipartFile file, User user) throws IOException {
        if (shopRepository.findByNameShop(form.get("shopName")) == null) {
            Shop shop = new Shop(form.get("shopName"),
                    form.get("shopUrl"),
                    user,
                    fileService.uploadToS3(file),
                    //fileService.uploadLocal(file),
                    form.get("description"));
            shopRepository.save(shop);
            return shop;
        } else {
            return null;
        }
    }

    public void delete(Shop shop) {
        shopRepository.delete(shop);
    }

    @Override
    public void setPhotoUrl(MultipartFile file, Shop shop) {
        try {
            fileService.deleteFromS3(shop.getPhotoURL());
            shop.setPhotoURL(fileService.uploadToS3(file));
            shopRepository.save(shop);
        }
        catch (IOException e) { e.printStackTrace(); }
    }

    @Override
    public void deletePhotoUrl(Shop shop) {
        fileService.deleteFromS3(shop.getPhotoURL());
        shop.setPhotoURL(noImageUrl);
        shopRepository.save(shop);
    }

    @Override
    public Shop saveInfo(Shop shop, User user, Map<String, String> form, MultipartFile file) {
        Shop shopFromBd = shopRepository.findByNameShop(form.get("shopName"));
        if ((shopFromBd == null || shopFromBd.getId().equals(shop.getId())) &&
                shop.getOwner().getId().equals(user.getId())) {
            if (!file.isEmpty()) {
                try {
                    //delete old photo from s3
                    shop.setPhotoURL(fileService.uploadToS3(file));
                } catch (IOException e) { e.printStackTrace(); }
            }
            shop.setNameShop(form.get("shopName"));
            shop.setUrl(form.get("shopUrl"));
            shop.setDescription(form.get("description"));
            shopRepository.save(shop);
            return shop;
        } else return null;
    }

    public Shop findByNameShop (String shop) {
        return shopRepository.findByNameShop(shop);
    }

    @Override
    public ResponseEntity<?> findById(String id) {
        Shop shop = shopRepository.findById(id);
        UserDto owner = new UserDto();
        owner.setId(shop.getOwner().getId());
        owner.setFirstName(shop.getOwner().getFirstName());
        owner.setLastName(shop.getOwner().getLastName());
        ShopDto shopDto = new ShopDto(
                shop.getId(),
                shop.getNameShop(),
                shop.getPhotoURL(),
                shop.getDescription(),
                shop.getUrl(),
                owner
        );
        return new ResponseEntity<>(shopDto, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> findByOwner(String id) {
        return new ResponseEntity<>(shopRepository.findByOwner(id), HttpStatus.FOUND);
    }

    @Override
    public ResponseEntity<?> getAllShops() {
        List<ShopDto> shopDtos = new ArrayList<>();
        for (Shop shop : shopRepository.findAll()) {
            shopDtos.add(new ShopDto(
                    shop.getId(),
                    shop.getNameShop(),
                    shop.getPhotoURL(),
                    shop.getDescription(),
                    shop.getUrl(),
                    new UserDto(
                            shop.getOwner().getId(),
                            shop.getOwner().getFirstName(),
                            shop.getOwner().getLastName(),
                            shop.getOwner().getPhotoURL()
                    )
            ));
        }
        return new ResponseEntity<>(shopDtos, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> getShopsByKeywordOrUser(String keyword, String userId) {
        List<ShopDto> shopDtos = new ArrayList<>();
        List<Shop> shops;
        if (!keyword.equals("")) shops = shopRepository.findAllByKeyword("%" + keyword + "%");
        else if (!userId.equals("")) shops = shopRepository.findByOwner(userId);
        else shops = shopRepository.findAll();
        for (Shop shop : shops) {
            shopDtos.add(new ShopDto(
                    shop.getId(),
                    shop.getNameShop(),
                    shop.getPhotoURL(),
                    shop.getDescription(),
                    shop.getUrl()
            ));
        }
        return new ResponseEntity<>(shopDtos, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> create(Shop shop, UserPrincipal user) {
        Map<String, String> errorsMap = new HashMap<>();
        if (shopRepository.findByNameShop(shop.getNameShop()) != null) {
            errorsMap.put("errorMsg", "Shop with the same name already exists");
            return new ResponseEntity<Map<String, String>>(errorsMap, HttpStatus.NOT_FOUND);
        }
        if (shopRepository.findByUrl(shop.getUrl()) != null) {
            errorsMap.put("errorMsg", "Shop with the same URL already exists");
            return new ResponseEntity<Map<String, String>>(errorsMap, HttpStatus.NOT_FOUND);
        }
        shop.setOwner(userRepository.findById(user.getId().toString()));
        shop.setPhotoURL(noImageUrl);
        Shop newShop = shopRepository.save(shop);
        return new ResponseEntity<>(new ShopDto(
                newShop.getId(),
                newShop.getNameShop(),
                newShop.getPhotoURL(),
                newShop.getDescription(),
                newShop.getUrl()
        ), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<?> update(Shop newShop, Shop oldShop) {
        Map<String, String> errorsMap = new HashMap<>();
        Shop shopFromDb = shopRepository.findByNameShop(newShop.getNameShop());
        if (shopFromDb != null && !shopFromDb.getId().equals(oldShop.getId())) {
            errorsMap.put("errorMsg", "Shop with the same name already exists");
            return new ResponseEntity<Map<String, String>>(errorsMap, HttpStatus.NOT_FOUND);
        }
        shopFromDb = shopRepository.findByUrl(newShop.getUrl());
        if (shopFromDb != null && !shopFromDb.getId().equals(oldShop.getId())) {
            errorsMap.put("errorMsg", "Shop with the same URL already exists");
            return new ResponseEntity<Map<String, String>>(errorsMap, HttpStatus.NOT_FOUND);
        }
        newShop.setId(oldShop.getId());
        newShop.setOwner(oldShop.getOwner());
        newShop.setComments(oldShop.getComments());
        newShop.setAdverts(oldShop.getAdverts());
        newShop.setPhotoURL(oldShop.getPhotoURL());
        Shop shop = shopRepository.save(newShop);
        return new ResponseEntity<>(new ShopDto(
                shop.getId(),
                shop.getNameShop(),
                shop.getPhotoURL(),
                shop.getDescription(),
                shop.getUrl()
        ), HttpStatus.OK);
    }
}
