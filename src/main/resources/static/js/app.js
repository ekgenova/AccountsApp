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
                            <a className="dropdown-item" href="#">Delete Account</a>
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
            <h1 style={{textAlign:"center"}}>Welcome to the Dashboard</h1>
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
            .done(function (data) {
                console.log("Success!")
            })
            .fail(function(jqXhr){
                console.log("info: " + info);
                console.log("Failed to register!");
            });
    },

    render: function () {
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
    render: function () {
        var rows = [];
        this.props.users.forEach(function(user){
            rows.push(<User user={user}/>);
        });
        return (
            <div className="container">
                <table className="table table-striped">
                    <thead>
                    <tr>
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

let User = React.createClass({
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

    render: function(){
        if (!this.state.delete) {
            return (
                <tr>
                    <td>{this.props.user.firstName}</td>
                    <td>{this.props.user.lastName}</td>
                    <td>{this.props.user.username}</td>
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


ReactDOM.render(
    <Main/>, document.getElementById('root')
);
