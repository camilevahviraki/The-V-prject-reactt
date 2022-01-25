import React, {useContext} from 'react';
import { Context } from './Store';

const Cooler = () => {

  const [state,setState] = useContext(Context);

  
     // state.name = 'Camilux'
     //  state.email= 'cmlx@gmail.com'
  

  return (
      <>
         <h2>Cooler </h2>
           <p> Name: {state.name} </p>
           <p> Email: {state.email} </p>
       
      </>
  )

};

export default Cooler;