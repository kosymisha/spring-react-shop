package com.someshop.intershop.repository;

import com.someshop.intershop.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    //User findByEmail (String email);

    @Query(value = "select * from user where email = ?1 and active = 1", nativeQuery = true)
    Optional<User> findActiveByEmail (String email);

    Optional<User> findByEmail (String email);

    @Query(value = "select * from user where id = ?1 and active = 1", nativeQuery = true)
    User findActiveById (String id);

    @Query(value = "select * from user where id = ?1", nativeQuery = true)
    User findById (String id);

    Boolean existsByEmail(String email);

    @Query(value = "select * from user where email like ?1 or firstname like ?1 or lastname like ?1", nativeQuery = true)
    List<User> findAllByKeyword(String keyword);

}
