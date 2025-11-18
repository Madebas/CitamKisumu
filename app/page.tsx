import React from 'react'
import Hero from '../components/Home/Hero/Hero'
import About from '../components/Home/About/About'
import Ministries from '../components/Home/Ministries/Ministries'
import SafariGroups from './safarigroups/page'

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