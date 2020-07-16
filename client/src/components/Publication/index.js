import React, { Component } from 'react';
import Services from '../../services';
import UpdatePublication from '../UpdatePublication';
import AddComment from '../AddComment';
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Comments from '../Comments';
import moment from "moment";
import { Link } from 'react-router-dom';

import "./style.css";

class Publication extends Component {

    constructor(props) {
        super();

        this.state = {
            id: props.publication.id,
            title: props.publication.title,
            description: props.publication.description,
            comments: props.publication.comments,
            likes: props.publication.likes,
            updated_at: props.publication.updated_at,

            user_id: props.publication.user_id,
            isUser: props.isUser,
            photo: '',
            name: '',

            isOpenDescription: false,
            isOpenComments: false,
            isOpenUpdate: false,
        };

        this.openDescription = this.openDescription.bind(this);
        this.showDescription = this.showDescription.bind(this);
        this.openComments = this.openComments.bind(this);
        this.openUpdate = this.openUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deletePublication = this.deletePublication.bind(this);
        this.changeLike = this.changeLike.bind(this);
    }

    async UNSAFE_componentWillMount() {
        const { user_id } = this.state;

        if (user_id) {
            await Services.get(`/users/${user_id}`).then(response => {
                this.setState({
                    photo: response.data.photo,
                    name: response.data.name,
                })
            });
        }
    }

    async changeLike() {
        await Services.post(`/publications/${this.props.publication.id}/likes`)
            .then(response => {
                this.props.profile();
            })
    }

    handleChange(e) {
        let target = e.target;
        let value = target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    openDescription() {
        this.setState({
            isOpenDescription: true
        })
    }

    openComments() {
        this.setState({
            isOpenComments: !this.state.isOpenComments
        })
    }

    openUpdate() {
        this.setState({
            isOpenUpdate: !this.state.isOpenUpdate
        })
    }

    showDescription() {
        const { isOpenDescription } = this.state;
        const { description } = this.props.publication;

        if (description.length < 255) {
            return description;
        } else {
            if (isOpenDescription) {
                return description;
            } else {
                return (<div>
                    {description.slice(0, 255) + '...'}
                    <small onClick={this.openDescription} className="publication__btn-more ml-2">more</small>
                </div>)
            }
        }
    }

    async deletePublication() {
        await Services
            .delete(`/publications/${this.state.id}`)
            .then(response => {
                this.props.profile();
            });
    }

    render() {
        const { id, updated_at, user_id, photo, name, isOpenComments, isOpenUpdate, isUser } = this.state;
        const { title, description, comments, isLike, likes } = this.props.publication;

        return (
            <div className="publication">
                {
                    isOpenUpdate
                        ?
                        <div className="position-relative">
                            <IoMdClose className="publication__icon-close-update" onClick={this.openUpdate} />
                            <UpdatePublication title={title} description={description} id={id} profile={this.props.profile} openUpdate={this.openUpdate} />
                        </div>
                        :
                        <div>
                            <div className="d-flex justify-content-between align-items-start mb-4">
                                <div className="d-flex flex-column">
                                    {
                                        user_id
                                            ?
                                            <div className="d-flex align-items-center mb-2">
                                                <img className="publication-avatar mr-2" src={photo} alt="avatar" />
                                                <Link to={`/user/${user_id}`}>{name}</Link>
                                            </div>
                                            :
                                            null
                                    }
                                    <h3>{title}</h3>
                                </div>
                                {
                                    user_id || isUser
                                        ?
                                        null
                                        :
                                        <div className="d-flex align-items-center ml-3">
                                            <FaPen className="publication__icon-update mr-1" onClick={this.openUpdate} />
                                            <IoMdClose className="publication__icon-close" onClick={this.deletePublication} />
                                        </div>
                                }
                            </div>
                            <div className="mb-4 publication__description">
                                {this.showDescription()}
                            </div>
                        </div>
                }
                <div className="d-flex justify-content-between align-items-end">
                    <small>{moment(updated_at).format('YYYY-MM-DD')}</small>
                    <div className="d-flex">
                        <div className="d-flex align-items-center mr-2" onClick={this.openComments}><FaRegComments className="publication__icon-comments mr-1" /> {comments.length}</div>
                            <div className="d-flex align-items-center publication__like" onClick={this.changeLike}>
                                { isLike ?  <AiFillLike /> : <AiOutlineLike /> } {likes.length}
                            </div>
                    </div>
                </div>

                {
                    isOpenComments ?
                        <div className="mt-3">
                            <AddComment id={id} profile={this.props.profile}/>
                            {comments.map((element, id) => <Comments key={id} comment={element} profile={this.props.profile} showClose={(user_id || isUser) ? false : true} />)}
                        </div>
                        :
                        null
                }
            </div>
        )
    }
}

export default Publication;