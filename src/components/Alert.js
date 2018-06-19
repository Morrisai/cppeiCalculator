import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


class AlertDialog extends React.Component {
    
  state = {
    open: false,
  };

 

  

  render() {


    return (           
        <Dialog
          open={this.props.open}
          onClose={this.props.onClose}
         >          
          <DialogContent>
          
            <DialogContentText id="alert-dialog-description">
              {this.props.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClose} color="primary">
              OK
            </Button>            
          </DialogActions>
        </Dialog>      
    );
  }
}

export default AlertDialog;