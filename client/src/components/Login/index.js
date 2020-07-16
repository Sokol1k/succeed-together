import React, { Component } from 'react';
import Services from '../../services';
import { withRouter } from "react-router-dom";
import loginValidator from "../../validation/Login";
import { connect } from "react-redux"
import { changeHeader } from "../../store/header/actions";
import { successfulRegistration } from "../../store/successfulRegistration/actions";

//import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./style.css";

class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',

            classEmailGroup: '',
            classEmailInput: '',
            emailErrorMessage: null,

            classPasswordGroup: '',
            classPasswordInput: '',
            passwordErrorMessage: null,

            showErrorMessage: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearValid = this.clearValid.bind(this);
        this.showNotValidData = this.showNotValidData.bind(this);
    }

    UNSAFE_componentWillMount() {
        if (localStorage._token) {
            this.props.history.push('/profile');
        }
    }

    componentWillUnmount() {
        this.props.successfulRegistration(false);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    clearValid() {

        this.setState({
            classEmailGroup: '',
            classEmailInput: '',
            emailErrorMessage: null,
            classPasswordGroup: '',
            classPasswordInput: '',
            passwordErrorMessage: null,
            showErrorMessage: false
        })
    }

    showNotValidData(isValid) {

        if (isValid.email) {

            this.setState({
                classEmailGroup: 'has-error',
                classEmailInput: 'is-invalid',
                emailErrorMessage: isValid.email
            })
        }

        if (isValid.password) {

            this.setState({
                classPasswordGroup: 'has-error',
                classPasswordInput: 'is-invalid',
                passwordErrorMessage: isValid.password
            })
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        this.clearValid();

        let isValid = loginValidator(this.state);

        if (!Object.keys(isValid).length) {

            const { email, password } = this.state;

            await Services.post("/login", { email, password })
                .then(response => {

                    localStorage._token = response.data._token;
                    Services.addToken();
                    this.props.changeHeader('blue');
                    this.props.history.push('/profile');
                })
                .catch(error => {

                    if (error.response.status === 400) {
                        this.setState({
                            showErrorMessage: true
                        })
                    }
                })
        } else {

            this.showNotValidData(isValid)
        }
    }


    render() {
        const {
            email,
            password,
            classEmailGroup,
            classEmailInput,
            classPasswordGroup,
            classPasswordInput,
            emailErrorMessage,
            passwordErrorMessage,
            showErrorMessage } = this.state;

        return (
            <div className="login">
                {
                    this.props.isRegister ?
                        <div className="is-registered">Congratulations! Now you have your own account!<br/></div>
                        : null
                }
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md="auto" className="login_content">
                            <div className="login__title">
                                Log into Succeed Together
                            </div>
                            {
                                showErrorMessage
                                    ?
                                    <div className="login__error-message ">
                                        Email or password is incorrect
                                    </div>
                                    :
                                    null
                            }
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="formBasicEmail" className={classEmailGroup}>
                                    <Form.Label className="login__label">Email address</Form.Label>
                                    <Form.Control name="email" value={email} onChange={this.handleChange} type="text"
                                        placeholder="Enter email" className={classEmailInput} />
                                    <Form.Control.Feedback type="invalid">
                                        {emailErrorMessage}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword" className={classPasswordGroup}>
                                    <Form.Label className="password__label">Password</Form.Label>
                                    <Form.Control name="password" value={password} onChange={this.handleChange} type="password"
                                        placeholder="Enter password" className={classPasswordInput} />
                                    <Form.Control.Feedback type="invalid">
                                        {passwordErrorMessage}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button className="login__btn" type="submit" >
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isRegister: state.register.isRegister
    };
};

const mapDispatchToProps = {
    changeHeader,
    successfulRegistration
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));