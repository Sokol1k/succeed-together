import React, { Component } from 'react';
import Services from '../../services';
import Publication from '../Publication';
import AddPublication from '../AddPublication';
import { BrowserRouter, Route, Switch, Link, withRouter } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";

import ProfileFollowers from '../ProfileFollowers';
import ProfileFollowing from '../ProfileFollowing';
// import { IoMdSettings } from "react-icons/io";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./style.css";
import "./media.css";

class Profile extends Component {
    constructor() {
        super();

        this.state = {
            photo: '',
            name: '',
            email: '',
            followers: '',
            following: '',
            about: '',
            publications: [],

            showAbout: false,
        };

        this.textAreaAbout = React.createRef();
        this.inputFile = React.createRef();

        this.handleChangePhoto = this.handleChangePhoto.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateAbout = this.updateAbout.bind(this);
        this.changeAbout = this.changeAbout.bind(this);
        this.openUploadImage = this.openUploadImage.bind(this);
        this.destroyImage = this.destroyImage.bind(this);
        this.profile = this.profile.bind(this);
    }

    UNSAFE_componentWillMount() {

        if (!localStorage._token) {
            this.props.history.push('/login');
        }

        this.profile();
    }

    async profile() {
        await Services.get('/profile').then(response => {
            this.setState({
                name: response.data.name,
                email: response.data.email,
                followers: response.data.followers,
                following: response.data.following,
                about: response.data.about,
                publications: response.data.publications,
                photo: response.data.photo,
            });
        }).catch(error => {
            console.log(error.response)
        })
    }

    handleChangePhoto(e) {
        let data = new FormData();
        const file = e.target.files[0];
        data.append('photo', file);
        Services.post('/profile/photo', data)
            .then(response => {
                this.setState({
                    photo: response.data.photo
                })
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

    changeAbout() {
        this.setState({
            showAbout: true
        }, () => { this.textAreaAbout.current.focus(); });
    }

    openUploadImage() {
        this.inputFile.current.click();
    }

    async updateAbout() {
        await Services
            .put("/profile/about", { about: this.state.about })
            .then(response => {
                this.setState({
                    about: response.data.about,
                    showAbout: false
                })
            })
    }

    async destroyImage() {
        await Services
            .delete("/profile/photo")
            .then(response => {
                this.setState({
                    photo: response.data.photo
                })
            })
    }

    render() {
        return (
            <Container className='my-container'>
                <BrowserRouter>
                    <Row className="my-public">
                        <Col md='4' className="my-public__left text-center">
                            <div className="my-public__image-section">
                                <div className="my-public__image-section-load">
                                    <div className="my-public__section-load-buttons">
                                        <AiOutlinePlusCircle onClick={this.openUploadImage} />
                                        {this.state.photo !== 'http://localhost:8080/uploads/defaultPhoto.png' ? <AiOutlineCloseCircle onClick={this.destroyImage} /> : null}
                                    </div>
                                </div>
                                <img src={this.state.photo} alt="avatar" className="my-public__left__photo" />
                                <input ref={this.inputFile} className="change-photo" type="file" onChange={this.handleChangePhoto} />
                            </div>
                            <div className="left__name">
                                <Link to="/profile">{this.state.name}</Link>
                            </div>
                            <div className="left__text">
                                <Link to="/profile/followers">Followers: {this.state.followers}</Link>
                                <Link to="/profile/following">Following: {this.state.following}</Link>

                            </div>
                            <div className="my-public__left__bottom">
                                {/* <Link> <IoMdSettings /> </Link> */}
                            </div>
                        </Col>
                        <Col md='8' className="my-public__right">

                            <Switch>
                                <Route path="/profile/followers">
                                    <ProfileFollowers url='/profile/followers' />
                                </Route>
                                <Route path="/profile/following">
                                    <ProfileFollowing url='/profile/following' />
                                </Route>
                                <Route path="/profile">
                                    <div className="my-public__right__about">

                                        <div className="my-public__right__about__title">
                                            About
                                            </div>
                                        {
                                            this.state.showAbout
                                                ?
                                                <textarea className="my-public__right__about__textarea" name="about" ref={this.textAreaAbout} onChange={this.handleChange} onBlur={this.updateAbout} value={this.state.about || ""}></textarea>
                                                :
                                                <div className="my-public__right__about__content" onClick={this.changeAbout}>{this.state.about}</div>
                                        }
                                    </div>
                                    <div className="my-public__right__publications">
                                        <div className="my-public__right__publications__title">
                                            Publications
                                            </div>
                                        <AddPublication profile={this.profile} />
                                        <div className="my-public__right__publications__content">
                                            {this.state.publications.map(element => <Publication key={element.id} publication={element} profile={this.profile} />)}
                                        </div>

                                    </div>
                                </Route>
                            </Switch>

                        </Col>
                    </Row>
                </BrowserRouter>
            </Container>
        );
    }
}

export default withRouter(Profile);