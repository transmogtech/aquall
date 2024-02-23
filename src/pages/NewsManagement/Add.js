import React, { useState} from 'react';
import UiContent from "../../Components/Common/UiContent";

//import Components
import BreadCrumb from '../../Components/Common/BreadCrumb';
import { Card, CardBody, Col, Container, Form, Input, Label, Row, CardFooter } from 'reactstrap';
import PreviewCardHeader from '../../Components/Common/PreviewCardHeader';
import {  Link } from 'react-router-dom';
import Select from "react-select";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ChangeStatus from './ChangeStatus';

const CreateNews = () => {

  const handleSubmit = () => {
    //return redirect('/news-management');
  }

  const [selectedLanguage, setSelectedLanguage] = useState(null);

    
    function handleSelectLanugage(selectedLanguage) {
        setSelectedLanguage(selectedLanguage);
    }

  const Languages  = [
    { value: '01', label: 'English' },
    { value: '02', label: 'Telugu' }
  ];


    document.title = "Create News | Aquall Admin";
    return (
        <React.Fragment>
            <UiContent />
            <div className="page-content">

                <Container fluid>
                    <BreadCrumb title="Create News" pageTitle="News Management" />
                    <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); return false;  }}  action="#">
                    <Row>
                        <Col lg={12}>
                            <Card>
                                <PreviewCardHeader title="Create News" />

                                <CardBody className="card-body">
                                    <div className="live-preview">
                                        <Row className="gy-4">
                                          
                                       
                                        <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="basiInput" className="form-label">Title</Label>
                                                    <Input type="text" className="form-control" id="title" placeholder="Title" />
                                                </div>
                                            </Col>

                                            <Col xxl={3} md={6}>
                                                <div>
                                                    <Label htmlFor="basiInput" className="form-label">URL Slug</Label>
                                                    <Input type="text" className="form-control" id="title" placeholder="URL Slug" />
                                                </div>
                                            </Col>
                                            <Col xxl={6} md={6}>
                                              <label className="form-label">Language: </label>
                                              <Select value={selectedLanguage}  onChange={() => {  handleSelectLanugage(); }}  options={Languages}  />

                                            </Col>

                                            <Col lg={6} >
                                                    <div>
                                                    <Label htmlFor="basiInput" className="form-label">Image</Label>
                                                        <Input type="file" className="form-control" id="inputGroupFile02" />
                                                      
                                                    </div>
                                                </Col>
                                                <Col lg={6} >
                                                    <div>
                                                    <Label htmlFor="basiInput" className="form-label">Youtube Video URL</Label>
                                                        <Input type="text" className="form-control" id="inputGroupFile02" />
                                                      
                                                    </div>
                                                </Col>
                                            <Col xxl={12} md={12}>
                                                <div>
                                                    <Label htmlFor="description" className="form-label">Description</Label>
                                                    <CKEditor
                                                            editor={ClassicEditor}
                                                            data="<p>Hello from CKEditor 5!</p>"
                                                            onReady={(editor) => {
                                                                // You can store the "editor" and use when it is needed.

                                                            }}
                                                            onChange={(editor) => {
                                                                editor.getData();
                                                            }}
                                                        />
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
                                                    <Label htmlFor="description" className="form-label">Meta Title</Label>
                                                    <textarea className="form-control" placeholder="Meta Title" id="description" rows="3"></textarea>
                                                </div>
                                            </Col>
                                            <Col xxl={12} md={12}>
                                                <div>
                                                    <Label htmlFor="description" className="form-label">Meta Description</Label>
                                                    <textarea className="form-control" placeholder="Meta Description" id="description" rows="3"></textarea>
                                                </div>
                                            </Col>
                                            <Col xxl={12} md={12}>
                                                <div>
                                                    <Label htmlFor="description" className="form-label">Meta Keywords</Label>
                                                    <textarea className="form-control" placeholder="Meta Keywords" id="description" rows="3"></textarea>
                                                </div>
                                            </Col>


                                        </Row>

                                    </div>
                                  
                                </CardBody>
                                <CardFooter>
                                <div class="d-flex align-items-start gap-3 mt-4">
                                  {/* <button type="submit" class="btn btn-success btn-label right ms-auto nexttab nexttab" data-nexttab="pills-info-desc-tab"><i class="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Save</button> */}
                                  <Link to="/news-management" className="btn btn-success btn-label right ms-auto nexttab nexttab" ><i className="ri-arrow-right-line label-icon align-middle fs-16 ms-2"></i>Save</Link>
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

export default CreateNews;