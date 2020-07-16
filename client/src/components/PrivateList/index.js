import React, { Component } from 'react';
import Services from '../../services';
import PrivateTask from '../PrivateTask';
import {
    AiFillCaretLeft,
    AiFillCaretRight,
    AiOutlineStar,
    AiFillStar
} from "react-icons/ai";
import { FaPen } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import AddPrivateTask from "../AddPrivateTask";
import { connect } from "react-redux";
import { privateList } from "../../store/privateList/actions";
import { Form, Button } from 'react-bootstrap';
import privateListValidator from '../../validation/PrivateList';

import "./style.css";

class PrivateList extends Component {

    constructor(props) {
        super();

        this.state = {
            favourite: props.list.favourite,
            title: props.list.title,
            tasks: [],

            isOpen: false,

            classTitleGroup: '',
            classTitleInput: '',
            titleErrorMessage: null
        }

        this.changeFavouriteFalse = this.changeFavouriteFalse.bind(this);
        this.changeFavouriteTrue = this.changeFavouriteTrue.bind(this);
        this.changeIndexAfterChangeFavourite = this.changeIndexAfterChangeFavourite.bind(this);
        this.moveRight = this.moveRight.bind(this);
        this.moveLeft = this.moveLeft.bind(this);
        this.delete = this.delete.bind(this);
        this.openUpdatePrivateList = this.openUpdatePrivateList.bind(this);
        this.clearValid = this.clearValid.bind(this);
        this.showNotValidData = this.showNotValidData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitUpdatePrivateList = this.submitUpdatePrivateList.bind(this);
        this.privateTask = this.privateTask.bind(this);
        this.showPrivateTasks = this.showPrivateTasks.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.privateTask();
    }

