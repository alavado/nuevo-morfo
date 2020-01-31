import React from 'react'
import './App.css'
import Header from '../Header'
import Lateral from '../Lateral'
import Principal from '../Principal/Principal'

const App = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <Lateral />
        <Principal />
      </main>
    </div>
  )
}

export default App
