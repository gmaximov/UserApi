import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';

import { personsActions } from '../../modules/persons/persons.actions';
import { alertActions } from '../../modules/alerts/alert.actions';

class PersonEditPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            person: null,
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
            person: this.props.persons.item
        });
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
            this.props.edit(person);
        }
    }

    render() {
        const { loading } = this.props;
        const { person, submitted } = this.state;
        return (
            <div className="col-md-12 col-md-offset-3">
                {loading && <em>Loading persons...</em>}
                {person &&
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="inn">INN</label>
                        <input type="text" className={'form-control' + (submitted && !person.inn ? ' is-invalid' : '')} name="inn" value={person.inn} maxLength="12" onChange={this.handleChange} readOnly/>
                            {submitted && !person.inn &&
                                <div className="invalid-feedback">INN is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="shortName">Short Name</label>
                        <input type="text" className={'form-control' + (submitted && !person.shortName ? ' is-invalid' : '')} name="shortName" value={person.shortName} maxLength="50" onChange={this.handleChange} readOnly/>
                            {submitted && !person.shortName &&
                                <div className="invalid-feedback">Short Name is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name</label>
                        <input type="textarea" className={'form-control' + (submitted && !person.fullName ? ' is-invalid' : '')} name="fullName" value={person.fullName} maxLength="4000" onChange={this.handleChange} readOnly/>
                            {submitted && !person.fullName &&
                                <div className="invalid-feedback">Full Name is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="adress">Adress</label>
                        <input type="text" className="form-control" name="adress" value={person.adress} maxLength="200" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                        <input type="text" className="form-control" name="phoneNumber" value={person.phoneNumber} maxLength="200" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="chiefFIO">Chief Name</label>
                        <input type="text" className="form-control" name="chiefFIO" value={person.chiefFIO} maxLength="200" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="login">Member</label>
                        <input type="textarea" className="form-control" name="member" value={person.member} maxLength="4000" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="memberPhoneNumber">Member Phone Number</label>
                        <input type="text" className="form-control" name="memberPhoneNumber" value={person.memberPhoneNumber} maxLength="200" onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            {
                                (person.updating && <Spinner color="primary" />) ||
                            <div className="form-group">
                                <div className="row justify-content-between">
                                        <Link to="/persons" className="btn btn-link">Back</Link>
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
    const { persons } = state;
    return { persons };
}

const actionCreators = {
    get: personsActions.get,
    edit: personsActions.update,
    error: alertActions.error
}

const connectedPersonEditPage = connect(mapState, actionCreators)(PersonEditPage);
export { connectedPersonEditPage as PersonEditPage };