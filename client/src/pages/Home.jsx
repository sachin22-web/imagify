import React from 'react'
import Header from '../components/Header'
import Steps from "../components/Steps"
import Description from '../components/Description'
import Testimonial from '../components/Testimonial'
import GenearateBtn from '../components/GenearateBtn'

const Home = () => {
  return (
    <div>
     <Header/>
     <Steps/>
     <Description/>
     <Testimonial/>
     <GenearateBtn/>
    </div>
  )
}

export default Home
