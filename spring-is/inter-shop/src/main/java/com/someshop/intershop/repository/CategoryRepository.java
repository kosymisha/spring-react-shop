package com.someshop.intershop.repository;

import com.someshop.intershop.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query(value = "select * from category where category_name = ?1", nativeQuery = true)
    Category findByCategoryName (String categoryName);

    @Query(value = "select * from category where id = ?1", nativeQuery = true)
    Category findById (String id);

    @Query(value = "select * from category where category_name like ?1", nativeQuery = true)
    List<Category> findAllByKeyword (String keyword);

    @Query(value = "select * from category order by category_name", nativeQuery = true)
    List<Category> findAll();

}
