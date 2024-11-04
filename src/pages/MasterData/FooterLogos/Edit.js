import React, { useState, useEffect } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { updateFooterLogo, getFooterLogo } from '../../../actions/footerLogo';

import { getCompanies } from '../../../actions/company';
import { useNavigate, useParams, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from "react-select";

import Loader from '../../../Components/Common/Loader';


const EditFooterLogo = ({ updateFooterLogo, getFooterLogo, getCompanies, company: { companies } }) => {
    let { id } = useParams();
    const [footerlogo, setFooterlogo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [formData, setFormData] = useState();


    useEffect(() => {
        getCompanies();
        const fetchtData = async () => {
            const response = await getFooterLogo(id);
            setFooterlogo(response);
            setFormData({ ...formData, company: response.company._id, priority: response.priority });
            setSelectedCompany(response.company.name);
        }
        fetchtData();
        setLoading(false);

    }, []); // eslint-disable-line




    const navigate = useNavigate();


    const deleteImage = () => {
        setFooterlogo({ ...footerlogo, logo: null });
    }

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            // console.log(e.target.files);
            setFormData({ ...formData, logo: e.target.files[0] });
        }
    };


    function handleSelectCompany(selectedCompany) {

        setFormData({ ...formData, company: selectedCompany.value });

        setSelectedCompany(selectedCompany.label);
    }


    const Company = [];

    companies.forEach(company => {
        Company.push({ value: company._id, label: company.name });
    });

    const handleSubmit = () => {
        updateFooterLogo(id, formData);

        navigate('/footer-logos');
    }
    document.title = "Edit Footer Logo | Aquall Admin";
    return (
        <React.Fragment>
            {
                loading ? (<Loader />) : (
                    <>
                        <UiContent />
                        <div className="page-content">

                            <Container fluid>
                                <BreadCrumb title="Edit Footer Logo" pageTitle="Footer Logo Management" />
                                <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                                    <Row>
                                        <Col lg={12}>
                                            <Card>
                                                <PreviewCardHeader title="Edit Footer Logo  " />

                                                <CardBody className="card-body">
                                                    <div className="live-preview">
                                                        <Row className="gy-4">


                                                            <Col xxl={3} md={6}>
                                                                <div>
                                                                    <Label htmlFor="title" className="form-label">Company</Label>
                                                                    <Select value={{ label: selectedCompany }} onChange={handleSelectCompany} options={Company} />
                                                                </div>
                                                            </Col>

                                                            <Col xxl={3} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Logo</Label>

                                                                    {footerlogo.logo ? (
                                                                        <div class="img-wrap">
                                                                            <span class="close" onClick={() => deleteImage()}>&times;</span>
                                                                            <img src={`${process.env.REACT_APP_API_URL}/${footerlogo.logo}`} width="50" />
                                                                        </div>
                                                                    ) : <Input type="file" className="form-control" onChange={handleFileChange} name="logo" id="logo" placeholder="Logo" />}
                                                                </div>
                                                            </Col>

                                                            <Col xxl={3} md={6}>
                                                                <div>
                                                                    <Label htmlFor="basiInput" className="form-label">Priority</Label>
                                                                    <Input type="number" className="form-control" onChange={e => onChange(e)} name="priority" id="priority" placeholder="Priority" defaultValue={footerlogo.priority} />
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
                    </>)}
        </React.Fragment>
    );
}


EditFooterLogo.propTypes = {
    updateFooterLogo: PropTypes.func.isRequired,
    getFooterLogo: PropTypes.func.isRequired,
    company: PropTypes.object.isRequired,

}


const mapStateToProps = state => ({
    company: state.company,
});
export default connect(mapStateToProps, { updateFooterLogo, getFooterLogo, getCompanies })(EditFooterLogo);