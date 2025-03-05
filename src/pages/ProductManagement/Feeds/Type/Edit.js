import React, { useState, useEffect, Fragment } from 'react';
import UiContent from "../../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../../../Components/Common/PreviewCardHeader';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Select from "react-select";
import { getCompanies } from '../../../../actions/company';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCultureTypes } from '../../../../actions/cultureType';
import { updateFeedType, getFeedType } from '../../../../actions/feedType';
import Loader from '../../../../Components/Common/Loader';


const EditFeedType = ({ getCultureTypes, getCompanies, updateFeedType, getFeedType, company: { companies }, cultureType: { culturetypes } }) => {
    const { id } = useParams();
    const [feedtype, setFeedType] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedCultureType, setSelectedCultureType] = useState(null);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState();

    useEffect(() => {
        getCultureTypes();
        getCompanies({categoryId: "664645eb3f25f68d99341a71"});
        const fetchtData = async () => {
            const response = await getFeedType(id);
            setFeedType(response);
            setSelectedCultureType(response.culturetypeId.title);
            setSelectedCompany(response.companyId.name);
            setFormData({ name: response.name, culturetypeId: response.culturetypeId._id, companyId: response.companyId._id });
        }
        fetchtData();
        setLoading(false);
    }, []);



    const navigate = useNavigate();

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

        updateFeedType(id, formData);

        navigate('/feed-types');
    }


    document.title = "Edit Feed Type| Aquall Admin";
    return (
        <React.Fragment>
            {
                loading ? (<Loader />) : (<Fragment>
                    <UiContent />
                    <div className="page-content">

                        <Container fluid>
                            <BreadCrumb title="Edit Feed Type" pageTitle="Feed Type Management" />
                            <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                                <Row>
                                    <Col lg={12}>
                                        <Card>
                                            <PreviewCardHeader title="Edit Feed Type" />

                                            <CardBody className="card-body">
                                                <div className="live-preview">
                                                    <Row className="gy-4">

                                                        <Col xxl={4} md={4}>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">Culture Type</Label>
                                                                <Select value={{ label: selectedCultureType }} onChange={handleSelectedCultureType} options={CultureTypes} />
                                                                {errors && errors.culturetypeId ? (
                                                                    <div className="text-danger">
                                                                        {errors.culturetypeId}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col xxl={4} md={4}>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">Company</Label>
                                                                <Select value={{ label: selectedCompany }} onChange={handleSelectedCompany} options={Companies} />
                                                                {errors && errors.companyId ? (
                                                                    <div className="text-danger">
                                                                        {errors.companyId}
                                                                    </div>
                                                                ) : null}
                                                            </div>
                                                        </Col>
                                                        <Col xxl={4} md={4}>
                                                            <div>
                                                                <Label htmlFor="basiInput" className="form-label">Feed Type</Label>
                                                                <Input type="text" onChange={e => onChange(e)} className="form-control" name="name" id="name" placeholder="Feed Type" defaultValue={feedtype.name} />
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
                                                    <Link to="/feed-types" className='btn btn-primary'>Cancel</Link>
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


EditFeedType.propTypes = {
    updateFeedType: PropTypes.func.isRequired,
    getCultureTypes: PropTypes.func.isRequired,
    getCompanies: PropTypes.func.isRequired,
    getFeedType: PropTypes.func.isRequired,
    company: PropTypes.object.isRequired,
    cultureType: PropTypes.object.isRequired,

}


const mapStateToProps = state => ({
    cultureType: state.cultureType,
    company: state.company,
});

export default connect(mapStateToProps, { updateFeedType, getCultureTypes, getCompanies, getFeedType })(EditFeedType);

