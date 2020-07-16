import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Login from '../Login';
import Signup from '../Signup';
import Profile from '../Profile';
import AllPublications from '../AllPublications';
import Home from '../Home';
import Navigation from '../Navigation';
import Search from '../Search';
import Private from '../Private';
import User from '../User';

import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";
import "./media.css";


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/signup">
                        <Signup />
                    </Route>
                    <Route path="/profile">
                        <Navigation />
                        <Profile />
                    </Route>
                    <Route path="/private">
                        <Navigation />
                        <Private />
                    </Route>
                    <Route path="/publication">
                        <Navigation />
                        <AllPublications />
                    </Route>
                    <Route path="/search">
                        <Navigation />
                        <Search />
                    </Route>
                    <Route path="/user/:id">
                        <Navigation />
                        <User />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
                <Footer />

            </BrowserRouter>
        );
    }
}

export default App;