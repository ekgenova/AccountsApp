package com.indivkate.accountsapp.persistence;

import javax.persistence.*;

@Entity
public class User {

    @Column
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Integer userId;

    @Column
    private String username;

    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column
    private String imgUrl;

    public Integer getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    private User(){

    }

    public User(String userFirstName, String userLastName, String username){
        super();
        this.userId = userId;
        this.firstName = userFirstName;
        this.lastName = userLastName;
        this.username = username;
    }

//    public User(String userFirstName, String userLastName, String username, String imgUrl){
//        this.userFirstName = userFirstName;
//        this.userLastName = userLastName;
//        this.username = username;
//        this.imgUrl = imgUrl;
//    }

    @Override
    public String toString(){
        return "User{" + "id= " + userId + "username= " + username + ", first name= " + firstName +
                ", last name= " + lastName + " }";
    }
}
