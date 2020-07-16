import React, { Component } from 'react';
import Services from '../../services';
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Publication from '../Publication';

import ProfileFollowers from '../ProfileFollowers';
import ProfileFollowing from '../ProfileFollowing';

import "./style.css";

class User extends Component {

    constructor() {
        super();
        let url = window.location.pathname.split('/')

        this.state = {
            id: url[url.length - 1],
            photo: '',
            name: '',
            email: '',
            followers: '',
            following: '',
            about: '',
            isFollowing: false,
            publications: [],
        }

        this.getUser = this.getUser.bind(this);
        this.follow = this.follow.bind(this);
    }

    async UNSAFE_componentWillMount() {
        this.getUser();
    }

    async getUser() {
        await Services.get(`/users/${this.state.id}/profile`)
        .then(response => {
            if(response.data) {
                this.setState({
                    name: response.data.name,
                    email: response.data.email,
                    followers: response.data.followers,
                    following: response.data.following,
                    about: response.data.about,
                    publications: response.data.publications,
                    photo: response.data.photo,
                    isFollowing: response.data.isFollowing
                });
            } else {
                window.location.href = '/profile';
            }
        })
        .catch(error => {
            console.log(error.response)
        })
    }

    async follow() {
        await Services.post(`/user/${this.state.id}/follow`)
            .then(response => {
                this.getUser();
            })
    }

    render() {
        return (
            <Container className='my-container'>
                <BrowserRouter>
                    <Row className="user">
                        <Col md='4' className="user__left text-center">
                            <img src={this.state.photo} alt="avatar" className="user__left-photo" />
                            <div className="user__left-name">
                                <Link to={`/user/${this.state.id}`}>{this.state.name}</Link>
                            </div>
                            <div className="user__left-text">
                                <Link to={`/user/${this.state.id}/followers`}>Followers: {this.state.followers}</Link>
                                <Link to={`/user/${this.state.id}/following`}>Following: {this.state.following}</Link>
                            </div>
                            <div className="mt-4">
                                {
                                    this.state.isFollowing
                                        ?
                                        <div className="user__left-unfollow" onClick={this.follow}>Unfollow</div>
                                        :
                                        <div className="user__left-follow" onClick={this.follow}>Follow</div>

                                }
                            </div>
                        </Col>
                        <Col md="8" className="user__right">
                            <Switch>
                                <Route path={`/user/${this.state.id}/followers`}>
                                    <ProfileFollowers url={`/user/${this.state.id}/followers`} />
                                </Route>
                                <Route path={`/user/${this.state.id}/following`}>
                                    <ProfileFollowing url={`/user/${this.state.id}/following`} />
                                </Route>
                                <Route path={`/user/${this.state.id}`}>
                                    <div className="user__right-about">
                                        <div className="user__right-about-title">
                                            About
                                        </div>
                                        <div className="user__right-about-content">{this.state.about}</div>
                                    </div>
                                    <div className="user__right-publications">
                                        <div className="user__right-publications-title">
                                            Publications
                                        </div>
                                        <div className="user__right-publications-content">
                                            {this.state.publications.map(element => <Publication key={element.id} publication={element} profile={this.getUser} isUser={ true } />)}
                                        </div>
                                    </div>
                                </Route>
                            </Switch>
                        </Col>
                    </Row>
                </BrowserRouter>
            </Container>
        )
    }
}

export default User;