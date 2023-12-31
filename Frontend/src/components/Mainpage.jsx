import React, { useContext } from 'react'
import Firstpage from './Firstpage'
import Mainpage0 from './Secondpage.jsx'
import Std_auth from './Std_auth.jsx'
import Std_mpage from './Std_mpage'
import Tea_auth from './Tea_auth'
import Tea_mpage from './Tea_mpage'
import Arecord from './record.jsx'
import Std_profile from './Std_profile.jsx'
import Tea_profile from './Tea_profile.jsx'
import Page4o4 from './4o4.jsx'
import Contexts from '../context/Context.jsx'
import Alert from './Alert.jsx'
import Loading from './Loading.jsx'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'

function Mainpage() {
    const states=useContext(Contexts)
    const {alert,load}=states

  return (
    <div className='main'>
    <Router>
      <Routes>
    <Route path='/' element={<Firstpage/>}/>
    <Route path='/second/page'element={<Mainpage0/>}/>
    <Route path='/std/auth' element={<Std_auth/>}/>
    <Route path='/tea/auth' element={<Tea_auth/>}/>
    <Route path='/std/mainpage' element={<Std_mpage/>}/>
    <Route path='/std/profile' element={<Std_profile/>}/>
    <Route path='/tea/profile' element={<Tea_profile/>}/>
    <Route path='/tea/mainpage' element={<Tea_mpage/>}/>
    <Route path='/std/all/record' element={<Arecord/>}/>
    <Route path='*' element={<Page4o4/>}/>
      </Routes>
    </Router>
    {alert.showalert && <Alert msg={alert.msg} status={alert.status} showalert={alert.showalert}/>}
    {load.showload && <Loading msg={load.msg} states={load.status} showload={load.showload}/>}
    </div>
  )
}

export default Mainpage
