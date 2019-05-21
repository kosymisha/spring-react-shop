package com.someshop.intershop.service.impl;

import com.someshop.intershop.dto.AdvertDto;
import com.someshop.intershop.dto.ShopDto;
import com.someshop.intershop.dto.UserDto;
import com.someshop.intershop.model.*;
import com.someshop.intershop.repository.AdvertRepository;
import com.someshop.intershop.repository.CategoryRepository;
import com.someshop.intershop.repository.ShopRepository;
import com.someshop.intershop.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.multipart.MultipartFile;
import org.xml.sax.SAXException;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.util.*;

@Service
public class AdvertServiceImpl implements AdvertService {

    @Autowired
    private PriceService priceService;

    @Autowired
    private AdvertRepository advertRepository;

    @Autowired
    private ShopService shopService;

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private EbayService ebayService;

    @Autowired
    private FileService fileService;

    @Autowired
    private ShopRepository shopRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Value("${noImageUrl}")
    private String noImageUrl;

    public void addView (Advert advert) {
        advert.addView();
        advertRepository.save(advert);
    }

    public Advert create (String storeId, String currency, String price, String productURL, String title, Category category,
                          String shop, String photoURL) {
        Map<String, Integer> priceParts = priceService.getParts(price);
        Advert advert = new Advert(storeId,
                currency,
                0,
                "For more information follow the link.",
                productURL,
                title,
                category,
                photoURL,
                true,
                shopService.findByNameShop(shop),
                priceParts.get("intPartPrice"),
                priceParts.get("fractPartPrice"));
        advertRepository.save(advert);
        return advert;
    }

    @Override
    public ResponseEntity<?> create(AdvertDto advertDto) {
        Shop shop = shopRepository.findById(advertDto.getShop().getId().toString());
        Category category = categoryRepository.findById(advertDto.getCategory().getId().toString());
        Advert newAdvert = new Advert();
        newAdvert.setAvailable(true);
        newAdvert.setTitle(advertDto.getTitle());
        newAdvert.setPhotoURL(noImageUrl);
        newAdvert.setCurrency("USD");
        newAdvert.setViews(0);
        newAdvert.setShop(shop);
        newAdvert.setCategory(category);
        newAdvert.setIntPartPrice(advertDto.getIntPartPrice());
        newAdvert.setFractPartPrice(advertDto.getFractPartPrice());
        newAdvert.setDescription(advertDto.getDescription());
        newAdvert = advertRepository.save(newAdvert);
        newAdvert.setProductURL(newAdvert.getShop().getUrl() + "/" + newAdvert.getId().toString());
        newAdvert = advertRepository.save(newAdvert);
        return new ResponseEntity<>(new AdvertDto(newAdvert.getId()), HttpStatus.CREATED);
    }

    @Override
    public Advert create (Map<String, String> form, MultipartFile file) throws IOException {
        Map<String, Integer> priceParts = priceService.getParts(form.get("price"));
        Advert advert = new Advert(null,
                "USD",
                0,
                form.get("description"),
                "",
                form.get("title"),
                categoryService.findById(form.get("options")),
                fileService.uploadToS3(file),
                true,
                shopService.findByNameShop(form.get("shop")),
                priceParts.get("intPartPrice"),
                priceParts.get("fractPartPrice"));
        advert.setProductURL(advert.getShop().getUrl() + "/" + advert.getId());
        advertRepository.save(advert);
        return advert;
    }

    @Override
    public Advert findById(String id) {
        return advertRepository.findById(id);
    }

    @Override
    public void delete (Advert advert) {
            advertRepository.delete(advert);
    }

    @Override
    public void setAvailable(Advert advert) {
            advert.setAvailable(!advert.getAvailable());
            advertRepository.save(advert);
    }

    @Override
    public void setPhotoUrl(MultipartFile file, Advert advert) {
        try {
            fileService.deleteFromS3(advert.getPhotoURL());
            advert.setPhotoURL(fileService.uploadToS3(file));
            advertRepository.save(advert);
        }
        catch (IOException e) { e.printStackTrace(); }
    }

    @Override
    public ResponseEntity<?> findAll() {
        return new ResponseEntity<List<Advert>>(advertRepository.findAll(), HttpStatus.OK);
    }

    @Override
    public Page<Advert> findAll(Pageable pageable) {/*
        List<AdvertDto> advertDtos = new LinkedList<>();
        for (Advert advert : advertRepository.findAll(pageable))
            advertDtos.add(new AdvertDto(advert.getId(), advert.getCurrency(), advert.getPrice(), advert.getViews(), advert.getTitle(), advert.getPhotoURL(), advert.getCategory().getCategoryName(), advert.getShop()));
        */
        return advertRepository.findAll(pageable);
    }

    @Override
    public List<AdvertDto> findByShop(String shopId) {
        List<AdvertDto> advertDtos = new LinkedList<>();/*
        for (Advert advert : advertRepository.findByShop(shopId))
            advertDtos.add(new AdvertDto(advert.getId(), advert.getCurrency(), advert.getViews(),
                    advert.getTitle(), advert.getPhotoURL(), advert.getCategory().getCategoryName(),
                    advert.getShop(), advert.getIntPartPrice(), advert.getFractPartPrice()));*/
        return advertDtos;/*
        return advertRepository.findAll(new Specification<Advert>() {
            @Override
            public Predicate toPredicate(Root<Advert> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                List<Predicate> predicates = new ArrayList<>();
                predicates.add(criteriaBuilder.equal(root.get("shop"), shopService.findById(shopId)));
                return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
            }
        }, PageRequest.of(page, ));*/
    }

