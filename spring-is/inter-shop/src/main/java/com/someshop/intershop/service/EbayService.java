package com.someshop.intershop.service;

import com.someshop.intershop.model.Advert;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.util.List;

public interface EbayService {
    void getItems(String keyword, String minPrice, String maxPrice, String categoryId ) throws IOException, ParserConfigurationException, SAXException;
}
