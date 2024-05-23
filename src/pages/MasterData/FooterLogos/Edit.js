import React, {useState}  from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { updateFooterLogo } from '../../../actions/footerLogo';
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import Select from "react-select";



const EditFooterLogo = ({updateFooterLogo}) => {
    let {id } = useParams();

    const footerlogos = useSelector(state => state.footerLogo.footerlogos);
    const footerlogo = footerlogos.find(footerlogo => footerlogo._id === id);

    const navigate = useNavigate();
    const [formData, setFormData] = useState();
    const [selectedCompany, setSelectedCompany] = useState(footerlogo.company);


    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    
const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        // console.log(e.target.files);
        setFormData({...formData, logo: e.target.files[0] });
    }
  };

  
  function handleSelectCompany(selectedCompany) {

    setFormData({...formData, company: selectedCompany.value });

    setSelectedCompany(selectedCompany.label);
}


  const company = [
    { value: "01", label: "APEX FROZEN LIMITED" },
    { value: "02", label: "KRISHNA CHEMICALS" },
    { value: "03", label: "Vannamei" },
];

    const handleSubmit = () => {
        updateFooterLogo(id, formData);

        navigate('/footer-logos');
    }
    document.title = "Edit Category | Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Edit Category" pageTitle="Category Management" />
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <PreviewCardHeader title="Edit Category" />

                                    <CardBody className="card-body">
                                        <div className="live-preview">
                                            <Row className="gy-4">


                                            <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="title" className="form-label">Company</Label>
                                                        <Select value={{label: selectedCompany}} onChange={handleSelectCompany} options={company} />
                                                    </div>
                                                </Col>

                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Logo</Label>
                                                        <Input type="file" className="form-control" onChange={handleFileChange} name="logo" id="logo" placeholder="Logo" />
                                                    </div>
                                                </Col>

                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Priority</Label>
                                                        <Input type="number" className="form-control" onChange={e => onChange(e)} name="priority" id="priority" placeholder="Priority" defaultValue={footerlogo.priority} />
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


EditFooterLogo.propTypes = {
    updateFooterLogo: PropTypes.func.isRequired,
}

export default connect(null, {updateFooterLogo})(EditFooterLogo);