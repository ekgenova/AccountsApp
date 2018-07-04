var User = require("./User");


class UserTable extends React.Component {
    constructor(){
        super();
    }

    render() {
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
}

module.exports = UserTable;