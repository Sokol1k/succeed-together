import React, { Component } from 'react';
import Services from '../../services';
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Form, Button } from 'react-bootstrap';
import privateTaskValidator from '../../validation/PrivateTask';

import "./style.css";

class AddPrivateTask extends Component {

    constructor(props) {
        super();

        this.state = {
            isOpen: false,

            text: '',
            date: '',
            deadline: '',

            classTextGroup: '',
            classTextInput: '',
            textErrorMessage: null,

            classDateGroup: '',
            classDateInput: '',
            dateErrorMessage: null,

            classDeadlineGroup: '',
            classDeadlineInput: '',
            deadlineErrorMessage: null,
        }

        this.openAddPrivateTask = this.openAddPrivateTask.bind(this);
        this.submitAddPrivateTask = this.submitAddPrivateTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clearValid = this.clearValid.bind(this);
        this.showNotValidData = this.showNotValidData.bind(this);
    }

    openAddPrivateTask() {
        this.clearValid();
        this.setState({
            isOpen: !this.state.isOpen,
            text: '',
            date: '',
            deadline: '',

        })
    }

    clearValid() {

        this.setState({
            classTextGroup: '',
            classTextInput: '',
            textErrorMessage: null,

            classDateGroup: '',
            classDateInput: '',
            dateErrorMessage: null,

            classDeadlineGroup: '',
            classDeadlineInput: '',
            deadlineErrorMessage: null,
        })
    }

    showNotValidData(isValid) {
        if (isValid.text) {
            this.setState({
                classTextGroup: 'has-error',
                classTextInput: 'is-invalid',
                textErrorMessage: isValid.text,
            })
        }

        if (isValid.date) {
            this.setState({
                classDateGroup: 'has-error',
                classDateInput: 'is-invalid',
                dateErrorMessage: isValid.date,
            })
        }

        if (isValid.deadline) {
            this.setState({
                classDeadlineGroup: 'has-error',
                classDeadlineInput: 'is-invalid',
                deadlineErrorMessage: isValid.deadline,
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

    async submitAddPrivateTask(e) {
        e.preventDefault();

        this.clearValid();

        let isValid = privateTaskValidator(this.state);

        if (!Object.keys(isValid).length) {
            await Services
                .post(`/private_lists/${this.props.privateListId}/private_tasks`, {
                    text: this.state.text,
                    date: this.state.date || null,
                    deadline: this.state.deadline || null,
                })
                .then(async response => {
                    this.openAddPrivateTask();
                    this.props.privateTask();
                })
        } else {
            this.showNotValidData(isValid)
        }
    }

    render() {
        const { 
            date, 
            deadline, 
            text, 
            isOpen,

            classTextGroup,
            classTextInput,
            textErrorMessage,

            classDateGroup,
            classDateInput,
            dateErrorMessage,

            classDeadlineGroup,
            classDeadlineInput,
            deadlineErrorMessage,
        } = this.state;
        return (
            <div>
                {
                    isOpen
                        ?
                        <Form className="add-private-task__form" onSubmit={this.submitAddPrivateTask}>
                            <Form.Group className={classDateGroup}>
                                <Form.Label>Date of the start</Form.Label>
                                <Form.Control type="datetime-local" name="date" onChange={this.handleChange}
                                    value={date} className={classDateInput}></Form.Control>
                                <Form.Control.Feedback type="invalid">{dateErrorMessage}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className={classDeadlineGroup}>
                                <Form.Label>Deadline</Form.Label>
                                <Form.Control type="datetime-local" name="deadline" onChange={this.handleChange}
                                    value={deadline} className={classDeadlineInput}></Form.Control>
                                <Form.Control.Feedback type="invalid">{deadlineErrorMessage}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className={classTextGroup}>
                                <Form.Label>Task <span className="text-danger">*</span></Form.Label>
                                <Form.Control placeholder="Ender your task" name="text" onChange={this.handleChange}
                                    value={text} className={classTextInput}></Form.Control>
                                <Form.Control.Feedback type="invalid">{textErrorMessage}</Form.Control.Feedback>
                            </Form.Group>

                            <div className="add-private-task__form-bottom d-flex justify-content-between align-items-center">
                                <Button type="submit">Add task</Button>
                                <IoMdClose onClick={this.openAddPrivateTask} />
                            </div>
                        </Form>
                        :
                        <button className="add-private-task__btn-add" onClick={this.openAddPrivateTask}>
                            <FaPlus className="add-private-task__btn-add-plus" />
                            Add task
                        </button>
                }
            </div>
        )
    }
}

export default AddPrivateTask;