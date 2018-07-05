package com.indivkate.accountsapp.constants;

public interface Constants {

    static final String USERS = "/db";
    static final String GET_ALL_USERS ="/list";
    static final String SEARCH_FIRST_NAME = "/search/firstname/{partial}";
    static final String SEARCH_LAST_NAME = "/search/lastname/{partial}";
    static final String SEARCH_USERNAME = "/search/accountnumber/{exact}";
    static final String CREATE_USER = "/add";
    static final String UPDATE_USER = "/update/{exact}";
    static final String DELETE_USER = "/delete";

}
