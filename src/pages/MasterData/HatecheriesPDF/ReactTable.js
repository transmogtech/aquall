import React, { useMemo, useState, useEffect } from 'react';
import TableContainer from '../../../Components/Common/TableContainerReactTable';
import { Link } from 'react-router-dom';
import { Button, Col, Modal, ModalBody, ModalHeader, Input } from 'reactstrap';
import { connect } from 'react-redux';
import Loader from '../../../Components/Common/Loader';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import EditPdf from './Create';

import { getHatecheriesPdfs, updateHatecheriesPdf } from '../../../actions/hatecheriesPdf';
import { Capitalize } from '../../../helpers/common_functions';

const DataTable = ({ getHatecheriesPdfs, updateHatecheriesPdf, hatecheriesPdf: { hatecheriespdfs, loading } }) => {

  const [id, setId] = useState(null);
  const searchTable = [];
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(false);

  useEffect(() => {
    getHatecheriesPdfs();
  }, []);


  hatecheriespdfs.forEach(row => searchTable.push({ id: row._id, action: [row._id, row.status], download_link: row.pdf, pdf: row.pdf, created: moment(row.updated).format('MMMM Do YYYY, HH:mm:ss') }));

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // console.log(e.target.files);
      setSelectedFile(e.target.files[0]);
    }
  };


  function tog_center(id) {
    setUpdateModal(true);
    setId(id);
  }

  const handleUpdate = () => {
    updateHatecheriesPdf(id, selectedFile);
    setUpdateModal(false);
  }


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
        header: "File",
        accessorKey: "pdf",
        enableColumnFilter: false,
      },
      {
        header: "Action",
        accessorKey: "action",
        enableColumnFilter: false,

        cell: (cell) => {
          return (
            <div>
              <Link onClick={() => tog_center(cell.getValue())} to='#' className="btn btn-sm btn-info"><i className='las la-exchange-alt'></i></Link>
            </div>
          );
        },
      },
      {
        header: "Downaload",
        accessorKey: "download_link",
        enableColumnFilter: false,

        cell: (cell) => {
          return (
            <div>

              <Link target='_blank' to={`${process.env.REACT_APP_API_URL}/${cell.getValue()}`} className="btn btn-sm btn-danger"><i className='las la-download'></i></Link>
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
        />
      )}
      <EditPdf
        show={updateModal}
        onCloseClick={() => setUpdateModal(false)}
        onClick={handleUpdate}
        handleFileChange={handleFileChange}
      />
    </React.Fragment >


  );
};




DataTable.propTypes = {
  getHatecheriesPdfs: PropTypes.func.isRequired,
  hatecheriesPdf: PropTypes.object.isRequired,
  updateHatecheriesPdf: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  hatecheriesPdf: state.hatecheriesPdf,
});

export default connect(mapStateToProps, { getHatecheriesPdfs, updateHatecheriesPdf })(DataTable);