import React, { useMemo, useState, useEffect } from 'react';
import TableContainer from '../../../Components/Common/TableContainerReactTable';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from '../../../Components/Common/Loader';
import PropTypes from 'prop-types';
import ChangeStatus from '../../../Components/Common/ChangeStatus';
import moment from 'moment/moment';

import DeleteModal from "../../../Components/Common/DeleteModal";
import { changeStatusSponsoredAd, deleteSponsoredAd, getSponsoredAds } from '../../../actions/sponsoredAd';

const DataTable = ({ changeStatusSponsoredAd, deleteSponsoredAd, getSponsoredAds, sponsoredAd: { sponsoredads, loading } }) => {

  const [id, setId] = useState(null);
  const searchTable = [];
  const [deleteModal, setDeleteModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [selectedSingle, setSelectedSingle] = useState(null);
  const [comment, setComment] = useState(null);

  useEffect(() => {
    getSponsoredAds();
  }, []);


  sponsoredads.forEach(row => searchTable.push({ id: row._id, priority: row.priority, image: row.image, action: row._id, status: row.status, name: row.name, discount: row.discount, url: row.url, created: moment(row.created).format('MMMM Do YYYY, h:mm:ss a') }));



  function tog_grid(id) {
    setStatusModal(true);
    setId(id);
  }


  function tog_center(id) {
    setDeleteModal(true);
    setId(id);
  }

  const handleDelete = () => {
    deleteSponsoredAd(id);
    setDeleteModal(false);

  }


  function handleSelectSingle(selectedSingle) {
    setSelectedSingle(selectedSingle.label);
    console.log(selectedSingle);

  }



  const handleCommentChange = (e) => {
    setComment(e.target.value);

  }
  const handleChageStatus = () => {
    changeStatusSponsoredAd(id, selectedSingle, comment);
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
        header: "Image",
        accessorKey: "image",
        enableColumnFilter: false,
        cell: (cell) => {
          return (
            <img className="rounded-circle header-profile-user" src={`http://localhost:3030/${cell.getValue()}`} alt="Header Avatar"></img>
          )
        }
      },
      {
        header: "Url",
        accessorKey: "url",
        enableColumnFilter: false,
      },
      {
        header: "Sponsor Name",
        accessorKey: "name",
        enableColumnFilter: false,
      },
      {
        header: "Discount",
        accessorKey: "discount",
        enableColumnFilter: false,
      },
      {
        header: "Priority",
        accessorKey: "priority",
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
              <Link to={`/edit/sponsor-ad/${cell.getValue()}`} className="btn btn-sm btn-warning"><i className='las la-pen'></i></Link>&nbsp;&nbsp;
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
        handleCommentChange={handleCommentChange}
      />
    </React.Fragment >


  );
};


DataTable.propTypes = {
  getSponsoredAds: PropTypes.func.isRequired,
  sponsoredAd: PropTypes.object.isRequired,
  deleteSponsoredAd: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  sponsoredAd: state.sponsoredAd,
});

export default connect(mapStateToProps, { changeStatusSponsoredAd, deleteSponsoredAd, getSponsoredAds })(DataTable);