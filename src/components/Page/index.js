import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getIsLoggedIn } from 'utils';
import { STORAGE_KEYS } from 'utils/constants';
import './page.module.css';
import AppNavbar from '../../AppNavbar';

const Page = ({ children, history }) => {
    const isLoggedIn = getIsLoggedIn();

    const logout = () => {
        console.log('logout from page index');

        localStorage.removeItem(STORAGE_KEYS.IS_LOGGED_IN);
        history.push('/login');
    };

    return (
        <div>
            <AppNavbar/>

            {/*// <nav>*/}
                {/*<Link to="/">Home</Link>*/}
                {/*|*/}
                {/*<Link to="/categories">Manage Category</Link>*/}

                {/*/!*<Link to="/hello/1">1st page</Link>*!/*/}
                {/*/!*<Link to="/hello/2">2nd page</Link>*!/*/}
                {/*/!*<Link to="/goodbye">Non-auth page</Link>*!/*/}
                {/*/!*<Link to="/asdf">404</Link>*!/*/}


                {/*{isLoggedIn && <button onClick={logout}>Log out</button>}*/}
            {/*</nav>*/}


            <div id="page-container">
                <div id="content-wrap">
                    <main>{children}</main>
                </div>

                <footer id="footer">
                    <div className="main-container">
                        <div className="row">
                            <div className="col-lg-6 col-md-12">
                                <div className="footer-left">
                                    <ul>
                                        <li><a href="privacy_policy.html">Privacy</a></li>
                                        <li><a href="term_conditions.html">Term and Conditions</a></li>
                                        <li><a href="about.html">About</a></li>
                                        <li><a href="contact_us.html">Contact Us</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <div className="footer-right">
                                    <ul className="copyright-text">
                                        <li><a href="index.html"><img src="images/logo-2.svg" alt=""/></a></li>
                                        <li><div className="ftr-1"><i className="far fa-copyright"></i> 2020  by <a href="https://souret.com">Souret</a>. All Rights Reserved.</div></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>

            </div>






        </div>
    );
};

Page.propTypes = {
    children: PropTypes.node,
};

export default Page;