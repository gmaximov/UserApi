import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';

import { personsActions } from '../../modules/persons/persons.actions';
import { alertActions } from '../../modules/alerts/alert.actions';

class PersonAddPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            person: {},
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { person } = this.state;
        this.setState({
            person: {
                ...person,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { person } = this.state;
        if (person.inn && person.shortName && person.fullName) {
            this.props.add(person);
        }
    }

    render() {
        const { person, submitted } = this.state;
        return (
            <div className="col-md-12 col-md-offset-3">
                {person &&
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="inn">INN</label>
                            <input type="text" className={'form-control' + (submitted && !person.inn ? ' is-invalid' : '')} name="inn" maxLength="12" onChange={this.handleChange} />
                            {submitted && !person.inn &&
                                <div className="invalid-feedback">INN is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="shortName">Short Name</label>
                            <input type="text" className={'form-control' + (submitted && !person.shortName ? ' is-invalid' : '')} name="shortName" maxLength="50" onChange={this.handleChange} />
                            {submitted && !person.shortName &&
                                <div className="invalid-feedback">Short Name is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                            <textarea className={'form-control' + (submitted && !person.fullName ? ' is-invalid' : '')} name="fullName" maxLength="4000" onChange={this.handleChange} />
                            {submitted && !person.fullName &&
                                <div className="invalid-feedback">Full Name is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="adress">Adress</label>
                            <input type="text" className="form-control" name="adress" maxLength="200" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input type="text" className="form-control" name="phoneNumber" maxLength="200" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="chiefFIO">Chief Name</label>
                            <input type="text" className="form-control" name="chiefFIO" maxLength="200" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="login">Member</label>
                            <textarea className="form-control" name="member" maxLength="4000" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="memberPhoneNumber">Member Phone Number</label>
                            <input type="text" className="form-control" name="memberPhoneNumber" maxLength="200" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            {
                                (person.adding && <Spinner color="primary" />) ||
                                <div className="form-group">
                                    <div className="row justify-content-between">
                                        <Link to="/persons" className="btn btn-link">Back</Link>
                                        <button className="btn btn-success">Create</button>
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
    const { persons } = state;
    return { persons };
}

const actionCreators = {
    add: personsActions.add,
    error: alertActions.error
}

const connectedPersonAddPage = connect(mapState, actionCreators)(PersonAddPage);
export { connectedPersonAddPage as PersonAddPage };