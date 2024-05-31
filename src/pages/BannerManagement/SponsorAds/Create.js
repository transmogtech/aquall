import React, { useState } from 'react';
import UiContent from "../../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../../Components/Common/PreviewCardHeader';
import { useNavigate } from 'react-router-dom';
import { createSponsoredAd } from '../../../actions/sponsoredAd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const CreateSponsorAd = ({ createSponsoredAd }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState();

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    
const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        // console.log(e.target.files);
        setFormData({...formData, image: e.target.files[0] });
    }
  };

  
    const handleSubmit = () => {
        createSponsoredAd(formData);

        navigate('/sponsor-ads');
    }


    document.title = "Create Sponsor Ad | Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Create Sponsor Ad" pageTitle="Sponsor Ad Management" />
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false; }} action="#">
                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <PreviewCardHeader title="Create Sponsor Ad" />

                                    <CardBody className="card-body">
                                        <div className="live-preview">
                                            <Row className="gy-4">

                                       
                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Sponsor Name</Label>
                                                        <Input type="text" className="form-control" name="name" placeholder="Sponsor Name"  onChange={e => onChange(e)} />
                                                    </div>
                                                </Col>

                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Discount %</Label>
                                                        <Input type="number" className="form-control" name="discount" placeholder="Discount" onChange={e => onChange(e)} />
                                                    </div>
                                                </Col>
                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Image</Label>
                                                        <Input type="file" className="form-control" id="title" onChange={handleFileChange} />
                                                    </div>
                                                </Col>
                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">URL</Label>
                                                        <Input type="text" className="form-control" name="url" placeholder="URL" onChange={e => onChange(e)} />
                                                    </div>
                                                </Col>
                                                <Col xxl={3} md={6}>
                                                    <div>
                                                        <Label htmlFor="basiInput" className="form-label">Priority</Label>
                                                        <Input type="text" className="form-control" name="priority" placeholder="Priority" onChange={e => onChange(e)} />
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

CreateSponsorAd.propTypes = {
    createSponsoredAd: PropTypes.func.isRequired,
}

export default connect(null, { createSponsoredAd })(CreateSponsorAd);
