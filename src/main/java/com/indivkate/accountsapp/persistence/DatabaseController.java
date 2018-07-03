package com.indivkate.accountsapp.persistence;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path="/db")
public class DatabaseController{

    @Autowired
    private UserRepository userRepository;

    @PostMapping(path="/add")
    public @ResponseBody String addNewUser (@RequestBody User user){
        userRepository.save(user);
        return "Added new user!";
    }

    @GetMapping(path="/list")
    public @ResponseBody Iterable<User> listAllUsers(){
        return userRepository.findAll();
    }

    @DeleteMapping(path="/delete")
    public @ResponseBody String deleteUser (@RequestBody User user){
        userRepository.delete(user);
        return "Deleted user!";
    }
}
