import React, { Component } from 'react';
import Services from '../../services';
import Following from '../Following';
import "./style.css";
import { Row, Col } from "react-bootstrap";

class ProfileFollowing extends Component {

    constructor(props) {
        super();

        this.state = {
            following: [],
        };

    }

    async UNSAFE_componentWillMount() {
        await Services.get(this.props.url).then(response => {
            this.setState({
                following: response.data,
            });
        }).catch(error => {
            console.log(error.response)
        })
    }

    render() {
        return (
            <Row className="">
                <Col className="following-list text-center">
                    <div className="">
                        <div className='following-list__title'>
                            Following:
                        </div>
                        {this.state.following.map(element => <Following key={element.id} following={element} />)}
                    </div>

                </Col>
            </Row>
        );
    }
}

export default ProfileFollowing;