    async UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.search !== this.props.search) {
            await Services.get(`/private_lists/${this.props.list.id}/private_tasks`, { search: nextProps.search })
                .then(response => {
                    this.setState({
                        tasks: response.data
                    })
                })
        }
    }

    async privateTask() {
        await Services.get(`/private_lists/${this.props.list.id}/private_tasks`, { search: this.props.search })
            .then(response => {
                this.setState({
                    tasks: response.data
                })
            })
    }

    async changeIndexAfterChangeFavourite() {
        await Services.get('/private_lists')
            .then(async response => {
                let result = response.data;

                for (let i = 0; i < result.length; i++) {
                    let favourite = Boolean(result[i].favourite);
                    await Services.put(
                        `/private_lists/${result[i].id}`,
                        {
                            title: result[i].title,
                            favourite: favourite,
                            index: i + 1
                        })
                }

                this.props.privateList(await Services.get('/private_lists'));
            })
    }

    async changeFavouriteFalse() {
        await Services.put(`/private_lists/${this.props.list.id}`, { title: this.props.list.title, favourite: false, index: this.props.list.index })
            .then(async response => {
                this.setState({
                    favourite: false
                })
                this.changeIndexAfterChangeFavourite()
            })
    }

    async changeFavouriteTrue() {
        await Services.put(`/private_lists/${this.props.list.id}`, { title: this.props.list.title, favourite: true, index: this.props.list.index })
            .then(async response => {
                this.setState({
                    favourite: true
                })
                this.changeIndexAfterChangeFavourite()
            })
    }

    async moveRight() {
        await Services.get('/private_lists')
            .then(async response => {
                let result = response.data;

                for (let i = 0; i < result.length; i++) {
                    if (this.props.list.id === result[i].id && i + 1 !== result.length) {
                        if (Boolean(result[i].favourite) === Boolean(result[i + 1].favourite)) {
                            let favourite = Boolean(result[i].favourite);
                            await Services.put(
                                `/private_lists/${this.props.list.id}`,
                                {
                                    title: result[i].title,
                                    favourite: favourite,
                                    index: i + 2
                                })
                            favourite = Boolean(result[i + 1].favourite);
                            await Services.put(
                                `/private_lists/${result[i + 1].id}`,
                                {
                                    title: result[i + 1].title,
                                    favourite: favourite,
                                    index: i + 1
                                })
                            break;
                        }
                    }
                }

                this.props.privateList(await Services.get('/private_lists'));
            })
    }

    async moveLeft() {
        await Services.get('/private_lists')
            .then(async response => {
                let result = response.data;

                for (let i = 0; i < result.length; i++) {
                    if (this.props.list.id === result[i].id && i !== 0) {
                        if (Boolean(result[i].favourite) === Boolean(result[i - 1].favourite)) {
                            let favourite = Boolean(result[i].favourite);
                            await Services.put(
                                `/private_lists/${this.props.list.id}`,
                                {
                                    title: result[i].title,
                                    favourite: favourite,
                                    index: i
                                })
                            favourite = Boolean(result[i - 1].favourite);
                            await Services.put(
                                `/private_lists/${result[i - 1].id}`,
                                {
                                    title: result[i - 1].title,
                                    favourite: favourite,
                                    index: i + 1
                                })
                            break;
                        }
                    }
                }

                this.props.privateList(await Services.get('/private_lists'));
            })
    }

    async delete() {
        await Services
            .delete(`/private_lists/${this.props.list.id}`)
            .then(async response => {
                this.props.privateList(await Services.get('/private_lists'));
            })
    }

    openUpdatePrivateList() {
        this.setState({
            isOpen: !this.state.isOpen
        })
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

    async submitUpdatePrivateList(e) {
        e.preventDefault();

        this.clearValid();

        let isValid = privateListValidator(this.state);

        if (!Object.keys(isValid).length) {
            let favourite = Boolean(this.props.list.favourite);
            let index = this.props.list.index;
            let title = this.state.title;

            await Services
                .put(`/private_lists/${this.props.list.id}`, { title, favourite, index })
                .then(async response => {
                    this.clearValid()
                    this.openUpdatePrivateList()
                    this.props.privateList(await Services.get('/private_lists'));
                })
        } else {
            this.showNotValidData(isValid)
        }
    }

    showPrivateTasks() {
        const {
            tasks,
            title,
            favourite,
            isOpen,
            classTitleGroup,
            classTitleInput,
            titleErrorMessage
        } = this.state;

        return (
            <div className="private-list">
                <div className="d-flex justify-content-between">
                    <div>
                        <AiFillCaretLeft onClick={this.moveLeft} className="private-list__btn" />
                        <AiFillCaretRight onClick={this.moveRight} className="private-list__btn" />
                    </div>
                    <div>
                        <FaPen onClick={this.openUpdatePrivateList} className="mr-1 private-list__btn" />
                        <IoMdClose onClick={this.delete} className="private-list__btn-close private-list__btn" />
                    </div>
                </div>
                <div className="d-flex justify-content-between mt-2">
                    {
                        isOpen
                            ?
                            <Form className="private-list__update-form" onSubmit={this.submitUpdatePrivateList}>
                                <Form.Group className={classTitleGroup}>
                                    <Form.Label className="private-list__update-form-lable">Update title of the list</Form.Label>
                                    <Form.Control name="title" onChange={this.handleChange} value={title}
                                        placeholder="Enter the title of the list" className={classTitleInput}></Form.Control>
                                    <Form.Control.Feedback type="invalid">{titleErrorMessage}</Form.Control.Feedback>
                                </Form.Group>

                                <div className="d-flex justify-content-between align-items-center">
                                    <Button type="submit" className="private-list__btn-submit">Update</Button>
                                    <IoMdClose className="private-list__btn-close" onClick={this.openUpdatePrivateList} />
                                </div>
                            </Form>
                            :
                            <React.Fragment>
                                <div className="private-list__title">{title}</div>
                                <div className="private-list__btn private-list__btn-star">
                                    {
                                        favourite
                                            ?
                                            <AiFillStar onClick={this.changeFavouriteFalse} className="text-warning" />
                                            :
                                            <AiOutlineStar onClick={this.changeFavouriteTrue} />
                                    }
                                </div>
                            </React.Fragment>
                    }
                </div>
                {
                    tasks.length !== 0
                        ?
                        <div className="private-list__tasks">
                            {tasks.map(task => <PrivateTask key={task.id} task={task} privateTask={this.privateTask} />)}
                        </div>
                        :
                        null
                }
                <div className="mt-3">
                    <AddPrivateTask privateListId={this.props.list.id} privateTask={this.privateTask} />
                </div>
            </div>
        )

    }

    render() {
        const { search } = this.props;
        const { tasks } = this.state;

        return (
            <React.Fragment>
                {
                    search
                        ?
                        tasks.length !== 0
                            ?
                            this.showPrivateTasks()
                            :
                            null
                        :
                        this.showPrivateTasks()
                }
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = {
    privateList
};

export default connect(null, mapDispatchToProps)(PrivateList);