import { Button, ButtonGroup, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Paper } from '@mui/material'
import React from 'react'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { roundTo2DecimalPoint } from '../../utils';
import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles(theme=>({
//   paperRoot: {
//     margin:'15px 0',
//     '& :hover':{
//       cursor:'pointer'
//     },
//     '& :hover $deleteButton':{
//       display:'block'
//     }
//   },
//   buttonGroup:{
//     backgroundColor:'#E3E3E3',
//     borderRadius: 8,
//     '& .MuiButtonBase-root': {
//       border:'none',
//       minWidth:'25px',
//       padding:'1px'
//     },
//     '& button:nth-child(2)':{
//       fontSize:'1.2em',
//       color: '#000'
//     },
//   },
//   deleteButton:{
//     display:'none',
//     '& MuiButtonBase-root':{
//       color: '#E81719',
//     },
//   },
//   totalPerItem:{
//     fontWeight: 'bolder',
//     fontSize: '1.2em',
//     margin:'0px 10px'
//   }
// }))

const useStyles = makeStyles((theme) => ({
  paperRoot: {
    margin: '15px 0',
    '&:hover': {
      cursor: 'pointer',
    },
    '&:hover $deleteButton': {
      display: 'block',
    },
  },
  buttonGroup: {
    backgroundColor: '#E3E3E3',
    borderRadius: '8px',
    '& .MuiButtonBase-root': {
      border: 'none',
      minWidth: '25px',
      padding: '1px',
    },
    '& button:nth-child(2)': {
      fontSize: '1.2em',
      color: '#000',
    },
  },
  deleteButton: {
    display: 'none',
    '& .MuiButtonBase-root': {
      color: '#E81719',
    },
  },
  totalPerItem: {
    fontWeight: 'bold', // 'bolder' should be 'bold'
    fontSize: '1.2em',
    margin: '0px 10px',
  },
}));

const OrderedFoodItems = (props) => {

  const classes = useStyles()
  const { setValues,values} = props
  const updateQuanity = (idx, value) =>{

    let x = {...values}
    let foodItem = x.orderDetails[idx]
    if(foodItem.quantity + value > 0){
      foodItem.quantity += value;
      setValues({...x})
    }
  }
  const removeFoodItem = (index, id) =>{
    let x = {...values}
    x.orderDetails = x.orderDetails.filter((_, i)=> i != index)
    if(id != 0){
      x.deletedOrderItemIds += id + ',';
    }
    setValues({...x}) 
  }
  let orderedFoodItems = values.orderDetails
  return (
    <List>
      {
        orderedFoodItems.length == 0? 
        <ListItem>
          <ListItemText
            primary="Please select food items"
            primaryTypographyProps={{
                style:{
                  textAlign:'center',
                  fontStyle: 'italic'
              }
            }}
          />
        </ListItem>
        :


        orderedFoodItems.map((item,idx)=>(
          <Paper key={idx} className={classes.paperRoot}
          sx={
            {
              margin: '15px 0',
              '&:hover': {
                cursor: 'pointer',
              },
              '&:hover $deleteButton': {
                display: 'block',
              },
            }
          }
          >
              <ListItem>
                <ListItemText
                  primary={item.foodItemName}
                  primaryTypographyProps={
                    {
                      component:'h2',
                      style: {
                        fontWeight: '500',
                        fontSize: '1.2em'
                      }
                    }
                  } 
                  secondary={
                    <>
                      <ButtonGroup
                        size='small'
                        className={classes.buttonGroup}
                        sx={{
                          backgroundColor: '#E3E3E3',
                          borderRadius: '8px',
                          '& .MuiButtonBase-root': {
                            border: 'none',
                            minWidth: '25px',
                            padding: '1px',
                          },
                          '& button:nth-child(2)': {
                            fontSize: '1.2em',
                            color: '#000',
                          },
                        }}
                        >
                          <Button 
                            onClick={e => updateQuanity(idx, -1)}
                          > - </Button>
                          <Button
                            disabled
                            >{item.quantity}</Button>
                          <Button
                            onClick={e => updateQuanity(idx, 1)}
                          >+</Button>
                      </ButtonGroup>
                      <span className={classes.totalPerItem}>
                        {'$' + roundTo2DecimalPoint(item.quantity * item.foodItemPrice)}
                      </span>
                    </>
                  }
                  secondaryTypographyProps={
                    {component:'div'}
                  }
                />
                
                <ListItemSecondaryAction
                  className={classes.deleteButton}
                >
                  <IconButton 
                    disableRipple
                    onClick={e=> removeFoodItem(idx, item.orderDetailId)}
                  >
                    <DeleteTwoToneIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
          </Paper>
        ))
      }
    </List>
  )
}

export default OrderedFoodItems