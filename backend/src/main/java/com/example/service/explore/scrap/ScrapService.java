package com.example.service.explore.scrap;

import com.example.service.explore.resource.Resource;
import com.example.service.explore.resource.ResourceService;
import com.example.service.user.User;
import com.example.service.user.UserService;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class ScrapService {

    private final ScrapRepository scrapRepository;
    private final UserService userService;
    private final ResourceService resourceService;

    public ScrapService(
            ScrapRepository scrapRepository, UserService userService, ResourceService resourceService) {
        this.scrapRepository = scrapRepository;
        this.userService = userService;
        this.resourceService = resourceService;
    }

    public List<Scrap> findByUser(Long userId) {
        return scrapRepository.findByUserId(userId);
    }

    @Transactional
    public Scrap create(Long userId, Long resourceId, String note) {
        User user = userService.findById(userId);
        Resource resource = resourceService.findById(resourceId);

        Scrap scrap = Scrap.builder()
                .user(user)
                .resource(resource)
                .note(note)
                .build();
        return scrapRepository.save(scrap);
    }
}

