import React from 'react'
import States from './context/State.jsx'
import './css/index.css'
import Mainpage from './components/Mainpage.jsx'


function App() {
  return (
    <States>
      <Mainpage/>
  </States>
  );
}

export default App;
