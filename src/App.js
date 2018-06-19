import React, { Component } from 'react';


import { MuiThemeProvider,  withStyles } from '@material-ui/core/styles';
import Header from './components/Header';

import Form from './components/Form';
import Theme from './theme/Theme';
import GoogleAd from 'react-google-ad'


import ReactGA from 'react-ga';

ReactGA.initialize('UA-52158856-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const styles = theme => ({
  root: {
   // maxWidth:'75%'
    textAlign:'center'
  }
});



class App extends Component {
  render() {

    const { classes } = this.props;



    return (      
   
        
        <MuiThemeProvider theme={Theme}>
          <div className={classes.root}>    
           <GoogleAd client="ca-pub-4099953510531572" slot="5509771242" format="auto" />  
            <Header />   
            <Form />   
            <GoogleAd client="ca-pub-4099953510531572" slot="4966544444" format="auto" />    
           
            
          </div>
        </MuiThemeProvider>
    
    );
  }
}




export default withStyles(styles)(App);
