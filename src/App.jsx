import React from 'react'
import Header from "./components/Headers"
import Home from "./components/Home"
import CardDetails from "./components/CartDetails"
import Success from './components/success'
import Cancel from './components/cancel'
import {Route, Routes} from "react-router-dom"
import { Toaster } from 'react-hot-toast';


const App = () => {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<CardDetails />} />
        <Route path='/success' element={<Success />} />
        <Route path='/cancel' element={<Cancel />} />

      </Routes>
      <Toaster/>
    </>
  )
}

export default App