import React, {useContext} from 'react';
import { Context } from './Store';

const CoolComponent = () => {

  const [state,setState] = useContext(Context);

 
  return (
      <>
         <h2>Cool Component </h2>
           <p> Name: {state.name} </p>
           <p> Email: {state.email} </p>
       
      </>
  )

};

export default CoolComponent;