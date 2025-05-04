package com.bd2_team6.biteright.entities.user;
import org.springframework.data.repository.CrudRepository;

import java.io.Serializable;


public interface UserRepository extends CrudRepository< User , Serializable> {
    User findByUsername(String username);
    User findByEmail(String email);
}
