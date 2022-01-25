import React , {useState}from 'react';
//import './Formulaire2.css';
import { InputRs } from './InputR.js';
import {Formik,Form} from 'formik';
import * as Yup from 'yup';
import {SelectP} from './SelectP.js';
import Axios from "axios";

function Formulaire2() {

    
   
    /*///////////////////////////////////////

     const [name ,setNom ]= useState ('')
        const [lastname,setPostNom] = useState ('')
        const [mail ,setMail ]= useState ('')
        const [password1 ,setPassword1]= useState ('')
        const [password2 ,setPassword2]= useState ('')
        const [pays ,setPays ]= useState ('')
        const [phonNumber,setPhnNumber ]= useState ('') 

    const inscription = () => {
        Axios.post("http://localhost:3001/register", {
          nomEnv: nomReg,
          postnomEnv: postNomReg,
          mailEnv: mailReg,
          passwordEnv: passwordReg,
          paysEnv: paysReg,
          phnnumberEnv: phnNumberReg,
    
        }).then((response) => {
          console.log(response);
        });
      };

      const submitValidate = async (values, bag) => {
          await new Promise(resolve => validate);
          bag.setSubmitting(false);
          inscription;
      }
/////////////////////////////////////////////////////////////////*/
   
   const [displayMessage,setDisplayMessage] = useState('')   

   const validate= Yup.object({
       nom1: Yup.string()
       .max(20,'Doit avoir au plus 20 caracteres')
       .required('cette case est necessaire'),
       lastname: Yup.string()
       .max(20,'Doit avoir au plus 20 caracteres')
       .required('cette case est necessaire'),
       mail: Yup.string()
       .max(40,'votre mail ne peut pas depasser 40caracteres')
       .email('Veuillez entrer un mail valide')
       .required('cette case est necessaire'),
       password1: Yup.string()
       .max(15,'un mot de passe simple,pas plu de 15 caracteres')
       .min(6,'au moins 6 caracteres')
       .required('cette case est necessaire'),
       password2: Yup.string()
       .max(15,'un mot de passe simple,pas plu de 15 caracteres')
       .oneOf([Yup.ref('password1'),null],'vos mots de passe ne correspondent pas')
       .required('Veuillez confirmer le mot de passe'),
       phoneNumber: Yup.string()
       .max(15,'mettez un numero valide')
       .required('Veuillez inscrire votre num'),


   })

    return (
    
    <Formik
      initialValues={{
          nom1: '',
          lastname: '',
          mail: '',
          password1: '',
          password2: '',
          pays: 'congo',
          phoneNumber: ''
      }}
      validationSchema= {validate}  
      onSubmit={async (values) => {
      const  data= {
      nom1Env: values.nom1,
      lastnameEnv: values.lastname,
      mailEnv: values.mail,
      password1Env: values.password1,
      password2Env: values.password2,
      paysEnv: values.pays,
      phoneNumberEnv: values.phoneNumber
      }


       

        await Axios.post("http://localhost:3001/register", data).then((response) => {
          
          if(response.data.message1){
            setDisplayMessage(response.data.message1);
          }
          if(response.data.message2){
            setDisplayMessage(response.data.message2);
          }
        console.log(response); 
        });
       // console.log(values);
      }}
      
    >
        {formik => (
           <div className="form2">
              <h1> sign up</h1> 
             <Form onSubmit={formik.handleSubmit }>
                 <InputRs label="Name" name="nom1" type="text" onChange={formik.handleChange} value={formik.values.nom1}/>
                 <InputRs label="Last name" name="lastname" type="text" onChange={formik.handleChange} value={formik.values.lastname} />
                 <InputRs label="Mail" name="mail" type="mail" onChange={formik.handleChange} value={formik.values.mail} />
                 <InputRs label="Password" name="password1" type="password" onChange={formik.handleChange} value={formik.values.password1}/>
                 <InputRs label="Password confirm" name="password2" type="password" onChange={formik.handleChange} value={formik.values.password2}/>
                 <SelectP label="Pays" name="pays" onChange={formik.handleChange} value={formik.values.pays}/>
                 <InputRs label="Phone Number" name="phoneNumber" type="text" onChange={formik.handleChange} value={formik.values.phoneNumber}/>
                 <input type="submit"/>
               
                 <button  >Reset </button>
              </Form>
              <h3>{displayMessage}</h3>
           </div>
        )}

    </Formik>
    
    ) 
    
    
  
}

export default Formulaire2
