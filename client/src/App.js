import React from 'react';
import './App.css';
import { Switch , Route} from "react-router-dom";

import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import History from './containers/History/History';

function App() {
  return (
      <div className='App'>
        <Switch>
          <Route path='/home' component={Home} />
          <Route path='/login' exact component={Login} />
          <Route path='/history' component={History} />
          <Route path='/' exact component={Register} /> 
        </Switch>
      </div>
  );
}

export default App;
