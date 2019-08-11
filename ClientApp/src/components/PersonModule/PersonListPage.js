import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { personsActions } from '../../modules/persons/persons.actions';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

class PersonListPage extends React.Component {
    componentDidMount() {
        this.props.getPersons();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deletePerson(id);
    }
    render() {
        const { persons } = this.props;
        const columns = [
            {
                dataField: 'shortName',
                text: 'Name',
                formatter: (cell, row) => {
                    return <Link to={`/persons/edit/${row.id}`} className="btn btn-link">{cell}</Link>
                }
            },
            {
                dataField: 'delete',
                isDummyField: true,
                text: 'Delete',
                headerStyle: () => {
                    return { width: "10%" };
                },
                formatter: (cell, row) => {
                    return <button type="button" className="btn btn-danger" onClick={this.handleDeleteUser(row.id)}>Delete</button>
                }
            }
        ];
        return (
            <div className="col-md-12">
                {persons.loading && <em>Loading persons...</em>}
                {persons.items &&
                    <div>

                    <div className="row justify-content-between">
                        <h3 >All persons:</h3>
                        <Link to="/persons/create"><button type="button" className="btn btn-success">Add +</button></Link>
                    </div> 
                    <div className="row">
                        <BootstrapTable
                            keyField="id"
                            data={persons.items}
                            columns={columns}
                            pagination={paginationFactory()}
                            bootstrap4
                            hover
                            condensed
                        />
                    </div>
                    </div>
                    
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
    getPersons: personsActions.getAll,
    deletePerson: personsActions.delete
}

const connectedPersonListPage = connect(mapState, actionCreators)(PersonListPage);
export { connectedPersonListPage as PersonListPage };