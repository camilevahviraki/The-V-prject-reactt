import React , { useState,useEffect} from 'react'
import { InputRs } from './InputR.js';
import {Formik,Form} from 'formik';
import * as Yup from 'yup';
import Axios from "axios";

function Login() {

    const [loginStatus,setLoginStatus] = useState("");  
    
    Axios.defaults.withCredentials = true;
    
    
    const validate1= Yup.object({
    
        mailConnect: Yup.string().email('Veuillez entrer un mail valide')
        
    })
    
    useEffect(() => {
      Axios.get("http://localhost:3001/login").then((response)=>{
       if(response.data.loggedIn ===true){
        setLoginStatus(response.data.user[0].nom)
       } 
     
      //  console.log(response);
      })
    
    }, [])
     return (
     
     <Formik
       initialValues={{
           
           mailConnect: '',
           passwordConnect: ''
           
       }}
       validationSchema= {validate1}  
       onSubmit={async (values) => {
       const  data= {
       
       mailConnect: values.mailConnect,
       passwordConnect: values.passwordConnect
       
       }
 
         await Axios.post("http://localhost:3001/login", data).then((response) => {
       
         if(response.data.message){
           setLoginStatus(response.data.message);
         }else{
           setLoginStatus(response.data[0].nom);
         }
      
         });
       
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
             <h2>{loginStatus}</h2>
            </div>
         )}
     
     </Formik>
     
     )
}

export default Login