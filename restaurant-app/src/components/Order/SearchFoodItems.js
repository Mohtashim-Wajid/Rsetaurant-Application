import React, { useState, useEffect } from 'react'
import { createAPiEndpoint, ENDPOINTS } from '../../api'
import { IconButton, InputBase, List, ListItem, ListItemSecondaryAction, ListItemText, Paper } from '@mui/material'
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import PlusOneTwoToneIcon from '@mui/icons-material/PlusOneTwoTone';
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';
import { makeStyles } from '@mui/styles';



const useStyles = makeStyles(theme=>({
    searchPaper:{
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    searchInput:{
        marginLeft: '12px',
        flex: '1',
    },
    listRoot:{
        marginTop:'8px',
        maxHeight:'450',
        overflow:'auto',
        '& li:hover':{
            cursor:'pointer',
            backgroundColor:'#e3e3e3'
        },
        '& li:hover .MuiButtonBase-root':{
            display:'block',
            color:'#000',
        },
        '& .MuiButtonBase-root:':{
            display:'none',
        },
        '& .MuiButtonBase-root:hover':{
            backgroundColor:'transparent'
        }
    }
}))
const SearchFoodItems = (props) => {

    const { setValues, values } = props
    let orderedFoodItems = values.orderDetails;


    const classes = useStyles()
    const [foodItems, setFoodItems] = useState([])
    const [searchList, setSearchList] = useState([])
    const [searchKey, setSearchKey] = useState('')
    useEffect(() => {
        createAPiEndpoint(ENDPOINTS.FOODITEM).fetchAll()
            .then(res => {
                setFoodItems(res.data)
                // console.log(res.data)
                setSearchList(res.data)
            })
            .catch(err => console.log(err))
    }, [])
    useEffect(()=>{
        let searchPhrase = [...foodItems]
        searchPhrase = searchPhrase.filter(y => {
            return y.foodItemName.toLowerCase().includes(searchKey.toLocaleLowerCase())
             && orderedFoodItems.every(item => item.foodItemId != y.foodItemId)
        })
        setSearchList(searchPhrase)
    }, [searchKey,orderedFoodItems])

    const addFoodItem = foodItem =>{
        let x = {
          orderMasterId: values.orderMasterId,
          orderDetailId: 0,
          foodItemId: foodItem.foodItemId,
          quantity: 1,
          foodItemPrice: foodItem.price,
          foodItemName: foodItem.foodItemName
        }
        setValues({
          ...values,
          orderDetails: [...values.orderDetails, x]
        })
      }


    return (
        <>
            <Paper className={classes.searchPaper}>
                <InputBase

                    placeholder='Search Food Items'
                    className={classes.searchInput}
                    value={searchKey}
                    onChange={ e=>setSearchKey(e.target.value)}
                />
                <IconButton>
                    <SearchTwoToneIcon/>
                </IconButton>
            </Paper>
            <List>
                {
                    searchList.map((item, idx) => {
                        return(
                            <ListItem 
                                key={idx}
                                onClick={e => addFoodItem(item)} 
                                >
                                        <ListItemText 
                                            primary={item.foodItemName} 
                                            secondary={'$' + item.price} 
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton onClick={e => addFoodItem(item)}>
                                                <PlusOneTwoToneIcon/>
                                                <ArrowForwardIosTwoToneIcon/>
                                            </IconButton>
                                        </ListItemSecondaryAction>
                            </ListItem>  
                        )
                    })
                }
            </List>
        
        </>
    )
}

export default SearchFoodItems