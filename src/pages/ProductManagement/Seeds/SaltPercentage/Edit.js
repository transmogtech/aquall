import React, { useState, useEffect, Fragment } from 'react';
import UiContent from "../../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../../../Components/Common/PreviewCardHeader';
import { useNavigate, useParams } from 'react-router-dom';
import Select from "react-select";
import { getCompanies } from '../../../../actions/company';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCultureTypes } from '../../../../actions/cultureType';
import { getPlStages } from '../../../../actions/plStages';
import { updateSaltPercentage, getSaltPercentage } from '../../../../actions/saltPercentage';

import Loader from '../../../../Components/Common/Loader';

const EditSaltPercentage = ({ getCultureTypes, getCompanies, getPlStages, getSaltPercentage, updateSaltPercentage, company: { companies }, cultureType: { culturetypes }, plStage: { plstages } }) => {
    const { id } = useParams();
    const [saltpercentage, setSaltPercentage] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedCultureType, setSelectedCultureType] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [selectedPlStage, setSelectedPlStage] = useState(null);

    useEffect(() => {
        getCultureTypes();
        getCompanies();
        getPlStages();
        getSaltPercentage(id);
        const fetchtData = async () => {
            const response = await getSaltPercentage(id);
            setSaltPercentage(response);
            setSelectedCultureType(response.culturetypeId.title);
            setSelectedCompany(response.companyId.name);
            setSelectedPlStage(response.plstageId.name);
        }
        fetchtData();
        setLoading(false);

    }, []);


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

    const handleSubmit = () => {


        updateSaltPercentage(id, formData);

        navigate('/salt-percentage');
    }


    document.title = "Create Salt Percentage| Aquall Admin";
    return (
        <React.Fragment>
            {
                loading ? (<Loader />) : (<Fragment>
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

                                                        <Col xxl={3} md={3}>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">Culture Type</Label>
                                                                <Select value={{ label: selectedCultureType }} onChange={handleSelectedCultureType} options={CultureTypes} />
                                                            </div>
                                                        </Col>

                                                        <Col xxl={3} md={3}>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">Company</Label>
                                                                <Select value={{ label: selectedCompany }} onChange={handleSelectedCompany} options={Companies} />
                                                            </div>
                                                        </Col>

                                                        <Col xxl={3} md={3}>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">Pl Stage</Label>
                                                                <Select value={{ label: selectedPlStage }} onChange={handleSelectedPlStage} options={PlStages} />
                                                            </div>
                                                        </Col>

                                                        <Col xxl={3} md={3}>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">Name</Label>
                                                                <Input type="text" onChange={e => onChange(e)} className="form-control" name="name" id="name" placeholder="Name" defaultValue={saltpercentage.name} />
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
                </Fragment>)}

        </React.Fragment>
    );
}


EditSaltPercentage.propTypes = {
    updateSaltPercentage: PropTypes.func.isRequired,
    getCultureTypes: PropTypes.func.isRequired,
    getCompanies: PropTypes.func.isRequired,
    getPlStages: PropTypes.func.isRequired,
    getSaltPercentage: PropTypes.func.isRequired,
    company: PropTypes.object.isRequired,
    cultureType: PropTypes.object.isRequired,
}


const mapStateToProps = state => ({
    cultureType: state.cultureType,
    company: state.company,
    plStage: state.plStage,
});

export default connect(mapStateToProps, { getPlStages, updateSaltPercentage, getSaltPercentage, getCultureTypes, getCompanies })(EditSaltPercentage);

