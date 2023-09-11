import React, { useEffect, useState } from 'react'
import Form from '../Layouts/Forms'
import { ButtonGroup, Grid, InputAdornment, Button as MuiButton } from '@mui/material'
import { Input, Select, Button } from '../controls'
import { makeStyles } from '@mui/styles'
import { createAPiEndpoint, ENDPOINTS } from '../../api'
import  Notification  from '../Layouts/Notification'

// button icons import
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ReorderIcon from '@mui/icons-material/Reorder';
import { roundTo2DecimalPoint } from '../../utils'
import Popup from '../Layouts/Popup'
import OrderList from './OrderList'

const pMethods = [
    { id: 'none', title: 'Select' },
    { id: 'Card', title: 'Card' },
    { id: 'Cash', title: 'Cash' },
]
const useStyles = makeStyles(theme => ({
    adronmentText: {
        '& .MuiTypography-root': {
            color: '#f3b33d',
            fontWeight: 'bolder',
            fontSize: '1.5em'
        }
    },
    submitButtonGroup: {
        backgroundColor: '#f3b33d',
        color: '#000 !important',
        margin: '8px',
        '& .MuiButton-label': {
            textTransform: 'none'
        },
        '& :hover': {
            backgroundColor: '#f3b33d'
        }
    }
}))

