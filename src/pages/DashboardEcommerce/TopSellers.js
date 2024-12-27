import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { topSellers } from "../../common/data";
import { getJobApplications } from "../../actions/jobApplication";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment/moment';

const TopSellers = ({ getJobApplications, jobApplication: { jobapplications}}) => {
    
        useEffect(() => {
            getJobApplications();
        }, []);
    return (
        <React.Fragment>
            <Col xl={6}>
                <Card className="card-height-100">
                    <CardHeader className="align-items-center d-flex">
                    <h4 className="card-title mb-0 flex-grow-1">Job Applications</h4>
                
                    </CardHeader>

                    <CardBody>
                        <div className="table-responsive table-card">
                            <table className="table table-borderless table-centered table-hover align-middle mb-0">
                            <thead className="text-muted table-light">
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Job Title</th>
                                        <th scope="col">Applicant Name</th>
                                        <th scope="col">Resume</th>
                                        <th scope="col">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jobapplications.map((item, key) => ( key < 10 &&
                                        <tr key={key}>
                                            <td>
                                                {moment(item.created).format('MMMM Do YYYY')}
                                            </td>
                                           
                                            <td>{item.jobId?.title}</td>
                                            <td>
                                               {item.userId?.name}
                                            </td>
                                            <td> <Link to={`${process.env.REACT_APP_API_URL}/${item.resume}`} target='_blank' className="btn btn-sm btn-warning"><i className='las la-download'></i></Link></td>
                                            <td>{item.status}</td>
                                            
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                       
                    </CardBody>
                </Card>
            </Col>

        </React.Fragment>
    );
};



TopSellers.propTypes = {
    getJobApplications: PropTypes.func.isRequired,
    jobApplication: PropTypes.object.isRequired,
   
}

const mapStateToProps = state => ({
    jobApplication: state.jobApplication,
});

export default connect(mapStateToProps, { getJobApplications })(TopSellers);