    @Override
    public ResponseEntity<?> search (String categoryId, String keyword, String minPrice, String maxPrice, String sort,
                                String shopId) {/*
        if (shopId.equals("0") || !shopId.equals(shopService.findByNameShop("eBay").getId().toString())) {
            try {
                ebayService.getItems(keyword, minPrice, maxPrice, categoryId);
            } catch (IOException | SAXException | ParserConfigurationException e) {
                e.printStackTrace();
            }
        }*/
        return new ResponseEntity<>(searchInDb(categoryId, keyword, minPrice, maxPrice, sort, shopId),
                HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> getAdvert(Advert advert) {
        return new ResponseEntity<>(new AdvertDto(
                advert.getId(),
                advert.getCurrency(),
                advert.getViews(),
                advert.getDescription(),
                advert.getProductURL(),
                advert.getTitle(),
                advert.getPhotoURL(),
                advert.getCategory().getCategoryName(),
                new ShopDto(
                        advert.getShop().getId(),
                        advert.getShop().getNameShop(),
                        advert.getShop().getUrl(),
                        new UserDto(
                                advert.getShop().getOwner().getId(),
                                advert.getShop().getOwner().getEmail()
                        )
                ),
                advert.getIntPartPrice(),
                advert.getFractPartPrice(),
                advert.getAvailable()
        ), HttpStatus.OK);
    }

    @Override
    public List<AdvertDto> searchInDb(String categoryId, String keyword, String minPrice, String maxPrice, String sort,
                                String shopId) {
        List<Advert> result = sort(findByCriteria(categoryId, keyword, minPrice, maxPrice, shopId), sort);
        List<AdvertDto> advertDtos = new ArrayList<>();
        for (Advert advert : result) {
            advertDtos.add(new AdvertDto(
                    advert.getId(),
                    advert.getCurrency(),
                    advert.getViews(),
                    advert.getDescription(),
                    advert.getProductURL(),
                    advert.getTitle(),
                    advert.getPhotoURL(),
                    advert.getCategory().getCategoryName(),
                    advert.getIntPartPrice(),
                    advert.getFractPartPrice(),
                    advert.getAvailable()
            ));
        }
        return advertDtos;
    }

    public List<Advert> findByCriteria(String categoryId, String keyword, String minPrice, String maxPrice, String shopId) {
        return advertRepository.findAll(new Specification<Advert>() {
            @Override
            public Predicate toPredicate(Root<Advert> root, CriteriaQuery<?> criteriaQuery, CriteriaBuilder criteriaBuilder) {
                List<Predicate> predicates = new ArrayList<>();
                String[] parts;
                if (categoryId != null) predicates.add(criteriaBuilder.equal(root.get("category"), categoryService.findById(categoryId)));
                if (!shopId.equals("0"))
                    predicates.add(criteriaBuilder.equal(root.get("shop"), shopRepository.findById(shopId)));
                if (keyword != null) {
                    parts = keyword.split("-");
                    for (String part : parts) predicates.add(criteriaBuilder.like(root.get("title"), "%" + part + "%"));
                }
                if (minPrice.contains(".")){
                    String[] partsPrice = minPrice.split("\\.");
                    predicates.add(criteriaBuilder.or(criteriaBuilder.greaterThan(root.get("intPartPrice"), new Integer(partsPrice[0])),
                            criteriaBuilder.and(criteriaBuilder.equal(root.get("intPartPrice"), new Integer(partsPrice[0])),
                                    criteriaBuilder.greaterThanOrEqualTo(root.get("fractPartPrice"), new Integer(partsPrice[1])))
                            ));
                } else {
                    predicates.add(criteriaBuilder.or(criteriaBuilder.greaterThan(root.get("intPartPrice"), minPrice),
                            criteriaBuilder.and(criteriaBuilder.equal(root.get("intPartPrice"), minPrice),
                                    criteriaBuilder.greaterThanOrEqualTo(root.get("fractPartPrice"), 0))
                    ));
                }
                if (maxPrice.contains(".")){
                    String[] partsPrice = maxPrice.split("\\.");
                    predicates.add(criteriaBuilder.or(criteriaBuilder.lessThan(root.get("intPartPrice"), new Integer(partsPrice[0])),
                            criteriaBuilder.and(criteriaBuilder.equal(root.get("intPartPrice"), new Integer(partsPrice[0])),
                                    criteriaBuilder.lessThanOrEqualTo(root.get("fractPartPrice"), new Integer(partsPrice[1])))
                    ));
                } else {
                    predicates.add(criteriaBuilder.or(criteriaBuilder.lessThan(root.get("intPartPrice"), maxPrice),
                            criteriaBuilder.and(criteriaBuilder.equal(root.get("intPartPrice"), maxPrice),
                                    criteriaBuilder.lessThanOrEqualTo(root.get("fractPartPrice"), 0))
                    ));
                }
                return criteriaBuilder.and(predicates.toArray(new Predicate[predicates.size()]));
            }
        });
    }

    public List<Advert> sort (List<Advert> adverts, String sortType) {
        if (sortType.equals("3")){
            Comparator<Advert> comparator = Comparator.comparing(Advert::getViews);
            Collections.sort(adverts, comparator.reversed());
        } else if (sortType.equals("4")) {
            Comparator<Advert> comparator = Comparator.comparing(Advert::getCommentsSize);
            Collections.sort(adverts, comparator.reversed());
        } else if (sortType.equals("1")) {
            Comparator<Advert> comparator = Comparator.comparing(Advert::getPrice);
            Collections.sort(adverts, comparator);
        } else if (sortType.equals("2")) {
            Comparator<Advert> comparator = Comparator.comparing(Advert::getPrice);
            Collections.sort(adverts, comparator.reversed());
        }
        return adverts;
    }

    @Override
    public Boolean isContainsAdvert(String storeId) {
        return advertRepository.findByStoreId(storeId) != null;
    }
}
