import React, { useMemo, useState, useEffect } from 'react';
import TableContainer from '../../../Components/Common/TableContainerReactTable';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from '../../../Components/Common/Loader';
import PropTypes from 'prop-types';
import ChangeStatus from '../../../Components/Common/ChangeStatus';
import moment from 'moment/moment';

import DeleteModal from "../../../Components/Common/DeleteModal";

import { changeStatusCultureType, deleteCultureType, getCultureTypes, updateCultureType } from '../../../actions/cultureType';
import EditModal from './Edit';
import { Capitalize } from '../../../helpers/common_functions';

const DataTable = ({ changeStatusCultureType, deleteCultureType, getCultureTypes, updateCultureType, cultureType: { culturetypes, loading } }) => {
  const [id, setId] = useState(null);
  const searchTable = [];
  const [deleteModal, setDeleteModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [selectedSingle, setSelectedSingle] = useState(null);

  useEffect(() => {
    getCultureTypes();
  }, []);


  culturetypes.forEach(row => searchTable.push({ id: row._id, title: row.title, action: [row._id, row.status], status: row.status, created: moment(row.created).format('MMMM Do YYYY, HH:mm:ss') }));

  const [editCultureType, setEditCultureType] = useState(false);
  const [defaultValue, setDefaultValue] = useState(null);

  async function toggle_edit(id) {
    setId(id);

    await culturetypes.find(culturetype => culturetype._id === id ? setDefaultValue(culturetype.title) : '');
    setEditCultureType(!editCultureType);



  }


  const onChange = (e) => {
    setDefaultValue(e.target.value);
  };

  const handleSubmit = () => {
    updateCultureType(id, defaultValue);
    setEditCultureType(false);
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
    deleteCultureType(id);
    setDeleteModal(false);

  }


  function handleSelectSingle(selectedSingle) {
    setSelectedSingle(selectedSingle.value);
    console.log(selectedSingle);

  }
  const handleChageStatus = () => {
    changeStatusCultureType(id, selectedSingle);
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
      <EditModal
        show={editCultureType}
        onCloseClick={() => setEditCultureType(false)}
        onChange={onChange}
        handleSubmit={handleSubmit}
        defaultValue={defaultValue}
      />
    </React.Fragment >


  );
};



DataTable.propTypes = {
  getCultureTypes: PropTypes.func.isRequired,
  cultureType: PropTypes.object.isRequired,
  deleteCultureType: PropTypes.func.isRequired,
  changeStatusCultureType: PropTypes.func.isRequired,
  updateCultureType: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  cultureType: state.cultureType,
});

export default connect(mapStateToProps, { getCultureTypes, deleteCultureType, changeStatusCultureType, updateCultureType })(DataTable);