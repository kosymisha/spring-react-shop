package com.someshop.intershop.service.impl;

import com.someshop.intershop.model.Advert;
import com.someshop.intershop.model.Category;
import com.someshop.intershop.repository.AdvertRepository;
import com.someshop.intershop.service.AdvertService;
import com.someshop.intershop.service.CategoryService;
import com.someshop.intershop.service.XmlParseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;
import java.io.StringReader;
import java.util.LinkedList;
import java.util.List;

@Service
public class XmlParseServiceImpl implements XmlParseService {

    @Autowired
    private AdvertService advertService;

    @Autowired
    private CategoryService categoryService;

    public void parseEbay (StringBuffer response, String categoryId) throws IOException, SAXException, ParserConfigurationException {
        List<Advert> adverts = new LinkedList<Advert>();
        Document doc = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(new InputSource(new StringReader(response.toString())));
        if (doc.getFirstChild().getFirstChild().getTextContent().equals("Success")) { //if request was successful
            NodeList nList = doc.getElementsByTagName("item"); // getting elements which names are "item"
            for (int temp = 0; temp < nList.getLength(); temp++) {
                Node node = nList.item(temp);
                if (node.getNodeType() == Node.ELEMENT_NODE) {
                    Element element = (Element) node;
                    if (element.getElementsByTagName("galleryURL").getLength() != 0) {
                        if (!advertService.isContainsAdvert(element.getElementsByTagName("itemId").item(0).getTextContent())) {
                            Category category;
                            if (categoryId != null) category = categoryService.findById(categoryId);
                            else category = categoryService.findById("0");
                            advertService.create(
                                    element.getElementsByTagName("itemId").item(0).getTextContent(),
                                    element.getElementsByTagName("sellingStatus").item(0).getFirstChild().getAttributes().item(0).getTextContent(),
                                    element.getElementsByTagName("sellingStatus").item(0).getFirstChild().getTextContent(),
                                    element.getElementsByTagName("viewItemURL").item(0).getTextContent(),
                                    element.getElementsByTagName("title").item(0).getTextContent(),
                                    category,
                                    "eBay",
                                    element.getElementsByTagName("galleryURL").item(0).getTextContent());
                        }
                    }
                }
            }
        }
    }

    @Override
    public String parseCurrency(StringBuffer response, String currency) throws IOException, SAXException, ParserConfigurationException {
        Document doc = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(new InputSource(new StringReader(response.toString())));
        NodeList nList = doc.getElementsByTagName("Valute");
        for (int temp = 0; temp < nList.getLength(); temp++) {
            Node node = nList.item((temp));
            if (node.getNodeType() == Node.ELEMENT_NODE) {
                Element element = (Element) node;
                if (element.getElementsByTagName("CharCode").item(0).getTextContent().equals(currency)) {
                    return element.getElementsByTagName("Value").item(0).getTextContent();
                }
            }
        }
        return null;
    }
}
