var Dashboard = require("./Dashboard");
var Navbar = require("./Navbar");


class Main extends React.Component {
    render(){
        return (
            <div>
                <Navbar />
                <div id='body'>
                    <Dashboard />
                </div>
            </div>
        )
    }
}

module.exports = Main;