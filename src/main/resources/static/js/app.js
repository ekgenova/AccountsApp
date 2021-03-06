const Navbar = React.createClass({
    Dashboard() {
        ReactDOM.render(
            <Dashboard/>, document.getElementById("body")
        );
    },

    AddAccounts() {
        ReactDOM.render(
            <Add/>, document.getElementById("body")
        );
    },

    ViewAccounts() {
        ReactDOM.render(
            <View/>, document.getElementById("body")
        );
    },

    render: function () {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#" onClick={this.Dashboard}>AccountsApp</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#" onClick={this.Dashboard}>Dashboard</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Accounts
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#" onClick={this.ViewAccounts}>View Accounts</a>
                                <div className="dropdown-divider">?</div>
                                <a className="dropdown-item" href="#" onClick={this.AddAccounts}>Add Account</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
});

const Dashboard = React.createClass({
    render: function () {
        return (
            <div style={{textAlign: "center"}}>
                <br/>
                <h1 className="bg-dark text-white">Welcome to the Dashboard</h1>
                <br/>
                <h3 className="bg-dark text-white"> How to use this application:</h3>
                <br/>
                <h5 className="bg-primary text-white">View Accounts:</h5>
                <span className="text-body"> To view accounts that have been registered with the system visit:</span>
                <span className="text-info"> Accounts > View Accounts.</span>
                <span className="text-body"><br/>A list of all registered accounts will appear and you will be able to edit and delete accounts.</span><br/>
                <br/>
                <h5 className="bg-success text-white">Add Accounts:</h5>
                <span className="text-body">To add an account visit:</span>
                <span className="text-info"> Accounts > Add Account.</span>
                <span className="text-body"><br/>From there provide the required information and press <span className="bg-primary text-white">Submit</span></span>
                <span className="text-body"> <br/>As long as it matches the requirements you will be alerted to the account </span>
                <span className="text-success">being added successfully.</span>
                <br/><br/>
                <h5 className="bg-warning text-white">Edit Accounts:</h5>
                <span className="text-body">To edit an account press the <span className="bg-warning text-white">Edit</span> button on the account you wish to edit.</span>
                <span className="text-body">After making the changes needed press <span className="bg-primary text-white">Save</span> and then close the page.</span>
                <br/><br/>
                <h5 className="bg-danger text-white">Delete Accounts:</h5>
                <span className="text-body">To delete an account press the <span className="bg-danger text-white">Delete</span> button on the account you wish to delete.</span>
            </div>
        );
    }
});


const Main = React.createClass({
    render: function(){
        return (
            <div>
                <Navbar />
                <div id='body'>
                    <Dashboard />
                </div>
            </div>
        )
    }
});

const Add = React.createClass({
    getInitialState: function() {
        return {}
    },

    nameChange: function(e) {
        this.setState({
            firstName: e.target.value
        })
    },
    lastChange: function(e) {
        this.setState({
            lastName: e.target.value
        })
    },
    usernameChange: function(e) {
        this.setState({
            username: e.target.value
        })
    },

    submit: function(e){
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
            .done(function (info) {
                console.log("Success!");
                alert("Success!");
            })
            .fail(function(jqXhr){
                console.log("info: " + info);
                console.log("Failed to register!");
                alert("Failed to register!");
            });
    },

    render: function () {
        return (
            <div className="container">
                <form onSubmit={this.submit}>
                    <div className="form-group">
                        <label htmlFor="inputFName">First Name</label>
                        <input type="text" className="form-control" id="inputFName" placeholder="First names: no spaces at start/end, no numbers" onChange={this.nameChange} val={this.state.firstName} required={true} pattern="(([A-z]+\s){0,}([A-z]+))"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputLName">Last Name</label>
                        <input type="text" className="form-control" id="inputLName" placeholder="Last names: no spaces at start/end, no numbers" onChange={this.lastChange} val={this.state.lastName} required={true} pattern="(([A-z]+\s){0,}([A-z]+))"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAccountNum">Username</label>
                        <input type="text" className="form-control" id="inputUsername" placeholder="Username: only letters/numbers allowed" onChange={this.usernameChange} val={this.state.username} required={true} pattern="[A-z]+\d+"/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
});

// let USERS = [
//     {firstName: 'Ekaterina', lastName: 'Genova', username: 'sasohina'}
// ];

const View = React.createClass({
    loadUsersFromServer: function () {
        const self = this;
        $.ajax({
            url: "http://localhost:8080/db/list"
        }).then(function(data){
            self.setState({users:data});
        });
    },

    getInitialState: function(){
        return {users: []};
    },

    componentDidMount: function(){
        this.loadUsersFromServer();
    },

    componentWillMount: function(){
        this.loadUsersFromServer();
    },

    statics: {
        update: function(){
            self.loadUsersFromServer();
            this.render();
        }
    },

    render(){
        console.log(this.state.users);
        return ( <UserTable users={this.state.users}/>);
    }

});

const UserTable = React.createClass({

    search: function(){
        console.log(document.getElementById("search").value);
        if (document.getElementById("search").value === false){
            var url="http://localhost:8080/db/list";
        } else {
            var url="http://localhost:8080/db/search/all/" + document.getElementById("search").value;
        }
        console.log(url);
        $.ajax({
            url: url
        }).then(function(data){
            data.sort((a,b) => (a.userId) - (b.userId));
            this.setState({users: data});
            this.render();
        });
    },

    render: function () {
        var rows = [];
        this.props.users.forEach(function(user){
            rows.push(<User user={user}/>);
        });
        return (
            <div className="container">
                <br/>
                <br/>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="input-group">
                            <span className="text-body">Search:</span><input type="text" id="search" className="form-control" aria-label="..." placeholder="not working..." onChange={this.search}/>
                        </div>
                    </div>
                </div>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Username</th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
    );
    }

});

const User = React.createClass({
    getInitialState: function(){
        return {display: true};
    },

    handleDelete(){
        const self = this;
        $.ajax({
            "url": "http://localhost:8080/db/delete",
            type: 'DELETE',
            data: JSON.stringify(self.props.user),
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "c7bb89b4-2b6c-3cdb-cd22-86fdba25c43c"
            },
            "processData": false,
            success: function(result) {
                // self.setState({display: false});
                self.setState({delete: true});
            },
            error: function(xhr, ajaxOptions, thrownError) {
                toastr.error(xhr.responseJSON.message);
            }
        })
    },

    reRender: function(userId, firstName, lastName, username) {
        this.props.user.userId = userId;
        this.props.user.firstName = firstName;
        this.props.user.lastName = lastName;
        this.props.user.username = username;
        this.forceUpdate();
    },

    render: function(){
        if (!this.state.delete) {
            return (
                <tr>
                    <td>{this.props.user.userId}</td>
                    <td>{this.props.user.firstName}</td>
                    <td>{this.props.user.lastName}</td>
                    <td>{this.props.user.username}</td>
                    <td>
                        <Modal user={this.props.user} onClick={this.reRender}/>

                    </td>
                    <td>
                        <button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
                    </td>
                </tr>
            );
        } else {
            return null;
        }
    }
});

const Modal = React.createClass ({
    getInitialState: function() {
        return {
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            username: this.props.user.username
        }
    },

    renderOnClose: function(){
        var self = this;
        $.ajax ({
            url: "http://localhost:8080/db/list"
        }).then(function (info) {
            self.setState({users:info});
            ReactDOM.render(
                <UserTable users={self.state.users}/>, document.getElementById("body")
            );
        });
    },

    componentWillMount: function () {
        const id = "modal-" + this.props.user.userId;
        this.setState({id: id, dataTarget : "#" + id});
    },

    render: function () {
        return (
            <div>
                <button type="button" className="btn btn-warning" data-toggle="modal" data-target={this.state.dataTarget} onClick={this.updateProps}>
                    Edit
                </button>
            <div className="modal fade" id={this.state.id} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">Edit user</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <Edit user={this.props.user} onClick={this.props.onClick} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.renderOnClose}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
});

const Edit = React.createClass({
    getInitialState: function() {
        return {
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            username: this.props.user.username
        }
    },

    update: function () {
        this.state.firstName= this.props.state.firstName,
        this.state.lastName= this.props.state.lastName,
        this.state.username= this.props.state.username
    },

    reRender: function() {
        if (typeof this.props.onClick === "function" ) {
            this.props.onClick(this.props.user.firstName, this.props.user.lastName, this.props.user.username);
        }
    },

    nameChange: function (e) {
        this.setState({
            firstName: e.target.value
        })
    },

    lastChange: function (e){
        this.setState({
            lastName: e.target.value
        })
    },

    usernameChange: function (e) {
        this.setState({
            username: e.target.value
        })
    },

    submit: function (e){
        e.preventDefault();
        e.persist();

        console.log(this.props.user.userId);

        const data = {
            "firstName": this.state.firstName,
            "lastName": this.state.lastName,
            "username": this.state.username
        };

        if(typeof this.props.user.userId !== "undefined") data.userId = this.props.user.userId;


        const jsonData = JSON.stringify(data);

        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "db/add",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "7583589c-5a8a-9fa1-a6c1-cce43c23293d"
            },
            "processData": false,
            "data": jsonData
        };

        $.ajax(settings)
            .done(function(data) {
                console.log("Success!");
                alert("Edit saved!");
            })
            .fail(function(jqXhr) {
                console.log("data : " + data );
                console.log('Failed to edit!');
                alert("Failed to edit!");
            });
    },

    render: function () {
        return (
            <div className="container">
                <form onSubmit={this.submit}>
                    <div className="form-group">
                        <label htmlFor="inputFName">First Name</label>
                        <input type="text" className="form-control" id="inputFName" placeholder="First names: no spaces at start/end" onChange={this.nameChange} val={this.state.firstName} defaultValue={this.props.user.firstName} required={true} pattern="(([A-z]+\s){0,}([A-z]+))"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputLName">Last Name</label>
                        <input type="text" className="form-control" id="inputLName" placeholder="Last names: no spaces at start/end" onChange={this.lastChange} val={this.state.lastName} defaultValue={this.props.user.lastName} required={true} pattern="(([A-z]+\s){0,}([A-z]+))"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputUsername">Username</label>
                        <input type="text" className="form-control" id="inputUsername" placeholder="Username: only letters and numbers allowed" onChange={this.usernameChange} val={this.state.username} defaultValue={this.props.user.username} required={true} pattern="[A-z]+\d+"/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary" reRenderParent={this.props.onClick}>Save</button>
                    </div>
                </form>
            </div>
        );
    }
});

ReactDOM.render(
    <Main/>, document.getElementById('root')
);
