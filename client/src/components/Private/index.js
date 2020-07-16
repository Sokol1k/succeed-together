import React, { Component } from 'react';
import Services from '../../services';
import PrivateList from '../PrivateList';
import AddPrivateList from '../AddPrivateList';
import { connect } from "react-redux";
import { privateList } from "../../store/privateList/actions";
import { Form } from 'react-bootstrap';

import "./style.css";

class Private extends Component {

    constructor() {
        super();

        this.state = {
            search: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    async UNSAFE_componentWillMount() {
        this.props.privateList(await Services.get('/private_lists'));
    }

    handleChange(e) {
        let target = e.target;
        let value = target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        const { lists } = this.props;
        const { search } = this.state;

        return (
            <React.Fragment>
                <div className="private-search">
                    <Form.Control name="search" onChange={this.handleChange} value={search}
                        placeholder="Search tasks"></Form.Control>
                </div>
                <div className="private">
                    {lists.map(list => <PrivateList key={list.id} list={list} search={search} />)}

                    <AddPrivateList length={lists.length} />
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        lists: state.privateList.lists
    };
};

const mapDispatchToProps = {
    privateList
};

export default connect(mapStateToProps, mapDispatchToProps)(Private);