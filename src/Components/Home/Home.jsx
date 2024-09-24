import React from 'react'
import Hero from './Hero'
import Logos from './Logos'
import Arrivals from './Arrivals'
import Top from './Top'
import Style from './Style'
import Category from './Category'
import Reviews from './Reviews'
import Collections from "./Collections"
import Benefits from "../Benefits/Benefits"
const Home = () => {
  return <>

  <Hero/>
  <Logos/>
  <Collections/>
  <Arrivals/>
  {/* <Top/>
  <Style/>
  <Category/> */}
  <Reviews/>
  <Benefits/>
  </>
}

export default Home