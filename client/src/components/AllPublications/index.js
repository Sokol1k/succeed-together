import React, { Component } from 'react';
import Services from '../../services';
import Publication from '../Publication';
import { Container, Row, Col } from 'react-bootstrap';

class AllPublications extends Component {

    constructor() {
        super();

        this.state = {
            publications: []
        }

        this.allPublications = this.allPublications.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.allPublications();
    }

    async allPublications() {
        await Services.get('/publications/following')
            .then(response => {
                this.setState({
                    publications: response.data
                })
            })
    }

    render() {
        return (
            <Container className='my-container my-5'>
                <Row className='justify-content-md-center'>
                    {this.state.publications.map(element => <Col md="7" key={`publication-${element.id}`}><Publication publication={element} profile={this.allPublications} /></Col>)}
                </Row>
            </Container>
        )
    }
}

export default AllPublications;