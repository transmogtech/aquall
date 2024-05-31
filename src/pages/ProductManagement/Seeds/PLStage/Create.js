import React, { useState, useEffect } from 'react';
import UiContent from "../../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../../../Components/Common/PreviewCardHeader';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import { getCompanies } from '../../../../actions/company';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCultureTypes } from '../../../../actions/cultureType';
import { createPlStage } from '../../../../actions/plStages';


const CreatePlStage = ({ getCultureTypes, getCompanies, createPlStage, company: { companies }, cultureType: { culturetypes} }) => {


    useEffect(() => {
        getCultureTypes();
        getCompanies();
    }, []);



    const [selectedCultureType, setSelectedCultureType] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState();

    function handleSelectedCultureType(selectedCultureType) {

        setFormData({ ...formData, culturetypeId: selectedCultureType.value });

        setSelectedCultureType(selectedCultureType.label);

    }

    function handleSelectedCompany(selectedCompany) {

        setFormData({ ...formData, companyId: selectedCompany.value });

        setSelectedCompany(selectedCompany.label);

    }


    const CultureTypes   = [];
    const Companies   = [];

    culturetypes.forEach(row => CultureTypes.push({ value: row._id, label: row.title}));
    companies.forEach(row => Companies.push({ value: row._id, label: row.name}));

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {


        createPlStage(formData);

        navigate('/pl-stages');
    }


    document.title = "Create PL Stage| Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Create PL Stage" pageTitle="PL Stage Management" />
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <PreviewCardHeader title="Create PL Stage" />

                                    <CardBody className="card-body">
                                        <div className="live-preview">
                                            <Row className="gy-4">

                                                <Col xxl={4} md={4}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Culture Type</Label>
                                                        <Select value={{ label: selectedCultureType }} onChange={handleSelectedCultureType} options={CultureTypes} />
                                                    </div>
                                                </Col>
                                                <Col xxl={4} md={4}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Company</Label>
                                                        <Select value={{ label: selectedCompany }} onChange={handleSelectedCompany} options={Companies} />
                                                    </div>
                                                </Col>
                                                <Col xxl={4} md={4}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Name</Label>
                                                        <Input type="text" onChange={e => onChange(e)} className="form-control" name="name" id="name" placeholder="Name" />
                                                    </div>
                                                </Col>

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


CreatePlStage.propTypes = {
    createPlStage: PropTypes.func.isRequired,
    getCultureTypes: PropTypes.func.isRequired,
    getCompanies: PropTypes.func.isRequired,
    company: PropTypes.object.isRequired,
    cultureType: PropTypes.object.isRequired,

}


const mapStateToProps = state => ({
    cultureType: state.cultureType,
    company: state.company,
  });

export default connect(mapStateToProps, { createPlStage, getCultureTypes, getCompanies })(CreatePlStage);

