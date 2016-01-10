// Modules
import React                               from 'react';
import { Router, Route, useRouterHistory } from 'react-router';
import { createHashHistory }               from 'history';
// App imports.
import 'app.scss';
import AuthLayout                          from './auth/AuthLayout';
import Main                                from './views/main/Main';
import Home                                from './views/home/Home';

// Needed for React Developer Tools
window.React = React;

const appHistory = useRouterHistory( createHashHistory )({ queryKey: false });


export default (
    <Router history={ appHistory }>
        <Route component={ AuthLayout }>
            <Route component={ Main }>
                <Route path="/" component={ Home }/>
                <Route path="/*" component={ Home }/>
            </Route>
        </Route>
    </Router>
);
