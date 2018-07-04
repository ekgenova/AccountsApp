import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class Add extends React.Component {

    constructor(){
        super();

        this.state = {};

        this.nameChange = this.nameChange.bind(this);
        this.lastChange = this.lastChange.bind(this);
        this.usernameChange = this.usernameChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    nameChange(e) {
        this.setState({
            firstName: e.target.value
        })
    }

    lastChange(e) {
        this.setState({
            lastName: e.target.value
        })
    }

    usernameChange(e) {
        this.setState({
            username: e.target.value
        })
    }

    submit(e){
        e.preventDefault();

        const info = {
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "username": this.state.username
        };

        e.target.reset();

        const jsonInfo = JSON.stringify(info);

        const settings = {
            "async":true,
            "crossDomain":true,
            "url": "db/add",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "7583589c-5a8a-9fa1-a6c1-cce43c23293d"
            },
            "processData": false,
            "data": jsonInfo
        };

        $.ajax(settings)
            .done(function (data) {
                console.log("Success!")
            })
            .fail(function(jqXhr){
                console.log("info: " + info);
                console.log("Failed to register!");
            });
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.submit}>
                    <div className="form-group">
                        <label htmlFor="inputFName">First Name</label>
                        <input type="text" className="form-control" id="inputFName" placeholder="First name" onChange={this.nameChange} val={this.state.firstName}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputLName">Last Name</label>
                        <input type="text" className="form-control" id="inputLName" placeholder="Last name" onChange={this.lastChange} val={this.state.lastName}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAccountNum">Username</label>
                        <input type="text" className="form-control" id="inputAccountNumber" placeholder="Username" onChange={this.usernameChange} val={this.state.username}/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}