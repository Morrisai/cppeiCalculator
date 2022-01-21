import React from 'react';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/core/styles';
import { Button, Paper } from '@material-ui/core';

import Model from '../model/model';



const styles = theme => ({
  root: {
    background: theme.palette.primary.main,    
    padding:'2rem',
    textAlign:'center',
    
    "@media (max-width:500px)": {
        padding:'1rem',
        }
    
  },
 
    button:{
      textAlign:'center',
      margin: '0 0 1rem 0',
  },
  text:{
    color: theme.palette.primary.contrastText,
    maxWidth:'75%',
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
const format =  new Intl.NumberFormat().format;
class Header extends React.Component {
    render () {          

        const { classes } = this.props;

        return (
        <Paper className={classes.root}>
            
        
            <Typography variant="display3" gutterBottom className={classes.h1}>
                When will I max out my CPP and EI contributions?
            </Typography>
            <Button className={classes.button} size="small" variant="contained" href="#calculator">
  Skip to calculator
</Button>

          <div >
          <Typography gutterBottom className={classes.text}>Have you ever wondered why part way through the year all of a sudden you stop paying EI and CPP premiums on each paycheque and instead just get to pocket that money? 
             For some people it happens very early in the year and for some people it might happen near the end or not at all. Once you max out, you simply stop paying for those extra deductions and your pay cheque gets a nice little bump. 
            </Typography>
            <Typography gutterBottom className={classes.text}>The Canadian government has set maximums on how much an invidual can contribute to the CPP (Canadian Pension Plan) and to EI (Employment Insurance). 
            Once you have reached the maximum contribution for the year you will see an increase on your net pay going forward as these deductions will no longer be applied.
            </Typography> <Typography gutterBottom className={classes.text}>
            For CPP, with few exceptions, every person over the age of 18, who works in Canada outside of Quebec and earns more than a minimum amount ($3,500 per year) must contribute to CPP.                
            In {Model.year}, the maximum amount for CPP is ${format(Model.cppMaxEarning)}
            </Typography> <Typography gutterBottom className={classes.text}>
            Employment Insurance (EI) provides temporary financial assistance to unemployed Canadians who have lost their job through no fault of their own, while they look for work or upgrade their skills.
            The maximum insurable earnings for EI for {Model.year} is  ${format(Model.eiMaxEarning)}.
            </Typography>  <Typography variant="body2" gutterBottom className={classes.text}>
        Use the calculator below to estimate the date that you will max out your CPP and EI payments in {Model.year}.
        </Typography>
          </div>
            
            </Paper>
        )
    }
}



export default withStyles(styles)(Header);

