package com.example.service.user;

import com.example.service.common.exception.CustomException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new CustomException("User not found", HttpStatus.NOT_FOUND));
    }

    @Transactional
    public User create(User user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new CustomException("Email already exists", HttpStatus.CONFLICT);
        }

        return userRepository.save(user);
    }
}
