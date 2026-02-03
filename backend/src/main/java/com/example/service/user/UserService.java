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

    public User findByEmail(String email) {
        if (email == null) {
            throw new CustomException("User not found", HttpStatus.NOT_FOUND);
        }
        String normalized = email.trim().toLowerCase();
        return userRepository.findByEmailIgnoreCase(normalized)
                .or(() -> userRepository.findByEmail(normalized))
                .orElseThrow(() -> new CustomException("User not found", HttpStatus.NOT_FOUND));
    }

    @Transactional
    public User create(User user) {
        if (user.getEmail() == null || user.getEmail().isBlank()) {
            throw new CustomException("Email is required", HttpStatus.BAD_REQUEST);
        }
        String normalizedEmail = user.getEmail().trim().toLowerCase();
        if (userRepository.findByEmailIgnoreCase(normalizedEmail).isPresent()) {
            throw new CustomException("Email already exists", HttpStatus.CONFLICT);
        }
        user.setEmail(normalizedEmail);
        if (user.getDisplayName() != null) {
            user.setDisplayName(user.getDisplayName().trim());
        }
        return userRepository.save(user);
    }
}
