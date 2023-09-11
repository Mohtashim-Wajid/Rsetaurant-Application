import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react'

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: '16px',
        position: 'absolute',
        top: '40px'
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}))


const Popup = (props) => {

    const { title, children, openPopup, setOpenPopup } = props;
    const classes = useStyles();


  return (
    <>
        <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <IconButton
                        onClick={() => { setOpenPopup(false) }}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    </>
  )
}

export default Popup