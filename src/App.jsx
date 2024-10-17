
import './App.css'

import Header from './COMPONENTS/Header';
import Footer from './COMPONENTS/Footer';
import {Route, Routes } from 'react-router-dom';
import LandingPage from './PAGES/LandingPage';
import WatchHistory from './PAGES/WatchHistory';
import PageNotFound from './PAGES/PageNotFound';
import Home from './PAGES/Home';



function App() {


  return (
    <>
    
<Header/>
<Routes>
<Route path={'/'} element={<LandingPage/>}/>
<Route path={'/home'} element={<Home/>}/>
<Route path={'/watchhistory'} element={<WatchHistory/>}/>
<Route path={'*'} element={<PageNotFound/>}/>
</Routes>
<Footer/>
    </>
  )
}

export default App
