import React,{ useState,useEffect} from 'react';
import {Route, Link} from 'react-router-dom';
import { InputRs } from './InputR.js';
import {Formik,Form} from 'formik';
import * as Yup from 'yup';
import Axios from "axios";
import './GlobalVariable.js';
import UserContextProvider from './UseContext.js';


function LoginPage() {

    const [loginStatus,setLoginStatus] = useState("");  
    const [logeddIn,setLogeddIn] = useState("false");  
   
    
    Axios.defaults.withCredentials = true;
    
    
    const validate1= Yup.object({
    
        mailConnect: Yup.string().email('Veuillez entrer un mail valide')
        
    })
    
    useEffect(() => {
      Axios.get("http://localhost:3001/login").then((response)=>{
       if(response.data.loggedIn ==true){
        setLoginStatus(response.data.user[0].nom);
        setLogeddIn("true");
        {global.isLoggedIn= false};
      //  {loginVar=true}
       } else {
         setLogeddIn("false");
         {global.isLoggedIn= true};
        // {loginVar=false }
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

             <div>
             <Link to="/inscriptionV" >Creer un compte</Link>
          
             </div>
            </div>
            
         )}
     
     </Formik>
     
     )
}

export default LoginPage