import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownloads from '../../components/AppDownloads/AppDownloads'

const Home = () => {

  const [catergory, setCatergory] = useState("All");

  return (
    <div>
      <Header/>
      <ExploreMenu catergory = {catergory} setCatergory = {setCatergory}/>
      <FoodDisplay catergory = {catergory}/>
      <AppDownloads/>
    </div>
  )
}

export default Home
