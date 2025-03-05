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
import { getHPSizes } from '../../../../actions/hpSizes';
import { createPeddlerType } from '../../../../actions/peddlerType';


const CreatePeddlerType = ({ getHPSizes, getCompanies, createPeddlerType, company: { companies }, hpSize: { hpsizes } }) => {


    useEffect(() => {
        getHPSizes();
        getCompanies({categoryId: "6646461c3f25f68d99341a7a"});
    }, []);


    const [formData, setFormData] = useState({ hpsizeId: '', companyId: '', name: '' });
    const [errors, setErrors] = useState({});

    const [selectedHpSize, setSelectedHpSize] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(false);
    const navigate = useNavigate();

    function handleSelectedHpSize(selectedHpSize) {

        setFormData({ ...formData, hpsizeId: selectedHpSize.value });

        setSelectedHpSize(selectedHpSize.label);

    }

    function handleSelectedCompany(selectedCompany) {

        setFormData({ ...formData, companyId: selectedCompany.value });

        setSelectedCompany(selectedCompany.label);

    }


    const HpSizes = [];
    const Companies = [];

    hpsizes.forEach(row => HpSizes.push({ value: row._id, label: row.title }));
    companies.forEach(row => Companies.push({ value: row._id, label: row.name }));

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {

        setErrors({});



        if (!formData.hpsizeId) {
            setErrors({ ...errors, hpsizeId: 'Please select HP Size' });
            return false;
        }


        if (!formData.companyId) {
            setErrors({ ...errors, companyId: 'Please select company' });
            return false;
        }


        if (!formData.name) {
            setErrors({ ...errors, name: 'Please enter  name' });
            return false;
        }

        return true;
    }

    const handleSubmit = () => {

        if (!validateForm()) {
            return false;
        }
        createPeddlerType(formData);

        navigate('/peddler-types');
    }


    document.title = "Create Peddler Type| Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Create Peddler Type" pageTitle="Peddler Type Management" />
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <PreviewCardHeader title="Create Peddler Type" />

                                    <CardBody className="card-body">
                                        <div className="live-preview">
                                            <Row className="gy-4">

                                                <Col xxl={4} md={4}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">HP Size</Label>
                                                        <Select onChange={handleSelectedHpSize} options={HpSizes} />
                                                        {errors && errors.hpsizeId ? (
                                                            <div className="text-danger">
                                                                {errors.hpsizeId}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </Col>
                                                <Col xxl={4} md={4}>
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
                                                <Col xxl={4} md={4}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Peddler type</Label>
                                                        <Input type="text" onChange={e => onChange(e)} className="form-control" name="name" id="name" placeholder="Peddler type" />
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
                                            <Link to="/peddler-types" className='btn btn-primary'>Cancel</Link>
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


CreatePeddlerType.propTypes = {
    createPeddlerType: PropTypes.func.isRequired,
    getHPSizes: PropTypes.func.isRequired,
    getCompanies: PropTypes.func.isRequired,
    company: PropTypes.object.isRequired,
    hpSize: PropTypes.object.isRequired,

}


const mapStateToProps = state => ({
    hpSize: state.hpSize,
    company: state.company,
});

export default connect(mapStateToProps, { createPeddlerType, getHPSizes, getCompanies })(CreatePeddlerType);

