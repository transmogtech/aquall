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
import { getHPSizes } from '../../../../actions/hpSizes';
import { updatePeddlerType, getPeddlerType } from '../../../../actions/peddlerType';
import Loader from '../../../../Components/Common/Loader';


const EditPeddlerType = ({ getHPSizes, getCompanies, updatePeddlerType, getPeddlerType, company: { companies }, hpSize: { hpsizes } }) => {
    const { id } = useParams();
    const [peddlertype, setPeddlerType] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedHpSize, setSelectedHpSize] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(null);

    useEffect(() => {
        getHPSizes();
        getCompanies();
        const fetchtData = async () => {
            const response = await getPeddlerType(id);
            setPeddlerType(response);
            setSelectedHpSize(response.hpsizeId.title);
            setSelectedCompany(response.companyId.name);
        }
        fetchtData();
        setLoading(false);
    }, []);


    const navigate = useNavigate();
    const [formData, setFormData] = useState();

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

    const handleSubmit = () => {


        updatePeddlerType(id, formData);

        navigate('/peddler-types');
    }


    document.title = "Create Peddler Type| Aquall Admin";
    return (
        <React.Fragment>
            {
                loading ? (<Loader />) : (<Fragment>
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
                                                                <Label htmlFor="basiInput" className="form-label">Culture Type</Label>
                                                                <Select value={{ label: selectedHpSize }} onChange={handleSelectedHpSize} options={HpSizes} />
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
                                                                <Input type="text" onChange={e => onChange(e)} className="form-control" name="name" id="name" placeholder="Name" defaultValue={peddlertype.name} />
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


EditPeddlerType.propTypes = {
    updatePeddlerType: PropTypes.func.isRequired,
    getHPSizes: PropTypes.func.isRequired,
    getCompanies: PropTypes.func.isRequired,
    getPeddlerType: PropTypes.func.isRequired,
    company: PropTypes.object.isRequired,
    hpSize: PropTypes.object.isRequired,

}


const mapStateToProps = state => ({
    hpSize: state.hpSize,
    company: state.company,
});

export default connect(mapStateToProps, { updatePeddlerType, getHPSizes, getCompanies, getPeddlerType })(EditPeddlerType);

