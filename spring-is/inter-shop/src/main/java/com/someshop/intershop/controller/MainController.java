package com.someshop.intershop.controller;

import com.someshop.intershop.service.AdvertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.xml.sax.SAXException;

import javax.servlet.http.HttpServletRequest;
import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;

@RestController
public class MainController {

    @Autowired
    private AdvertService advertService;

    @GetMapping("/")
    public String main() {
        return "inter-shop";
    }

    @GetMapping("/search")
    public ResponseEntity<?> search(@RequestParam(name = "sort") String sort,
                                 @RequestParam(name = "categoryId", required = false) String categoryId,
                                 @RequestParam(name = "keyword", required = false) String keyword,
                                 @RequestParam(name = "minPrice", defaultValue = "0") String minPrice,
                                 @RequestParam(name = "maxPrice", defaultValue = "1000000000") String maxPrice,
                                 @RequestParam(name = "shopId", defaultValue = "0") String shopId,
                                 HttpServletRequest httpServletRequest)
            throws IOException, SAXException, ParserConfigurationException {
        return advertService.search(categoryId, keyword, minPrice, maxPrice, sort, shopId);
    }
}
