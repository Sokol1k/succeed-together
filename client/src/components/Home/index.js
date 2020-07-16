import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import "./style.css";


class Home extends Component {

    componentDidMount() {
        if(localStorage._token) {
            this.props.history.push('/profile');
        }
    }

    render() {
        return (
            <div className="home">
                <div className="top">
                    <Container className="my-container">
                        <div className="top__content d-flex text-center">
                            <div className="top__title">
                                Let’s help each other stay motivated
                            </div>
                            <div className="top__body">
                                Have you ever started to create new habits but the result was not seen?<br />
                                Use Succeed Together to solve these problems!
                            </div>
                        </div>
                    </Container>
                </div>

                <div className="content">
                    <Container className="my-container">
                        <div className="content__team">
                            <Row className="content__team__row align-items-center">
                                <Col>
                                    <img src='/img/team.jpg' alt="" />
                                </Col>
                                <Col>
                                    <div className="content__text">
                                        <h1>
                                            Why do you need to use Succeed Together?
                                        </h1>
                                        <p>
                                            Try to stop smoking, learn a new language, start doing sports, start reading books,
                                            lose some weight. A lot of people try to reach these and many other goals but it’s
                                            not easy to continue your way if you have no motivation. We suggest you to share your
                                            aims with other people, with people, that try to achieve the same goal. It’s easier
                                            and better together!
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="content__help">
                            <Row className="align-items-center">
                                <Col>
                                    <div className="content__text">
                                        <h1>
                                            Have you already achieved any of your goals?
                                        </h1>
                                        <p>
                                            So you can share your experience with other people, help them not
                                            to give up and motivate others to grow!
                                        </p>
                                    </div>
                                </Col>
                                <Col>
                                    <img src="/img/help.jpg" alt="" />
                                </Col>
                            </Row>
                        </div>
                        <div className="content__tasks">
                            <Row className="align-items-center">
                                <Col>
                                    <img src="/img/tasks.png" alt="" />
                                </Col>
                                <Col>
                                    <div className="content__text">
                                        <h1>
                                            Do you also need a simple personal task manager with a friendly interface?
                                        </h1>
                                        <p>
                                            You can use a personal task manager to control your everyday
                                            tasks (appointments, shopping, etc.)
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </div>
            </div>
        );
    }
}

export default withRouter(Home);