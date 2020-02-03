import React, { useEffect } from 'react'
import './App.css'
import Header from '../Header'
import Lateral from '../Lateral'
import Principal from '../Principal/Principal'
import Login from '../Login'
import { useDispatch } from 'react-redux'
import { fijarUsuario } from '../../redux/actions'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      dispatch(fijarUsuario(window.localStorage.getItem('token')))
    }
  }, [])

  return (
    <div className="app">
      <Login />
      <Header />
      <main>
        <Lateral />
        <Principal />
      </main>
    </div>
  )
}

export default App
