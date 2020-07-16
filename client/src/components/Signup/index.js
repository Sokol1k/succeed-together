import React, { Component } from 'react';
import Services from '../../services';
import signupValidator from "../../validation/Signup";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux"
import { successfulRegistration } from '../../store/successfulRegistration/actions';

import { Container, Row, Col,  Form, Button} from "react-bootstrap";
import "./style.css";

class Signup extends Component{
    constructor(){
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            confirm_password: '',

            classNameGroup: '',
            classNameInput: '',
            nameErrorMessage: null,

            classEmailGroup: '',
            classEmailInput: '',
            emailErrorMessage: null,
            
            classPasswordGroup: '',
            classPasswordInput: '',
            passwordErrorMessage: null,

            classConfirmPasswordGroup: '',
            classConfirmPasswordInput: '',
            confirmPasswordErrorMessage: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearValid = this.clearValid.bind(this);
        this.showNotValidData = this.showNotValidData.bind(this);
    }

    componentDidMount() {
        if(localStorage._token) {
            this.props.history.push('/profile');
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

    clearValid() {

        this.setState({
            classNameGroup: '',
            classNameInput: '',
            nameErrorMessage: null,

            classEmailGroup: '',
            classEmailInput: '',
            emailErrorMessage: null,
            
            classPasswordGroup: '',
            classPasswordInput: '',
            passwordErrorMessage: null,

            classConfirmPasswordGroup: '',
            classConfirmPasswordInput: '',
            confirmPasswordErrorMessage: null,
        })
    }

    showNotValidData(isValid) {

        if (isValid.name) {

            this.setState({
                classNameGroup: 'has-error',
                classNameInput: 'is-invalid',
                nameErrorMessage: isValid.name
            })
        }

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

        if (isValid.confirm_password) {

            this.setState({
                classConfirmPasswordGroup: 'has-error',
                classConfirmPasswordInput: 'is-invalid',
                confirmPasswordErrorMessage: isValid.confirm_password
            })
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        this.clearValid();

        let isValid = signupValidator(this.state); 

        if (!Object.keys(isValid).length) {
            const {name, email, password, confirm_password} = this.state;

            await Services.post("/register", {name, email, password, confirm_password} ).then(response => {
                this.props.successfulRegistration(true);
                this.props.history.push('/login');
            }).catch(error => {
                if(error.response.status === 403) {
                    this.showNotValidData(error.response.data)
                }
            })

        } else {
            this.showNotValidData(isValid)
        }

        
    }


    render(){
        const {
            name,
            email,
            password,
            confirm_password,

            classNameGroup,
            classNameInput,
            nameErrorMessage,

            classEmailGroup,
            classEmailInput,
            emailErrorMessage,
            
            classPasswordGroup,
            classPasswordInput,
            passwordErrorMessage,

            classConfirmPasswordGroup,
            classConfirmPasswordInput,
            confirmPasswordErrorMessage } = this.state;
        return(
            <div className="signup">
                <Container>
                    <Row className="justify-content-md-center">
                        <Col className="signup_content" md="auto">
                            <div className="signup__title text-center">
                                Create your<br/> Succeed Together account
                            </div>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="formBasicEmail" className={classNameGroup}>
                                    <Form.Label className="name__label">Name</Form.Label>
                                    <Form.Control name="name" value={name} onChange={this.handleChange} type="text"
                                         placeholder="Enter name" className={classNameInput} />
                                    <Form.Control.Feedback type="invalid">
                                        {nameErrorMessage}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formBasicEmail" className={classEmailGroup}>
                                    <Form.Label className="login__label">Email address</Form.Label>
                                    <Form.Control name="email" value={email} onChange={this.handleChange} type="text" 
                                        placeholder="Enter email" className={classEmailInput}/>
                                    <Form.Control.Feedback type="invalid">
                                        {emailErrorMessage}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword" className={classPasswordGroup}>
                                    <Form.Label className="password__label">Password</Form.Label>
                                    <Form.Control name="password" value={password} onChange={this.handleChange} type="password" 
                                        placeholder="Enter password" className={classPasswordInput}/>
                                    <Form.Control.Feedback type="invalid">
                                        {passwordErrorMessage}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                
                                <Form.Group controlId="formConfirmPassword" className={classConfirmPasswordGroup}>
                                    <Form.Label className="confirm-password__label">Confirm Password</Form.Label>
                                    <Form.Control name="confirm_password" value={confirm_password} onChange={this.handleChange} type="password" 
                                        placeholder="Confirm password" className={classConfirmPasswordInput}/>
                                    <Form.Control.Feedback type="invalid">
                                        {confirmPasswordErrorMessage}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button className="login__btn" variant="primary" type="submit" >
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

const mapDispatchToProps = {
    successfulRegistration
}

export default connect(null, mapDispatchToProps)(withRouter(Signup));