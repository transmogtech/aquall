import React, { useEffect, useState } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import {  useNavigate } from 'react-router-dom';
import { createJobApplication } from '../../../actions/jobApplication';
import { getUsers } from '../../../actions/user';
import { getJobs } from '../../../actions/job';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from "react-select";

const CreateJobApplication = ({ createJobApplication, getUsers, getJobs, user: { users }, job: { jobs } }) => {

    useEffect(() => {
        getUsers();
        getJobs();
    }, []);

    const navigate = useNavigate();
    const [formData, setFormData] = useState();
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);

    const Jobs   = [];
    const Users   = [];
    jobs.forEach(row => Jobs.push({ value: row._id, label: row.title}));

    users.forEach(row => Users.push({ value: row._id, label: row.name}));

    function handleSelectJob(selectedJob) {
        setFormData({...formData, jobId: selectedJob.value });

        setSelectedJob(selectedJob.label);
    }

    function handleSelectUser(selectedUser) {
        setFormData({...formData, userId: selectedUser.value });

        setSelectedUser(selectedUser.label);
    }
    
const handleResumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        // console.log(e.target.files);
        setFormData({...formData, resume: e.target.files[0] });
    }
  };

  const handleCoverLetterChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        // console.log(e.target.files);
        setFormData({...formData, coverletter: e.target.files[0] });
    }
  };
  
    const handleSubmit = () => {
        createJobApplication(formData);

        navigate('/job-applications');
    }



    document.title = "Create Job Application | Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Create Job Application" pageTitle="Job Application Management" />
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false;  }}  action="#">
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Create Job Application" />

                                <CardBody className="card-body">
                                    <div className="live-preview">
                                        <Row className="gy-4">
                                          
                                       
                                        <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="basiInput" className="form-label">User</Label>
                                                    <Select value={{label: selectedUser}} onChange={ handleSelectUser } options={Users} />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="basiInput" className="form-label">Job</Label>
                                                    <Select value={{label: selectedJob}} onChange={ handleSelectJob } options={Jobs} />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="basiInput" className="form-label">Resume</Label>
                                                    <Input type="file" className="form-control" id="title"  onChange={handleResumeChange} placeholder="URL Slug" />
                                                </div>
                                            </Col>

                                            {/* <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="basiInput" className="form-label">Cover Letter</Label>
                                                    <Input type="file" className="form-control" onChange={handleCoverLetterChange} id="title" placeholder="URL Slug" />
                                                </div>
                                            </Col> */}

                                        </Row>

                                    </div>
                                  
                                </CardBody>
                                <CardFooter>
                                <div className="d-flex align-items-start gap-3 mt-4">
                                <button type="submit" className="btn btn-success btn-label right ms-auto nexttab nexttab" data-nexttab="pills-info-desc-tab"><i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Save</button>
                              </div>
                            </CardFooter>
                            </Card>
                        </Col>

                    </Row>



</Form>
                </Container>

            </div>


        </React.Fragment>
    );
}

CreateJobApplication.propTypes = {
    createAdvertisement: PropTypes.func.isRequired,
    getJobs: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    job: PropTypes.object.isRequired,

}


const mapStateToProps = state => ({
    user: state.user,
    job: state.job,
  });


export default connect(mapStateToProps, { createJobApplication, getJobs, getUsers })(CreateJobApplication);
