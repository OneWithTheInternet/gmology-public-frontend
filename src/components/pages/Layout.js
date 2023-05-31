import React from 'react';
import { Outlet } from 'react-router-dom';
import {Route, Routes} from 'react-router-dom';
//components
import Header from '../organisms/Header';
import SearchBar from "../organisms/SearchBar";
import Footer from '../organisms/Footer'
import Homepage from './Homepage';
import AccountDelete from './AccountDelete';
import Feedback from './Feedback';
import Search from './Search';
import EmailValidation from './EmailValidation';
import User from './User';
import Watching from '../pages/Watching';
import Watchers from "../pages/Watchers";
import Game from './Game';
import Giveaway from './Giveaway';

function AppBody(props) {
  return (
    <>
      <Routes>
        <Route element={<SearchBar />} >
          <Route path="" element={<Homepage />} />
          <Route path='search' element={<Search/>}/>
          <Route path='email-validation/:randomString'  element={<EmailValidation/>}/>
          <Route path='users/:username' element={<User/>} />
          <Route path='games/:id' element={<Game key={props.pathname}/>} />           
          <Route path='watching/:username' element={<Watching key={props.pathname} />} />
          <Route path='watchers/:username' element={<Watchers key={props.pathname} />} /> 
          <Route path='giveaway' element={<Giveaway />} />
        </Route>
      </Routes>

      <Header />

      <div className='pageContentContainer'>
        <div className='pageContent'>
          <Outlet />
        </div>
      </div>

      <Footer />
    </>
  )
}

export default AppBody