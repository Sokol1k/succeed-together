import React, { Component } from 'react';
import Services from '../../services';
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Form, Button } from 'react-bootstrap';
import privateListValidator from '../../validation/PrivateList';
import { connect } from "react-redux";
import { privateList } from "../../store/privateList/actions";

import "./style.css";

class AddPrivateList extends Component {

    constructor(props) {
        super();

        this.state = {
            isOpen: false,
            title: '',
            
            classTitleGroup: '',
            classTitleInput: '',
            titleErrorMessage: null
        }

        this.openAddPrivateList = this.openAddPrivateList.bind(this);
        this.clearValid = this.clearValid.bind(this);
        this.showNotValidData = this.showNotValidData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitAddPrivateList = this.submitAddPrivateList.bind(this);
    }

    clearValid() {

        this.setState({
            classTitleGroup: '',
            classTitleInput: '',
            titleErrorMessage: null
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
    }

    handleChange(e) {
        let target = e.target;
        let value = target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    openAddPrivateList() {
        this.setState({
            isOpen: !this.state.isOpen,
            title: ''
        })

        this.clearValid();
    }

    async submitAddPrivateList(e) {
        e.preventDefault();

        this.clearValid();

        let isValid = privateListValidator(this.state);

        if (!Object.keys(isValid).length) {
            let length = this.props.length;

            await Services
                .post('/private_lists', { title: this.state.title, index: ++length })
                .then(async response => {
                    this.clearValid()
                    this.openAddPrivateList()
                    this.props.privateList(await Services.get('/private_lists'));
                })
        } else {
            this.showNotValidData(isValid)
        }
    }

    render() {

        const { 
            isOpen,
            title,
            classTitleGroup,
            classTitleInput,
            titleErrorMessage 
        } = this.state;

        return (
            <React.Fragment>
                {
                    isOpen
                        ?
                        <div className="add-private-list">
                            <Form onSubmit={this.submitAddPrivateList}>
                                <Form.Group className={classTitleGroup}>
                                    <Form.Label className="add-private-list__title">Title of the list</Form.Label>
                                    <Form.Control name="title" onChange={this.handleChange} value={title}
                                        placeholder="Enter the title of the list" className={classTitleInput}></Form.Control>
                                    <Form.Control.Feedback type="invalid">{titleErrorMessage}</Form.Control.Feedback>
                                </Form.Group>

                                <div className="d-flex justify-content-between align-items-center">
                                    <Button type="submit" className="add-private-list__btn-submit">Add a list</Button>
                                    <IoMdClose className="add-private-list__btn-close" onClick={this.openAddPrivateList} />
                                </div>
                            </Form>
                        </div>
                        :
                        <button onClick={this.openAddPrivateList} className="add-private-list__btn-add-column">
                            <FaPlus className="mr-3" />
                            Add a list
                        </button>
                }
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = {
    privateList
};

export default connect(null, mapDispatchToProps)(AddPrivateList);