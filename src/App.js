import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import CreatePages from './pages/createPages/createPages'
import PersonalPage from './pages/personalPage/personalPage'
import './App.css'

const App = () => {

    return(
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={CreatePages}/>
                    <Route path='/:id'>
                        <PersonalPage/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default App;