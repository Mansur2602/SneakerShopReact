import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Card from './components/Card'
import Banner from './components/banner'



function App() {

  return (
    <>
    <Header/>
    <Banner/>
    <Card/>
    </>
  )
}

export default App
