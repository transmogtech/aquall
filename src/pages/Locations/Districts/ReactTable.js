import React, { useMemo, useState, useEffect } from 'react';
import TableContainer from '../../../Components/Common/TableContainerReactTable';
import { Link } from 'react-router-dom';
import ChangeStatus from '../../../Components/Common/ChangeStatus';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import DeleteModal from '../../../Components/Common/DeleteModal';
import Loader from '../../../Components/Common/Loader';
import { getDistricts, deleteDistrict, changeStatusDistrict } from '../../../actions/district';
import { Capitalize } from '../../../helpers/common_functions';

const DataTable = ({ getDistricts, deleteDistrict, changeStatusDistrict, district: { districts, loading } }) => {

  const [id, setId] = useState(null);
  const searchTable = [];
  const [deleteModal, setDeleteModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [selectedSingle, setSelectedSingle] = useState(null);

  useEffect(() => {
    getDistricts();
  }, [getDistricts]);


  districts.forEach(row => searchTable.push({
    id: row._id,
    state: row.stateId.title,
    title: row.title,
    action: [row._id, row.status],
    url: row.url,
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
    deleteDistrict(id);
    setDeleteModal(false);

  }


  function handleSelectSingle(selectedSingle) {
    setSelectedSingle(selectedSingle.value);
    console.log(selectedSingle);

  }
  const handleChageStatus = () => {
    changeStatusDistrict(id, selectedSingle);
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
        header: "State",
        accessorKey: "state",
        enableColumnFilter: false,
      },
      {
        header: "District",
        accessorKey: "title",
        enableColumnFilter: false,
      },
      {
        header: "Slug",
        accessorKey: "url",
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
              <Link to={`/edit/district/${cell.getValue()[0]}`} className="btn btn-sm btn-warning"><i className='las la-pen'></i></Link>&nbsp;&nbsp;
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
  getDistricts: PropTypes.func.isRequired,
  district: PropTypes.object.isRequired,
  deleteState: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  district: state.district,
});

export default connect(mapStateToProps, { getDistricts, deleteDistrict, changeStatusDistrict })(DataTable);