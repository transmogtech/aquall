import React, { useState } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { createFooterLogo } from '../../../actions/footerLogo';
import { getCompanies } from '../../../actions/company';
import { useNavigate, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from "react-select";

const CreateFooterLogo = ({ createFooterLogo, getCompanies, company: { companies } }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({company: "", logo: "", priority: ""});
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [errors, setErrors] = useState({});

    React.useEffect(() => {
        getCompanies({status: "active"});
    }, [getCompanies]);

    const company = companies.map(company => ({ value: company._id, label: company.name }));

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        // if (e.target.files) {
        //     // console.log(e.target.files);
        //     setFormData({ ...formData, logo: e.target.files[0] });
        // }

        
if (e.target.files) {
    let file_size = e.target.files[0].size;

    if (file_size > 10e6) {
        alert('Image file size should not exceed 10MB' );
        return;
    }else{
        setFormData({ ...formData, logo: e.target.files[0] });
    }

    
}
    };


    function handleSelectCompany(selectedCompany) {

        setFormData({ ...formData, company: selectedCompany.value });

        setSelectedCompany(selectedCompany.label);
    }

    const validateForm = () => {

        setErrors({});

        if (!formData.company) {
            setErrors({ ...errors, company: 'Please select a company' });
            return false;
        }

        if (!formData.logo) {
            setErrors({ ...errors, logo: 'Please select a footer logo' });
            return false;
        }

        if (!formData.priority) {
            setErrors({ ...errors, priority: 'Please enter a order' });
            return false;
        }

        return true;
    }

    const handleSubmit = () => {
        if (!validateForm()) {
            return false;
        }
        createFooterLogo(formData);

        navigate('/footer-logos');
    }


    document.title = "Create Footer Logo | Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Create Footer Logo" pageTitle="Footer Logo Management" />
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <PreviewCardHeader title="Create Footer Logo" />

                                    <CardBody className="card-body">
                                        <div className="live-preview">
                                            <Row className="gy-4">


                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="title" className="form-label">Company</Label>
                                                        <Select value={{ label: selectedCompany }} onChange={handleSelectCompany} options={company} />
                                                        {errors && errors.company &&  <div className="text-danger">{errors.company}</div>}
                                                    </div>
                                                </Col>

                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Logo</Label>
                                                        <Input type="file" className="form-control" onChange={handleFileChange} name="logo" id="logo" placeholder="Logo" accept="image/jpeg, image/png" />
                                                        {errors && errors.logo &&  <div className="text-danger">{errors.logo}</div>}
                                                    </div>
                                                </Col>

                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Priority</Label>
                                                        <Input type="number" className="form-control" onChange={e => onChange(e)} name="priority" id="priority" min="1" placeholder="Priority" />
                                                        {errors && errors.priority && (
                                                            <div className="text-danger">
                                                                {errors.priority}
                                                            </div>
                                                        ) }
                                                    </div>
                                                </Col>
                                                <Col xxl={12} md={12} className='border-dashed border-primary rounded-2 p-3'>
                                                    <h4 className='mb-4'>Instructions:</h4>
                                                    <p className='mb-1'><strong>File type - </strong>JPEG, JPG, PNG</p>
                                                    <p className='mb-1'><strong>Size - </strong>Maximum file size is 2MB</p>
                                                    <p className='mb-1'><strong>Recommended dimensions - </strong>64W x 64H pixels.</p>
                                                </Col>
                                            </Row>

                                        </div>

                                    </CardBody>
                                    <CardFooter>
                                        <div className="d-flex align-items-start gap-3 mt-4">
                                            <Link to="/footer-logos" className='btn btn-primary'>Cancel</Link>
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

CreateFooterLogo.propTypes = {
    createFooterLogo: PropTypes.func.isRequired,
    getCompanies: PropTypes.func.isRequired,
    company: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    company: state.company,
});


export default connect(mapStateToProps, { createFooterLogo, getCompanies })(CreateFooterLogo);