import React, { Component } from 'react';
import "./style.css";

class Follower extends Component {

    render() {
        const { id, name, photo } = this.props.follower 
        return (
            <div className='follower'>
                <img src={photo} alt="avatar" className='follower__img' />
                <a href={`/user/${id}`} className='follower__name'>
                {name}
                </a>
                
            </div>
        )
    }
}

export default Follower;