import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../modules/users/users.actions';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

class UserListPage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }
    render() {
        const { users } = this.props;
        const columns = [
            {
                dataField: 'name',
                text: 'Name',
                formatter: (cell, row) => {
                    return <Link to={`/users/edit/${row.id}`} className="btn btn-link">{cell}</Link>
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
        console.log(this.props);
        return (
            <div className="col-md-12">
                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.items &&
                    <BootstrapTable
                    keyField="id"
                    data={users.items}
                    columns={columns}
                    pagination={paginationFactory()}
                    bootstrap4
                    hover
                    condensed
                    />
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
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedUserListPage = connect(mapState, actionCreators)(UserListPage);
export { connectedUserListPage as UserListPage };