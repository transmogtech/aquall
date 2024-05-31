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
import { getTechnicianRequests, changeStatusTechnicianRequest, deleteTechnicianRequest } from '../../../actions/technicianRequest';
 
const DataTable = ({ getTechnicianRequests, changeStatusTechnicianRequest, deleteTechnicianRequest, technicianRequest: { technicianrequests, loading } }) => {

  const [id, setId] = useState(null);
  const searchTable = [];
  const [deleteModal, setDeleteModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [selectedSingle, setSelectedSingle] = useState(null);
  const [comment, setComment] = useState(null);

  useEffect(() => {
    getTechnicianRequests();
  }, []);

// console.log(companies);
technicianrequests.forEach(row => {  if(row === undefined) {return}
  searchTable.push({ id: row._id,  email: row.email, action: row._id, status: row.status, name: row.name, mobile: row.mobile, created: moment(row.created).format('MMMM Do YYYY, h:mm:ss a') })});



  function tog_grid(id) {
    setStatusModal(true);
    setId(id);
  }


  function tog_center(id) {
    setDeleteModal(true);
    setId(id);
  }

  const handleDelete = () => {
    deleteTechnicianRequest(id);
    setDeleteModal(false);

  }


  function handleSelectSingle(selectedSingle) {
    setSelectedSingle(selectedSingle.technicianel);
    console.log(selectedSingle);

  }

  const [isView, setIsView] = useState(false);
  const [viewData, setViewData] = useState('');
  function viewRequest(id) {
    setViewData(id);
    setIsView(!isView);
  }



 const  handleCommentChange = (e) => {
    setComment(e.target.value);

  }
  const handleChageStatus = () => {
    changeStatusTechnicianRequest(id, selectedSingle, comment);
    setStatusModal(false);
  }

  const statusOptions = [
    { value: 'Active', technicianel: 'Active' },
    { value: 'Inactive', technicianel: 'Inactive' }
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
        customPageSize={(searchTable.length < 5) ? searchTable.length : 5}
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
  getTechnicianRequests: PropTypes.func.isRequired,
  technicianRequest: PropTypes.object.isRequired,
  deleteTechnicianRequest: PropTypes.func.isRequired,
  changeStatusTechnicianRequest: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  technicianRequest: state.technicianRequest,
});

export default connect(mapStateToProps, { changeStatusTechnicianRequest, deleteTechnicianRequest, getTechnicianRequests })(DataTable);