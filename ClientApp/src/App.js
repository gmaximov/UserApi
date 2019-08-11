import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from './helpers/history';
import { alertActions } from './modules/alerts/alert.actions';
import { PrivateRoute } from './components/PrivateRoute';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/Auth/LoginPage';
import { RegisterPage } from './components/Auth/RegisterPage';
import { Layout } from './components/Layout';
import { UserListPage } from './components/UserModule/UserListPage';
import { UserEditPage } from './components/UserModule/UserEditPage';
import { PersonEditPage } from './components/PersonModule/PersonEditPage';
import { PersonListPage } from './components/PersonModule/PersonListPage';
import { PersonAddPage } from './components/PersonModule/PersonAddPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            this.props.clearAlerts();
        });
    }

    render() {
        const { alert } = this.props;
        console.log(alert);
        return (
            <Router history={history}>
                <Layout>
                    {alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div> }
                    <PrivateRoute exact path="/" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <PrivateRoute exact path="/users" component={UserListPage} />
                    <PrivateRoute path="/users/edit/:id" component={UserEditPage} />
                    <PrivateRoute exact path="/persons" component={PersonListPage} />
                    <PrivateRoute path="/persons/create" component={PersonAddPage} />
                    <PrivateRoute path="/persons/edit/:id" component={PersonEditPage} />
                </Layout>
            </Router>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };