

class User extends React.Component {

    constructor(){
        super();

        this.state = {
            display:true
        };

        this.handleDelete = this.handleDelete.bind(this);
    }

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
    }

    render(){
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
}

module.exports = User;