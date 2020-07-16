import React, { Component } from 'react';
import Services from '../../services';
import Follower from '../Follower';
import { Row, Col } from "react-bootstrap";
import "./style.css";

class Followers extends Component {
    constructor(props) {
        super();

        this.state = {
            followers: [],
        };

    }

    async componentDidMount() {
        await Services.get(this.props.url).then(response => {
            this.setState({
                followers: response.data,
            });
        }).catch(error => {
            console.log(error.response)
        })
    }


    render() {
        return (
                <Row className="">
                    <Col className="followers-list text-center">
                        <div className="">
                            <div className='followers-list__title'>
                               Followers:  
                            </div>
                            {this.state.followers.map(element => <Follower key={element.id} follower={element} />)}
                        
                        </div>

                    </Col>
                </Row>
           
        );
    }
}

export default Followers
