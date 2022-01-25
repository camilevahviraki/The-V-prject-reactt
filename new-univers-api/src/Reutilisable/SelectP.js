import React from 'react'
import {useField} from 'formik';

export const SelectP = ({ label, ...props}) => {
    const [field, meta] = useField (props);
    return (
        <div>
            <label htmlFor = {field.name}>{label}</label>
          <select {...field} {...props}>
             <option>congo</option>
             <option>kenya</option>
             <option>Tanzania</option>
          </select>   
            
        </div>
    )
}