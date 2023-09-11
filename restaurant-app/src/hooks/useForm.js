import React, { useState } from 'react'

const useForm = (getFreshModelObject) => {
    const [values,setValues] = useState(getFreshModelObject())
    const [errors,setErrors] = useState({})
    const handleInputChange = e =>{
        const {name, value} = e.target; 
        setValues({
            ...values,
            [name]: value
        });
    }

    const resetFormControl = () =>{
        setValues(getFreshModelObject())
        setErrors({})
    }

  return (
    
    {
      values,
      setValues,
      errors,
      setErrors,
      handleInputChange,
      resetFormControl
    }
      
  )
}

export default useForm