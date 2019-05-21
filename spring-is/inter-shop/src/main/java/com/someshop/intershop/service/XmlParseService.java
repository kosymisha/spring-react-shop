package com.someshop.intershop.service;

import com.someshop.intershop.model.Advert;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.util.List;

public interface XmlParseService {
    void parseEbay (StringBuffer response, String categoryId) throws IOException, SAXException, ParserConfigurationException;
    String parseCurrency (StringBuffer response, String currency) throws IOException, SAXException, ParserConfigurationException;
}
