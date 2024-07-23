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
import { updatePlStage, getPlStage } from '../../../../actions/plStages';
import Loader from '../../../../Components/Common/Loader';


const EditPlStage = ({ getCultureTypes, getCompanies, updatePlStage, getPlStage, company: { companies }, cultureType: { culturetypes } }) => {
    const { id } = useParams();
    const [plstage, setPlStage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCultureType, setSelectedCultureType] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(null);

    useEffect(() => {
        getCultureTypes();
        getCompanies();
        getPlStage(id);
        const fetchtData = async () => {
            const response = await getPlStage(id);
            setPlStage(response);
            setSelectedCultureType(response.culturetypeId.title);
            setSelectedCompany(response.companyId.name);
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


    const CultureTypes = [];
    const Companies = [];

    culturetypes.forEach(row => CultureTypes.push({ value: row._id, label: row.title }));
    companies.forEach(row => Companies.push({ value: row._id, label: row.name }));

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {


        updatePlStage(id, formData);

        navigate('/pl-stages');
    }


    document.title = "Create PL Stage| Aquall Admin";
    return (
        <React.Fragment>
            {
                loading ? (<Loader />) : (<Fragment><UiContent />
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
                                                                <Input type="text" onChange={e => onChange(e)} className="form-control" name="name" id="name" placeholder="Name" defaultValue={plstage.name} />
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


EditPlStage.propTypes = {
    updatePlStage: PropTypes.func.isRequired,
    getCultureTypes: PropTypes.func.isRequired,
    getCompanies: PropTypes.func.isRequired,
    getPlStage: PropTypes.func.isRequired,
    company: PropTypes.object.isRequired,
    cultureType: PropTypes.object.isRequired,

}


const mapStateToProps = state => ({
    cultureType: state.cultureType,
    company: state.company,
});

export default connect(mapStateToProps, { updatePlStage, getCultureTypes, getCompanies, getPlStage })(EditPlStage);

