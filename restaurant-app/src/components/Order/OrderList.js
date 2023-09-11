import React, { useEffect, useState } from 'react'
import { ENDPOINTS, createAPiEndpoint } from '../../api'
import Table from '../Layouts/Table'
import { TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';


const OrderList = (props) => {

    const { setOrderId, setOrderListVisibility, resetFormControl, setNotify } = props
    const [orderList, setOrderList] = useState([])

    useEffect(()=>{
        createAPiEndpoint(ENDPOINTS.ORDER).fetchAll()
        .then(res =>{
          setOrderList(res.data)
        })
        .catch(err => console.log(err))

    },[])

    const showForUpdate = id =>{
      setOrderId(id)
      setOrderListVisibility(false)
    }

    const deleteOrder = id =>{
      if(window.confirm('Are you sure you want to delete this record?')){
          createAPiEndpoint(ENDPOINTS.ORDER).delete(id)
          .then(res =>{
              setOrderListVisibility(false);
              setOrderId(0);
              resetFormControl();
              setNotify({isOpen: true, message: "Deleted Successfully."});
          })
          .catch(err => console.log(err))
      }
    }


  return (
    <>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order No.</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Payed With</TableCell>
              <TableCell>Grand Total</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              orderList.map(item => (
                <TableRow key={item.orderMasterId}>
                  <TableCell 
                    onClick={e => showForUpdate(item.orderMasterId)}
                  >
                    {item.orderNumber}
                  </TableCell>
                  <TableCell 
                    onClick={e => showForUpdate(item.orderMasterId)}
                    >
                    {item.customer.customerName}
                  </TableCell>
                  <TableCell 
                    onClick={e => showForUpdate(item.orderMasterId)}
                  >
                    {item.pMethod}
                  </TableCell>
                  <TableCell
                    onClick={e => showForUpdate(item.orderMasterId)}
                  >
                    {item.gTotal}
                  </TableCell>
                  <TableCell>
                    <DeleteTwoToneIcon 
                      color='secondary'
                      onClick={e => deleteOrder(item.orderMasterId)}
                    />
                  </TableCell>


                </TableRow>
              ))
            }
          </TableBody>
        </Table>
    </>
  )
}

export default OrderList