import React from 'react'
import { InputRs } from './InputR.js';
import {Formik,Form} from 'formik';

function Essais() {

   
        return (
        <Formik
       initialValues={{
           
           mailConnect: '',
           passwordConnect: ''
           
       }}
       
     >
         {formik => (
            <div className="form3">
               <h1> Login</h1> 

               <Form onSubmit={formik.handleSubmit }>
                  
                  
                  <InputRs label="Mail" name="mailConnect" type="mail" onChange={formik.handleChange} value={formik.values.mailConnect} />
                  <InputRs label="Password" name="passwordConnect" type="password" onChange={formik.handleChange} value={formik.values.passwordConnect}/>
                  <input type="submit"/>
                
                  
             </Form>
             
             </div>
         )}
     
     </Formik>
     
     )
}
    

export default Essais