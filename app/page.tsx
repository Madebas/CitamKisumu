import React from 'react'
import Hero from '../components/Home/Hero/Hero'
import About from '../components/Home/About/About'
import Ministries from '../components/Home/Ministries/Ministries'
import SafariGroups from './safarigroups/page'
import Sermons from './sermons/page'
import ChurchEvents from './Churchevents/page'
import Footer from './footer/page'


const Home = () => {
  return (
    <div className=''>
      <Hero/>
      <About/>
      <Ministries/>
      <SafariGroups/>
      <Sermons/>
      <ChurchEvents />
      <Footer/>
      
    </div>
  )
}

export default Home