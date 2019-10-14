import React from 'react'
import './css/app.css'
import MainContainer from './Containers/MainContainer'
const App = () => {
  return (
    <>
      <link
        rel='stylesheet'
        href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
      />

      <h1 className='title'>PMBD 데이터</h1>
      <MainContainer />
    </>
  )
}

export default App
