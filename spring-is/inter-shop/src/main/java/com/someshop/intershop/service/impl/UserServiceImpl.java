package com.someshop.intershop.service.impl;

import com.someshop.intershop.dto.PasswordDto;
import com.someshop.intershop.dto.UserDto;
import com.someshop.intershop.dto.UserListDto;
import com.someshop.intershop.exception.BadRequestException;
import com.someshop.intershop.exception.ResourceNotFoundException;
import com.someshop.intershop.model.AuthProvider;
import com.someshop.intershop.model.BankCard;
import com.someshop.intershop.model.Role;
import com.someshop.intershop.model.User;
import com.someshop.intershop.payload.ApiResponse;
import com.someshop.intershop.repository.BankCardRepository;
import com.someshop.intershop.repository.UserRepository;
import com.someshop.intershop.security.UserPrincipal;
import com.someshop.intershop.service.FileService;
import com.someshop.intershop.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.*;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FileService fileService;

    @Autowired
    private BankCardRepository bankCardRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${noImageUrl}")
    private String noImageUrl;

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return /*userRepository.findByEmail(s)*/ null;
    }


    public String create (Map<String, String> form, MultipartFile file) throws IOException {
        if(userRepository.findByEmail(form.get("email")) != null)
            return "User exists";
        User user = new User(form.get("firstName"),
                form.get("lastName"),
                form.get("email"),
                form.get("password"),
                true,
                Collections.singleton(Role.valueOf(form.get("role"))),
                fileService.uploadToS3(file));
        userRepository.save(user);
        BankCard bankCard = new BankCard(form.get("numberCard"),
                form.get("firstNameCard").toUpperCase(),
                form.get("lastNameCard").toUpperCase(),
                form.get("monthCard"),
                form.get("yearCard"),
                user,
                true);
        bankCardRepository.save(bankCard);
        user.getCards().add(bankCard);
        userRepository.save(user);
        return "Success";
    }

    @Override
    public Boolean changePassword(User profileUser, Map<String, String> form) {
        if (profileUser.getPassword().equals(form.get("currentPassword"))) {
            profileUser.setPassword(form.get("password"));
            profileUser.setPassword(form.get("password"));
            userRepository.save(profileUser);
            return true;
        } else return false;
    }

    @Override
    public User changeInfo(User profileUser, Map<String, String> form, MultipartFile file) {
        return null;
    }

    @Override
    public ResponseEntity<?> registerNewUser(User newUser) {
        if(userRepository.existsByEmail(newUser.getEmail())) {
            throw new BadRequestException("Email address already in use.");
        }
        User user = new User();
        user.setFirstName(newUser.getFirstName());
        user.setLastName(newUser.getLastName());
        user.setEmail(newUser.getEmail());
        user.setPassword(newUser.getPassword());
        user.setProvider(AuthProvider.local);
        user.setActive(true);
        user.setPhotoURL(noImageUrl);
        user.setRoles(newUser.getRoles());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user = userRepository.save(user);
        for (BankCard card : newUser.getCards()) {
            card.setOwner(user);
            card.setActive(true);
            card.setFirstNameCard(card.getFirstNameCard().toUpperCase());
            card.setLastNameCard(card.getLastNameCard().toUpperCase());
        }
        user.setCards(newUser.getCards());
        user = userRepository.save(user);
        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/user/me")
                .buildAndExpand(user.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "User registered successfully@"));
    }

    @Override
    public ResponseEntity<?> getProfilesByKeyword(String keyword) {
        if (keyword.equals("")) return getProfiles();
        List <UserListDto> userListDtos = new ArrayList<>();
        for (User user : userRepository.findAllByKeyword("%" + keyword + "%")) {
            userListDtos.add(new UserListDto(
                    user.getId(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getPhotoURL()
            ));
        }
        return new ResponseEntity<>(userListDtos, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> getProfiles() {
        List<UserListDto> userListDtos = new ArrayList<>();
        for (User user : userRepository.findAll()) {
            userListDtos.add(new UserListDto(
                    user.getId(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getPhotoURL()
            ));
        }
        return new ResponseEntity<>(userListDtos, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> getProfile(User user) {
        User userFromDb = userRepository.findById(user.getId().toString());
        UserDto userDto = new UserDto(
                userFromDb.getId(),
                userFromDb.getFirstName(),
                userFromDb.getLastName(),
                userFromDb.getPhotoURL(),
                userFromDb.getEmail(),
                userFromDb.getRoles().toArray()[0].toString(),
                userFromDb.isActive(),
                userFromDb.getProvider().toString()
        );
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> updateProfile(User oldUser, UserDto newUser) {
        Optional<User> optionalUser = userRepository.findByEmail(newUser.getEmail());
        if (optionalUser.isPresent()) {
            if(!optionalUser.get().getId().equals(oldUser.getId())) {
                throw new BadRequestException("Email address already in use.");
            }
        }
        oldUser.setFirstName(newUser.getFirstName());
        oldUser.setLastName(newUser.getLastName());
        oldUser.setEmail(newUser.getEmail());
        User savedUser = userRepository.save(oldUser);
        return new ResponseEntity<>(new UserDto(
                savedUser.getId(),
                savedUser.getFirstName(),
                savedUser.getLastName(),
                savedUser.getPhotoURL(),
                savedUser.getEmail(),
                savedUser.getRoles().toArray()[0].toString(),
                savedUser.isActive(),
                savedUser.getProvider().toString()
        ), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> updatePassword(User user, PasswordDto passwordDto) {
        if (passwordDto.getNewPassword().equals(passwordDto.getConfirmPassword())) {
            if (!passwordEncoder.encode(passwordDto.getCurrentPassword()).equals(user.getPassword())) {
                user.setPassword(passwordEncoder.encode(passwordDto.getNewPassword()));
                userRepository.save(user);
                return new ResponseEntity<>("Okay", HttpStatus.OK);
            } else return new ResponseEntity<>("Current password incorrect", HttpStatus.BAD_REQUEST);
        } else return new ResponseEntity<>("Passwords do not match", HttpStatus.BAD_REQUEST);
    }

    @Override
    public void setPhotoProfile(MultipartFile file, User user) {
        try {
            fileService.deleteFromS3(user.getPhotoURL());
            user.setPhotoURL(fileService.uploadToS3(file));
            userRepository.save(user);
        } catch (IOException e) { e.printStackTrace(); }
    }

    @Override
    public void deletePhotoProfile(User user) {
        fileService.deleteFromS3(user.getPhotoURL());
        user.setPhotoURL(noImageUrl);
        userRepository.save(user);
    }

    @Override
    public ResponseEntity<?> setRole (User user, String role) {
        user.getRoles().clear();
        user.getRoles().add(Role.valueOf(role));
        User newUser = userRepository.save(user);
        UserDto userDto = new UserDto(
                newUser.getId(),
                newUser.getFirstName(),
                newUser.getLastName(),
                newUser.getPhotoURL(),
                newUser.getEmail(),
                newUser.getRoles().toArray()[0].toString(),
                newUser.isActive(),
                newUser.getProvider().toString()
        );
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> setActive (User user) {
        user.setActive(!user.isActive());
        User newUser = userRepository.save(user);
        UserDto userDto = new UserDto(
                newUser.getId(),
                newUser.getFirstName(),
                newUser.getLastName(),
                newUser.getPhotoURL(),
                newUser.getEmail(),
                newUser.getRoles().toArray()[0].toString(),
                newUser.isActive(),
                newUser.getProvider().toString()
        );
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> getCurrentUser(UserPrincipal user) {
        User userFromDb = userRepository.findById(user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", user.getId()));
        return new ResponseEntity<>(new UserDto(
                userFromDb.getId(),
                userFromDb.getFirstName(),
                userFromDb.getLastName(),
                userFromDb.getPhotoURL(),
                userFromDb.getEmail(),
                userFromDb.getRoles().toArray()[0].toString(),
                userFromDb.isActive(),
                userFromDb.getProvider().toString()
        ), HttpStatus.OK);
    }

    public void delete (User user) {
        userRepository.delete(userRepository.findById(user.getId().toString()));
    }

    @Override
    public List<UserListDto> findAll() {
        List<UserListDto> userListDtos = new LinkedList<>();
        for (User user : userRepository.findAll()) {
            userListDtos.add(new UserListDto(user.getId(), user.getFirstName(), user.getLastName(), user.getPhotoURL()));
        }
        return userListDtos;
    }

    @Override
    public User findById(String id) {
        return userRepository.findById(id);
    }
}
