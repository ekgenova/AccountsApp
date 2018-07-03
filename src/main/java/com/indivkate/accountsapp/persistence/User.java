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
    private String userFirstName;

    @Column
    private String userLastName;

    @Column
    private String imgUrl;

    public Integer getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public String getUserFirstName() {
        return userFirstName;
    }

    public String getUserLastName() {
        return userLastName;
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

    public void setUserFirstName(String userFirstName) {
        this.userFirstName = userFirstName;
    }

    public void setUserLastName(String userLastName) {
        this.userLastName = userLastName;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    protected User(){

    }

    public User(String userFirstName, String userLastName, String username){
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
        this.username = username;
    }

    public User(String userFirstName, String userLastName, String username, String imgUrl){
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
        this.username = username;
        this.imgUrl = imgUrl;
    }
}
