import React, {Fragment} from 'react';
import './App.css';
import UserSign from './components/UserSign';
import Avail from './components/Avail';
import Owned from './components/Owned';

//components

function App() {
  return <Fragment>
  <div className="container">
    <UserSign />
    <Avail />
    <Owned />
  </div>
  </Fragment>;
}

export default App;
