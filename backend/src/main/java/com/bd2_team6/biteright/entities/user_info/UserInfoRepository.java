package com.bd2_team6.biteright.entities.user_info;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UserInfoRepository extends CrudRepository<UserInfo, Integer>{
    
}
