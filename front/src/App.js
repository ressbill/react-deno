import React from 'react';
import './logo.svg';
import Layout from './container/Layout/Layout';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import {Auth} from './container/Auth/Auth'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path='/auth' component={Auth} />
          <Route path='/login' component={Auth} />
          <Route path='/contacts' exact component={() => <h1>Contacts</h1>} />
          <Route path='/404' component={() => <h1>404 Not found</h1>} />
          <Redirect to='/login' />
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

export default App;
