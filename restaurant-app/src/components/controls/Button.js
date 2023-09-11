import React from 'react'
// import { styled } from '@mui/system';
import { Button as MuiButton } from '@mui/material';
import  ButtonProps from '@mui/material/Button';
import { styled } from '@mui/styles';
import { yellow,grey } from '@mui/material/colors';




const Button = (props) => { 
  const StyledButton = styled(MuiButton)<ButtonProps>(({ theme }) => ({
      root:{
          margin: '8px', // Equivalent to theme.spacing(1),
          
          '& .MuiButton-label': {
            textTransform: 'none',
            // color: theme.palette.getContrastText(yellow[500])
            color: 'black !important',
            backgroundColor: theme.palette.getContrastText(grey[400])
          }
      }
  }));

    const {children, color, variant, onClick, className, ...other} = props;
  return (
    <>
        <MuiButton
            sx={{
              color:'black',
              backgroundColor: '#e0e0e0'
            }}
            className={StyledButton.root + '' + (className || '')}
            variant={variant || 'contained'}
            // color={color || 'default'}
            onClick={onClick}
            {...other}>

            {children}
            
        </MuiButton>

    </>
  )
}

export default Button




// import React from 'react';
// import { Button as MuiButton } from '@mui/material';

// const Button = (props) => {
//   const { children, color, variant, onClick, className, ...other } = props;
  
//   return (
//     <MuiButton
//       sx={{
//         margin: '8px',
//         '& .MuiButton-label': {
//           textTransform: 'none',
//         },
//       }}
//       variant={variant || 'contained'}
//       color={color || 'default'}
//       onClick={onClick}
//       className={className}
//       {...other}
//     >
//       {children}
//     </MuiButton>
//   );
// };

// export default Button;





// import React from 'react';
// import { Button as MuiButton } from '@mui/material';
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles(theme => ({
//   root: {
//     margin: '8px',
//     '& .MuiButton-label': {
//       textTransform: 'none',
//     },
//   },
// }));

// const Button = (props) => {
//   const classes = useStyles(); // Use the makeStyles hook
//   const { children, color, variant, onClick, className, ...other } = props;
  
//   // Combine the class names using template literals
//   const combinedClassName = `${classes.root} ${className || ''}`;

//   return (
//     <MuiButton
//       className={combinedClassName}
//       variant={variant || "contained"}
//       color={color || "default"}
//       onClick={onClick}
//       {...other}
//     >
//       {children}
//     </MuiButton>
//   );
// };

// export default Button;
