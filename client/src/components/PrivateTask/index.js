import React, { Component } from 'react';
import Services from '../../services';
import {
    AiOutlineStar,
    AiFillStar
} from "react-icons/ai";
import { FaPen } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import moment from "moment";
import { Form, Button } from 'react-bootstrap';
import privateTaskValidator from '../../validation/PrivateTask';

import "./style.css";

class PrivateTask extends Component {
    constructor(props) {
        super();

        this.state = {
            id: props.task.id,
            text: props.task.text,
            favourite: props.task.favourite,
            date: props.task.date,
            deadline: props.task.deadline,
            status: props.task.status,

            showStatusOptions: false,

            isOpen: false,

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

        this.changeFavouriteTrue = this.changeFavouriteTrue.bind(this);
        this.changeFavouriteFalse = this.changeFavouriteFalse.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showStatus = this.showStatus.bind(this);
        this.changeShowStatusOptions = this.changeShowStatusOptions.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.delete = this.delete.bind(this);

        this.openUpdatePrivateTask = this.openUpdatePrivateTask.bind(this);
        this.submitUpdatePrivateTask = this.submitUpdatePrivateTask.bind(this);
        this.clearValid = this.clearValid.bind(this);
        this.showNotValidData = this.showNotValidData.bind(this);
    }

    openUpdatePrivateTask() {
        this.clearValid();
        this.setState({
            isOpen: !this.state.isOpen,
            text: this.props.task.text,
            date: this.props.task.date,
            deadline: this.props.task.deadline,
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

    changeShowStatusOptions() {
        this.setState({
            showStatusOptions: !this.state.showStatusOptions
        });
    }

    async changeStatus(e) {
        const data = {
            text: this.props.task.text,
            status: e.target.dataset.value,
            favourite: this.props.task.favourite,
            date: this.props.task.date ? moment(this.props.task.date).format('YYYY-MM-DD HH:mm:ss') : null,
            deadline: this.props.task.deadline ? moment(this.props.task.deadline).format('YYYY-MM-DD HH:mm:ss') : null,
        }
        await Services.put(`/private_lists/private_tasks/${this.props.task.id}`, data)
            .then(response => {
                this.setState({
                    status: data.status,
                    showStatusOptions: !this.state.showStatusOptions
                })
            })
    }

    showStatus() {
        const { status, showStatusOptions } = this.state;
        return (
            <div className="private-task__status">
                <div onClick={this.changeShowStatusOptions} className={`private-task__status-select ${status.replace(/\s/g, '')} mr-2`}>{status}</div>
                <div className={`private-task__status-options d-${showStatusOptions ? 'block' : 'none'}`}>
                    <div data-value="done" onClick={this.changeStatus}>DONE</div>
                    <div data-value="in progress" onClick={this.changeStatus}>IN PROGRESS</div>
                    <div data-value="expired" onClick={this.changeStatus}>EXPIRED</div>
                </div>
            </div>
        )
    }

    async changeFavouriteTrue() {
        const data = {
            text: this.props.task.text,
            status: this.props.task.status,
            favourite: true,
            date: this.props.task.date ? moment(this.props.task.date).format('YYYY-MM-DD HH:mm:ss') : null,
            deadline: this.props.task.deadline ? moment(this.props.task.deadline).format('YYYY-MM-DD HH:mm:ss') : null,
        }
        await Services.put(`/private_lists/private_tasks/${this.props.task.id}`, data)
            .then(response => {
                this.setState({
                    favourite: true
                })
            })
    }

    async changeFavouriteFalse() {
        const data = {
            text: this.props.task.text,
            status: this.props.task.status,
            favourite: false,
            date: this.props.task.date ? moment(this.props.task.date).format('YYYY-MM-DD HH:mm:ss') : null,
            deadline: this.props.task.deadline ? moment(this.props.task.deadline).format('YYYY-MM-DD HH:mm:ss') : null,
        }
        await Services.put(`/private_lists/private_tasks/${this.props.task.id}`, data)
            .then(response => {
                this.setState({
                    favourite: false
                })
            })
    }

    async delete() {
        await Services
            .delete(`/private_lists/private_tasks/${this.props.task.id}`)
            .then(async response => {
                this.props.privateTask()
            })
    }

    async submitUpdatePrivateTask(e) {
        e.preventDefault();

        this.clearValid();

        let isValid = privateTaskValidator(this.state);

        if (!Object.keys(isValid).length) {
            const data = {
                text: this.state.text,
                status: this.state.status,
                favourite: this.state.favourite,
                date: this.state.date ? moment(this.state.date).format('YYYY-MM-DD HH:mm:ss') : null,
                deadline: this.state.deadline ? moment(this.state.deadline).format('YYYY-MM-DD HH:mm:ss') : null,
            }
            await Services.put(`/private_lists/private_tasks/${this.state.id}`, data)
                .then(async response => {
                    this.openUpdatePrivateTask();
                    this.props.privateTask();
                })
        } else {
            this.showNotValidData(isValid)
        }
    }

    render() {
        const {
            text,
            favourite,

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
            <div className="private-task">
                <div className="d-flex justify-content-end">
                    <div className="d-flex align-items-center">
                        {this.showStatus()}
                        <FaPen onClick={this.openUpdatePrivateTask} className="mr-1 private-task__btn" />
                        <IoMdClose onClick={this.delete} className="private-task__btn private-task__btn-close" />
                    </div>
                </div>
                {
                    isOpen ?
                        <Form className="add-private-task__form mt-2" onSubmit={this.submitUpdatePrivateTask}>
                            <Form.Group className={classDateGroup}>
                                <Form.Label>Date of the start</Form.Label>
                                <Form.Control type="datetime-local" name="date" onChange={this.handleChange}
                                    value={moment(this.state.date).format('YYYY-MM-DDTHH:mm')} className={classDateInput}></Form.Control>
                                <Form.Control.Feedback type="invalid">{dateErrorMessage}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className={classDeadlineGroup}>
                                <Form.Label>Deadline</Form.Label>
                                <Form.Control type="datetime-local" name="deadline" onChange={this.handleChange}
                                    value={moment(this.state.deadline).format('YYYY-MM-DDTHH:mm')} className={classDeadlineInput}></Form.Control>
                                <Form.Control.Feedback type="invalid">{deadlineErrorMessage}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className={classTextGroup}>
                                <Form.Label>Task <span className="text-danger">*</span></Form.Label>
                                <Form.Control placeholder="Ender your task" name="text" onChange={this.handleChange}
                                    value={text} className={classTextInput}></Form.Control>
                                <Form.Control.Feedback type="invalid">{textErrorMessage}</Form.Control.Feedback>
                            </Form.Group>

                            <div className="add-private-task__form-bottom d-flex justify-content-between align-items-center">
                                <Button type="submit">Update</Button>
                                <IoMdClose onClick={this.openUpdatePrivateTask} />
                            </div>
                        </Form>
                        :
                        <React.Fragment>
                            <div className="d-flex justify-content-between mt-2">
                                <div className="private-task__text">{this.props.task.text}</div>
                                <div className="private-task__btn private-task__btn-star">
                                    {
                                        favourite
                                            ?
                                            <AiFillStar onClick={this.changeFavouriteFalse} className="text-warning" />
                                            :
                                            <AiOutlineStar onClick={this.changeFavouriteTrue} />
                                    }
                                </div>
                            </div>
                            <div className="d-flex justify-content-between mt-2">
                                {
                                    this.props.task.date
                                        ?
                                        <div>
                                            <small><b>Start:</b> {moment(this.props.task.date).format('H:mm D MMM')}</small>
                                        </div>
                                        :
                                        null
                                }
                                {
                                    this.props.task.deadline
                                        ?
                                        <div>
                                            <small><b>Deadline:</b> {moment(this.props.task.deadline).format('H:mm D MMM')}</small>
                                        </div>
                                        :
                                        null
                                }
                            </div>
                        </React.Fragment>
                }
            </div>
        )
    }
}

export default PrivateTask;