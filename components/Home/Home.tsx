import React from 'react'
import Hero from './Hero/Hero'
import About from './About/About'
import Ministries from './Ministries/Ministries'
import SafariGroups from './SafariGroups/SafariGroups'

const Home = () => {
  return (
    <div className=''>
      <Hero/>
      <About/>
      <Ministries/>
      <SafariGroups/>
    </div>
  )
}

export default Home