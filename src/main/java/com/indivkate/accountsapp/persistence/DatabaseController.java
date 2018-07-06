package com.indivkate.accountsapp.persistence;

import com.indivkate.accountsapp.constants.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping(value= Constants.USERS)
public class DatabaseController{

    @Autowired
    private UserRepository userRepository;

    @PostMapping(path= Constants.CREATE_USER)
    public @ResponseBody String addNewUser (@RequestBody User user){
        userRepository.save(user);
        return "Added new user!";
    }

    @GetMapping(path= Constants.GET_ALL_USERS)
    public @ResponseBody Iterable<User> listAllUsers(){
        return userRepository.findAll();
    }


    @DeleteMapping(path= Constants.DELETE_USER)
    public @ResponseBody String deleteUser (@RequestBody User user){
        userRepository.delete(user);
        return "Deleted user!";
    }

    @RequestMapping(value=Constants.SEARCH_ALL, method = RequestMethod.GET)
    public List<User> getAll(@PathVariable String partial){
        return userRepository.findByFirstName(partial);
    }
}
