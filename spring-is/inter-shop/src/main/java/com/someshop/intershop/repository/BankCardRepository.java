package com.someshop.intershop.repository;

import com.someshop.intershop.model.BankCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BankCardRepository extends JpaRepository<BankCard, Long> {

    @Query(value = "select * from bank_card where user_id = ?1 and active = 1", nativeQuery = true)
    BankCard findActiveByUserId (String userId);

    @Query(value = "select * from bank_card where user_id = ?1 and active = 0", nativeQuery = true)
    List<BankCard> findNonActiveByUserId (String userId);

    @Query(value = "select * from bank_card where id = ?1", nativeQuery = true)
    BankCard findById (String id);

    @Query(value = "select * from bank_card where user_id = ?1", nativeQuery = true)
    List<BankCard> findAllByUser (String id);
}
