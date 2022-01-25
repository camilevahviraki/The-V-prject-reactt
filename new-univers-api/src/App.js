import React,{ useState,useEffect} from 'react';
import './App.css';
import LoginUser from './LoginUser'
///import {Route} from 'react-router-dom';
import InscriptionUser from './InscriptionUser.js';
import SendPicAdmin from './SendPicAdmin.js'
import SendMultiple from './SendMultiple.js'

function App() {
 return (
     <div className='App'>
    
   <LoginUser/>
   je vais reussir par la grace de Dieu! Amen.
   <InscriptionUser/>
   <SendPicAdmin/>
   <SendMultiple/>
     </div>

   );
 }

export default App;
