import React, { useEffect, useMemo, useState } from 'react';
import TableContainer from '../../Components/Common/TableContainerReactTable';
import { Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { getNewsList, deleteNews, changeStatusNews } from '../../actions/news';
import Loader from '../../Components/Common/Loader';
import PropTypes from 'prop-types';
import DeleteModal from '../../Components/Common/DeleteModal';
import ChangeStatus from '../../Components/Common/ChangeStatus';
import moment from 'moment/moment';
import { Capitalize } from '../../helpers/common_functions';

const SearchTable = ({ getNewsList, deleteNews, changeStatusNews, news: { newsList, loading } }) => {

  const [id, setId] = useState(null);
  const searchTable = [];
  const [deleteModal, setDeleteModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [selectedSingle, setSelectedSingle] = useState(null);

  useEffect(() => {
    getNewsList();
  }, [getNewsList]);


  newsList.forEach(row => searchTable.push({ id: row._id, title: row.title, image: row.imageUrl, action: [row._id, row.status], language: row.language?.title, status: row.status, created: moment(row.created).format('MMMM Do YYYY, HH:mm:ss') }));


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
    deleteNews(id);
    setDeleteModal(false);
  }


  function handleSelectSingle(selectedSingle) {
    setSelectedSingle(selectedSingle.value);
    console.log(selectedSingle);

  }
  const handleChageStatus = () => {
    changeStatusNews(id, selectedSingle);
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
        header: "Image",
        accessorKey: "image",
        enableColumnFilter: false,
        cell: (cell) => {
          return (
            <img className="rounded-circle header-profile-user" src={`${process.env.REACT_APP_API_URL}/${cell.getValue()}`} alt="Header Avatar"></img>
          )
        }
      },
      {
        header: "Title",
        accessorKey: "title",
        enableColumnFilter: false,
      },
      {
        header: "Language",
        accessorKey: "language",
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
              <Link to={`/edit/news/${cell.getValue()[0]}`} className="btn btn-sm btn-warning"><i className='las la-pen'></i></Link>&nbsp;&nbsp;
              <Link onClick={() => tog_center(cell.getValue()[0])} to='#!' className="btn btn-sm btn-danger"><i className='las la-trash-alt'></i></Link>
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
          className="custom-header-css"
          divClass="table-responsive table-card mb-2"
          tableClass="align-middle table-nowrap"
          theadClass="table-light"
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

SearchTable.propTypes = {
  getNewsList: PropTypes.func.isRequired,
  news: PropTypes.object.isRequired,
  deleteNews: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  news: state.news,
});

export default connect(mapStateToProps, { getNewsList, deleteNews, changeStatusNews })(SearchTable);