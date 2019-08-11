import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';

import { userActions } from '../../modules/users/users.actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.logout();

        this.state = {
            login: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { login, password } = this.state;
        if (login && password) {
            this.props.login(login, password);
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { login, password, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="login">Username</label>
                        <input type="text" className={'form-control' + (submitted && !login ? ' is-invalid' : '')} name="login" maxlength="30" value={login} onChange={this.handleChange} />
                        {submitted && !login &&
                            <div className="invalid-feedback">Username is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className={'form-control' + (submitted && !password ? ' is-invalid' : '')} name="password" maxlength="30" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="invalid-feedback">Password is required</div>
                        }
                    </div>
                    {
                        (loggingIn && <Spinner color="primary" />) ||
                        <div className="form-group">
                            <button className="btn btn-primary">Login</button>
                            <Link to="/register" className="btn btn-link">Register</Link>
                        </div>
                    }
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login,
    logout: userActions.logout
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };