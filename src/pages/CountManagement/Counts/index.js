import React, { Fragment, useState, useEffect } from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row, Table } from 'reactstrap'
import { Link } from 'react-router-dom';
import { getCounts, changeStatusCount, deleteCount } from '../../../actions/count';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import DeleteModal from '../../../Components/Common/DeleteModal';
import ChangeStatus from '../../../Components/Common/ChangeStatus';

const Counts = ({ getCounts, changeStatusCount, deleteCount, count: { counts } }) => {

  useEffect(() => {
    getCounts();
  }, []);

  const [id, setId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [selectedSingle, setSelectedSingle] = useState(null);

  function tog_grid(id) {
    setStatusModal(true);
    setId(id);
  }


  function tog_center(id) {
    setDeleteModal(true);
    setId(id);
  }

  const handleDelete = () => {
    deleteCount(id);
    setDeleteModal(false);

  }


  function handleSelectSingle(selectedSingle) {
    setSelectedSingle(selectedSingle.value);
    console.log(selectedSingle);

  }
  const handleChageStatus = () => {
    changeStatusCount(id, selectedSingle);
    setStatusModal(false);
  }

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' }
  ];


  document.title = "Counts | Aquall Admin";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0 float-start">Count</h5>
                  <div className='float-end'>

                    <Link to='/create-count' className="btn btn-success"
                    ><i className="ri-add-line align-bottom me-1"></i> Add</Link>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="table-responsive">
                    {counts ? counts.map((row, index) => (

                      <Table className="table-nowrap table-bordered border-primary mb-4" key={index}>

                        <thead>
                          <tr>
                            <th scope="col">No. {index + 1}</th>
                            <th scope="col" colSpan={2}>Count Type  : {row.categoryId.title}	</th>
                            <th scope="col" colSpan={2}>Count Area : {row.countareaId.title}	</th>
                            <th scope="col" colSpan={2}>Culture Type: {row.culturetypeId.title}	</th>
                            <th scope="col" colSpan={2}>Status: {row.status}	</th>
                            <th scope="col">
                              <Link onClick={() => tog_grid(row._id)} to='#' className="btn btn-sm btn-info"><i className='las la-exchange-alt'></i></Link>&nbsp;&nbsp;
                              <Link to={`/edit/count/${row._id}`} className="btn btn-sm btn-warning"><i className='las la-pen'></i></Link>&nbsp;&nbsp;
                              <Link onClick={() => tog_center(row._id)} to='#' className="btn btn-sm btn-danger"><i className='las la-trash-alt'></i></Link>
                            </th>
                          </tr>
                        </thead>

                        <tbody key={index}>
                          <tr className="table-warning">
                            {row.counts.map((counter, index) => (

                              <td>{counter.count}</td>
                            ))
                            }
                          </tr>
                          <tr>
                            {row.counts.map((counter, index) => (
                              <td>{counter.volume}</td>
                            ))
                            }
                          </tr>
                        </tbody>


                      </Table>

                    ))
                      : (
                        <Fragment>
                          No Data Found
                        </Fragment>
                      )
                    }
                  </div>

                </CardBody>
              </Card>
            </Col>
          </Row>


        </Container>
      </div>
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
  )
}

Counts.propTypes = {
  getCounts: PropTypes.func.isRequired,
  changeStatusCount: PropTypes.func.isRequired,
  deleteCount: PropTypes.func.isRequired,
  counts: PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
  count: state.count,
});

export default connect(mapStateToProps, { getCounts, changeStatusCount, deleteCount })(Counts);