import React, {useState, useEffect} from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter, Button } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { useNavigate, useParams } from 'react-router-dom';
import { updateDistrict } from '../../../actions/district';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { getStates } from '../../../actions/state';
import Select from "react-select";


const EditDistrict = ({updateDistrict, getStates, state: { states }}) => {

   
    let {id } = useParams();

    const districts = useSelector(state => state.district.districts);
    const district = districts.find(district => district._id === id);
    const [selectedState, setSelectedState] = useState(null);

    const navigate = useNavigate();
    const [formData, setFormData] = useState();

    useEffect(() => {
        getStates();
      }, [getStates]);
      
    
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    function handleSelectState(selectedState) {

        setFormData({...formData, stateId: selectedState.value });
        console.log(selectedState.value);

        setSelectedState(selectedState.value);
    }
    const States  = [];

    states.forEach(row => States.push({ value: row._id, label: row.title}));
  

    const handleSubmit = () => {
        updateDistrict(id, formData);

        navigate('/districts');
    }


    document.title = "Edit District | Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Edit District" pageTitle="District Management" />
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <PreviewCardHeader title="Edit District" />

                                    <CardBody className="card-body">
                                        <div className="live-preview">
                                            <Row className="gy-4">
     
                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="basiInput" className="form-label">State</Label>
                                                    <Select value={selectedState}  onChange={handleSelectState}  options={States}  />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Title</Label>
                                                        <Input type="text" onChange={e => onChange(e)} className="form-control" name="title" id="title" placeholder="Title" defaultValue={district.title} />
                                                    </div>
                                                </Col>

                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">URL Slug</Label>
                                                        <Input type="text" onChange={e => onChange(e)} className="form-control" name="url" id="url" placeholder="URL Slug" defaultValue={district.url} />
                                                    </div>
                                                </Col>

                                            </Row>

                                        </div>

                                    </CardBody>
                                </Card>
                            </Col>

                        </Row>



                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <PreviewCardHeader title="Meta Data" />

                                    <CardBody className="card-body">
                                        <div className="live-preview">

                                            <Row className="gy-4">

                                            <Col xxl={12} md={12}>
                                                    <div>
                                                        <Label htmlFor="metaTitle" className="form-label">Meta Title</Label>
                                                        <textarea className="form-control" onChange={e => onChange(e)} placeholder="Meta Title" id="metaTitle" name='metaTitle' rows="3" defaultValue={district.metaTitle}></textarea>
                                                    </div>
                                                </Col>
                                                <Col xxl={12} md={12}>
                                                    <div>
                                                        <Label htmlFor="metaDescription" className="form-label">Meta Description</Label>
                                                        <textarea className="form-control" onChange={e => onChange(e)} placeholder="Meta Description" id="metaDescription" name='metaDescription' rows="3" defaultValue={district.metaDescription}></textarea>
                                                    </div>
                                                </Col>
                                                <Col xxl={12} md={12}>
                                                    <div>
                                                        <Label htmlFor="metaKeywords" className="form-label">Meta Keywords</Label>
                                                        <textarea className="form-control" onChange={e => onChange(e)} placeholder="Meta Keywords" name="metaKeywords" id="metaKeywords" rows="3" defaultValue={district.metaKeywords}></textarea>
                                                    </div>
                                                </Col>


                                            </Row>

                                        </div>

                                    </CardBody>
                                    <CardFooter>
                                        <div className="d-flex align-items-start gap-3 mt-4">

                                        <Button type="submit" className="btn btn-success btn-label right ms-auto nexttab nexttab" data-nexttab="pills-info-desc-tab"><i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Save</Button>
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

EditDistrict.propTypes = {
    updateDistrict: PropTypes.func.isRequired,
    getStates: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
}


const mapStateToProps = state => ({
    state: state.state,
  });
  

export default connect(mapStateToProps, {updateDistrict, getStates})(EditDistrict);
