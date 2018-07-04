var UserTable = require("./UserTable");


class View extends React.Component {

    constructor(){
        super();

        this.state = {
            users: []
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentDidMount(){
        this.loadUsersFromServer();
    }

    componentWillMount(){
        this.loadUsersFromServer();
    }

    static update(){
        self.loadUsersFromServer();
        this.render();
    }

    render(){
        console.log(this.state.users);
        return ( <UserTable users={this.state.users}/>);
    }
}

module.exports = View;

