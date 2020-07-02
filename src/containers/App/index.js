import React from 'react';
import Router from 'router';
import { Page } from '../../components/index';
import './app.module.css';

const App = () => (
    <Router>{(content, routeProps) => <Page {...routeProps}>{content}</Page>}</Router>
);

export default App;