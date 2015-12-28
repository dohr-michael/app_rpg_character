// Modules
import React                             from 'react';
import { Router, Route, IndexRoute }     from 'react-router';
import { render }                        from 'react-dom';

// App imports.
import 'app.scss';
import 'index.html';
import Main                              from 'main/Main';
import CharacterSheetMain                from 'charactersheet/Main';

//Needed for React Developer Tools
window.React = React;


render( (
    <Router>
        <Route path="/" component={ Main }>
            <IndexRoute component={ CharacterSheetMain }/>
        </Route>
    </Router>
), document.getElementById( 'app' ) );
