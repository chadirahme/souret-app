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


            <main>{children}</main>
            <footer>
                <h1> footer </h1>
            </footer>
        </div>
    );
};

Page.propTypes = {
    children: PropTypes.node,
};

export default Page;