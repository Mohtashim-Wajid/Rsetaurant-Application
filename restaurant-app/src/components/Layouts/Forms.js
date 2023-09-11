// import { makeStyles } from '@mui/styles';

// import React from 'react'

// const useStyles = makeStyles(theme => ({
//     root:{
//         '& .MuiFormControl-root':{
//             width: '90%',
//             margin: theme.spaciing(1)
//         }
//     }
// }))

// const Form = (props) => {

//     const classes = useStyles();
//     const {children , ...other} = props
//   return (
//     <>
//         <form className={classes.root} noValidate autoComplete='off' {...other}>
//             {props.children}
//         </form>

//     </>
//   )
// }

// export default Form

import React from 'react';
import { styled } from '@mui/system';
// import { Box } from '@mui/material';

const StyledForm = styled('form')({
  '& .MuiFormControl-root': {
    width: '90%',
    margin: '8px', // Use a numeric value or theme.spacing(1) if needed
  },
});

const Form = (props) => {
  const { children, ...other } = props;

  return (
    <StyledForm noValidate autoComplete='off' {...other}>
      {children}
    </StyledForm>
  );
};

export default Form;
