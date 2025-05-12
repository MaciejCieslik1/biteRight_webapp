package com.bd2_team6.biteright.user;

import com.bd2_team6.biteright.entities.user.User;
import com.bd2_team6.biteright.entities.user.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
public class UserTests {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void shouldSaveUser() {
        User user = new User("john_doe", "john@example.com", "hashed_password", "USER");
        userRepository.save(user);

        User foundUser = userRepository.findById(user.getId()).orElse(null);
        assertNotNull(foundUser);
        assertEquals(user.getUsername(), foundUser.getUsername());
        assertEquals(user.getEmail(), foundUser.getEmail());
        assertEquals(user.getPasswordHash(), foundUser.getPasswordHash());
        assertEquals(user.getType(), foundUser.getType());
    }

    @Test
    public void shouldUpdateUser() {
        User user = new User("john_doe", "john@example.com", "hashed_password", "USER");
        userRepository.save(user);

        user.setUsername("jane_doe");
        user.setEmail("jane@example.com");
        user.setPasswordHash("new_hashed_password");
        user.setType("ADMIN");
        userRepository.save(user);

        User updatedUser = userRepository.findById(user.getId()).orElse(null);
        assertNotNull(updatedUser);
        assertEquals("jane_doe", updatedUser.getUsername());
        assertEquals("jane@example.com", updatedUser.getEmail());
        assertEquals("new_hashed_password", updatedUser.getPasswordHash());
        assertEquals("ADMIN", updatedUser.getType());
    }

    @Test
    public void shouldDeleteUser() {
        User user = new User("john_doe", "john@example.com", "hashed_password", "USER");
        userRepository.save(user);

        userRepository.delete(user);

        User deletedUser = userRepository.findById(user.getId()).orElse(null);
        assertNull(deletedUser);
    }
}
