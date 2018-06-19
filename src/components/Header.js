import React from 'react';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';




const styles = theme => ({
  root: {
    background: theme.palette.primary.main,    
    padding:'2rem',
    textAlign:'center',
    
    "@media (max-width:500px)": {
        padding:'1rem',
        }
    
  },
  text:{
    color: theme.palette.primary.contrastText,
    maxWidth:'50%',
    margin: '1rem auto',

    "@media (max-width:500px)": {
        maxWidth:'100%',
        }
   
  },
  h1:{
    color: theme.palette.primary.contrastText,
    padding:'2rem 0rem',
    maxWidth:'75%',
    margin: 'auto',
    "@media (max-width:500px)": {
      maxWidth:'100%',
      fontSize:'2rem'
      }
  }
});

class Header extends React.Component {
    render () {          

        const { classes } = this.props;

        return (
        <Paper className={classes.root}>
            
        
            <Typography variant="display3" gutterBottom className={classes.h1}>
                When will I max out my CPP and EI contributions?
            </Typography>
          <div >
            <Typography gutterBottom className={classes.text}>The Canadian government has set maximums on how much an invidual can contribute to the CPP (Canadian Pension Plan) and to EI (Employment Insurance). 
            Once you have reached the maximum contribution for the year you will see an increase on your net pay going forward as these deductions will no longer be applied.
            </Typography> <Typography gutterBottom className={classes.text}>
            For CPP, with few exceptions, every person over the age of 18, who works in Canada outside of Quebec and earns more than a minimum amount ($3,500 per year) must contribute to CPP.                
            In 2018, the maximum amount for CPP is $55,900.00.
            </Typography> <Typography gutterBottom className={classes.text}>
            Employment Insurance (EI) provides temporary financial assistance to unemployed Canadians who have lost their job through no fault of their own, while they look for work or upgrade their skills.
            The maximum insurable earnings for EI for 2018 is $51,700.00.
            </Typography>  <Typography variant="body2" gutterBottom className={classes.text}>
        Use the calculator below to estimate the date that you will max out your CPP and EI payments in 2018.
        </Typography>
          </div>
            
            </Paper>
        )
    }
}



export default withStyles(styles)(Header);

