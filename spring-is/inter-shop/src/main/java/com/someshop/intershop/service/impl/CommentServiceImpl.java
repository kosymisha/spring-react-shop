package com.someshop.intershop.service.impl;

import com.someshop.intershop.dto.CommentDto;
import com.someshop.intershop.dto.UserDto;
import com.someshop.intershop.model.*;
import com.someshop.intershop.repository.CommentRepository;
import com.someshop.intershop.repository.UserRepository;
import com.someshop.intershop.security.UserPrincipal;
import com.someshop.intershop.service.CommentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CommentServiceImpl implements CommentService {

    private static final Logger LOGGER = LoggerFactory.getLogger(CommentServiceImpl.class);

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ResponseEntity<?> createShopComment(Comment comment, Shop shop, UserPrincipal user) {
        comment.setAuthor(userRepository.findById(user.getId().toString()));
        comment.setShop(shop);
        comment.setDate(new Date());
        Comment newComment = commentRepository.save(comment);
        CommentDto commentDto = new CommentDto(
                newComment.getId(),
                newComment.getDate(),
                new UserDto(
                        newComment.getAuthor().getId(),
                        newComment.getAuthor().getFirstName(),
                        newComment.getAuthor().getLastName(),
                        newComment.getAuthor().getPhotoURL()
                ),
                newComment.getMessage()
        );
        return new ResponseEntity<>(commentDto, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> createAdvertComment(Comment comment, Advert advert, UserPrincipal user) {
        comment.setAuthor(userRepository.findById(user.getId().toString()));
        comment.setAdvert(advert);
        comment.setDate(new Date());
        Comment newComment = commentRepository.save(comment);
        CommentDto commentDto = new CommentDto(
                newComment.getId(),
                newComment.getDate(),
                new UserDto(
                        newComment.getAuthor().getId(),
                        newComment.getAuthor().getFirstName(),
                        newComment.getAuthor().getLastName(),
                        newComment.getAuthor().getPhotoURL()
                ),
                newComment.getMessage()
        );
        return new ResponseEntity<>(commentDto, HttpStatus.OK);
    }

    @Override
    public void deleteComment(Comment comment) {
        commentRepository.delete(comment);
    }

    @Override
    public ResponseEntity<?> findAllByAdvert(Advert advert) {
        List<CommentDto> commentDtos = new ArrayList<>();
        for (Comment comment : commentRepository.findAllByAdvert(advert.getId().toString())) {
            UserDto userDto = new UserDto(
                    comment.getAuthor().getId(),
                    comment.getAuthor().getFirstName(),
                    comment.getAuthor().getLastName(),
                    comment.getAuthor().getPhotoURL()
            );
            commentDtos.add(new CommentDto(
                    comment.getId(),
                    comment.getDate(),
                    userDto,
                    comment.getMessage()
            ));
        }
        return new ResponseEntity<>(commentDtos, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> findAllByShop(Shop shop) {
        List<CommentDto> commentDtos = new ArrayList<>();
        for (Comment comment : commentRepository.findAllByShop(shop.getId().toString())) {
            UserDto userDto = new UserDto(
                    comment.getAuthor().getId(),
                    comment.getAuthor().getFirstName(),
                    comment.getAuthor().getLastName(),
                    comment.getAuthor().getPhotoURL()
            );
            commentDtos.add(new CommentDto(
                    comment.getId(),
                    comment.getDate(),
                    userDto,
                    comment.getMessage()
            ));
        }
        return new ResponseEntity<>(commentDtos, HttpStatus.OK);
    }

}
