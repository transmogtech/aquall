import React, { useState} from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row, Table } from 'reactstrap'
import {  SearchTable } from './ReactTable'
import { Link } from 'react-router-dom';


const Counts = () => {

  
  const [isView, setIsView] = useState(false);
  function viewRequest() {
    setIsView(!isView);
  }

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
                     
                      <Link to='/create-count' onClick={() => viewRequest()} className="btn btn-success"
                      ><i className="ri-add-line align-bottom me-1"></i> Add</Link>
                  </div>
                </CardHeader>
                <CardBody>
                <div className="table-responsive">
<Table className="table-nowrap table-bordered border-primary mb-0">
    <thead>
        <tr>
            <th scope="col">No. 1</th>
            <th scope="col" colSpan={3}>Type Name : Vannamei	</th>
            <th scope="col" colSpan={4}>Area Name : ANDHRAPRDESH	</th>
            <th scope="col">
            <Link  to='#' className="btn btn-sm btn-info"><i className='las la-exchange-alt'></i></Link>&nbsp;&nbsp;
            <Link  to='/edit/count/1' className="btn btn-sm btn-warning"><i className='las la-pen'></i></Link>&nbsp;&nbsp;
            <Link  to='#' className="btn btn-sm btn-danger"><i className='las la-trash-alt'></i></Link>
            </th>
        </tr>
    </thead>
    <tbody>
        <tr className="table-warning">
            <td>20</td>
            <td>30</td>
            <td>40</td>
            <td>50</td>
            <td>60</td>
            <td>70</td>
            <td>80</td>
            <td>90</td>
            <td>100</td>
        </tr>
        <tr>
        <td>580</td>
            <td>460</td>
            <td>410</td>
            <td>340</td>
            <td>300</td>
            <td>280</td>
            <td>260</td>
            <td>250</td>
            <td>240</td>
        </tr>
    </tbody>
</Table>
</div>
                </CardBody>
              </Card>
            </Col>
          </Row>
         

        </Container>
      </div>
    </React.Fragment>
  )
}

export default Counts;