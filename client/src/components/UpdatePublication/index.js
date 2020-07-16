import React, { Component } from 'react';
import Services from '../../services';
import publicationValidator from '../../validation/Publication';
import { Form, Button } from 'react-bootstrap';

import "./style.css";

class UpdatePublication extends Component {
    constructor(props) {
        super();

        this.state = {
            id: props.id,
            title: props.title,
            description: props.description,

            classTitleGroup: '',
            classTitleInput: '',
            titleErrorMessage: null,
            classDescriptionGroup: '',
            classDescriptionInput: '',
            descriptionErrorMessage: null,
        }

        this.handleChange = this.handleChange.bind(this);
        this.submitAddPublication = this.submitAddPublication.bind(this);
        this.clearValid = this.clearValid.bind(this);
        this.showNotValidData = this.showNotValidData.bind(this);
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
                .put(`/publications/${this.state.id}`, { title: this.state.title, description: this.state.description })
                .then(response => {
                    this.clearValid();
                    this.props.openUpdate();
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
            classTitleGroup,
            classTitleInput,
            titleErrorMessage,
            classDescriptionGroup,
            classDescriptionInput,
            descriptionErrorMessage,
        } = this.state;
        return (
            <Form className="p-4 position-relative text-center" onSubmit={this.submitAddPublication}>

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

                <Button className="update-publication__btn-submit" type="submit">Submit</Button>

            </Form>
        )
    }
}

export default UpdatePublication;