const OrderForm = (props) => {
    const { values, errors, handleInputChange, setValues, setErrors, resetFormControl } = props
    const [customerList, setCustomerList] = useState([])
    const [orderListVisibility, setOrderListVisibility] = useState(false)
    const [orderId, setOrderId] = useState(0)
    const [notify, setNotify] = useState({isOpen: false})

    useEffect(() => {
        createAPiEndpoint(ENDPOINTS.CUSTOMER).fetchAll()
            .then(res => {
                let customerList = res.data.map(item => ({
                    id: item.customerId,
                    title: item.customerName
                }))
                customerList = [{ id: 0, title: 'Select' }].concat(customerList)
                setCustomerList(customerList)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        let gTotal = values.orderDetails.reduce((tempTotal, item) => {
            return tempTotal + (item.quantity * item.foodItemPrice);
        }, 0)

        setValues({
            ...values,
            gTotal: roundTo2DecimalPoint(gTotal)
        })

    }, [JSON.stringify(values.orderDetails)])

    const classes = useStyles()



    const openListOfOrders = () =>{
        setOrderListVisibility(true)
    }



    useEffect(()=>{
        if( orderId == 0 ) resetFormControl()
        else{
            console.log(orderId)
            createAPiEndpoint(ENDPOINTS.ORDER).fetchById(orderId)
            .then(res =>{
                setValues(res.data)
                setErrors({})
            })
            .catch(err => console.log(err))
        }
    }, [orderId] )

    const validateForm = () => {
        let temp = {};
        temp.customerId = values.customerId !== 0 ? "" : "this field is required."
        temp.pMethod = values.pMethod !== "none" ? "" : "this field is required."
        temp.orderDetails = values.orderDetails.length !== 0 ? "" : "this field is required."
        setErrors({ ...temp })
        return Object.values(temp).every(x => x === "")
    }

    function convertToTemplateObject(target) {
        // Create a new object based on the template structure
        const customer = customerList.find(item => item.id === target.customerId)
        const template = {
            orderMasterId: target.orderMasterId,
            orderNumber: target.orderNumber,
            customerId: target.customerId,
            customer: {
                customerId: 0,
                customerName: customer.title,
            },
            pMethod: target.pMethod,
            gTotal: target.gTotal,
            orderDetails: [],
            deletedOrderItemIds: values.deletedOrderItemIds
        };

        // Iterate through orderDetails in the target object and convert each item
        target.orderDetails.forEach((detail) => {
            const detailObject = {
                orderDetailId: detail.orderDetailId,
                orderMasterId: detail.orderMasterId,
                foodItemId: detail.foodItemId,
                foodItem: {
                    foodItemId: 0,
                    foodItemName: detail.foodItemName,
                    price: 0,
                },
                foodItemPrice: detail.foodItemPrice,
                quantity: detail.quantity,
            };
            template.orderDetails.push(detailObject);
        });

        return template;
    }

    function UpdateTemplate(values) {
        // Create a new object based on the template structure
        const customer = customerList.find(item => item.id === values.customerId)
        const template = {
          orderMasterId: values.orderMasterId,
          orderNumber: values.orderNumber,
          customerId: values.customerId,
          customer: {
            customerId: 0,
            customerName: customer.title,
          },
          pMethod: values.pMethod,
          gTotal: values.gTotal,
          orderDetails: [],
          deletedOrderItemIds: values.deletedOrderItemIds,
        };
      
        // Iterate through orderDetails in the values object and convert each item
        values.orderDetails.forEach((detail) => {
          const detailObject = {
            orderDetailId: detail.orderDetailId,
            orderMasterId: detail.orderMasterId,
            foodItemId: detail.foodItemId,
            foodItem: {
              foodItemId: 0,
              foodItemName: detail.foodItemName,
              price: 0,
            },
            foodItemPrice: detail.foodItemPrice,
            quantity: detail.quantity,
            foodItemName: detail.foodItemName,
          };
          template.orderDetails.push(detailObject);
        });
      
        return template;
      }
    const submitOrder = e => {
        e.preventDefault();
        // console.log(validateForm())
        // console.log(JSON.stringify(values))

        if (validateForm()) {
            let req = convertToTemplateObject(values)
            if(values.orderMasterId == 0){
                // console.log(req)
                    createAPiEndpoint(ENDPOINTS.ORDER).create(req)
                    .then(res => {
                        // console.log(res)
                        resetFormControl();
                        setNotify({isOpen: true, message: "New order is created."});
                    })
                    .catch(err => console.log(err));
            }
            else{
                req = UpdateTemplate(values)
                console.log(req)
                createAPiEndpoint(ENDPOINTS.ORDER).update(req.orderMasterId, req)
                .then(res => {
                    // console.log(res)
                    // resetFormControl()
                    console.log(res.data)
                    setOrderId(0)
                    setNotify({isOpen: true, message: "The order is updated."});
                })
                .catch(err => console.log(err));
               
                
            }
        }
    }
    return (
        <>
            <Form onSubmit={submitOrder}>
                <Grid container>
                    <Grid item xs={6}>
                        <Input
                            disabled
                            label="Order Number"
                            name="orderNumber"
                            value={values.orderNumber}
                            InputProps={{
                                startAdornment:
                                    <InputAdornment
                                        position='start'
                                        className={classes.adronmentText}
                                    >#</InputAdornment>

                            }}
                        />
                        <Select
                            label="Customer"
                            name="customerId"
                            value={values.customerId}
                            onChange={handleInputChange}
                            options={customerList}
                            error={errors.customerId}
                        />



                    </Grid>
                    <Grid item xs={6}>
                        <Input
                            disabled
                            label="Grand Total"
                            name="gTotal"
                            value={values.gTotal}
                            InputProps={{
                                startAdornment:
                                    <InputAdornment
                                        position='start'
                                        className={classes.adronmentText}
                                    >$</InputAdornment>
                            }}
                        />
                        <Select
                            label="Payment Method"
                            name="pMethod"
                            onChange={handleInputChange}
                            value={values.pMethod}
                            options={pMethods}
                            error={errors.pMethod}
                        />
                        <ButtonGroup className={classes.submitButtonGroup} >
                            <MuiButton
                                size='large'
                                type='submit'
                                endIcon={<RestaurantMenuIcon />}
                                sx={{ color: 'black !important' }}
                            >Submit</MuiButton>
                            <MuiButton
                                size='small'
                                startIcon={<RestartAltIcon />}
                                sx={{ color: 'black !important' }}
                            />
                        </ButtonGroup>
                        <Button
                            size='large'
                            onClick= {openListOfOrders}
                            startIcon={<ReorderIcon />}
                        >
                            Orders
                        </Button>
                    </Grid>
                </Grid>
            </Form>
            <Popup
                title="List of Orders"
                openPopup = {orderListVisibility}
                setOpenPopup = {setOrderListVisibility}
                >
                <OrderList
                    {...{ setOrderId , setOrderListVisibility, resetFormControl, setNotify }}
                />

            </Popup>
            <Notification
                {...{notify, setNotify}}
            />
        </>
    )
}

export default OrderForm