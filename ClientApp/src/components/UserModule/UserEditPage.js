import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';

import { userActions } from '../../modules/users/users.actions';
import { alertActions } from '../../modules/alerts/alert.actions';

class UserEditPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            submitted: false
        };

        this.afterGet = this.afterGet.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        const id = this.props.match.params.id;

        if (!id) {
            this.props.error('Incorrect request');
        }
        this.props.get(id).then(() => this.afterGet());
    }
    afterGet() {
        this.setState({
            user: this.props.users.item
        });
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.name) {
            this.props.edit(user);
        }
    }

    render() {
        const { loading } = this.props.users;
        const { user, submitted } = this.state;
        return (
            <div className="col-md-12">
                {loading && <em>Loading users...</em>}
                {user &&
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="login">Username</label>
                        <input type="text" className={'form-control' + (submitted && !user.login ? ' is-invalid' : '')} name="login" maxLength="30" value={user.login} readOnly />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">First Name</label>
                        <input type="text" className={'form-control' + (submitted && !user.name ? ' is-invalid' : '')} name="name" maxLength="30" value={user.name} onChange={this.handleChange} />
                            {submitted && !user.name &&
                                <div className="invalid-feedback">First Name is required</div>
                            }
                        </div>
                        <div className="form-group">
                            {
                            (user.updating && <Spinner color="primary" />) ||
                            <div className="form-group">
                                <div className="row justify-content-between">
                                    <Link to="/users" className="btn btn-link">Back</Link>
                                    <button className="btn btn-primary">Save</button>
                                </div>
                            </div>
                            }
                        </div>
                    </form>
                }
                
            </div>
        );
    }
}

function mapState(state) {
    const { users } = state;
    return { users };
}

const actionCreators = {
    get: userActions.get,
    edit: userActions.update,
    error: alertActions.error
}

const connectedUserEditPage = connect(mapState, actionCreators)(UserEditPage);
export { connectedUserEditPage as UserEditPage };