package com.someshop.intershop.service;

import com.someshop.intershop.dto.PasswordDto;
import com.someshop.intershop.dto.UserDto;
import com.someshop.intershop.dto.UserListDto;
import com.someshop.intershop.model.Shop;
import com.someshop.intershop.model.User;
import com.someshop.intershop.security.UserPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface UserService extends UserDetailsService {
    String create (Map<String, String> from, MultipartFile file) throws IOException;
    Boolean changePassword (User profileUser, Map<String, String> form);
    void delete (User user);
    List<UserListDto> findAll ();
    User findById (String id);
    User changeInfo (User profileUser, Map<String, String> form, MultipartFile file);
    ResponseEntity<?> setActive (User user);
    ResponseEntity<?> getCurrentUser (UserPrincipal user);
    ResponseEntity<?> setRole (User user, String role);
    ResponseEntity<?> registerNewUser(User user);
    ResponseEntity<?> getProfilesByKeyword(String keyword);
    ResponseEntity<?> getProfiles();
    ResponseEntity<?> getProfile(User user);
    ResponseEntity<?> updateProfile(User oldUser, UserDto newUser);
    ResponseEntity<?> updatePassword(User user, PasswordDto passwordDto);
    void setPhotoProfile (MultipartFile file, User user);
    void deletePhotoProfile (User user);
}
