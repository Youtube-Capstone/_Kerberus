import React from 'react'
import ReactDOM from 'react-dom'

import { Router , Route , Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import _Store from '../redux/_Store.js'
import _History from '../history/history.js'

import _Main from './Main.jsx'

import '../stylesheets/Root.css'

import { AC_USER_ACCESSED } from '../redux/RootAction.js'


class Root extends React.Component{

    componentDidMount(){
        _Store.dispatch(AC_USER_ACCESSED())
    }

    render() {

        return(

        <Provider store={_Store}>

            <Router history={_History}>

                <div>

                    <Route path='/' component={_Main} ></Route>
                    
                </div>

            </Router>

        </Provider>

        )

    }

}

ReactDOM.render(<Root /> , document.getElementById('root'))
