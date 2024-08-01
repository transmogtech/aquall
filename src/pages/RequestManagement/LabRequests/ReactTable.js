import React, { useMemo, useState, useEffect } from 'react';
import TableContainer from '../../../Components/Common/TableContainerReactTable';
import { Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import Loader from '../../../Components/Common/Loader';
import PropTypes from 'prop-types';
import ChangeStatus from '../../../Components/Common/ChangeStatus';
import moment from 'moment/moment';
import ViewModal from "./View";
import DeleteModal from "../../../Components/Common/DeleteModal";
import { getLabRequests, changeStatusLabRequest, deleteLabRequest } from '../../../actions/labRequest';

const DataTable = ({ getLabRequests, changeStatusLabRequest, deleteLabRequest, labRequest: { labrequests, loading } }) => {

  const [id, setId] = useState(null);
  const searchTable = [];
  const [deleteModal, setDeleteModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [selectedSingle, setSelectedSingle] = useState(null);
  const [comment, setComment] = useState(null);

  useEffect(() => {
    getLabRequests();
  }, []);

  // console.log(companies);
  labrequests.forEach(row => {
    if (row === undefined) { return }
    searchTable.push({ id: row._id, email: row.email, action: row._id, status: row.status, name: row.name, mobile: row.mobile, created: moment(row.created).format('MMMM Do YYYY, HH:mm:ss') })
  });



  function tog_grid(id) {
    setStatusModal(true);
    setId(id);
  }


  function tog_center(id) {
    setDeleteModal(true);
    setId(id);
  }

  const handleDelete = () => {
    deleteLabRequest(id);
    setDeleteModal(false);

  }


  function handleSelectSingle(selectedSingle) {
    setSelectedSingle(selectedSingle.label);
    console.log(selectedSingle);

  }

  const [isView, setIsView] = useState(false);
  const [viewData, setViewData] = useState('');
  function viewRequest(id) {
    setViewData(id);
    setIsView(!isView);
  }



  const handleCommentChange = (e) => {
    setComment(e.target.value);

  }
  const handleChageStatus = () => {
    changeStatusLabRequest(id, selectedSingle, comment);
    setStatusModal(false);
  }

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' }
  ];


  const columns = useMemo(
    () => [
      {
        header: "Requested Date & Time",
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
      },
      {
        header: "Action",
        accessorKey: "action",
        enableColumnFilter: false,

        cell: (cell) => {
          return (
            <div>
              <Link onClick={() => tog_grid(cell.getValue())} to='#' className="btn btn-sm btn-info"><i className='las la-exchange-alt'></i></Link>&nbsp;&nbsp;
              <Link onClick={() => viewRequest(cell.getValue())} to='#!' className="btn btn-sm btn-warning"><i className='las la-eye'></i></Link>&nbsp;&nbsp;
              <Link onClick={() => tog_center(cell.getValue())} to='#' className="btn btn-sm btn-danger"><i className='las la-trash-alt'></i></Link>
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

      <ViewModal
        show={isView}
        onCloseClick={() => setIsView(false)}
        id={viewData}
      />

      <ChangeStatus
        show={statusModal}
        onCloseClick={() => setStatusModal(false)}
        onClick={handleChageStatus}
        statusOptions={statusOptions}
        selectedSingle={selectedSingle}
        handleSelectSingle={handleSelectSingle}
        handleCommentChange={handleCommentChange}
      />
    </React.Fragment >

  );
};



DataTable.propTypes = {
  getLabRequests: PropTypes.func.isRequired,
  labRequest: PropTypes.object.isRequired,
  deleteLabRequest: PropTypes.func.isRequired,
  changeStatusLabRequest: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  labRequest: state.labRequest,
});

export default connect(mapStateToProps, { changeStatusLabRequest, deleteLabRequest, getLabRequests })(DataTable);