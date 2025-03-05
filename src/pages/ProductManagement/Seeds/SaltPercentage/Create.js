import React, { useState, useEffect } from 'react';
import UiContent from "../../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../../../Components/Common/PreviewCardHeader';
import { useNavigate, Link } from 'react-router-dom';
import Select from "react-select";
import { getCompanies } from '../../../../actions/company';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCultureTypes } from '../../../../actions/cultureType';
import { getPlStages } from '../../../../actions/plStages';
import { createSaltPercentage } from '../../../../actions/saltPercentage';


const CreateSaltPercentage = ({ getCultureTypes, getCompanies, getPlStages, createSaltPercentage, company: { companies }, cultureType: { culturetypes }, plStage: { plstages } }) => {


    useEffect(() => {
        getCultureTypes();
        getCompanies({categoryId: "664645fb3f25f68d99341a74"});
        getPlStages();
    }, []);



    const [selectedCultureType, setSelectedCultureType] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(false);
    const [selectedPlStage, setSelectedPlStage] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', culturetypeId: '', companyId: '', plstageId: '' });
    const [errors, setErrors] = useState({});

    function handleSelectedCultureType(selectedCultureType) {

        setFormData({ ...formData, culturetypeId: selectedCultureType.value });

        setSelectedCultureType(selectedCultureType.label);

    }

    function handleSelectedCompany(selectedCompany) {

        setFormData({ ...formData, companyId: selectedCompany.value });

        setSelectedCompany(selectedCompany.label);

    }

    function handleSelectedPlStage(selectedPlStage) {

        setFormData({ ...formData, plstageId: selectedPlStage.value });

        setSelectedPlStage(selectedPlStage.label);

    }



    const CultureTypes = [];
    const Companies = [];
    const PlStages = [];

    culturetypes.forEach(row => CultureTypes.push({ value: row._id, label: row.title }));
    companies.forEach(row => Companies.push({ value: row._id, label: row.name }));
    plstages.forEach(row => PlStages.push({ value: row._id, label: row.name }));

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const validateForm = () => {

        setErrors({});



        if (!formData.culturetypeId) {
            setErrors({ ...errors, culturetypeId: 'Please select culture type' });
            return false;
        }


        if (!formData.companyId) {
            setErrors({ ...errors, companyId: 'Please select company' });
            return false;
        }


        if (!formData.plstageId) {
            setErrors({ ...errors, plstageId: 'Please enter pl stage' });
            return false;
        }

        if (!formData.name) {
            setErrors({ ...errors, name: 'Please enter name' });
            return false;
        }

        return true;
    }

    const handleSubmit = () => {
        if (!validateForm()) {
            return false;
        }


        createSaltPercentage(formData);

        navigate('/salt-percentage');
    }


    document.title = "Create Salt Percentage| Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Create Salt Percentage" pageTitle="Salt Percentage Management" />
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <PreviewCardHeader title="Create Salt Percentage" />

                                    <CardBody className="card-body">
                                        <div className="live-preview">
                                            <Row className="gy-4">

                                                <Col xxl={6} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Culture Type</Label>
                                                        <Select onChange={handleSelectedCultureType} options={CultureTypes} />
                                                        {errors && errors.culturetypeId ? (
                                                            <div className="text-danger">
                                                                {errors.culturetypeId}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>

                                                <Col xxl={6} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Company</Label>
                                                        <Select onChange={handleSelectedCompany} options={Companies} />
                                                        {errors && errors.companyId ? (
                                                            <div className="text-danger">
                                                                {errors.companyId}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>

                                                <Col xxl={6} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Pl Stage</Label>
                                                        <Select onChange={handleSelectedPlStage} options={PlStages} />
                                                        {errors && errors.plstageId ? (
                                                            <div className="text-danger">
                                                                {errors.plstageId}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>

                                                <Col xxl={6} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Salt percentage </Label>
                                                        <Input type="text" onChange={e => onChange(e)} className="form-control" name="name" id="name" placeholder="Salt percentage" />
                                                        {errors && errors.name ? (
                                                            <div className="text-danger">
                                                                {errors.name}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>

                                            </Row>

                                        </div>

                                    </CardBody>

                                    <CardFooter>
                                        <div className="d-flex align-items-start gap-3 mt-4">
                                            <Link to="/salt-percentage" className='btn btn-primary'>Cancel</Link>
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


CreateSaltPercentage.propTypes = {
    createSaltPercentage: PropTypes.func.isRequired,
    getCultureTypes: PropTypes.func.isRequired,
    getCompanies: PropTypes.func.isRequired,
    getPlStages: PropTypes.func.isRequired,
    company: PropTypes.object.isRequired,
    cultureType: PropTypes.object.isRequired,

}


const mapStateToProps = state => ({
    cultureType: state.cultureType,
    company: state.company,
    plStage: state.plStage,
});

export default connect(mapStateToProps, { getPlStages, createSaltPercentage, getCultureTypes, getCompanies })(CreateSaltPercentage);

