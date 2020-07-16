import React, { Component } from 'react';
import "./style.css";

class Following extends Component {

    render() {
        const { id, name, photo } = this.props.following 
        return (
            <div className='following'>
                <img src={photo} alt="avatar" className='following__img'/>
                <a href={`/user/${id}`} className='following__name'>
                    {name}
                </a>
            </div>
        )
    }
}

export default Following;