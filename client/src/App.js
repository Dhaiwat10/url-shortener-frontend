import React from 'react';
import './App.css';
import { Switch , Route} from "react-router-dom";

import Home from './containers/Home/Home';
import Login from './containers/Login/Login';
import Logout from './containers/Logout/Logout';
import Register from './containers/Register/Register';
import History from './containers/History/History';
import Navbar from './components/UI/Navbar/Navbar';

import FontAwesome from 'react-fontawesome';

function App() {
  return (
      <div className='App'>
        <Navbar />
        <Switch>
          <Route path='/register' exact component={Register} />
          <Route path='/login' exact component={Login} />
          <Route path='/logout' exact component={Logout} />
          <Route path='/history' component={History} />
          <Route path='/' exact component={Home} /> 
        </Switch>
        <footer>
          <span>Made with ❤️ by Dhaiwat</span>
          <span>•</span>
          <span><a href='https://github.com/Dhaiwat10' target='_blank'><FontAwesome name='fab fa-github' />Github</a></span>
          <span>•</span>
          <span><a href='https://instagram.com/dhaiwat10' target='_blank'><FontAwesome name='fab fa-instagram' />Instagram</a></span>
        </footer>
      </div>
  );
}

export default App;
