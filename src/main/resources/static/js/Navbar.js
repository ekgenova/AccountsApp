var Dashboard = require("./Dashboard");
var View = require("./View");
var Add = require("./Add.js");

class Navbar extends React.Component {

    constructor(){
        super();

        this.dashboard = this.dashboard.bind(this);
        this.addAccounts = this.addAccounts.bind(this);
        this.viewAccounts = this.viewAccounts.bind(this);
    }

    dashboard() {
            ReactDOM.render(
                <Dashboard/>, document.getElementById("body")
            );
    }

    addAccounts() {
            ReactDOM.render(
                <Add/>, document.getElementById("body")
            );
    }

    viewAccounts() {
            ReactDOM.render(
                <View/>, document.getElementById("body")
            );
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#" onClick={this.Dashboard}>AccountsApp</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#" onClick={this.dashboard}>Dashboard</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Accounts
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="#" onClick={this.viewAccounts}>View Accounts</a>
                                <div className="dropdown-divider">?</div>
                                <a className="dropdown-item" href="#" onClick={this.addAccounts}>Add Account</a>
                                <a className="dropdown-item" href="#">Delete Account</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

module.exports = Navbar;