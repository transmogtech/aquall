import React, { useMemo, useState, useEffect } from 'react';
import TableContainer from '../../../Components/Common/TableContainerReactTable';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from '../../../Components/Common/Loader';
import PropTypes from 'prop-types';
import ChangeStatus from '../../../Components/Common/ChangeStatus';
import moment from 'moment/moment';

import DeleteModal from "../../../Components/Common/DeleteModal";
import { Capitalize } from '../../../helpers/common_functions';

import { changeStatusJobApplication, deleteJobApplication, getJobApplications } from '../../../actions/jobApplication';

const DataTable = ({ changeStatusJobApplication, deleteJobApplication, getJobApplications, jobApplication: { jobapplications, loading } }) => {
  const [id, setId] = useState(null);
  const searchTable = [];
  const [deleteModal, setDeleteModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [selectedSingle, setSelectedSingle] = useState(null);

  useEffect(() => {
    getJobApplications();
  }, []);


  jobapplications.forEach(row => searchTable.push({ id: row._id, job: row.jobId?.title, user: row.userId?.name, action: [row._id, row.status], resume: row.resume, status: row.status, created: moment(row.created).format('MMMM Do YYYY') }));


  const onChange = (e) => {
    setDefaultValue(e.target.value);
  };

  const handleSubmit = () => {
    updateJobApplication(id, defaultValue);
    setEditJobApplication(false);
  }
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
    deleteJobApplication(id);
    setDeleteModal(false);

  }


  function handleSelectSingle(selectedSingle) {
    setSelectedSingle(selectedSingle.value);
    console.log(selectedSingle);

  }
  const handleChageStatus = () => {
    changeStatusJobApplication(id, selectedSingle);
    setStatusModal(false);
  }

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'rejected', label: 'Reject' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'shortlisted', label: 'Shortlist' }

  ];


  const columns = useMemo(
    () => [
      {
        header: "Applied Date",
        cell: (cell) => {
          return (
            <span>{cell.getValue()}</span>
          );
        },
        accessorKey: "created",
        enableColumnFilter: false,
      },

      {
        header: "Job Title",
        accessorKey: "job",
        enableColumnFilter: false,
      },
      {
        header: "Applicant Name",
        accessorKey: "user",
        enableColumnFilter: false,
      },
      {
        header: "Resume",
        accessorKey: "resume",
        enableColumnFilter: false,
        cell: (cell) => {
          return (
            <Link to={`${process.env.REACT_APP_API_URL}/${cell.getValue()}`} target='_blank' className="btn btn-sm btn-warning"><i className='las la-download'></i></Link>
          );
        }
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
  getJobApplications: PropTypes.func.isRequired,
  jobApplication: PropTypes.object.isRequired,
  deleteJobApplication: PropTypes.func.isRequired,
  changeStatusJobApplication: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  jobApplication: state.jobApplication,
});

export default connect(mapStateToProps, { getJobApplications, deleteJobApplication, changeStatusJobApplication })(DataTable);