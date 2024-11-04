import React, { useState } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardHeader } from 'reactstrap';
import { useNavigate, Link } from 'react-router-dom';
import Flatpickr from "react-flatpickr";
import { createJob } from '../../../actions/job';
import PropTypes from "prop-types";
import { connect } from 'react-redux';

const CreateJob = ({ createJob }) => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState();

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const JobCategory = [
        { label: "Accounting & Finance", value: "Accounting & Finance" },
        { label: "Purchasing Manager", value: "Purchasing Manager" },
        { label: "Education & training", value: "Education & training" },
        { label: "Marketing & Advertising", value: "Marketing & Advertising" },
        { label: "Digital Marketing", value: "Digital Marketing" },
        { label: "Administrative Officer", value: "Administrative Officer" },
        { label: "Government Jobs", value: "Government Jobs" },
        { label: "It / Software Jobs", value: "It / Software Jobs" },
    ];

    const JobType = [
        { label: "Full Time", value: "Full Time" },
        { label: "Part Time", value: "Part Time" },
        { label: "Freelance", value: "Freelance" },
        { label: "Intership", value: "Intership" },
    ];

    const experience = [
        { label: "0 Year", value: "0 Year" },
        { label: "1 Year", value: "1 Year" },
        { label: "2 Years", value: "2 Years" },
        { label: "3 Years", value: "3 Years" },
        { label: "4 Years", value: "4 Years" },
        { label: "5 Years", value: "5 Years" },
    ]
    const handleSubmit = () => {


        createJob(formData);

        navigate('/jobs');
    }



    document.title = "Create Job | Aquall Admin";
    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <BreadCrumb title="New Job" pageTitle="Jobs" />

                    <Row>
                        <Col lg={12}>
                            <Card>
                                <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#" >
                                    <CardHeader>
                                        <h5 className="card-title mb-0">Create Job</h5>
                                    </CardHeader>
                                    <CardBody>
                                        <Row className="row g-4">
                                            <Col lg={6}>
                                                <div>
                                                    <Label
                                                        htmlFor="job-title-Input"
                                                        className="form-label"
                                                    >
                                                        Job Title <span className="text-danger">*</span>
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="job-title-Input"
                                                        name="title"
                                                        placeholder="Enter job title"
                                                        required
                                                        onChange={e => onChange(e)}
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg={6}>
                                                <div>
                                                    <Label
                                                        htmlFor="job-position-Input"
                                                        className="form-label"
                                                    >
                                                        Job Position <span className="text-danger">*</span>
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="job-position-Input"
                                                        placeholder="Enter job position"
                                                        required
                                                        name="position"
                                                        onChange={e => onChange(e)}
                                                    />
                                                </div>
                                            </Col>
                                            <Col lg={6}>
                                                <div>
                                                    <Label
                                                        htmlFor="job-category-Input"
                                                        className="form-label"
                                                    >
                                                        Job Category <span className="text-danger">*</span>
                                                    </Label>
                                                    <select
                                                        className="form-select"
                                                        data-choices
                                                        name="category"
                                                        required
                                                        onChange={e => onChange(e)}
                                                    >
                                                        <option value="">Select Category</option>
                                                        {
                                                            JobCategory.map((item, index) => {
                                                                return (
                                                                    <option key={index} value={item.value}>{item.label}</option>
                                                                )
                                                            })
                                                        }

                                                    </select>
                                                </div>
                                            </Col>
                                            <Col lg={6}>
                                                <div>
                                                    <Label
                                                        htmlFor="job-type-Input"
                                                        className="form-label"
                                                    >
                                                        Job Type <span className="text-danger">*</span>
                                                    </Label>
                                                    <select
                                                        className="form-select"
                                                        data-choices
                                                        name="type"
                                                        required
                                                        onChange={e => onChange(e)}
                                                    >
                                                        <option value="">Select job type</option>
                                                        {
                                                            JobType.map((item, index) => {
                                                                return (
                                                                    <option key={index} value={item.value}>{item.label}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </Col>

                                            <Col lg={12}>
                                                <div>
                                                    <Label
                                                        htmlFor="description-field"
                                                        className="form-label"
                                                    >
                                                        Description <span className="text-danger">*</span>
                                                    </Label>
                                                    <textarea
                                                        className="form-control"
                                                        id="description-field"
                                                        rows="3"
                                                        placeholder="Enter description"
                                                        required
                                                        name="description"
                                                        onChange={e => onChange(e)}
                                                    ></textarea>
                                                </div>
                                            </Col>

                                            <Col md={6}>
                                                <div>
                                                    <Label
                                                        htmlFor="Vacancy -Input"
                                                        className="form-label"
                                                    >
                                                        No. of Vacancy {" "}
                                                        <span className="text-danger">*</span>
                                                    </Label>
                                                    <Input
                                                        type="number"
                                                        className="form-control"
                                                        id="Vacancy -Input"
                                                        placeholder="No. of vacancy "
                                                        required
                                                        name="vacancy_count"
                                                        onChange={e => onChange(e)}
                                                    />
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div>
                                                    <Label
                                                        htmlFor="experience-Input"
                                                        className="form-label"
                                                    >
                                                        Experience <span className="text-danger">*</span>
                                                    </Label>
                                                    <select
                                                        className="form-select"
                                                        data-choices
                                                        name="experience"
                                                        onChange={e => onChange(e)}
                                                    >
                                                        <option value="">Select Experience</option>
                                                        {
                                                            experience.map((item, index) => {
                                                                return (
                                                                    <option key={index} value={item.value}>{item.label}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </Col>

                                            <Col lg={6}>
                                                <div>
                                                    <Label
                                                        htmlFor="last-apply-date-Input"
                                                        className="form-label"
                                                    >
                                                        Last Date of Apply
                                                        <span className="text-danger">*</span>
                                                    </Label>
                                                    <Input
                                                        type="date"
                                                        className="form-control"
                                                        id="Vacancy -Input"
                                                        placeholder="Last date of Apply "
                                                        required
                                                        name="from_date"
                                                        min={new Date().toJSON().slice(0, 10)}

                                                        onChange={e => onChange(e)}
                                                    />
                                                    {/* <Flatpickr
                                                        className="form-control"
                                                        id="datepicker-publish-input"
                                                        placeholder="Select a date"
                                                        name="from_date"
                                                        options={{
                                                            altInput: true,
                                                            altFormat: "F j, Y",
                                                            mode: "multiple",
                                                            dateFormat: "d.m.y",
                                                        }}
                                                        onChange={e => onChange(e)} 
                                                    /> */}
                                                </div>
                                            </Col>

                                            <Col lg={6}>
                                                <div>
                                                    <Label
                                                        htmlFor="close-date-Input"
                                                        className="form-label"
                                                    >
                                                        Closing Date <span className="text-danger">*</span>
                                                    </Label>
                                                    <Input
                                                        type="date"
                                                        className="form-control"
                                                        id="Vacancy -Input"
                                                        placeholder="Closing date "
                                                        required
                                                        name="to_date"
                                                        min={new Date().toJSON().slice(0, 10)}
                                                        onChange={e => onChange(e)}
                                                    />
                                                    {/* <Flatpickr
                                                        className="form-control"
                                                        id="datepicker-publish-input"
                                                        placeholder="Select a date"
                                                        name="to_date"
                                                        options={{
                                                            altInput: true,
                                                            altFormat: "F j, Y",
                                                            mode: "multiple",
                                                            dateFormat: "d.m.y",
                                                        }}
                                                        onChange={e => onChange(e)} 
                                                    /> */}
                                                </div>
                                            </Col>

                                            <Col md={6}>
                                                <div>
                                                    <Label
                                                        htmlFor="start-salary-Input"
                                                        className="form-label"
                                                    >
                                                        Start Salary
                                                    </Label>
                                                    <Input
                                                        type="number"
                                                        className="form-control"
                                                        id="start-salary-Input"
                                                        name="start_salary"
                                                        placeholder="Enter start salary"
                                                        required
                                                        onChange={e => onChange(e)}
                                                    />
                                                </div>
                                            </Col>

                                            <Col md={6}>
                                                <div>
                                                    <Label
                                                        htmlFor="last-salary-Input"
                                                        className="form-label"
                                                    >
                                                        Last Salary
                                                    </Label>
                                                    <Input
                                                        type="number"
                                                        className="form-control"
                                                        id="last-salary-Input"
                                                        placeholder="Enter end salary"
                                                        name="close_salary"
                                                        required
                                                        onChange={e => onChange(e)}
                                                    />
                                                </div>
                                            </Col>

                                            <Col md={6}>
                                                <div>
                                                    <Label htmlFor="country-Input" className="form-label">
                                                        Country <span className="text-danger">*</span>
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="country-Input"
                                                        placeholder="Enter country"
                                                        required
                                                        name="stateId"
                                                        onChange={e => onChange(e)}
                                                    />
                                                </div>
                                            </Col>

                                            <Col md={6}>
                                                <div>
                                                    <Label htmlFor="city-Input" className="form-label">
                                                        State <span className="text-danger">*</span>
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="city-Input"
                                                        placeholder="Enter city"
                                                        name="city"
                                                        required
                                                        onChange={e => onChange(e)}
                                                    />
                                                </div>
                                            </Col>

                                            <Col lg={12}>
                                                <div>
                                                    <Label htmlFor="website-field" className="form-label">
                                                        Tags
                                                    </Label>
                                                    <Input
                                                        className="form-control"
                                                        id="choices-text-unique-values"
                                                        data-choices
                                                        data-choices-text-unique-true
                                                        type="text"
                                                        defaultValue="Design, Remote"
                                                        required
                                                        name="tags"
                                                        onChange={e => onChange(e)}
                                                    />
                                                </div>
                                            </Col>

                                            <Col lg={12}>
                                                <div className="hstack justify-content-end gap-2">
                                                    <Link to="/jobs" className='btn btn-primary'>Cancel</Link>
                                                    <button type="submit" className="btn btn-secondary">
                                                        Add Job
                                                    </button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    );
}

CreateJob.propTypes = {
    createJob: PropTypes.func.isRequired,
}

export default connect(null, { createJob })(CreateJob);
