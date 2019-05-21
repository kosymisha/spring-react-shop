package com.someshop.intershop.service.impl;

import com.someshop.intershop.model.Advert;
import com.someshop.intershop.service.EbayService;
import com.someshop.intershop.service.XmlRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.net.URL;
import java.util.List;

@Service
public class EbayServiceImpl implements EbayService {

    @Autowired
    private XmlRequestServiceImpl xmlRequestService;

    @Value("${ebayUrlPattern}")
    private String urlPattern;

    public void getItems(String keyword, String minPrice, String maxPrice, String categoryId ) throws IOException, ParserConfigurationException, SAXException {
        int i = 0;
        if (categoryId != null) { urlPattern += "&categoryId=" + categoryId; }
        if (keyword != null) { urlPattern += "&keywords=" + keyword; }
        if (minPrice != null) { urlPattern += "&itemFilter(" + i + ").name=MinPrice&itemFilter(" + i + ").value=" + minPrice; i++; }
        if (maxPrice != null) { urlPattern += "&itemFilter(" + i + ").name=MaxPrice&itemFilter(" + i + ").value=" + maxPrice; }
        xmlRequestService.saveItems(new URL(urlPattern), categoryId);
    }
}
/*
* http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=MishaKos-sneakers-PRD-f16e5579d-1bf649ce&RESPONSE-DATA-FORMAT=XML&GLOBAL-ID=EBAY-US&categoryId=58058&keywords=nikon&paginationInput.entriesPerPage=5&itemFilter(0).name=MaxPrice&itemFilter(0).value=3000
* */