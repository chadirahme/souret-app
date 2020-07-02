import React, { Component } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { STORAGE_KEYS } from 'utils/constants';
import { getIsLoggedIn } from 'utils';
import './css/lightstylesheet.css';
import './vendor/fontawesome-free/css/all.min.css';
import './vendor/OwlCarousel/assets/owl.carousel.css';
import './vendor/OwlCarousel/assets/owl.theme.default.min.css';


        export default class AppNavbar extends Component {

    constructor(props) {
        super(props);
        this.isLoggedIn = getIsLoggedIn();

        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleLogout() {
        //store.remove('loggedIn');
        console.log('you have been logged out. boo!');
        localStorage.removeItem(STORAGE_KEYS.IS_LOGGED_IN);
        console.log('you have been logged out. boo!');
        this.props.history.push('/login');
    };

    render() {
        return (
          <header>
              <link rel="stylesheet"
                    href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'/>
              <div className="container">
              <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <nav className="navbar navbar-expand-lg navbar-light bg-dark1 justify-content-sm-start">
                            <a className="order-1 order-lg-0 ml-lg-0 ml-3 mr-auto" href="/"
                               style={{marginRight: 10 + 'em' , color: 'white',fontWeight: 'bold', textDecoration: 'none'}} >
                                SOURET FRIENDS
                            </a>

                            <button className="navbar-toggler align-self-start" type="button">
                                <i className="fas fa-bars"></i>
                            </button>

                            <div
                                className="collapse navbar-collapse d-flex flex-column flex-lg-row flex-xl-row justify-content-lg-end bg-dark1 p-3 p-lg-0 mt1-5 mt-lg-0 mobileMenu"
                                id="navbarSupportedContent">
                                <ul className="navbar-nav align-self-stretch">
                                    <li className="nav-item active">
                                        <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="discussions.html">Discussion</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="weather.html">Weather</a>
                                    </li>
                                </ul>
                                <a href="add_new_event.html" className="add-event">Add New Event</a>
                            </div>

                            <ul className="group-icons">
                                <li><a href="search_result.html" className="icon-set"><i className="fas fa-search"></i></a></li>
                            </ul>

                            <ul className="group-icons">
                                <li><a href="login" className="icon-set" onClick={this.handleLogout}><i className="fa fa-sign-out"></i></a></li>
                            </ul>


                        </nav>
                    </div>

                </div>
            </div>
          </header>

        );
    }
}



