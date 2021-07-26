import React, {Fragment} from 'react';
import './App.css';
import Avail from './components/Avail';
import Owned from './components/Owned';

//components

function App() {
  return <Fragment>
  <div className="container">
    <Avail />
    <Owned />
  </div>
  </Fragment>;
}

export default App;
