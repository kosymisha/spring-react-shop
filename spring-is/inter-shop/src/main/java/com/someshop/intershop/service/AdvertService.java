package com.someshop.intershop.service;

import com.someshop.intershop.dto.AdvertDto;
import com.someshop.intershop.model.Advert;
import com.someshop.intershop.model.Category;
import com.someshop.intershop.model.Shop;
import com.someshop.intershop.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.multipart.MultipartFile;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface AdvertService {
    void addView (Advert advert);
    Advert create (Map<String, String> form, MultipartFile file) throws IOException;
    Advert create (String storeId, String currency, String price, String productURL, String title, Category category, String shop, String photoURL) ;
    ResponseEntity<?> create (AdvertDto advertDto);
    Advert findById(String id);
    void delete (Advert advert);
    void setAvailable (Advert advert);
    void setPhotoUrl (MultipartFile file, Advert advert);
    List<AdvertDto> searchInDb(String categoryId, String keyword, String minPrice, String maxPrice, String sort,
                            String shopId);
    Page<Advert> findAll(Pageable pageable);
    ResponseEntity<?> findAll();
    List<AdvertDto> findByShop (String shopId);
    ResponseEntity<?> search (String categoryId, String keyword, String minPrice, String maxPrice, String sort,
                         String shopId) throws ParserConfigurationException, SAXException, IOException;
    ResponseEntity<?> getAdvert (Advert advert);
    Boolean isContainsAdvert (String storeId);
    List<Advert> findByCriteria(String categoryId, String keyword, String minPrice, String maxPrice, String shopId);
}
