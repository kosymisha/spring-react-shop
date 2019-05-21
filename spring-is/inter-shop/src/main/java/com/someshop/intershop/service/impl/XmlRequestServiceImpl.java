package com.someshop.intershop.service.impl;

import com.someshop.intershop.model.Advert;
import com.someshop.intershop.service.XmlRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class XmlRequestServiceImpl implements XmlRequestService {

    @Autowired
    private XmlParseServiceImpl xmlParseServiceImpl;

    @Value("${exchangeRatesUrl}")
    private URL exchangeRatesUrl;

    public void saveItems(URL url, String categoryId) throws IOException, SAXException, ParserConfigurationException {
        HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection();
        httpURLConnection.setRequestMethod("GET");
        BufferedReader in = new BufferedReader(new InputStreamReader(httpURLConnection.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();
        while ((inputLine = in.readLine()) != null) { response.append(inputLine); } in.close(); //httpURLConnection.disconnect();
        xmlParseServiceImpl.parseEbay(response, categoryId);
    }

    @Override
    public String getCurrencyValue(String currency) throws IOException, ParserConfigurationException, SAXException {
        HttpURLConnection httpURLConnection = (HttpURLConnection) exchangeRatesUrl.openConnection();
        httpURLConnection.setRequestMethod("GET");
        BufferedReader in = new BufferedReader(new InputStreamReader(httpURLConnection.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();
        while ((inputLine = in.readLine()) != null) { response.append(inputLine); } in.close(); //httpURLConnection.disconnect();
        return xmlParseServiceImpl.parseCurrency(response, currency);
    }

    @Override
    public String filterQueryString(String queryString) {
        String result = "";
        String[] parts = queryString.split("&");
        for (String part : parts) {
            String[] kv = part.split("=");
            if (!kv[0].equals("page") && !kv[0].equals("size"))
                result += part + "&";
        }
        return result.substring(0, result.length() - 1);
    }
}
