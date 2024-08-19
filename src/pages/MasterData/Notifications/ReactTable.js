import React, { useMemo, useState, useEffect } from 'react';
import TableContainer from '../../../Components/Common/TableContainerReactTable';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from '../../../Components/Common/Loader';
import PropTypes from 'prop-types';
import ChangeStatus from '../../../Components/Common/ChangeStatus';
import moment from 'moment/moment';

import DeleteModal from "../../../Components/Common/DeleteModal";
import { changeStatusNotification, deleteNotification, getNotifications } from '../../../actions/notification';
import { Capitalize } from '../../../helpers/common_functions';

const DataTable = ({ changeStatusNotification, deleteNotification, getNotifications, notification: { notifications, loading } }) => {

  const [id, setId] = useState(null);
  const searchTable = [];
  const [deleteModal, setDeleteModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [selectedSingle, setSelectedSingle] = useState(null);

  useEffect(() => {
    getNotifications();
  }, []);


  notifications.forEach(row => searchTable.push({ id: row._id, category: row.categoryId.title, company: row.companyId.name, product: row.productId.name, title: row.title, action: [row._id, row.status], status: row.status, created: moment(row.created).format('MMMM Do YYYY, HH:mm:ss') }));


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
    deleteNotification(id);
    setDeleteModal(false);

  }


  function handleSelectSingle(selectedSingle) {
    setSelectedSingle(selectedSingle.label);
    console.log(selectedSingle);

  }
  const handleChageStatus = () => {
    changeStatusNotification(id, selectedSingle);
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
            <span>{cell.getValue()}</span>
          );
        },
        accessorKey: "created",
        enableColumnFilter: false,
      },

      {
        header: "Category",
        accessorKey: "category",
        enableColumnFilter: false,
      },
      {
        header: "Company",
        accessorKey: "company",
        enableColumnFilter: false,
      },
      {
        header: "Product",
        accessorKey: "product",
        enableColumnFilter: false,
      },
      {
        header: "Title",
        accessorKey: "title",
        enableColumnFilter: false,
      },
      {
        header: "Status",
        accessorKey: "status",
        enableColumnFilter: false,
      },
      {
        header: "Action",
        accessorKey: "action",
        enableColumnFilter: false,

        cell: (cell) => {
          return (
            <div>
              <Link onClick={() => tog_grid(cell.getValue())} to='#' className="btn btn-sm btn-info"><i className='las la-exchange-alt'></i></Link>&nbsp;&nbsp;
              <Link to={`/edit/notification/${cell.getValue()[0]}`} className="btn btn-sm btn-warning"><i className='las la-pen'></i></Link>&nbsp;&nbsp;
              <Link onClick={() => tog_center(cell.getValue()[0])} to='#' className="btn btn-sm btn-danger"><i className='las la-trash-alt'></i></Link>
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
  getNotifications: PropTypes.func.isRequired,
  notification: PropTypes.object.isRequired,
  deleteNotification: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  notification: state.notification,
});

export default connect(mapStateToProps, { getNotifications, deleteNotification, changeStatusNotification })(DataTable);