import React, { Component } from 'react';
import Services from '../../services';
import publicationValidator from '../../validation/Publication';
import { IoMdClose } from "react-icons/io";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Form, Button } from 'react-bootstrap';

import "./style.css";

class AddPublication extends Component {

    constructor() {
        super();

        this.state = {
            title: '',
            description: '',

            isOpenAddPublication: false,

            classTitleGroup: '',
            classTitleInput: '',
            titleErrorMessage: null,
            classDescriptionGroup: '',
            classDescriptionInput: '',
            descriptionErrorMessage: null,
        }

        this.handleChange = this.handleChange.bind(this);
        this.openAddPublication = this.openAddPublication.bind(this);
        this.submitAddPublication = this.submitAddPublication.bind(this);
        this.clearValid = this.clearValid.bind(this);
        this.showNotValidData = this.showNotValidData.bind(this);
    }

    openAddPublication() {
        this.setState({
            isOpenAddPublication: !this.state.isOpenAddPublication,
            title: '',
            description: '',
        })
    }

    clearValid() {

        this.setState({
            classTitleGroup: '',
            classTitleInput: '',
            titleErrorMessage: null,
            classDescriptionGroup: '',
            classDescriptionInput: '',
            descriptionErrorMessage: null,
        })
    }

    showNotValidData(isValid) {
        if (isValid.title) {
            this.setState({
                classTitleGroup: 'has-error',
                classTitleInput: 'is-invalid',
                titleErrorMessage: isValid.title
            })
        }

        if (isValid.description) {
            this.setState({
                classDescriptionGroup: 'has-error',
                classDescriptionInput: 'is-invalid',
                descriptionErrorMessage: isValid.description
            })
        }
    }

    async submitAddPublication(e) {
        e.preventDefault();

        this.clearValid();

        let isValid = publicationValidator(this.state);

        if (!Object.keys(isValid).length) {
            await Services
                .post('/publications', { title: this.state.title, description: this.state.description })
                .then(response => {
                    this.clearValid();
                    this.openAddPublication();
                    this.props.profile();
                });
        } else {
            this.showNotValidData(isValid)
        }
    }

    handleChange(e) {
        let target = e.target;
        let value = target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        const { 
            title, 
            description, 
            isOpenAddPublication,
            classTitleGroup,
            classTitleInput,
            titleErrorMessage,
            classDescriptionGroup,
            classDescriptionInput,
            descriptionErrorMessage,
        } = this.state;
        return (
            <div className="add-publication">
                {
                    isOpenAddPublication
                        ?
                        <Form className="p-4 position-relative" onSubmit={this.submitAddPublication}>

                            <IoMdClose className="add-publication__btn-close" onClick={this.openAddPublication} />

                            <Form.Group className={`d-flex flex-column text-left mb-2 ${classTitleGroup}`}>
                                <Form.Label>Title<span className="text-danger">*</span></Form.Label>
                                <Form.Control name="title" onChange={this.handleChange}
                                    value={title || ""} as="textarea" rows="3" placeholder="Enter title"
                                    className={classTitleInput}></Form.Control>
                                <Form.Control.Feedback type="invalid">{titleErrorMessage}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className={`d-flex flex-column text-left mb-4 ${classDescriptionGroup}`}>
                                <Form.Label>Description<span className="text-danger">*</span></Form.Label>
                                <Form.Control name="description" onChange={this.handleChange}
                                    value={description || ""} as="textarea" rows="3" placeholder="Enter description"
                                    className={classDescriptionInput}></Form.Control>
                                <Form.Control.Feedback type="invalid">{descriptionErrorMessage}</Form.Control.Feedback>
                            </Form.Group>

                            <Button className="add-publication__btn-submit" type="submit">Submit</Button>

                        </Form>
                        :
                        <AiOutlinePlusCircle className="add-publication-btn-open" onClick={this.openAddPublication} />
                }
            </div>
        )
    }
}

export default AddPublication