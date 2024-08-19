import React, { useMemo, useState, useEffect } from 'react';
import TableContainer from '../../../Components/Common/TableContainerReactTable';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from '../../../Components/Common/Loader';
import PropTypes from 'prop-types';
import ChangeStatus from '../../../Components/Common/ChangeStatus';
import moment from 'moment/moment';

import DeleteModal from "../../../Components/Common/DeleteModal";

import { changeStatusCountType, deleteCountType, getCountTypes, updateCountType } from '../../../actions/countType';
import EditModal from './Edit';
import { Capitalize } from '../../../helpers/common_functions';

const DataTable = ({ changeStatusCountType, deleteCountType, getCountTypes, updateCountType, countType: { counttypes, loading } }) => {

  const [id, setId] = useState(null);
  const searchTable = [];
  const [deleteModal, setDeleteModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [selectedSingle, setSelectedSingle] = useState(null);

  useEffect(() => {
    getCountTypes();
  }, []);


  counttypes.forEach(row => searchTable.push({ id: row._id, title: row.title, action: [row._id, row.status], status: row.status, created: moment(row.created).format('MMMM Do YYYY, HH:mm:ss') }));

  const [editCountType, setEditCountType] = useState(false);
  const [defaultValue, setDefaultValue] = useState(null);

  function toggle_edit(id) {
    setEditCountType(!editCountType);
    // const countarea = counttypes.find(countarea => countarea._id === id);
    setId(id);
    // setDefaultValue(id);

  }


  const onChange = (e) => {
    setDefaultValue(e.target.value);
  };

  const handleSubmit = () => {
    updateCountType(id, { "title": defaultValue });
    setEditCountType(false);
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
    deleteCountType(id);
    setDeleteModal(false);

  }


  function handleSelectSingle(selectedSingle) {
    setSelectedSingle(selectedSingle.value);
    console.log(selectedSingle);

  }
  const handleChageStatus = () => {
    changeStatusCountType(id, selectedSingle);
    setStatusModal(false);
  }

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' }
  ];


  const columns = useMemo(
    () => [
      {
        header: "Created",
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
              <Link to='#!' onClick={() => toggle_edit(cell.getValue()[0])} className="btn btn-sm btn-warning"><i className='las la-pen'></i></Link>&nbsp;&nbsp;
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
      <EditModal
        show={editCountType}
        onCloseClick={() => setEditCountType(false)}
        onChange={onChange}
        handleSubmit={handleSubmit}
        defaultValue={id}
      />
    </React.Fragment >


  );
};



DataTable.propTypes = {
  getCountTypes: PropTypes.func.isRequired,
  countType: PropTypes.object.isRequired,
  deleteCountType: PropTypes.func.isRequired,
  changeStatusCountType: PropTypes.func.isRequired,
  updateCountType: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  countType: state.countType,
});

export default connect(mapStateToProps, { getCountTypes, deleteCountType, changeStatusCountType, updateCountType })(DataTable);