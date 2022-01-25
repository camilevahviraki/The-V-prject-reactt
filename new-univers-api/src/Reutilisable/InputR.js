import React from 'react';
//import './imputR.css'
import {useField, ErrorMessage} from 'formik';

export const InputRs = ({ label, ...props}) => {
    const [field, meta] = useField (props);
    return (
        
        <div className="input-wrapper">
            <label htmlFor = {field.name}>{label}</label>
            <input 
            autoComplete="off"
            {...field} {...props}
            />
            <ErrorMessage name={field.name}/>
        </div>
        
    ) 
}