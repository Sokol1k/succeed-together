import React, { Component } from 'react';
import Services from '../../services';
import Publication from '../Publication';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import "./style.css";

class Search extends Component {

    constructor() {
        super();

        this.state = {
            search: '',
            isSearch: false,
            users: [],

            publications: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
        this.showUsers = this.showUsers.bind(this);
        this.allPublications = this.allPublications.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.allPublications();
    }

    async allPublications() {
        await Services.get('/publications')
            .then(response => {
                this.setState({
                    publications: response.data
                })
            })
    }

    handleChange(e) {
        let target = e.target;
        let value = target.value;
        let name = target.name;

        if (!value) {
            this.allPublications();
            this.setState({
                isSearch: false
            });
        }

        this.setState({
            [name]: value
        });
    }

    showUsers() {
        return this.state.users.map(user => {
            return (
                <div key={user.id} className="d-flex align-items-center search__users-list">
                    <img className="search__img" src={user.photo} alt="avatar" />
                    <Link to={`/user/${user.id}`}>{user.name}</Link>
                </div>
            )
        })
    }

    async submitSearch(e) {
        e.preventDefault();
        await Services.get('/users', { search: this.state.search })
            .then(response => {
                this.setState({
                    isSearch: true,
                    users: response.data,
                })
            })
    }

    render() {
        const { search, isSearch } = this.state;
        return (
            <Container className='my-container my-5 search'>
                <Row className='justify-content-md-center'>
                    <Col md="4">
                        <Form className="d-flex position-relative mb-4" onSubmit={this.submitSearch}>
                            <Form.Control name="search" onChange={this.handleChange} value={search}
                                placeholder="Search" className="search__input"></Form.Control>
                            <Button className="search__btn-submit" type="submit">Ok</Button>
                        </Form>
                        {
                            (isSearch)
                                ?
                                <div>
                                    {this.showUsers()}
                                </div>
                                :
                                <div>
                                    Find interesting people!
                                    <div className="mt-4">
                                        {this.state.publications.map(element => <Publication key={`publication-${element.id}`} publication={element} profile={this.allPublications} />)}
                                    </div>
                                </div>
                        }
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Search;