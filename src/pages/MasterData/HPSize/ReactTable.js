import React, { useMemo, useState, useEffect } from 'react';
import TableContainer from '../../../Components/Common/TableContainerReactTable';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from '../../../Components/Common/Loader';
import PropTypes from 'prop-types';
import ChangeStatus from '../../../Components/Common/ChangeStatus';
import moment from 'moment/moment';

import DeleteModal from "../../../Components/Common/DeleteModal";

import { changeStatusHPSize, deleteHPSize, getHPSizes, updateHPSize } from '../../../actions/hpSizes';
import EditModal from './Edit';

const DataTable = ({ changeStatusHPSize, deleteHPSize, getHPSizes, updateHPSize, hpSize: { hpsizes, loading } }) => {

  const [id, setId] = useState(null);
  const searchTable = [];
  const [deleteModal, setDeleteModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [selectedSingle, setSelectedSingle] = useState(null);

  useEffect(() => {
    getHPSizes();
  }, []);


  hpsizes.forEach(row => searchTable.push({ id: row._id, title: row.title, action: row._id, status: row.status, created: moment(row.created).format('MMMM Do YYYY, h:mm:ss a') }));

  const [editHpSize, setEditHpSize] = useState(false);
  const [defaultValue, setDefaultValue] = useState(null);

  async function toggle_edit(id) {
    await hpsizes.find(hpsize => hpsize._id === id ? setDefaultValue(hpsize.title) : '');

    setId(id);
    setEditHpSize(!editHpSize);

  }


  const onChange = (e) => {
    setDefaultValue(e.target.value);
  };

  const handleSubmit = () => {
    updateHPSize(id, defaultValue);
    setEditHpSize(false);
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
    deleteHPSize(id);
    setDeleteModal(false);

  }


  function handleSelectSingle(selectedSingle) {
    setSelectedSingle(selectedSingle.value);
    console.log(selectedSingle);

  }
  const handleChageStatus = () => {
    changeStatusHPSize(id, selectedSingle);
    setStatusModal(false);
  }

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' }
  ];


  const columns = useMemo(
    () => [
      {
        header: "ID",
        cell: (cell) => {
          return (
            <span className="fw-semibold">{cell.getValue()}</span>
          );
        },
        accessorKey: "id",
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
              <Link to='#!' onClick={() => toggle_edit(cell.getValue())} className="btn btn-sm btn-warning"><i className='las la-pen'></i></Link>&nbsp;&nbsp;
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

      <ChangeStatus
        show={statusModal}
        onCloseClick={() => setStatusModal(false)}
        onClick={handleChageStatus}
        statusOptions={statusOptions}
        selectedSingle={selectedSingle}
        handleSelectSingle={handleSelectSingle}
      />
      <EditModal
        show={editHpSize}
        onCloseClick={() => setEditHpSize(false)}
        onChange={onChange}
        handleSubmit={handleSubmit}
        defaultValue={defaultValue}
      />
    </React.Fragment >


  );
};



DataTable.propTypes = {
  getHPSizes: PropTypes.func.isRequired,
  hpSize: PropTypes.object.isRequired,
  deleteHPSize: PropTypes.func.isRequired,
  changeStatusHPSize: PropTypes.func.isRequired,
  updateHPSize: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  hpSize: state.hpSize,
});

export default connect(mapStateToProps, { getHPSizes, deleteHPSize, changeStatusHPSize, updateHPSize })(DataTable);