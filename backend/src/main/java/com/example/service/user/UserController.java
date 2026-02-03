package com.example.service.user;

import com.example.service.common.response.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ApiResponse<List<User>> findAll() {
        return ApiResponse.success(userService.findAll());
    }

    @GetMapping("/{id}")
    public ApiResponse<User> findOne(@PathVariable Long id) {
        return ApiResponse.success(userService.findById(id));
    }

    @GetMapping("/search")
    public ApiResponse<User> findByEmail(@RequestParam String email) {
        return ApiResponse.success(userService.findByEmail(email));
    }

    @PostMapping
    public ApiResponse<User> create(@Valid @RequestBody User user) {
        return ApiResponse.success(userService.create(user));
    }
}
