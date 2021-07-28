import React, {Fragment} from 'react';
import './App.css';
import UserSign from './components/UserSign';
import Avail from './components/Avail';
import Owned from './components/Owned';
import Navbar from './components/Navbar'

//components

function App() {
  return (
  <Fragment>
    <Navbar/>
    <Avail />
    <Owned />
  </Fragment>
  )
}

export default App;
