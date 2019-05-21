package com.someshop.intershop.service.impl;

import com.amazonaws.services.xray.model.Http;
import com.someshop.intershop.dto.BankCardDto;
import com.someshop.intershop.dto.UserDto;
import com.someshop.intershop.model.BankCard;
import com.someshop.intershop.model.Order;
import com.someshop.intershop.model.User;
import com.someshop.intershop.repository.BankCardRepository;
import com.someshop.intershop.repository.OrderRepository;
import com.someshop.intershop.service.BankCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class BankCardServiceImpl implements BankCardService {

    @Autowired
    private BankCardRepository bankCardRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public boolean pay(BankCard card, Order order) {
        if((new Integer(card.getNumberCard().substring(4, 5))) % 2 == 0) {
            order.setPaid(true);
            orderRepository.save(order);
            return true;
        } else return false;
    }

    @Override
    public BankCard findActiveByUserId(String userId) {
        return bankCardRepository.findActiveByUserId(userId);
    }

    @Override
    public BankCard findById(String id) {
        return bankCardRepository.findById(id);
    }

    @Override
    public List<BankCard> findNonActiveByUserId(String userId) {
        return bankCardRepository.findNonActiveByUserId(userId);
    }

    @Override
    public void setDefault(User user, BankCard bankCard) {
        BankCard card = bankCardRepository.findActiveByUserId(user.getId().toString());
        card.setActive(false);
        bankCardRepository.save(card);
        card = bankCardRepository.findById(bankCard.getId().toString());
        card.setActive(true);
        bankCardRepository.save(card);
    }

    @Override
    public void delete(BankCard bankCard) {
        if (bankCard.getOwner().getCards().size() > 1 && !bankCard.isActive()) {
            bankCard.getOwner().getCards().remove(bankCard);
            bankCardRepository.delete(bankCard);
        }
    }

    @Override
    public void create(Map<String, String> form, User user) {
        bankCardRepository.save(new BankCard(form.get("numberCard"),
                form.get("firstNameCard"),
                form.get("lastNameCard"),
                form.get("monthCard"),
                form.get("yearCard"),
                user, false));
    }

    @Override
    public ResponseEntity<?> create(User user, BankCardDto bankCardDto) {
        BankCard bankCard = bankCardRepository.save(new BankCard(
                bankCardDto.getNumberCard(),
                bankCardDto.getFirstNameCard().toUpperCase(),
                bankCardDto.getLastNameCard().toUpperCase(),
                bankCardDto.getMonth(),
                bankCardDto.getYear(),
                user,
                false
        ));
        return new ResponseEntity<>(new BankCardDto(
                bankCard.getId(),
                bankCard.getNumberCard(),
                bankCard.getFirstNameCard(),
                bankCard.getLastNameCard(),
                bankCard.getMonth(),
                bankCard.getYear(),
                bankCard.getActive(),
                new UserDto(bankCard.getOwner().getId(), bankCard.getOwner().getEmail())
        ), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<?> getBankCardsByUser(User user, Boolean isDefault) {
        List<BankCardDto> bankCardDtos = new ArrayList<>();
        if (isDefault == null) {
            for (BankCard card : bankCardRepository.findAllByUser(user.getId().toString())){
                bankCardDtos.add(new BankCardDto(
                        card.getId(),
                        card.getNumberCard(),
                        card.getFirstNameCard(),
                        card.getLastNameCard(),
                        card.getMonth(),
                        card.getYear(),
                        card.getActive(),
                        new UserDto(card.getOwner().getId(), card.getOwner().getEmail())
                ));
            }
            return new ResponseEntity<>(bankCardDtos, HttpStatus.OK);
        } else if (isDefault) {
            BankCard bankCard = bankCardRepository.findActiveByUserId(user.getId().toString());
            return new ResponseEntity<>(new BankCardDto(
                    bankCard.getId(),
                    bankCard.getNumberCard(),
                    bankCard.getFirstNameCard(),
                    bankCard.getLastNameCard(),
                    bankCard.getMonth(),
                    bankCard.getYear(),
                    bankCard.getActive(),
                    new UserDto(bankCard.getOwner().getId(), bankCard.getOwner().getEmail())
            ), HttpStatus.OK);
        } else {
            for (BankCard card : bankCardRepository.findNonActiveByUserId(user.getId().toString())){
                bankCardDtos.add(new BankCardDto(
                        card.getId(),
                        card.getNumberCard(),
                        card.getFirstNameCard(),
                        card.getLastNameCard(),
                        card.getMonth(),
                        card.getYear(),
                        card.getActive(),
                        new UserDto(card.getOwner().getId(), card.getOwner().getEmail())
                ));
            }
            return new ResponseEntity<>(bankCardDtos, HttpStatus.OK);
        }
    }
}
