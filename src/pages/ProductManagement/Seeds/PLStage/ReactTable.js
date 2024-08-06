import React, { useMemo, useState, useEffect } from 'react';
import TableContainer from '../../../../Components/Common/TableContainerReactTable';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from '../../../../Components/Common/Loader';
import PropTypes from 'prop-types';
import ChangeStatus from '../../../../Components/Common/ChangeStatus';
import moment from 'moment/moment';
import DeleteModal from "../../../../Components/Common/DeleteModal";
import { changeStatusPlStage, deletePlStage, getPlStages } from '../../../../actions/plStages';

const DataTable = ({ changeStatusPlStage, deletePlStage, getPlStages, plStage: { plstages, loading } }) => {

  const [id, setId] = useState(null);
  const searchTable = [];
  const [deleteModal, setDeleteModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [selectedSingle, setSelectedSingle] = useState(null);

  useEffect(() => {
    getPlStages();
  }, []);


  plstages.forEach(row => searchTable.push({ id: row._id, cultureType: row.culturetypeId.title, company: row.companyId.name, name: row.name, action: row._id, status: row.status, created: moment(row.created).format('MMMM Do YYYY, HH:mm:ss') }));

  const [editPlStage, setEditPlStage] = useState(false);
  const [defaultValue, setDefaultValue] = useState(null);

  function toggle_edit(id) {
    setEditPlStage(!editPlStage);
    const hp_size = plstages.find(plstage => plstage._id === id);
    setId(id);
    setDefaultValue(hp_size.title);

  }


  const onChange = (e) => {
    setDefaultValue(e.target.value);
  };

  const handleSubmit = () => {
    updatePlStage(id, defaultValue);
    setEditPlStage(false);
  }

  function tog_grid(id) {
    setStatusModal(true);
    setId(id);
  }


  function tog_center(id) {
    setDeleteModal(true);
    setId(id);
  }

  const handleDelete = () => {
    deletePlStage(id);
    setDeleteModal(false);

  }


  function handleSelectSingle(selectedSingle) {
    setSelectedSingle(selectedSingle.value);
    console.log(selectedSingle);

  }
  const handleChageStatus = () => {
    changeStatusPlStage(id, selectedSingle);
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
            <span className="fw-semibold">{cell.getValue()}</span>
          );
        },
        accessorKey: "created",
        enableColumnFilter: false,
      },
      {
        header: "Culture Type",
        accessorKey: "cultureType",
        enableColumnFilter: false,
      },
      {
        header: "Company",
        accessorKey: "company",
        enableColumnFilter: false,
      },
      {
        header: "PL Stage",
        accessorKey: "name",
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
              <Link to={`/edit/pl-stage/${cell.getValue()}`} className="btn btn-sm btn-warning"><i className='las la-pen'></i></Link>&nbsp;&nbsp;
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
  getPlStages: PropTypes.func.isRequired,
  plStage: PropTypes.object.isRequired,
  deletePlStage: PropTypes.func.isRequired,
  changeStatusPlStage: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  plStage: state.plStage,
});

export default connect(mapStateToProps, { getPlStages, deletePlStage, changeStatusPlStage })(DataTable);