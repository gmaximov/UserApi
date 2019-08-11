import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class HomePage extends React.Component {
    render() {
        const { user } = this.props;
        return (
            <div className="col-md-8">
                <h1>Hi {user.name}!</h1>
                <p><Link to="/login">Logout</Link></p>
                <h3>All registered users:</h3>
            </div>
        );
    }
}

function mapState(state) {
    const { authentication } = state;
    const { user } = authentication;
    return { user };
}

const connectedHomePage = connect(mapState)(HomePage);
export { connectedHomePage as HomePage };