import React, { useState } from 'react'
import Navbar from './component/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './component/Footer/Footer';
import Login from './component/Login/Login'

const App = () => {
  const[showLogin, setShowLogin] = useState(false)
  return (
    <>
    {showLogin ? <Login setShowLogin = {setShowLogin} /> : <></>}
      <div className='app'>
        <Navbar setShowLogin = {setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
