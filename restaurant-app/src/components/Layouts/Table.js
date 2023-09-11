import { makeStyles } from '@mui/styles';
import { Table as MuiTable} from '@mui/material';
import React from 'react'


const useStyles = makeStyles(() => ({
    table: {
        '& tbody td': {
            fontWeight: '300',
        },
        '& tbody tr:hover': {
            backgroundColor: '#fffbf2',
            cursor: 'pointer',
        },
        '& .MuiTableCell-root': {
            border: 'none'
        }
    },
}));


const Table = (props) => {
    const classes = useStyles();

    return (
        
        <MuiTable className={classes.table}>
            {props.children}
        </MuiTable>
    )
}

export default Table