import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row, Button, Modal, ModalBody, ModalHeader, Input } from 'reactstrap'
import DataTable from './ReactTable'
import { Link } from 'react-router-dom';
import Alert from '../../../Components/Common/Alert';
import { createCountArea } from '../../../actions/countArea';
import CreateModal from './Create';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

const CountAreas = ({ createCountArea }) => {

  const [CreateCountArea, setCreateCountArea] = useState(false);
  const [title, setTitle] = useState(null);

  function toggle_create() {
    setCreateCountArea(!CreateCountArea);
  }


  const onChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = () => {
    createCountArea({"title": title});
    setCreateCountArea(false);
  }

  document.title = "Create HP Size | Aquall Admin";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>

          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0 float-start">Count Areas</h5>
                  <div className='float-end'>

                    <Link onClick={() => toggle_create(true)} to="#!" color="success" className="btn btn-success" id="create-btn"><i className="ri-add-line align-bottom me-1"></i> Add</Link>

                  </div>
                </CardHeader>
                <CardBody>
                  <Alert />
                  <DataTable />
                </CardBody>
              </Card>
            </Col>
          </Row>

          <CreateModal
            show={CreateCountArea}
            onCloseClick={() => setCreateCountArea(false)}
            onChange={onChange}
            handleSubmit={handleSubmit}
          />

        </Container>
      </div>
    </React.Fragment>
  )
}


CountAreas.propTypes = {
  createCountArea: PropTypes.func.isRequired
};

export default connect(null, { createCountArea })(CountAreas);