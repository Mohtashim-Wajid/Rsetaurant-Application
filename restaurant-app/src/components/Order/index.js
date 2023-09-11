import React from 'react'
import OrderForm from './OrderForm'
import useForm from '../../hooks/useForm'
import { Grid } from '@mui/material';
import SearchFoodItems from './SearchFoodItems';
import OrderedFoodItems from './OrderedFoodItems';


const generateRandomNumber = ()=> Math.floor(100000 * Math.random() * 900000).toString();
const getFreshModelObject=()=>(
    {
    orderMasterId: 0,
    orderNumber: generateRandomNumber(),
    customerId: 0,
    pMethod: 'none',
    gTotal: 0,
    deletedOrderItemIds:'',
    orderDetails:[]
})


const Order = () => {
  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetFormControl
  } = useForm(getFreshModelObject);




  return (
    <>
        <OrderForm
          {...{ 
            values, 
            errors, 
            setErrors,
            handleInputChange,
            setValues,
            resetFormControl 
          }}
        />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <SearchFoodItems
            {...{ setValues,
                  values
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <OrderedFoodItems
            {...{ 
                setValues,
                values
              }}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default Order