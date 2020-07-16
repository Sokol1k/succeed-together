import React, { Component } from 'react';
import Services from '../../services';
import { IoMdClose } from "react-icons/io";

import moment from "moment";

import "./style.css";

class Comments extends Component {
    constructor() {
        super();

        this.state = {
            id: '',
            photo: '',
            name: ''
        };

        this.deleteComment = this.deleteComment.bind(this);
    }

    async UNSAFE_componentWillMount() {
        const { user_id } = this.props.comment;

        await Services.get(`/users/${user_id}`).then(response => {
            this.setState({
                id: response.data.id,
                photo: response.data.photo,
                name: response.data.name,
            })
        });
    }

    async UNSAFE_componentWillReceiveProps(nextProps) {
        const { user_id } = nextProps.comment;

        await Services.get(`/users/${user_id}`).then(response => {
            this.setState({
                id: response.data.id,
                photo: response.data.photo,
                name: response.data.name,
            })
        });
    }

    async deleteComment() {
        await Services.delete(`/publications/${this.props.comment.publication_id}/comments/${this.props.comment.id}`)
            .then(response => {
                this.props.profile();
            })
    }

    render() {
        const { text, created_at } = this.props.comment;
        const { id, photo, name } = this.state;
        return (
            <div className="comment">
                <div className="d-flex justify-content-between p-2">
                    <div className="d-flex align-items-center">
                        <img className="comment__avatar mr-2" src={photo} alt="avatar" />
                        <a href={`/user/${id}`}>
                            {name}
                        </a>
                    </div>
                    <div>
                        {
                            this.props.showClose
                                ?
                                <IoMdClose className="comments__icon-close" onClick={this.deleteComment} />
                                :
                                null
                        }
                    </div>
                </div>
                <div className="mb-2">
                    {text}
                </div>
                <small>
                    {moment(created_at).format('YYYY-MM-DD HH:MM')}
                </small>
            </div>
        )
    }
}

export default Comments;