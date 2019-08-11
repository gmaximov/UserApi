import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';

import { userActions } from '../../modules/users/users.actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: '',
                login: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        if (user.name && user.login && user.password) {
            this.props.register(user);
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Register</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">First Name</label>
                        <input type="text" className={'form-control'+ (submitted && !user.name ? ' is-invalid' : '')} name="name" maxlength="30" value={user.name} onChange={this.handleChange} />
                        {submitted && !user.name &&
                            <div className="invalid-feedback">First Name is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="login">Username</label>
                        <input type="text" className={'form-control' + (submitted && !user.login ? ' is-invalid' : '')} name="login" maxlength="30" value={user.login} onChange={this.handleChange} />
                        {submitted && !user.login &&
                            <div className="invalid-feedback">Username is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className={'form-control' + (submitted && !user.password ? ' is-invalid' : '')} name="password" maxlength="30" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                            <div className="invalid-feedback">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        {
                            (registering && <Spinner color="primary" />) ||
                            <div className="form-group">
                                <button className="btn btn-primary">Register</button>
                                <Link to="/login" className="btn btn-link">Cancel</Link>
                            </div>
                        }
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };