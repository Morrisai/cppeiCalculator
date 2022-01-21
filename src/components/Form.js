import React from 'react';
import {Paper, Typography, TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


import Grid from '@material-ui/core/Grid';
import moment from 'moment'

import Model from '../model/model';
import Result from './Result';

import ReactGA from 'react-ga';
import Alert from './Alert';





const styles = theme =>( {
    paper: {    
      padding: '3rem',
      maxWidth: '90%',
      margin:'2rem auto',     

      "@media (max-width:500px)": {
        
        maxWidth: '100%',
         
        }

    },
    root: {
       // padding: '2rem', 
            
      },
    button:{
        textAlign:'center'
    },
    instructions:{
        width:'100%'
    },
    section:{
        marginTop:'2rem',
        maxWidth:'90%',
        margin: 'auto' ,
        textAlign:'center',
        
        "@media (max-width:700px)": {           
            maxWidth:'100%',
            padding:'1rem'
        }
    }
      

  }
)


class Form extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            pay: '',
            ytd:'',
            gross:'',
            error:false,
            result:{
                compensation:undefined,
                amountPerPay:undefined,
                resultCPP:undefined,
                resultEI:undefined,
                dayCpp:undefined,
                dayEI:undefined
            }

            };
            
        this.onSubmit = this.onSubmit.bind(this);
    }   


    onSubmit = (e)=>{
        e.preventDefault();		

        const payPeriods = {
            12: 4,
            24: 2,
            26:2,
            52:1
        }     

        const ytd =  parseInt(this.state.ytd.replace(/,/g, ''),10);
        let compensation = parseInt(this.state.gross.replace(/,/g, ''),10);

        if(!this.state.pay){
            this.setState({ 
                error:true, errorMessage:'Please select a pay period.'});

                return
        }else if(!ytd && !compensation){

            this.setState({ 
                error:true, errorMessage:'Please input your earnings.'});

                return

        }

        //console.log(compensation);
        if(isNaN(compensation)){
            const dayOfYear = moment().dayOfYear();

            compensation = 365/dayOfYear * ytd;

            
        }
        
        

        compensation = isNaN(compensation) ? 0 : compensation;

     
    
        const numPays = this.state.pay;

       
  

        const amountPerPay = compensation / numPays;
        const resultCPP =   (Model.cppMaxEarning-Model.cppExemptAmount) / amountPerPay;
        const resultEI =  Model.eiMaxEarning / amountPerPay;

        
       
        const weeksOfPayCPP = Math.round(resultCPP*payPeriods[this.state.pay])
        const weeksOfPayEI = Math.round(resultEI*payPeriods[this.state.pay]);

       
        const dayCpp  = moment().week(weeksOfPayCPP).format("MMMM Do") 

      //  const dayEI  = moment().week(weeksOfPayCPP).format("MMMM Do") 


        //const result = `Your CPP contribution is ${Math.round(amountPerPay*Model.cppPerc)} per pay and your EI contribution is ${Math.round(amountPerPay*Model.eiPerc)}.`;
        
       // console.log(`Your CPP contribution is ${Math.round(amountPerPay*Model.cppPerc)} per pay and your EI contribution is ${Math.round(amountPerPay*Model.eiPerc)}.`)
        const result = {
            compensation,
            amountPerPay,
            resultCPP,
            resultEI,
            dayCpp,
           // dayEI,
            weeksOfPayCPP,
            weeksOfPayEI
        }

        ReactGA.ga('send','event', 'click',  "Number of pay periods per year",numPays.toString());
       
        this.setState({result});
    }

    onPayPeriodSelect = (event, i) =>{
      
        this.setState({ pay:event.target.value});
    }

    onSalaryChange = (event)=>{        
        this.setState({ [event.target.name]: event.target.value });        
    }
  

    onErrorClose = ()=>{

        this.setState({ gross:'',
        ytd:'',
        error:false });

    }
    

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):

        console.log(this.state)

        if (this.state.gross && this.state.ytd && !this.state.error) {
            this.setState({error:true,
                errorMessage:'Please use either the Gross Yearly Compensation field or the Year To Date field.'
            })           
        }

        if(this.state.error){
            ReactGA.ga('send', 'event','error', this.state.errorMessage);
        }
      }


    render(){

        const { classes } = this.props

       return( 
           <div  className={classes.root} id="calculator">           
            <section className={classes.section}>            
            <Typography variant="display2" gutterBottom  >Calculator</Typography>    
            <Typography variant="body1" >If you get paid a regular amount every so often and know how much you will make this year use the first field otherwise use Year To Date if you want to see how bonuses or other irregular payments affect the timing</Typography>
            <Paper elevation={4} className={classes.paper}>
                <form onSubmit={this.onSubmit}>
                    <Grid container spacing={24}>
                        <Typography variant="body1" className={classes.instructions} > Please enter EITHER your yearly salary OR your earnings to date</Typography>
                        <Grid 
                            item xs={12} 
                            sm={6}  
                        >
                            <TextField
                            name='gross'
                            label='Gross Yearly Compensation'               
                            onChange={this.onSalaryChange}
                            placeholder="$65,000"
                            margin='normal'
                            fullWidth={true}
                            value={this.state.gross}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                            name='ytd'
                            label='Year To Date'
                            onChange={this.onSalaryChange}
                            placeholder="$26,000"
                            margin='normal'
                            fullWidth={true}
                            value={this.state.ytd}
                            />    
                        </Grid>

                        <Grid item xs={12} >
                            <Select
                            value={this.state.pay}
                            onChange={this.onPayPeriodSelect}
                            name="pay"
                            displayEmpty
                            className={classes.selectEmpty}
                            fullWidth={true}
                            >
                            <MenuItem value="" disabled>
                                Select Pay Period
                            </MenuItem>
                            <MenuItem value={12}>12 (Once a Month)</MenuItem>
                            <MenuItem value={24}>24 (Twice A Month)</MenuItem>
                            <MenuItem value={26}>26 (Every 2 Weeks)</MenuItem>
                            <MenuItem value={52}>52 (Every Week)</MenuItem>
                            </Select> 
                        </Grid>  

                        <Grid item xs={12} className={classes.button}>
                            <Button
                                type='submit'
                                color='primary'
                                variant='raised'>Calculate
                            </Button>
                        </Grid>
                    </Grid>
                </form>

               {this.state.result.amountPerPay &&  <Result result={this.state.result} /> } 
            </Paper>
            </section>
            <Alert open={this.state.error} onClose={this.onErrorClose} message={this.state.errorMessage} />
        </div>
       )
    }
}

export default withStyles(styles)(Form);




