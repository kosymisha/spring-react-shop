package com.someshop.intershop.controller;

import com.someshop.intershop.dto.BankCardDto;
import com.someshop.intershop.model.BankCard;
import com.someshop.intershop.model.User;
import com.someshop.intershop.service.BankCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class BankCardController {

    @Autowired
    private BankCardService bankCardService;

    @GetMapping("/profiles/{profile}/bankCards")
    public ResponseEntity<?> getBankCards (@PathVariable User profile,
                                           @RequestParam(name = "default", required = false) Boolean isDefault) {
        return bankCardService.getBankCardsByUser(profile, isDefault);
    }

    @DeleteMapping("/profiles/{profile}/bankCards/{bankCard}")
    public void deleteBankCard (@PathVariable User profile, @PathVariable BankCard bankCard) {
        bankCardService.delete(bankCard);
    }

    @PostMapping("/profiles/{profile}/bankCards")
    public ResponseEntity<?> createBankCard (@PathVariable User profile, @RequestBody BankCardDto bankCardDto) {
        return bankCardService.create(profile, bankCardDto);
    }

    @PutMapping("/profiles/{profile}/bankCards/{bankCard}")
    public void setDefaultBankCard (@PathVariable User profile, @PathVariable BankCard bankCard) {
        bankCardService.setDefault(profile, bankCard);
    }
}
