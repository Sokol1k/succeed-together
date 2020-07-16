import React, { Component } from 'react';
import Services from '../../services';
import commentValidator from '../../validation/Comment';
import { Form, Button } from 'react-bootstrap';

import "./style.css";

class AddComment extends Component {
    constructor(props) {
        super();

        this.state = {
            id: props.id,
            comment: '',

            classCommentGroup: '',
            classCommentInput: '',
            commentErrorMessage: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.submitAddComment = this.submitAddComment.bind(this);
        this.clearValid = this.clearValid.bind(this);
        this.showNotValidData = this.showNotValidData.bind(this);
    }

    clearValid() {

        this.setState({
            classCommentGroup: '',
            classCommentInput: '',
            commentErrorMessage: null
        })
    }

    showNotValidData(isValid) {
        if (isValid.comment) {
            this.setState({
                classCommentGroup: 'has-error',
                classCommentInput: 'is-invalid',
                commentErrorMessage: isValid.comment
            })
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


    async submitAddComment(e) {
        e.preventDefault();

        this.clearValid();

        let isValid = commentValidator(this.state);

        if (!Object.keys(isValid).length) {
            await Services
                .post(`/publications/${this.state.id}/comments`, { text: this.state.comment })
                .then(response => {
                    this.setState({
                        comment: ''
                    });
                    this.clearValid();
                    this.props.profile();
                });
        } else {
            this.showNotValidData(isValid)
        }
    }

    render() {
        const {
            comment,
            classCommentGroup,
            classCommentInput,
            commentErrorMessage
        } = this.state;
        return (
            <div className="mb-2">
                <div className="add-comment__title">
                    Comments
                </div>
                <Form className="mt-3 d-flex position-relative" onSubmit={this.submitAddComment}>
                    <Form.Group className={`w-100 ${classCommentGroup}`}>
                        <Form.Control name="comment" onChange={this.handleChange} value={comment}
                            placeholder="Enter your comment" className={`add-comment__input ${classCommentInput}`}></Form.Control>
                        <Form.Control.Feedback type="invalid">{commentErrorMessage}</Form.Control.Feedback>
                    </Form.Group>

                    <Button className="add-comment__btn-submit" type="submit">Submit</Button>
                </Form>
            </div>
        );
    }
}

export default AddComment;