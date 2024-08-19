import React, { useMemo, useState, useEffect } from 'react';
import TableContainer from '../../../Components/Common/TableContainerReactTable';
import { Link } from 'react-router-dom';
import ChangeStatus from '../../../Components/Common/ChangeStatus';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import DeleteModal from '../../../Components/Common/DeleteModal';
import Loader from '../../../Components/Common/Loader';
import { getUsers, deleteUser, changeStatusUser } from '../../../actions/user';
import { Capitalize } from '../../../helpers/common_functions';

const DataTable = ({ getUsers, deleteUser, changeStatusUser, user: { users, loading } }) => {

  const [id, setId] = useState(null);
  const searchTable = [];
  const [deleteModal, setDeleteModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [selectedSingle, setSelectedSingle] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);


  users.forEach(row => searchTable.push({
    id: row._id,
    name: row.name,
    email: row.email,
    mobile: row.mobile,
    action: [row._id, row.status],
    avatar: row.avatar,
    status: row.status,
    created: moment(row.created).format('MMMM Do YYYY, HH:mm:ss')
  }));



  function tog_grid(data) {
    setStatusModal(true);
    setSelectedSingle(Capitalize(data[1]));
    setId(data[0]);
  }


  function tog_center(id) {
    setDeleteModal(true);
    setId(id);
  }

  const handleDelete = () => {
    deleteUser(id);
    setDeleteModal(false);

  }


  function handleSelectSingle(selectedSingle) {
    setSelectedSingle(selectedSingle.value);
    console.log(selectedSingle);

  }
  const handleChageStatus = () => {
    changeStatusUser(id, selectedSingle);
    setStatusModal(false);
  }

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' }
  ];


  const columns = useMemo(
    () => [
      {

        header: "Created On",
        cell: (cell) => {
          return (
            <span className="">{cell.getValue()}</span>
          );
        },
        accessorKey: "created",
        enableColumnFilter: false,
      },
      {
        header: "Name",
        accessorKey: "name",
        enableColumnFilter: false,
      },

      {
        header: "Email",
        accessorKey: "email",
        enableColumnFilter: false,
      },
      {
        header: "Mobile",
        accessorKey: "mobile",
        enableColumnFilter: false,
      },

      {
        header: "Status",
        accessorKey: "status",
        enableColumnFilter: false,
        cell: (cell) => {
          switch (cell.getValue()) {
            case "active":
              return <span className="badge text-uppercase bg-success-subtle text-success"> {cell.getValue()} </span>;
            case "Inactive":
              return <span className="badge text-uppercase bg-danger-subtle text-danger"> {cell.getValue()} </span>;
            default:
              return <span className="badge text-uppercase bg-info-subtle text-info"> {cell.getValue()} </span>;
          }
        }
      },
      {
        header: "Action",
        accessorKey: "action",
        enableColumnFilter: false,

        cell: (cell) => {
          return (
            <div>
              <Link onClick={() => tog_grid(cell.getValue())} to='#' className="btn btn-sm btn-info"><i className='las la-exchange-alt'></i></Link>&nbsp;&nbsp;
              <Link to={`/edit/user/${cell.getValue()[0]}`} className="btn btn-sm btn-warning"><i className='las la-pen'></i></Link>&nbsp;&nbsp;
              {/* <Link onClick={() => tog_center(cell.getValue())} to='#' className="btn btn-sm btn-danger"><i className='las la-trash-alt'></i></Link> */}
            </div>
          );
        },
      },
    ],
    []
  );


  return (
    <React.Fragment >
      {loading ? (
        <Loader />
      ) : (
        <TableContainer
          columns={(columns || [])}
          data={(searchTable || [])}
          isGlobalFilter={true}
          customPageSize={(searchTable.length < process.env.LIMIT) ? searchTable.length : process.env.LIMIT}
          SearchPlaceholder='Search...'
        />
      )}
      <DeleteModal
        show={deleteModal}
        onCloseClick={() => setDeleteModal(false)}
        onDeleteClick={handleDelete}
      />

      <ChangeStatus
        show={statusModal}
        onCloseClick={() => setStatusModal(false)}
        onClick={handleChageStatus}
        statusOptions={statusOptions}
        selectedSingle={selectedSingle}
        handleSelectSingle={handleSelectSingle}
      />
    </React.Fragment >


  );
};




DataTable.propTypes = {
  getUsers: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  changeStatusUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, { getUsers, deleteUser, changeStatusUser })(DataTable);