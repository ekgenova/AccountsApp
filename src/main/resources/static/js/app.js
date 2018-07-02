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
            <div className="navbar">
                <a href="#" onClick={this.Dashboard}>AccountsApp</a>
                <a href="#" onClick={this.Dashboard}>Dashboard</a>
            <div className="dropdown">
                    <button className="dropbtn" type="button" data-toggle="collapse" data-target="#dropdown-content" aria-controls="dropdown-content" aria-expanded="false">Accounts
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="dropdown-content">
                        <a href="#" >View Accounts</a>
                        <a href="#" onClick={this.AddAccounts}>Add Account</a>
                        <a href="#">Delete Account</a>
                    </div>
            </div>
            </div>
        );
    }
});

const Dashboard = React.createClass({
    render: function () {
        return (
            <h1>Welcome to the Dashboard</h1>
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
    accountNumberChange: function(e) {
        this.setState({
            accountNumber: parseInt(e.target.value)
        })
    },

    render: function () {
        return (
            <div className="container">
                <form>
                    <div className="form-group">
                        <label htmlFor="inputFName">First Name</label>
                        <input type="text" className="form-control" id="inputFName" placeholder="First name" onChange={this.nameChange} val={this.state.firstName}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputLName">Last Name</label>
                        <input type="text" className="form-control" id="inputLName" placeholder="Last name" onChange={this.lastChange} val={this.state.lastName}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAccountNum">Account Number</label>
                        <input type="text" className="form-control" id="inputAccountNumber" placeholder="Account Number" onChange={this.accountNumberChange} val={this.state.accountNumber}/>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
});

ReactDOM.render(
    <Main/>, document.getElementById('nav')
);
