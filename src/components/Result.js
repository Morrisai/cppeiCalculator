import React from 'react';

import model from '../model/model';
import ordinal from '../utils/ordinal';
import { Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

class Result extends React.Component {
    

    render(){
       const {compensation,  amountPerPay, resultCPP,dayCpp} = this.props.result;
        const { classes } = this.props;

      

        const format =  new Intl.NumberFormat().format;


    return (
            
            <div className={classes.root}>
            <Divider />
            {
                (compensation < model.eiMaxEarning) ? <Typography variant="body2" className={classes.text}>{`I'm sorry, it looks like this calculator doesn't think you'll max out your CPP or EI. You need to make at least $${format(model.eiMaxEarning)} in a year.`} </Typography>
        :
            (
            <div>  
            <Typography variant="body1" className={classes.text}>{`Your CPP contribution is $${format(Math.round(amountPerPay*model.cppPerc))} per pay and your EI contribution is $${format(Math.round(amountPerPay*model.eiPerc))}.`}</Typography>       
            <Typography variant="body1" className={classes.text}>{`You should max out your contributions on your ${ordinal(Math.ceil(resultCPP))} pay.`}</Typography>         
            <Typography variant="body1" className={classes.text}>{`Roughly this means that the pay around ${dayCpp} will be your last with a CPP or EI deduction!`}</Typography>
             </div>
            )
             
        }

            </div>


        )
        
        
       
    }
}

const styles = theme => ({
    root: {       
      marginTop:'1rem',      
    } ,
    text:{
       padding:' 0.5rem 0'
      },   
  });


export default withStyles(styles)(Result);
