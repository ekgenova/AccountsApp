package com.indivkate.accountsapp.persistence;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    List<User> findByFirstNameContainingIgnoreCaseOrderByUserId(String partial);
    List<User> findByFirstName(String partial);
}
